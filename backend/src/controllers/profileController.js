const { supabaseAdmin } = require("../config/supabase");

exports.getProfile = async (req, res) => {
  try {
    const { data: profile, error } =
      await supabaseAdmin
        .from("profiles")
        .select("*")
        .eq("id", req.user.id)
        .single();

    if (error) throw error;

    res.json({
      success: true,
      data: {
        ...profile,
        email: req.user.email,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};