import User from "../models/user.models.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

export const user = (req, res) => {
  res.json({
    message: "Api is working",
  });
};

// updateUser
export const updateUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can update only your account"));
  }

  try {
    // Check if password and passwordConfirmation match
    if (req.body.password && req.body.passwordConfirmation) {
      if (req.body.password !== req.body.passwordConfirmation) {
        return next(
          errorHandler(400, "Password confirmation does not match password")
        );
      }
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }

    // Create update object dynamically
    const updateData = {};
    if (req.body.username) updateData.username = req.body.username;
    if (req.body.email) updateData.email = req.body.email;
    if (req.body.password) updateData.password = req.body.password;
    if (req.body.profilePhoto) updateData.profilePhoto = req.body.profilePhoto;

    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: updateData },
      { new: true }
    );

    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
    next(error);
  }
};

export const deleteUser = async (req, res, next) => {
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can delete only your account!"));
  }
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted...");
  } catch (error) {
    next(error);
  }
};
