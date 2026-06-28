const {
  supabaseAdmin,
} = require("../config/supabase");

const getCategories =
  async (req, res) => {
    try {
      const {
        data,
        error,
      } = await supabaseAdmin
        .from("faq_categories")
        .select("*")
        .order("sort_order", {
          ascending: true,
        });

      if (error) throw error;

      res.json(data);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

const createCategory =
  async (req, res) => {
    try {
      const {
        name,
        sort_order,
      } = req.body;

      const slug = name
        .toLowerCase()
        .replaceAll(" ", "-");

      const {
        data,
        error,
      } = await supabaseAdmin
        .from("faq_categories")
        .insert([
          {
            name,
            slug,
            sort_order:
              sort_order || 0,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      res.status(201).json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

const updateCategory =
  async (req, res) => {
    try {
      const { id } = req.params;

      const {
        name,
        sort_order,
        is_active,
      } = req.body;

      const slug = name
        .toLowerCase()
        .replaceAll(" ", "-");

      const {
        data,
        error,
      } = await supabaseAdmin
        .from("faq_categories")
        .update({
          name,
          slug,
          sort_order,
          is_active,
          updated_at:
            new Date(),
        })
        .eq("id", id)
        .select()
        .single();

      if (error) throw error;

      res.json({
        success: true,
        data,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

const deleteCategory =
  async (req, res) => {
    try {
      const { id } = req.params;

      const { error } =
        await supabaseAdmin
          .from(
            "faq_categories"
          )
          .delete()
          .eq("id", id);

      if (error) throw error;

      res.json({
        success: true,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error.message,
      });
    }
  };

module.exports = {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
};