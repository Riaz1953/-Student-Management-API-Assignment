import { Router } from "express";
import { verifyJWT } from "../middleware/auth.middleware.js";
import {
  deleteStudent,
  getAllStudent,
  getSingleStudent,
  createStudent,
  updateStudent,
} from "../controllers/student.controller.js";

const router = Router();
router.route("/create-student").post(verifyJWT, createStudent);
// http://localhost:8000/api/v1/students/create-student

router.route("/getAll-students").get(verifyJWT, getAllStudent);
// http://localhost:8000/api/v1/students/getAll-students

router.route("/get-student/:id").get(verifyJWT, getSingleStudent);
// http://localhost:8000/api/v1/students/get-student/6a8737ee162a38cd6f543129

router.route("/update-student/:id").put(verifyJWT, updateStudent);
// http://localhost:8000/api/v1/students/update-student/6a8737ee162a38cd6f543129

router.route("/delete-student/:id").delete(verifyJWT, deleteStudent);
// http://localhost:8000/api/v1/students/delete-student/6a8737ee162a38cd6f543129
export default router;
