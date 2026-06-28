const { supabaseAdmin } =
require("../config/supabase");

exports.getInclusions =
async (req, res) => {

  try {

    const { id } = req.params;

    const { data, error } =
      await supabaseAdmin
        .from("package_inclusions")
        .select("*")
        .eq("package_id", id)
        .order("sort_order");

    if (error) throw error;

    return res.json(data);

  } catch (error) {

    return res.status(500).json({
      message: error.message,
    });

  }

};

exports.createInclusion =
async (req, res) => {

  try {

    const { id } = req.params;

    const {
      title,
      sort_order,
    } = req.body;

    const { data, error } =
      await supabaseAdmin
        .from("package_inclusions")
        .insert([
          {
            package_id: id,
            title,
            sort_order:
              sort_order || 0,
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

exports.updateInclusion =
async (req, res) => {

  try {

    const { id } = req.params;

    const {
      title,
      sort_order,
    } = req.body;

    const { data, error } =
      await supabaseAdmin
        .from("package_inclusions")
        .update({
          title,
          sort_order,
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

exports.deleteInclusion =
async (req, res) => {

  try {

    const { id } = req.params;

    await supabaseAdmin
      .from("package_inclusions")
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