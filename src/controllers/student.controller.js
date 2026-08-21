import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { ApiError } from "../utils/ApiError.js";
import { Student } from "../models/student.schema.js";

const createStudent = asyncHandler(async (req, res) => {
  const { name, email, phone, age, course } = req.body;

  if (
    [name, email, phone, age].some(
      (field) =>
        field === undefined || field === null || String(field).trim() === "",
    ) ||
    !course ||
    !Array.isArray(course) ||
    course.length === 0
  ) {
    throw new ApiError(
      400,
      "All fields (name, email, phone, age, course) are required",
    );
  }

  const student = await Student.create({ name, email, phone, age, course });
  const createdStudent = await Student.findById(student._id);
  if (!createdStudent) {
    throw new ApiError(500, "Something went wrong while saving student");
  }
  return res
    .status(201)
    .json(new ApiResponse(200, createdStudent, "student created successfully"));
});

const getAllStudent = asyncHandler(async function (req, res) {
  const users = await Student.find();
  if (!users) {
    throw new ApiError(400, "failed to get user");
  }
  res
    .status(200)
    .json(new ApiResponse(200, users, "Fetched Student successfully"));
});

const getSingleStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const student = await Student.findById(id);
  if (!student) {
    throw new ApiError(400, "Failed to find student");
  }
  res
    .status(200)
    .json(new ApiResponse(200, student, "student fetched successfully"));
});

const updateStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { name, email, phone, age, course } = req.body;
  const student = await Student.findByIdAndUpdate(
    id,
    {
      $set: { name, email, phone, age, course },
    },
    { new: true, runValidators: true },
  );
  if (!student) {
    throw new ApiError(400, "can not fetched student");
  }
  res
    .status(200)
    .json(new ApiResponse(200, student, "Student update successfully"));
});

const deleteStudent = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deletedStudent = await Student.findByIdAndDelete(id);
  if (!deletedStudent) {
    throw new ApiError(400, "Failed to delete Student");
  }
  res
    .status(200)
    .json(new ApiResponse(200, deletedStudent, "Student deleted successfully"));
});
export {
  createStudent,
  getAllStudent,
  getSingleStudent,
  updateStudent,
  deleteStudent,
};
