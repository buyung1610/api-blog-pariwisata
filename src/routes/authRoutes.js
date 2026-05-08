const router = require("express").Router();
const authControllers = require("../controllers/authControllers");
const authValidator = require("../validators/authValidator");
const verifyToken = require("../middleware/verifyToken");
const validate = require("../middleware/validate");

router.post(
  "/register",
  authValidator.registerValidator,
  validate,
  authControllers.register,
);
router.post(
  "/login",
  authValidator.loginValidator,
  validate,
  authControllers.login,
);
router.post("/logout", verifyToken, authControllers.logout);

router.use(verifyToken);

router.get("/profile", authControllers.getProfile);
router.put(
  "/profile",
  authValidator.updateProfileValidator,
  validate,
  authControllers.updateProfile,
);

module.exports = router;
