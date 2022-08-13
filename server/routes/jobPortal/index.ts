import Express from "express";
import { createUpdatedIdea } from "../../controllers/jobPortal/updateIdea";
import {
  addJob,
  getAllJobs,
  getJob,
  registerApplicant,
  removeJob,
  addStartUp,
  findStartUp,
  findAllStartUps,
  addIdea,
  findIdea,
  findAllIdeas,
  updateJob,
  updateIdea,
} from "../../models/jobCRUD";

const router = Express.Router();

router.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "mongodb route correctly"
  });
});

router.post("/job", (_req, res) => {
  //   console.log(_req.body);
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

router.post("/startup", (_req, res) => {
  addStartUp(_req.body.data)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});
router.get("/startups", (_req, res) => {
  findAllStartUps()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});
router.get("/startup", (_req, res) => {
  console.log(_req.query.clientID);
  
  findStartUp(_req.query.clientID as string)
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});


router.get("/idea", (_req, res) => {
  findIdea(_req.body.id)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});
router.get("/ideas", (_req, res) => {
  findAllIdeas()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});
router.post("/idea", (_req, res) => {
  addIdea(_req.body.data)
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(401).json(err);
    });
});
router.put("/idea", async(_req, res) => {
  const idea = await createUpdatedIdea(_req.body.data, _req.body.id);   //controller
  let newData = {
    threads: idea
  }
  updateIdea(_req.body.id, newData)
    .then((result) => {
      res.status(200).json(result);
    }).catch((err) => {
      res.status(401).json(err);
    }
    );
});



module.exports = router;
