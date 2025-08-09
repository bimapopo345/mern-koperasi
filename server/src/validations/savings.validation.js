import Joi from "joi";

const createSavingsSchema = Joi.object({
  installmentPeriod: Joi.number().integer().min(1).required().messages({
    "number.base": "Periode cicilan harus berupa angka",
    "number.integer": "Periode cicilan harus berupa bilangan bulat",
    "number.min": "Periode minimal 1 bulan",
    "any.required": "Periode cicilan wajib diisi",
  }),
  memberId: Joi.string().hex().length(24).required().messages({
    "string.base": "ID anggota harus berupa string",
    "string.hex": "ID anggota harus berupa hex string",
    "string.length": "ID anggota harus 24 karakter",
    "any.required": "ID anggota wajib diisi",
  }),
  productId: Joi.string().hex().length(24).required().messages({
    "string.base": "ID produk harus berupa string",
    "string.hex": "ID produk harus berupa hex string",
    "string.length": "ID produk harus 24 karakter",
    "any.required": "ID produk wajib diisi",
  }),
  amount: Joi.number().positive().required().messages({
    "number.base": "Jumlah simpanan harus berupa angka",
    "number.positive": "Jumlah simpanan harus positif",
    "any.required": "Jumlah simpanan wajib diisi",
  }),
  savingsDate: Joi.date().required().messages({
    "date.base": "Tanggal simpanan harus berupa tanggal yang valid",
    "any.required": "Tanggal simpanan wajib diisi",
  }),
  type: Joi.string().valid("Setoran", "Penarikan").default("Setoran").messages({
    "string.base": "Tipe harus berupa string",
    "any.only": "Tipe harus salah satu dari: Setoran, Penarikan",
  }),
  description: Joi.string().max(500).optional().messages({
    "string.base": "Deskripsi harus berupa string",
    "string.max": "Deskripsi maksimal 500 karakter",
  }),
});

const updateSavingsSchema = Joi.object({
  installmentPeriod: Joi.number().integer().min(1).optional().messages({
    "number.base": "Periode cicilan harus berupa angka",
    "number.integer": "Periode cicilan harus berupa bilangan bulat",
    "number.min": "Periode minimal 1 bulan",
  }),
  memberId: Joi.string().hex().length(24).optional().messages({
    "string.base": "ID anggota harus berupa string",
    "string.hex": "ID anggota harus berupa hex string",
    "string.length": "ID anggota harus 24 karakter",
  }),
  productId: Joi.string().hex().length(24).optional().messages({
    "string.base": "ID produk harus berupa string",
    "string.hex": "ID produk harus berupa hex string",
    "string.length": "ID produk harus 24 karakter",
  }),
  amount: Joi.number().positive().optional().messages({
    "number.base": "Jumlah simpanan harus berupa angka",
    "number.positive": "Jumlah simpanan harus positif",
  }),
  savingsDate: Joi.date().optional().messages({
    "date.base": "Tanggal simpanan harus berupa tanggal yang valid",
  }),
  type: Joi.string().valid("Setoran", "Penarikan").optional().messages({
    "string.base": "Tipe harus berupa string",
    "any.only": "Tipe harus salah satu dari: Setoran, Penarikan",
  }),
  status: Joi.string()
    .valid("Pending", "Approved", "Rejected")
    .optional()
    .messages({
      "string.base": "Status harus berupa string",
      "any.only": "Status harus salah satu dari: Pending, Approved, Rejected",
    }),
  description: Joi.string().max(500).optional().messages({
    "string.base": "Deskripsi harus berupa string",
    "string.max": "Deskripsi maksimal 500 karakter",
  }),
});

const querySavingsSchema = Joi.object({
  page: Joi.number().integer().min(1).default(1).messages({
    "number.base": "Halaman harus berupa angka",
    "number.integer": "Halaman harus berupa bilangan bulat",
    "number.min": "Halaman minimal 1",
  }),
  limit: Joi.number().integer().min(1).max(100).default(10).messages({
    "number.base": "Limit harus berupa angka",
    "number.integer": "Limit harus berupa bilangan bulat",
    "number.min": "Limit minimal 1",
    "number.max": "Limit maksimal 100",
  }),
  status: Joi.string()
    .valid("Pending", "Approved", "Rejected")
    .optional()
    .messages({
      "string.base": "Status harus berupa string",
      "any.only": "Status harus salah satu dari: Pending, Approved, Rejected",
    }),
  memberId: Joi.string().hex().length(24).optional().messages({
    "string.base": "ID anggota harus berupa string",
    "string.hex": "ID anggota harus berupa hex string",
    "string.length": "ID anggota harus 24 karakter",
  }),
});

export { createSavingsSchema, updateSavingsSchema, querySavingsSchema };
