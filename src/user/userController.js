//model
import User from "./../../DB/Models/userModel.js";
import dotenv from "dotenv";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
dotenv.config();
export const signUp = async (req, res) => {
  try {
    //get data from user
    const { email, name, password, gender } = req.body;

    //hash password
    const cipher = bcrypt.hashSync(password, parseInt(process.env.SALT_ROUND));

    // solution two  find or create
    const [user, created] = await User.findOrCreate({
      where: { email },
      defaults: { email, password: cipher, name, gender },
    });
    if (!created) {
      return res.status(400).json({ message: "User already exist", user });
    } else
      return res.status(200).json({ message: "User created successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const isUserExist = await User.findOne({ where: { email } });
    if (!isUserExist)
      return res.status(400).json({ message: "invalid email or password" });
    const isPasswordExist = bcrypt.compareSync(password, isUserExist.password);
    if (!isPasswordExist)
      return res.status(400).json({ message: "invalid email or password" });

    const payload = { userId: isUserExist.id, email: isUserExist.email };
    const token = jwt.sign(payload, process.env.LOGIN_SECRET, {
      expiresIn: "1d",
    });
    const updateStatus = await User.update(
      { login_status: true },
      { where: { email } }
    );
    if (!updateStatus[0])
      return res
        .status(400)
        .json({ message: "invalid email or password", updateStatus });
    return res.status(200).json({ message: "login success", token });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};

export const logout = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.update(
      { login_status: false },
      { where: { email } }
    );
    if (!user[0])
      return res.status(404).json({ message: "user not found", user });
    return res.status(200).json({ message: "logout successfully" });
  } catch (error) {
    res.status(500).json({ message: "internal server error" });
  }
};
