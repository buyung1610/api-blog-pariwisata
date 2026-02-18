const router = require("express").Router();
const blogControllers = require("../controllers/blogControllers");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/upload");
const blogValidator = require("../validators/blogValidator");
const validate = require("../middleware/validate");

router.use(verifyToken);

router.get("/", blogValidator.getAll, validate, blogControllers.getAll);

router.get(
  "/user",
  blogValidator.getByUserId,
  validate,
  blogControllers.getByUserId,
);

router.get("/:id", blogValidator.getById, validate, blogControllers.getById);

router.post(
  "/create",
  upload.single("image"),
  blogValidator.create,
  validate,
  blogControllers.createBlog,
);

router.put(
  "/update/:id",
  blogValidator.update,
  validate,
  upload.single("image"),
  blogControllers.updateBlog,
);

router.delete("/delete/:id", blogControllers.deleteBlog);

module.exports = router;
