const { supabaseAdmin } =
require("../config/supabase");

function generateSlug(text) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

async function generateUniqueSlug(
  categoryId,
  title,
  excludeId = null
) {
  const baseSlug =
    generateSlug(title);

  let slug = baseSlug;
  let counter = 1;

  while (true) {

    let query =
      supabaseAdmin
        .from("sub_categories")
        .select("id")
        .eq(
          "category_id",
          categoryId
        )
        .eq(
          "slug",
          slug
        );

    if (excludeId) {
      query =
        query.neq(
          "id",
          excludeId
        );
    }

    const { data } =
      await query.maybeSingle();

    if (!data) {
      return slug;
    }

    slug =
      `${baseSlug}-${counter}`;

    counter++;
  }
}

exports.getSubCategories =
async (req, res) => {

  try {

    const { data, error } =
      await supabaseAdmin
        .from("sub_categories")
        .select(`
          *,
          category:categories(
            id,
            title
          )
        `)
        .order(
          "sort_order",
          {
            ascending: true,
          }
        );

    if (error) throw error;

    return res.json(data);

  } catch (error) {

    return res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.getSubCategoriesByCategory =
async (req, res) => {

  try {

    const { categoryId } =
      req.params;

    const { data, error } =
      await supabaseAdmin
        .from("sub_categories")
        .select("*")
        .eq(
          "category_id",
          categoryId
        )
        .order(
          "sort_order",
          {
            ascending: true,
          }
        );

    if (error) throw error;

    return res.json(data);

  } catch (error) {

    return res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.getSubCategoryById =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const { data, error } =
      await supabaseAdmin
        .from("sub_categories")
        .select(`
        *,
        category:categories(
            id,
            title,
            slug
        )
        `)
        .eq("id", id)
        .single();

    if (
      error ||
      !data
    ) {
      return res.status(404).json({
        message:
          "Sub category not found",
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

exports.createSubCategory =
async (req, res) => {

  try {

    const {
      category_id,
      title,
      description,
      sort_order,
      is_active,
    } = req.body;

    if (!category_id) {
      return res.status(400).json({
        message:
          "Category is required",
      });
    }

    if (!title?.trim()) {
      return res.status(400).json({
        message:
          "Title is required",
      });
    }

    const {
    data: category,
    error: categoryError,
    } = await supabaseAdmin
    .from("categories")
    .select("id")
    .eq("id", category_id)
    .single();

    if (categoryError || !category) {
    return res.status(404).json({
        message: "Category not found",
    });
    }

    const slug =
      await generateUniqueSlug(
        category_id,
        title
      );

    const {
      data,
      error,
    } =
      await supabaseAdmin
        .from(
          "sub_categories"
        )
        .insert([
          {
            category_id,
            title,
            slug,
            description,
            sort_order:
              sort_order ?? 0,
            is_active:
              is_active ??
              true,
          },
        ])
        .select()
        .single();

    if (error) throw error;

    return res
      .status(201)
      .json(data);

  } catch (error) {

    return res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.updateSubCategory =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const {
      category_id,
      title,
      description,
      sort_order,
      is_active,
    } = req.body;

    const {
      data: existing,
      error: existingError,
    } =
      await supabaseAdmin
        .from(
          "sub_categories"
        )
        .select("*")
        .eq("id", id)
        .single();

    if (
      existingError ||
      !existing
    ) {
      return res.status(404).json({
        message:
          "Sub category not found",
      });
    }

    const {
  data: category,
  error: categoryError,
} = await supabaseAdmin
  .from("categories")
  .select("id")
  .eq("id", category_id)
  .single();

if (categoryError || !category) {
  return res.status(404).json({
    message: "Category not found",
  });
}

    let slug =
      existing.slug;

    if (
  existing.title !== title ||
  existing.category_id !== category_id
) {
  slug =
    await generateUniqueSlug(
      category_id,
      title,
      id
    );
}

    const {
      data,
      error,
    } =
      await supabaseAdmin
        .from(
          "sub_categories"
        )
        .update({
          category_id,
          title,
          slug,
          description,
          sort_order,
          is_active,
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

    return res.status(500).json({
      message:
        error.message,
    });

  }

};

exports.deleteSubCategory =
async (req, res) => {

  try {

    const { id } =
      req.params;

    const {
    data: existing,
    } = await supabaseAdmin
    .from("sub_categories")
    .select("id")
    .eq("id", id)
    .maybeSingle();

    if (!existing) {
    return res.status(404).json({
        message:
        "Sub category not found",
    });
    }

    const { error } =
  await supabaseAdmin
    .from("sub_categories")
    .delete()
    .eq("id", id);


    if (error) throw error;

    return res.json({
      success: true,
      message:
        "Sub category deleted",
    });

  } catch (error) {

    return res.status(500).json({
      message:
        error.message,
    });

  }

};