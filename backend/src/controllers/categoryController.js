const { supabaseAdmin } = require("../config/supabase");

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function generateUniqueSlug(title, excludeId = null) {
  const baseSlug = generateSlug(title);

  let slug = baseSlug;
  let counter = 1;

  while (true) {
    let query = supabaseAdmin
      .from("categories")
      .select("id")
      .eq("slug", slug);

    if (excludeId) {
      query = query.neq("id", excludeId);
    }

    const { data } = await query.maybeSingle();

    if (!data) {
      return slug;
    }

    slug = `${baseSlug}-${counter}`;
    counter++;
  }
}

exports.getCategories = async (req, res) => {
  try {

    const { data, error } =
      await supabaseAdmin
        .from("categories")
        .select(`
          *,
          sub_categories (
            id,
            title,
            slug
          )
        `)
        .eq("is_active", true)
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

exports.getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabaseAdmin
        .from("categories")
        .select("*")
        .eq("id", id)
        .single();

        if (error || !data) {
        return res.status(404).json({
            message: "Category not found",
        });
        }

    return res.json(data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const {
      title,
      icon,
      description,
      sort_order,
      is_active,
    } = req.body;

    if (!title?.trim()) {
    return res.status(400).json({
        message: "Title is required",
    });
    }

    if (!icon) {
    return res.status(400).json({
        message: "Icon is required",
    });
    }

    const slug = await generateUniqueSlug(title);

    const { data, error } = await supabaseAdmin
      .from("categories")
      .insert([
        {
          title,
          slug,
          icon,
            description: description || null,
            sort_order: sort_order ?? 0,
          is_active:
            is_active === undefined
                ? true
                : is_active,

        },
      ])
      .select()
      .single();

    if (error) throw error;

    return res.status(201).json(data);
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const {
      title,
      icon,
      description,
      sort_order,
      is_active,
    } = req.body;

    if (!title?.trim()) {
    return res.status(400).json({
        message: "Title is required",
    });
    }

    // Ambil data lama
    const { data: existingCategory, error: existingError } =
      await supabaseAdmin
        .from("categories")
        .select("*")
        .eq("id", id)
        .single();

    if (existingError || !existingCategory) {
    return res.status(404).json({
        message: "Category not found",
    });
    }

    let slug = existingCategory.slug;

    // Jika title berubah
    if (existingCategory.title !== title) {
      slug = await generateUniqueSlug(
        title,
        id
      );
    }

    const { data, error } = await supabaseAdmin
      .from("categories")
      .update({
        title,
        slug,
        icon,
        description,
        sort_order,
        is_active,
        updated_at: new Date().toISOString(),
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

exports.deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;

    const { data: existing } = await supabaseAdmin
        .from("categories")
        .select("id")
        .eq("id", id)
        .maybeSingle();

        if (!existing) {
        return res.status(404).json({
            message: "Category not found",
        });
        }

    const { error } = await supabaseAdmin
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) throw error;

    return res.json({
      success: true,
      message: "Category deleted",
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: error.message,
    });
  }
};