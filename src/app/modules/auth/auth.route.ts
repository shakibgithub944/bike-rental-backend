import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { loginUserValidationSchema } from "../auth/auth.validation";
import { createUserValidationSchema } from "../user/user.validation";
import { AuthControllers } from "./auth.controller";

const router = express.Router();

router.post(
  "/signup",
  validateRequest(createUserValidationSchema),
  AuthControllers.registerUser
);

router.post(
  "/login",
  validateRequest(loginUserValidationSchema),
  AuthControllers.loginUser
);

export const AuthRoutes = router;
