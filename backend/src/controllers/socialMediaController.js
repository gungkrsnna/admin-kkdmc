const { supabaseAdmin } =
  require("../config/supabase");

exports.getSocialMedia =
  async (req, res) => {

    try {

      const { data, error } =
        await supabaseAdmin
          .from("social_media")
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

exports.getSocialMediaById =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const { data, error } =
        await supabaseAdmin
          .from("social_media")
          .select("*")
          .eq("id", id)
          .single();

      if (error || !data) {

        return res.status(404).json({
          message:
            "Social media not found",
        });

      }

      return res.json(data);

    } catch (error) {

      return res.status(500).json({
        message:
          error.message,
      });

    }

  };

exports.createSocialMedia =
  async (req, res) => {

    try {

      const {
        platform,
        label,
        value,
        is_active,
        sort_order,
      } = req.body;

      const { data, error } =
        await supabaseAdmin
          .from("social_media")
          .insert([
            {
              platform,
              label,
              value,
              is_active,
              sort_order,
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
        message:
          error.message,
      });

    }

  };

exports.updateSocialMedia =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const {
        platform,
        label,
        value,
        is_active,
        sort_order,
      } = req.body;

      const { data, error } =
        await supabaseAdmin
          .from("social_media")
          .update({
            platform,
            label,
            value,
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
        message:
          error.message,
      });

    }

  };

exports.deleteSocialMedia =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const { error } =
        await supabaseAdmin
          .from("social_media")
          .delete()
          .eq("id", id);

      if (error) throw error;

      return res.json({
        success: true,
      });

    } catch (error) {

      console.error(error);

      return res.status(500).json({
        message:
          error.message,
      });

    }

  };