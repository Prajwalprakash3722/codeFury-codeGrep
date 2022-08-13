import { body } from "express-validator"
import express from 'express';

const userValidation = () => {
  return [
    // username must not be empty
    body('username').notEmpty(),
    // useremail must be an email and not empty
    body('useremail').isEmail({}).normalizeEmail().notEmpty(),
    // password must be at least 8 chars long and max 20, (should include at least one number, one uppercase and one lowercase letter) and not empty
    body('password').isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    }).notEmpty(),
  ]
}

const userModificationValidation = () => {
  return [
    // username must not be empty
    body('username').notEmpty(),
    // useremail must be an email and not empty
    body('useremail').isEmail({}).normalizeEmail().notEmpty(),
  ]
}

const userPasswordModification = () => {
  return [

    body('useremail').isEmail({}).normalizeEmail().notEmpty(),

    body('password').isStrongPassword({
      minLength: 8,
      minUppercase: 1,
      minLowercase: 1,
      minSymbols: 1,
      minNumbers: 1,
    }).notEmpty(),
  ]
}



export { userValidation, userModificationValidation, userPasswordModification };