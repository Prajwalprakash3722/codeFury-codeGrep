import { ValidationChain, validationResult } from "express-validator"
import { userValidation, userModificationValidation, userPasswordModification } from "./user"
import express from 'express';

const validateData = (validations: ValidationChain[]) => {
  return async (req: express.Request, res: express.Response, next: express.NextFunction) => {

    /**
     * @description Running all Validations Parallelly
     */
    await Promise.all(validations.map(validation => validation.run(req)));

    const errors = validationResult(req);
    if (errors.isEmpty()) {
      return next();
    }

    res.status(400).json({ errors: errors.array() });
  };
};


export { validateData, userValidation, userModificationValidation, userPasswordModification };