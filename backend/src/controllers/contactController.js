const {
  supabaseAdmin,
} = require("../config/supabase");

exports.createContactMessage =
  async (req, res) => {

    try {

      const {
        full_name,
        email,
        message,
        website,
      } = req.body;

      // Honeypot anti spam
      if (website) {

        return res.json({
          success: true,
        });

      }

      if (
        !full_name ||
        !email ||
        !message
      ) {

        return res
          .status(400)
          .json({
            message:
              "All fields are required",
          });

      }

      const { error } =
        await supabaseAdmin
          .from(
            "contact_messages"
          )
          .insert([
            {
              full_name,
              email,
              message,
            },
          ]);

      if (error) throw error;

      return res.json({
        success: true,
        message:
          "Message sent successfully",
      });

    } catch (error) {

      console.error(error);

      return res
        .status(500)
        .json({
          message:
            error.message,
        });

    }

  };

exports.getContactMessages =
  async (req, res) => {

    try {

      const { data, error } =
        await supabaseAdmin
          .from(
            "contact_messages"
          )
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

      console.error(error);

      return res
        .status(500)
        .json({
          message:
            error.message,
        });

    }

  };