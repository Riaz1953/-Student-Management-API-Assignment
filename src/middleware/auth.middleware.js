import jwt from "jsonwebtoken";
import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { User } from "../models/user.schema.js";

export const verifyJWT = asyncHandler(async (req, res, next) => {
  const token =
    req.cookie?.accessToken ||
    req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    throw new ApiError(401, "Un authorized request");
  }
  const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  const user = await User.findById(decodedToken?._id);
  if (!user) {
    throw new ApiError(400, "Invalid Access");
  }
  req.user = user;
  next();
});
