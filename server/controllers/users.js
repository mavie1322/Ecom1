import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/usersMessage.js";

export const signInUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) res.status(404).send({ message: "User doesn't exist." });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExist.password
    );
    if (!isPasswordCorrect)
      res.status(400).send({ message: "Password is incorrect" });

    const token = jwt.sign(
      {
        email: isUserExist.email,
        id: isUserExist._id,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).send({ result: isUserExist, token });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const signUpUser = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const isUserExist = await User.findOne({ email });

    if (isUserExist) res.status(404).send({ message: "User already exists." });

    const hashedPassword = await bcrypt.hash(password, 12);

    const result = await User.create({
      first_name,
      last_name,
      email,
      password: hashedPassword,
      address: {
        street_address: "",
        flat_number: "",
        city: "",
        postcode: "",
        country: "",
      },
    });

    const token = jwt.sign(
      {
        email: result.email,
        id: result._id,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );

    res.status(200).send({ result, token });
  } catch (error) {
    console.log("error");
    res.status(500).send({ message: "Something went wrong" });
  }
};
