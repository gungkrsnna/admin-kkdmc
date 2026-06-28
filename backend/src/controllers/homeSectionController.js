const {
  supabaseAdmin
} = require("../config/supabase");

exports.getHomeSection =
async (req, res) => {

  try {

    const { key } =
      req.params;

    const {
      data,
      error,
    } =
      await supabaseAdmin
        .from("home_sections")
        .select("*")
        .eq(
          "section_key",
          key
        )
        .single();

    if (error)
      throw error;

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.getAllHomeSections =
async (req, res) => {

  try {

    const {
      data,
      error,
    } =
      await supabaseAdmin
        .from("home_sections")
        .select("*")
        .order(
          "sort_order",
          {
            ascending: true,
          }
        );

    if (error)
      throw error;

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.updateHomeSection =
async (req, res) => {

  try {

    const { key } =
      req.params;

    const {
      badge,
      title,
      description,
      image_url,
    } = req.body;

    const {
      data,
      error,
    } =
      await supabaseAdmin
        .from("home_sections")
        .update({
          badge,
          title,
          description,
          image_url,
          updated_at:
            new Date(),
        })
        .eq(
          "section_key",
          key
        )
        .select()
        .single();

    if (error)
      throw error;

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.getBenefits =
async (req, res) => {

  try {

    const {
      data,
      error
    } =
      await supabaseAdmin
        .from("home_benefits")
        .select("*")
        .eq(
          "is_active",
          true
        )
        .order(
          "sort_order"
        );

    if (error)
      throw error;

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message:
        error.message
    });

  }

};

exports.getAboutStatistics =
async (req, res) => {

  try {

    const {
      data,
      error
    } =
      await supabaseAdmin
        .from("about_statistics")
        .select("*")
        .eq("is_active", true)
        .order("sort_order");

    if (error)
      throw error;

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.getAboutClients =
async (req, res) => {

  try {

    const {
      data,
      error
    } =
      await supabaseAdmin
        .from("about_clients")
        .select("*")
        .eq(
          "is_active",
          true
        )
        .order(
          "sort_order"
        );

    if (error)
      throw error;

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.updateBenefit =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const {
      title,
      description,
      icon,
      sort_order,
      is_active,
    } = req.body;

    const {
      data,
      error,
    } =
      await supabaseAdmin
        .from("home_benefits")
        .update({
          title,
          description,
          icon,
          sort_order,
          is_active,
        })
        .eq("id", id)
        .select()
        .single();

    if (error)
      throw error;

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.updateAboutStatistic =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const {
      title,
      value,
      sort_order,
      is_active,
    } = req.body;

    const {
      data,
      error,
    } =
      await supabaseAdmin
        .from(
          "about_statistics"
        )
        .update({
          title,
          value,
          sort_order,
          is_active,
        })
        .eq("id", id)
        .select()
        .single();

    if (error)
      throw error;

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.createAboutClient =
async (req, res) => {

  try {

    const {
      name,
      image_url,
      description,
      sort_order,
      is_active,
    } = req.body;

    const {
      data,
      error,
    } =
      await supabaseAdmin
        .from("about_clients")
        .insert([
          {
            name,
            image_url,
            description,
            sort_order,
            is_active,
          },
        ])
        .select()
        .single();

    if (error)
      throw error;

    res.status(201).json(data);

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.updateAboutClient =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const {
      name,
      image_url,
      description,
      sort_order,
      is_active,
    } = req.body;

    const {
      data,
      error,
    } =
      await supabaseAdmin
        .from("about_clients")
        .update({
          name,
          image_url,
          description,
          sort_order,
          is_active,
        })
        .eq("id", id)
        .select()
        .single();

    if (error)
      throw error;

    res.json(data);

  } catch (error) {

    res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.deleteAboutClient =
async (req, res) => {

  try {

    const { id } =
      req.params;

    await supabaseAdmin
      .from("about_clients")
      .delete()
      .eq("id", id);

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