import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";



export const login = async (req, res) => {
 try {
  const { email, password } = req.body;
  const user = await User.findOne({ email }, "+password");
  if (!user) {return error };
  const isMatched = await bcrypt.compare(password, user.password);
  if (!isMatched) {return error}
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite:process.env.NODE_ENV=== "Development" ? "lax" : "none",
      secure:process.env.NODE_ENV === "Development" ? false : true
    })
    .json({
      success: true,
      message: `Welcome Back ${user.name}`,
    });
 } catch (error) {
  res.status(500).json({
    success: false,
    message: "Invalid Email Or Password",
  });
 }
};

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
  let user = await User.findOne({ email });
  if (user) { error }
  const hashedPassword = await bcrypt.hash(password, 10);
  user = await User.create({ name, email, password: hashedPassword });
  const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET);

  res
    .status(201)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000,
      sameSite:process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure:process.env.NODE_ENV === "Development" ? false : true
    })
    .json({
      success: true,
      message: "Registerd Sucessfully",
    });
  } catch (error) {return res.status(404).json({
    success: false,
    message: "User Already Exist",
  });
  }
};
export const getMyProfile = (req, res) => {
  res.status(200).json({
    success: true,
    user: req.user,
  });
};

export const logout = (req, res ) => {
  res
  .status(200)
  .cookie("token","", {
    expires: new Date(Date.now()),
    sameSite:process.env.NODE_ENV === "Development" ? "lax" : "none",
    secure:process.env.NODE_ENV === "Development" ? false : true})
  .json({
    success:true,
    user:req.user
});
};
