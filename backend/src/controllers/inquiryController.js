const { supabaseAdmin } = require('../config/supabase');
const { sendEmail } = require("../services/emailService");

exports.createInquiry = async (req, res) => {
  try {
    const {
      whatsapp,
      nationality,
      pax,
      travelDate,
      destination,
      inquiry,
    } = req.body;

    const user = req.user;

    const { data: profile, error: profileError } =
      await supabaseAdmin
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

    if (profileError) {
      throw profileError;
    }

    const { data, error } =
      await supabaseAdmin
        .from('inquiries')
        .insert({
          user_id: user.id,

          full_name: profile.full_name,

          email: user.email,

          whatsapp,

          nationality,

          pax: pax || null,

          travel_date: travelDate || null,

          destination,

          inquiry,

          status: 'pending',
        })
        .select()
        .single();

    if (error) throw error;

    await sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `New Inquiry - ${destination}`,
    html: `
        <h2>New Inquiry Received</h2>

        <p><strong>Name:</strong> ${profile.full_name}</p>
        <p><strong>Email:</strong> ${user.email}</p>
        <p><strong>WhatsApp:</strong> ${whatsapp}</p>

        <p><strong>Destination:</strong> ${destination}</p>
        <p><strong>Pax:</strong> ${pax}</p>

        <p><strong>Message:</strong></p>
        <p>${inquiry}</p>
    `,
    });

    res.status(201).json({
      success: true,
      data,
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getMyInquiries = async (req, res) => {
  try {
    const { data, error } =
      await supabaseAdmin
        .from('inquiries')
        .select('*')
        .eq('user_id', req.user.id)
        .order('created_at', {
          ascending: false,
        });

    if (error) throw error;

    res.json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

exports.getInquiries =
async (req, res) => {

  try {

    const { data, error } =
      await supabaseAdmin
        .from("inquiries")
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    if (error) throw error;

    return res.json(data);

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};

exports.getInquiryById =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const { data, error } =
      await supabaseAdmin
        .from("inquiries")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) {

      return res.status(404).json({
        message:
          "Inquiry not found",
      });

    }

    return res.json(data);

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};

exports.updateInquiry =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const {
      status,
      admin_notes,
    } = req.body;

    const allowedStatuses = [
      "pending",
      "contacted",
      "quoted",
      "converted",
      "closed",
    ];

    if (
      status &&
      !allowedStatuses.includes(
        status
      )
    ) {

      return res.status(400).json({
        message:
          "Invalid status",
      });

    }

    const { data, error } =
      await supabaseAdmin
        .from("inquiries")
        .update({
          status,
          admin_notes,
          updated_at:
            new Date().toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return res.json(data);

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};