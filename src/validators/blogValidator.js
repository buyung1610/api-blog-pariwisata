const { body } = require('express-validator');

const blogValidator = {
  create: [
    body('title')
      .notEmpty().withMessage('Judul wajib diisi')
      .isString().withMessage('Judul harus berupa teks')
      .isLength({ min: 5 }).withMessage('Judul minimal terdiri dari 5 karakter'),

    body('date')
      .notEmpty().withMessage('Tanggal wajib diisi')
      .isISO8601().withMessage('Format tanggal tidak valid (gunakan format ISO 8601, contoh: 2025-08-01)'),

    body('description')
      .notEmpty().withMessage('Deskripsi wajib diisi')      
      .isString().withMessage('Deskripsi harus berupa teks')
      .isLength({ min: 10 }).withMessage('Deskripsi minimal terdiri dari 10 karakter'),
  ],

  update: [
    body('title')
      .optional()
      .isString().withMessage('Judul harus berupa teks')
      .isLength({ min: 5 }).withMessage('Judul minimal terdiri dari 5 karakter'),

    body('date')
      .optional()
      .isISO8601().withMessage('Format tanggal tidak valid (gunakan format ISO 8601, contoh: 2025-08-01)'),

    body('description')
      .optional()
      .isString().withMessage('Deskripsi harus berupa teks')
      .isLength({ min: 10 }).withMessage('Deskripsi minimal terdiri dari 10 karakter'),
  ]
};

module.exports = blogValidator;