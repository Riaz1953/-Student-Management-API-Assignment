import { Router } from "express";
import {
  deleteStudent,
  getAllStudent,
  getSingleStudent,
  registerStudent,
  updateStudent,
} from "../controllers/student.controller.js";

const router = Router();
router.route("/create-student").post(registerStudent);
router.route("/getAll-students").get(getAllStudent);
router.route("/get-student/:id").get(getSingleStudent);
router.route("/update-student/:id").put(updateStudent);
router.route("/delete-student/:id").delete(deleteStudent);
export default router;
