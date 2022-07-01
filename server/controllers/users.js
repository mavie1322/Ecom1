import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/usersMessage.js";

export const signInUser = async (req, res) => {
  const { email, password, basket } = req.body;
  try {
    const isUserExist = await User.findOne({ email });
    if (!isUserExist) res.status(404).send({ message: "User doesn't exist." });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      isUserExist.password
    );

    if (!isPasswordCorrect)
      res.status(400).send({ message: "Password is incorrect" });

    //update user basket
    if (basket.length > 0) {
      basket.forEach((item) => {
        const isInUserProfile = isUserExist.basket.find(
          (productSaved) =>
            productSaved.item_basket._id === item.item_basket._id
        );
        if (isInUserProfile) {
          isInUserProfile.quantity_ordered += item.quantity_ordered;
        } else {
          isUserExist.basket.push(item);
        }
      });
    }
    const loggedInUser = await User.findByIdAndUpdate(
      isUserExist._id,
      isUserExist,
      {
        new: true,
      }
    );

    const token = jwt.sign(
      {
        email: loggedInUser.email,
        id: loggedInUser._id,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).send({ result: loggedInUser, token });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const signUpUser = async (req, res) => {
  const { first_name, last_name, email, password, basket } = req.body;

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
      basket,
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

export const addToBasket = async (req, res) => {
  const email = req.email;
  const id = req.userId;
  try {
    const profile = await User.findOne({ email });
    req.body.forEach((item) => {
      const existInBasketSample = profile.basket.find(
        (product) => product.item_basket._id === item.item_basket._id
      );
      if (existInBasketSample) {
        existInBasketSample.quantity_ordered += item.quantity_ordered;
      } else {
        profile.basket.push(item);
      }
    });
    const updatedBasket = await User.findByIdAndUpdate(id, profile, {
      new: true,
    });

    res.send(updatedBasket);
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const deleteProduct = (req, res) => {};

export const updateBasket = async (req, res) => {
  console.log("in controller in deleting");
  const userId = req.userId;
  const { id } = req.body;
  const email = req.email;

  try {
    const profile = await User.findOne({ email });
    const filteredBasket = profile.basket.filter(
      (item) => item.item_basket._id !== id
    );
    console.log(filteredBasket);
    profile.basket = [...filteredBasket];
    console.log(profile);
    const updatedBasket = await User.findByIdAndUpdate(userId, profile, {
      new: true,
    });
    console.log("succeed");
    const token = jwt.sign(
      {
        email: updatedBasket.email,
        id: updatedBasket._id,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.send({ result: updatedBasket, token });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};
