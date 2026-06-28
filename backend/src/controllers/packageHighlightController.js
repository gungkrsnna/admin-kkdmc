const { supabaseAdmin } =
require("../config/supabase");

exports.getHighlights =
async (req, res) => {

  try {

    const { id } = req.params;

    const { data, error } =
    await supabaseAdmin
      .from("package_highlights")
      .select("*")
      .eq("package_id", id);

    if (error) throw error;

    return res.json(data);

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};

exports.createHighlight =
async (req, res) => {

  try {

    const { id } = req.params;

    const { title } = req.body;

    if (!title?.trim()) {
      return res.status(400).json({
        message:
        "Highlight is required",
      });
    }

    const { data, error } =
    await supabaseAdmin
      .from("package_highlights")
      .insert([
        {
          package_id: id,
          title,
        },
      ])
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json(data);

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};

exports.updateHighlight =
async (req, res) => {

  try {

    const { id } = req.params;

    const { title } = req.body;

    const { data, error } =
    await supabaseAdmin
      .from("package_highlights")
      .update({
        title,
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

exports.deleteHighlight =
async (req, res) => {

  try {

    const { id } = req.params;

    await supabaseAdmin
      .from("package_highlights")
      .delete()
      .eq("id", id);

    return res.json({
      success: true,
    });

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};

