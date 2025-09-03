const router = require("express").Router();
const blogControllers = require("../controllers/blogControllers");
const verifyToken = require("../middleware/verifyToken");
const upload = require("../middleware/upload");
const blogValidator = require("../validators/blogValidator");

// router.use(verifyToken);

router.get("/", blogControllers.getAll);
router.get("/user", blogControllers.getByUserId);
router.get("/:id", blogControllers.getById);
router.post("/create", upload.single("image"), blogValidator.create, blogControllers.createBlog);
router.put("/update/:id", blogValidator.update, upload.single("image"), blogControllers.updateBlog);
router.delete("/delete/:id", blogControllers.deleteBlog)

module.exports = router;
