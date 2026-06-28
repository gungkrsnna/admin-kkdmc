const {
  supabaseAdmin,
} = require("../config/supabase");

const getFaqs =
  async (req, res) => {

    try {

      const {
        data,
        error,
      } = await supabaseAdmin
        .from("faqs")
        .select(`
          *,
          faq_categories(
            id,
            name
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
        success: false,
        message:
          error.message,
      });

    }

  };

const getFaqById =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const {
        data,
        error,
      } = await supabaseAdmin
        .from("faqs")
        .select("*")
        .eq("id", id)
        .single();

      if (error) throw error;

      res.json(data);

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };

const createFaq =
  async (req, res) => {

    try {

      const {
        category_id,
        question,
        answer,
      } = req.body;

      const {
        data,
        error,
      } = await supabaseAdmin
        .from("faqs")
        .insert([
          {
            category_id,
            question,
            answer,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      return res.status(201).json({
        success: true,
        data,
      });

    } catch (error) {

      return res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };

const updateFaq =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const {
        category_id,
        question,
        answer,
        sort_order,
        is_active,
      } = req.body;

      const {
        data,
        error,
      } = await supabaseAdmin
        .from("faqs")
        .update({
          category_id,
          question,
          answer,
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
        message:
          error.message,
      });

    }

  };

const deleteFaq =
  async (req, res) => {

    try {

      const { id } =
        req.params;

      const { error } =
        await supabaseAdmin
          .from("faqs")
          .delete()
          .eq("id", id);

      if (error) throw error;

      res.json({
        success: true,
      });

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };

const getPublicFaqs =
  async (req, res) => {

    try {

      const {
        data,
        error,
      } = await supabaseAdmin
        .from("faqs")
        .select(`
          *,
          faq_categories(
            id,
            name
          )
        `)
        .eq(
          "is_active",
          true
        )
        .order(
          "sort_order",
          {
            ascending: true,
          }
        );

      if (error) throw error;

      res.json(data);

    } catch (error) {

      res.status(500).json({
        success: false,
        message:
          error.message,
      });

    }

  };

module.exports = {
  getFaqs,
  getFaqById,
  createFaq,
  updateFaq,
  deleteFaq,
  getPublicFaqs,
};