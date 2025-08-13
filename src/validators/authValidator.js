const { body } = require('express-validator');

const authValidator = {
  registerValidator: [
    body('name')
      .isString().withMessage('Name harus berupa teks')
      .notEmpty().withMessage('Name wajib diisi')
      .isLength({ min: 3 }).withMessage('Name minimal 3 karakter'),

    body('username')
      .isString().withMessage('Username harus berupa teks')
      .notEmpty().withMessage('Username wajib diisi')
      .isAlphanumeric().withMessage('Username hanya boleh huruf dan angka'),

    body('password')
      .isString().withMessage('Password harus berupa teks')
      .notEmpty().withMessage('Password wajib diisi')
      .isLength({ min: 6 }).withMessage('Password minimal 6 karakter')
  ],

  loginValidator: [
    body('username')
      .isString().withMessage('Username harus berupa teks')
      .notEmpty().withMessage('Username wajib diisi'),

    body('password')
      .isString().withMessage('Password harus berupa teks')
      .notEmpty().withMessage('Password wajib diisi'),
  ],
};


module.exports = authValidator;
