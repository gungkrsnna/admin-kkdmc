const { supabaseAdmin } = require("../config/supabase");

exports.getOptionsByPackage =
  async (req, res) => {
    try {

      const { id } = req.params;

      const { data, error } =
        await supabaseAdmin
          .from("package_options")
          .select("*")
          .eq("package_id", id)
          .order("sort_order", {
            ascending: true,
          });

      if (error) throw error;

      return res.json(data);

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: error.message,
      });
    }
  };

exports.createOption =
  async (req, res) => {
    try {

      const { id } = req.params;

      const {
        name,
        price,
        is_default,
        sort_order,
        is_active,
      } = req.body;

      if (!name?.trim()) {
        return res.status(400).json({
          message:
            "Option name is required",
        });
      }

      if (!price) {
        return res.status(400).json({
          message:
            "Price is required",
        });
      }

      if (is_default) {
        await supabaseAdmin
          .from("package_options")
          .update({
            is_default: false,
          })
          .eq("package_id", id);
      }

      const { data, error } =
        await supabaseAdmin
          .from("package_options")
          .insert([
            {
              package_id: id,
              name,
              price,
              is_default:
                is_default || false,
              sort_order:
                sort_order || 0,
              is_active:
                is_active === undefined
                  ? true
                  : is_active,
            },
          ])
          .select()
          .single();

      if (error) throw error;

      return res.status(201).json(
        data
      );

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: error.message,
      });
    }
  };

exports.updateOption =
  async (req, res) => {
    try {

      const { id } = req.params;

      const {
        name,
        price,
        is_default,
        sort_order,
        is_active,
      } = req.body;

      const {
        data: existing,
      } = await supabaseAdmin
        .from("package_options")
        .select("*")
        .eq("id", id)
        .single();

      if (!existing) {
        return res.status(404).json({
          message:
            "Option not found",
        });
      }

      if (is_default) {
        await supabaseAdmin
          .from("package_options")
          .update({
            is_default: false,
          })
          .eq(
            "package_id",
            existing.package_id
          );
      }

      const { data, error } =
        await supabaseAdmin
          .from("package_options")
          .update({
            name,
            price,
            is_default,
            sort_order,
            is_active,
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

exports.deleteOption =
  async (req, res) => {
    try {

      const { id } = req.params;

      const { error } =
        await supabaseAdmin
          .from("package_options")
          .delete()
          .eq("id", id);

      if (error) throw error;

      return res.json({
        success: true,
      });

    } catch (error) {
      console.error(error);

      return res.status(500).json({
        message: error.message,
      });
    }
  };