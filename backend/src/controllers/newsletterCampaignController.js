const {
  supabaseAdmin,
} = require("../config/supabase");

const resend =
  require("../services/resendService");

const createCampaign =
  async (req, res) => {
    try {
      const {
        title,
        subject,
        content,
      } = req.body;

      if (
        !title ||
        !subject ||
        !content
      ) {
        return res.status(400).json({
          success: false,
          message:
            "Title, subject and content are required",
        });
      }

      const {
        data,
        error,
      } = await supabaseAdmin
        .from(
          "newsletter_campaigns"
        )
        .insert([
          {
            title,
            subject,
            content,
          },
        ])
        .select()
        .single();

      if (error) {
        throw error;
      }

      return res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      console.error(error);

      return res.status(500).json({
        success: false,
        message:
          "Failed to create campaign",
      });
    }
  };

const getCampaigns =
  async (req, res) => {
    try {
      const {
        data,
        error,
      } = await supabaseAdmin
        .from(
          "newsletter_campaigns"
        )
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

      if (error) {
        throw error;
      }

      return res.json(data);
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch campaigns",
      });
    }
  };

const getCampaignById =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const {
        data,
        error,
      } = await supabaseAdmin
        .from(
          "newsletter_campaigns"
        )
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        throw error;
      }

      return res.json(data);
    } catch (error) {
      return res.status(404).json({
        success: false,
        message:
          "Campaign not found",
      });
    }
  };

const updateCampaign =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const {
        title,
        subject,
        content,
      } = req.body;

      const {
        data,
        error,
      } = await supabaseAdmin
        .from(
          "newsletter_campaigns"
        )
        .update({
          title,
          subject,
          content,
          updated_at:
            new Date(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) {
        throw error;
      }

      return res.json({
        success: true,
        data,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to update campaign",
      });
    }
  };

const deleteCampaign =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const { error } =
        await supabaseAdmin
          .from(
            "newsletter_campaigns"
          )
          .delete()
          .eq("id", id);

      if (error) {
        throw error;
      }

      return res.json({
        success: true,
        message:
          "Campaign deleted",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to delete campaign",
      });
    }
  };

const sendCampaign =
  async (req, res) => {
    try {

      const { id } =
        req.params;

      // Ambil Campaign
      const {
        data: campaign,
        error: campaignError,
      } = await supabaseAdmin
        .from(
          "newsletter_campaigns"
        )
        .select("*")
        .eq("id", id)
        .single();

      if (
        campaignError ||
        !campaign
      ) {
        return res.status(404).json({
          success: false,
          message:
            "Campaign not found",
        });
      }

      // Ambil Subscriber Aktif
      const {
        data: subscribers,
        error: subscriberError,
      } = await supabaseAdmin
        .from(
          "newsletter_subscribers"
        )
        .select("*")
        .eq(
          "is_active",
          true
        );

      if (subscriberError) {
        throw subscriberError;
      }

      if (
        !subscribers ||
        subscribers.length === 0
      ) {
        return res.status(400).json({
          success: false,
          message:
            "No active subscribers found",
        });
      }

      // Update status menjadi sending
      await supabaseAdmin
        .from(
          "newsletter_campaigns"
        )
        .update({
          status: "sending",
        })
        .eq("id", id);

      let successCount = 0;
      let failedCount = 0;

      // Kirim email ke seluruh subscriber
      for (const subscriber of subscribers) {

        try {

          await resend.emails.send({

            from:
              "onboarding@resend.dev",

            to:
              subscriber.email,

            subject:
              campaign.subject,

            html:
              campaign.content,

          });

          successCount++;

        } catch (emailError) {

          failedCount++;

          console.error(
            `Failed sending to ${subscriber.email}:`,
            emailError.message
          );

        }

      }

      // Update hasil campaign
      await supabaseAdmin
        .from(
          "newsletter_campaigns"
        )
        .update({
          status:
            failedCount > 0
              ? "sent"
              : "sent",

          sent_at:
            new Date().toISOString(),

          total_recipients:
            subscribers.length,

          total_sent:
            successCount,
        })
        .eq("id", id);

      return res.json({
        success: true,
        message:
          "Campaign sent successfully",

        total_recipients:
          subscribers.length,

        total_sent:
          successCount,

        total_failed:
          failedCount,
      });

    } catch (error) {

      console.error(
        "Send Campaign Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          error.message ||
          "Failed to send campaign",
      });

    }
  };

module.exports = {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
  sendCampaign
};