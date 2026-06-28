const {
  supabaseAdmin,
} = require("../config/supabase");

const subscribeNewsletter = async (
  req,
  res
) => {
  try {
    const {
      email,
      website,
    } = req.body;

    // Honeypot
    if (website) {
      return res.status(400).json({
        success: false,
        message: "Invalid request",
      });
    }

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const cleanEmail =
      email.trim().toLowerCase();

    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (
      !emailRegex.test(cleanEmail)
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Invalid email address",
      });
    }

    const { data: existing } =
      await supabaseAdmin
        .from("newsletter_subscribers")
        .select("id")
        .eq("email", cleanEmail)
        .single();

    if (existing) {
      return res.status(409).json({
        success: false,
        message:
          "Email already subscribed",
      });
    }

    const { error } =
      await supabaseAdmin
        .from(
          "newsletter_subscribers"
        )
        .insert([
          {
            email: cleanEmail,
            source: "website",
          },
        ]);

    if (error) {
      throw error;
    }

    return res.status(201).json({
      success: true,
      message:
        "Successfully subscribed",
    });
  } catch (error) {
    console.error(
      "Newsletter Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Failed to subscribe",
    });
  }
};

const getSubscribers =
  async (req, res) => {

    const { data, error } =
      await supabaseAdmin
        .from(
          "newsletter_subscribers"
        )
        .select("*")
        .order(
          "created_at",
          {
            ascending: false,
          }
        );

    if (error) {
      return res
        .status(500)
        .json({
          success: false,
          message:
            error.message,
        });
    }

    res.json(data);
  };

const exportSubscribers =
  async (req, res) => {
    try {
      const {
        data,
        error,
      } = await supabaseAdmin
        .from(
          "newsletter_subscribers"
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
          "Export failed",
      });
    }
  };

const deleteSubscriber =
  async (req, res) => {
    try {
      const { id } = req.params;

      const { error } =
        await supabaseAdmin
          .from(
            "newsletter_subscribers"
          )
          .delete()
          .eq("id", id);

      if (error) {
        throw error;
      }

      return res.json({
        success: true,
        message:
          "Subscriber deleted",
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message:
          "Failed to delete subscriber",
      });
    }
  };

const updateSubscriberStatus =
  async (req, res) => {
    try {
      const { id } = req.params;

      const { is_active } =
        req.body;

      const {
        data,
        error,
      } = await supabaseAdmin
        .from(
          "newsletter_subscribers"
        )
        .update({
          is_active,
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
          "Failed to update subscriber",
      });
    }
  };

const getSubscriberById = async (
  req,
  res
) => {
  try {
    const { id } = req.params;

    const {
      data,
      error,
    } = await supabaseAdmin
      .from(
        "newsletter_subscribers"
      )
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      return res.status(404).json({
        success: false,
        message:
          "Subscriber not found",
      });
    }

    return res.json(data);
  } catch (error) {
    return res.status(500).json({
      success: false,
      message:
        "Failed to fetch subscriber",
    });
  }
};

module.exports = {
  subscribeNewsletter,
  getSubscribers,
  getSubscriberById,
  updateSubscriberStatus,
  deleteSubscriber,
  exportSubscribers,
};