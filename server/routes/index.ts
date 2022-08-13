import express from "express"

const router = express.Router();

router.use("/api", require("./api"));
router.use("/auth", require("./auth"));


router.get("/test", (_req, res) => {
  res.json({
    ok: true,
    message: "All routes are linked correctly"
  });
});

export default router;