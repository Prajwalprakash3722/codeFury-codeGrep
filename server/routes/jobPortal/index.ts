import Express from "express";
import {
  addJob,
  getAllJobs,
  getJob,
  registerApplicant,
  removeJob
} from "../../models/jobCRUD";

const router = Express.Router();

router.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "mongodb route correctly"
  });
});

router.post("/job", (_req, res) => {
  console.log(_req.body);
  addJob(_req.body.data)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.get("/job", (_req, res) => {
  getJob(_req.body.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.get("/jobs", (_req, res) => {
  getAllJobs()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.post("/applicant", (_req, res) => {
  registerApplicant(_req.body.data)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

router.delete("/job", (_req, res) => {
  removeJob(_req.body.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});

module.exports = router;
