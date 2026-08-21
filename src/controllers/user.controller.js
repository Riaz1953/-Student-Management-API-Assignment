import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.schema.js";

const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (
    [name, email, password].some(
      (field) => !field || String(field).trim() === "",
    )
  ) {
    throw new ApiError(400, "All fields are required");
  }
  const user = await User.create({ name, email, password });
  if (!user._id) {
    throw new ApiError(400, "Failed to register user");
  }

  const createdUser = await User.findById(user._id).select("-password");
  res
    .status(201)
    .json(new ApiResponse(200, createdUser, "User registered successfully"));
});

const generateToken = async (userid) => {
  try {
    const user = await User.findById(userid);
    const accessToken = user.generateAccessToken();
    return accessToken;
  } catch (error) {
    throw new ApiError(
      500,
      "Something went wrong while generating access token",
    );
  }
};
const loginUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body;
  if (!(name || email)) {
    throw new ApiError(400, "username or email is required");
  }
  const user = await User.findOne({
    $or: [{ name }, { email }],
  });
  if (!user) {
    throw new ApiError(400, "Invalid user name or email ");
  }
  const isPasswordValid = await user.isPasswordCorrect(password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Invalid user Credential");
  }
  const accessToken = await generateToken(user._id);

  const loggedUser = await User.findById(user._id).select("-password");
  const option = {
    httpOnly: true,
    secure: true,
  };
  res
    .status(200)
    .cookie("accessToken", accessToken, option)
    .json(
      new ApiResponse(
        200,
        { user: loggedUser, accessToken },
        "user logged in successfully",
      ),
    );
});
export { registerUser, loginUser };
