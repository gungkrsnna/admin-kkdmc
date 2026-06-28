const { supabaseAdmin } =
require("../config/supabase");

exports.getPromotions =
async (req, res) => {

  try {

    const { data, error } =
      await supabaseAdmin
        .from("promotions")
        .select("*")
        .order(
          "sort_order",
          {
            ascending: true,
          }
        );

    if (error) throw error;

    return res.json(data);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: error.message,
    });

  }

};

exports.getPromotionById =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const { data, error } =
      await supabaseAdmin
        .from("promotions")
        .select("*")
        .eq("id", id)
        .single();

    if (error || !data) {

      return res.status(404).json({
        message:
          "Promotion not found",
      });

    }

    return res.json(data);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: error.message,
    });

  }

};

exports.createPromotion =
async (req, res) => {

  try {

    const {
      title,
      subtitle,
      image_url,
      whatsapp_number,
      button_text,
      is_active,
      sort_order,
    } = req.body;

    if (!title?.trim()) {

      return res.status(400).json({
        message:
          "Title is required",
      });

    }

    const { data, error } =
      await supabaseAdmin
        .from("promotions")
        .insert([
          {
            title,
            subtitle,
            image_url,
            whatsapp_number,
            button_text:
              button_text ||
              "View Offer",
            is_active:
              is_active ===
              undefined
                ? true
                : is_active,
            sort_order:
              sort_order ?? 0,
          },
        ])
        .select()
        .single();

    if (error) throw error;

    return res
      .status(201)
      .json(data);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: error.message,
    });

  }

};

exports.updatePromotion =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const {
      title,
      subtitle,
      image_url,
      whatsapp_number,
      button_text,
      is_active,
      sort_order,
    } = req.body;

    const {
      data: existing,
      error: existingError,
    } = await supabaseAdmin
      .from("promotions")
      .select("id")
      .eq("id", id)
      .single();

    if (
      existingError ||
      !existing
    ) {

      return res.status(404).json({
        message:
          "Promotion not found",
      });

    }

    const { data, error } =
      await supabaseAdmin
        .from("promotions")
        .update({
          title,
          subtitle,
          image_url,
          whatsapp_number,
          button_text,
          is_active,
          sort_order,
          updated_at:
            new Date()
              .toISOString(),
        })
        .eq("id", id)
        .select()
        .single();

    if (error) throw error;

    return res.json(data);

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: error.message,
    });

  }

};

exports.deletePromotion =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const {
      data: existing,
    } = await supabaseAdmin
      .from("promotions")
      .select("id")
      .eq("id", id)
      .maybeSingle();

    if (!existing) {

      return res.status(404).json({
        message:
          "Promotion not found",
      });

    }

    const { error } =
      await supabaseAdmin
        .from("promotions")
        .delete()
        .eq("id", id);

    if (error) throw error;

    return res.json({
      success: true,
      message:
        "Promotion deleted",
    });

  } catch (error) {

    console.error(error);

    return res.status(500).json({
      message: error.message,
    });

  }

};