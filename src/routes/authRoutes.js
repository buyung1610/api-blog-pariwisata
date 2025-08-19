const router = require('express').Router();
const authControllers = require('../controllers/authControllers');
const authValidator = require('../validators/authValidator');
const verifyToken = require('../middleware/verifyToken');

router.post('/register', authValidator.registerValidator, authControllers.register);
router.post('/login', authValidator.loginValidator, authControllers.login);
router.post('/logout', verifyToken, authControllers.logout);
router.get('/profile', verifyToken, authControllers.getProfile);

module.exports = router;