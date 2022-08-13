import express, { NextFunction, Request, Response } from "express"
import { validateData, userPasswordModification, userValidation } from '../../middleware/validators/index';
import { userController } from "../../controllers";
import checkJwt from "../../middleware/authorization";
const router = express.Router();


router.get("/", (_req, res) => {
  res.json({
    ok: true,
    message: "Hello from the Auth Routes"
  });
});

router.post('/register', validateData(userValidation()), userController.registerUser);


router.post('/login', userController.loginUser);

router.put('/user', checkJwt, validateData(userPasswordModification()), (req: Request, res: Response, next: NextFunction) => {
  userController.modifyPassword(req, res, next);
});


module.exports = router;