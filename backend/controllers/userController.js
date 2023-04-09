import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

//@desc Auth user && get token
//@route  POST/api/users/login
//@access  Public

const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      Name: user.Name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

//@desc Register a new user
//@route  POST/api/users
//@access  Public

const registerUser = asyncHandler(async (req, res) => {
  const { Name, email, password } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    Name,
    email,
    password,
  });
  if (user) {
    res.status(201).json({
      _id: user._id,
      Name: user.Name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid data");
  }
});

//@desc GET user profile
//@route  GET/api/users/profile
//@access  Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.Name = req.body.Name || user.Name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();
    res.json({
      _id: user._id,
      Name: user.Name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc Upadate user profile
//@route  PUT/api/users/profile
//@access  Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    res.json({
      _id: user._id,
      Name: user.Name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc get all users
//@route  get/api/users
//@access  Private/Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.json(users);
});

const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }
  await User.deleteOne({ _id: user.id });
  res.json({ message: "User removed" });
});

//@desc get  user by id
//@route  get/api/users/:id
//@access  Private/Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

//@desc update user
//@route  PUT/api/users/:id
//@access  Private/Admin
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.Name = req.body.Name || user.Name;
    user.email = req.body.email || user.email;

    // check if isAdmin field exist in the request body and is not undefined
    if (req.body.isAdmin !== undefined) {
      user.isAdmin = req.body.isAdmin;
    }

    const updatedUser = await user.save();
    res.json({
      _id: user._id,
      Name: user.Name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

export {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserById,
  updateUser,
};
