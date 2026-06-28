const {
  supabaseAdmin,
} = require("../config/supabase");

exports.getUsers =
  async (req, res) => {

    try {

      const { data, error } =
        await supabaseAdmin
          .from("profiles")
          .select("*")
          .neq("role", "customer")
          .order(
            "created_at",
            {
              ascending: false,
            }
          );

      if (error) throw error;

      res.json(data);

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

exports.updateUser =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const {
        full_name,
        whatsapp,
        role,
      } = req.body;

      const { error } =
        await supabaseAdmin
          .from("profiles")
          .update({
            full_name,
            whatsapp,
            role,
          })
          .eq("id", id);

      if (error) throw error;

      res.json({
        success: true,
      });

    } catch (error) {

      res.status(500).json({
        message:
          error.message,
      });

    }

  };

  exports.createUser =
  async (req, res) => {

    try {

      const {
        email,
        password,
        full_name,
        whatsapp,
        role,
      } = req.body;

      const {
        data: authUser,
        error: authError,
      } =
        await supabaseAdmin
          .auth.admin.createUser({
            email,
            password,
            email_confirm: true,
          });

      if (authError)
        throw authError;

      const { error } =
        await supabaseAdmin
          .from("profiles")
          .insert([
            {
              id:
                authUser.user.id,
              email,
              full_name,
              whatsapp,
              role,
            },
          ]);

      if (error) throw error;

      res.json({
        success: true,
      });

    } catch (error) {

      console.error(error);

      res.status(500).json({
        message:
          error.message,
      });

    }

  };