import express, { NextFunction, Request, Response } from "express"
import checkJwt from "../../middleware/authorization";
import userController from '../../controllers/user/index';
import { userModificationValidation, validateData } from "../../middleware/validators";

const router = express.Router();


router.get("/", (req, res) => {
  res.send({
    ok: true,
    message: "Hello from the Api Routes"
  });
});


router.get('/user', checkJwt, (req: Request, res: Response, next: NextFunction) => {
  userController.getUser(req, res, next);
});
router.put('/user', checkJwt, validateData(userModificationValidation()), (req: Request, res: Response, next: NextFunction) => {
  userController.modifyUser(req, res, next);
});




module.exports = router;