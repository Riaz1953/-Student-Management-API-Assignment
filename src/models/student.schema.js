import mongoose, { Schema } from "mongoose";

const studentSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is Required"],
      trim: true,
      lowercase: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: [true, "phone is required"],
    },
    age: {
      type: String,
      required: [true, "Age is required"],
    },
    course: {
      type: [String],
      required: [true, "At least one course required"],
    },
  },
  { timestamps: true },
);

export const Student = mongoose.model("Student", studentSchema);
