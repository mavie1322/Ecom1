import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";
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
        const isItemExist = isUserExist.basket.find(
          (productSaved) =>
            productSaved.item_basket._id === item.item_basket._id
        );
        if (isItemExist) {
          isItemExist.quantity_ordered += item.quantity_ordered;
          if (isItemExist.quantity_ordered > 10)
            isItemExist.quantity_ordered = 10;
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
    return res.status(500).send({ message: "Something went wrong" });
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

export const updateBasket = async (req, res) => {
  const userId = req.userId;
  const email = req.email;

  try {
    const isUserExist = await User.findOne({ email });
    let updatedBasket;
    //delete an item from user basket
    if (req.body.hasOwnProperty("id")) {
      const { id } = req.body;
      const filteredBasket = isUserExist.basket.filter(
        (item) => item.item_basket._id !== id
      );
      isUserExist.basket = [...filteredBasket];
      updatedBasket = await User.findByIdAndUpdate(userId, isUserExist, {
        new: true,
      });
    } else if (req.body.hasOwnProperty("itemQuantity")) {
      //modify an item quantity in user basket
      const itemId = req.body.itemQuantity[1];
      const quantity = req.body.itemQuantity[0];
      const modifiedBasket = isUserExist.basket.map((item) => {
        if (item.item_basket._id === itemId) item.quantity_ordered = quantity;
        return item;
      });
      isUserExist.basket = [...modifiedBasket];
      updatedBasket = await User.findByIdAndUpdate(userId, isUserExist, {
        new: true,
      });
    } else if (req.body.hasOwnProperty("item")) {
      /*add an item in user basket:
      check if item is in the basket
      if true increase the quantity and quantity should not be more than 10
      else add it to the basket
      */
      const itemToAdd = req.body.item;
      const isItemExist = isUserExist.basket.find(
        (item) => item.item_basket._id === itemToAdd.item_basket._id
      );
      if (isItemExist) {
        isUserExist.basket = isUserExist.basket.map((item) => {
          if (
            item.item_basket._id === isItemExist.item_basket._id &&
            item.quantity_ordered < 10
          ) {
            item.quantity_ordered += itemToAdd.quantity_ordered;
          }
          return item;
        });
      } else {
        isUserExist.basket.push(itemToAdd);
      }
      updatedBasket = await User.findByIdAndUpdate(userId, isUserExist, {
        new: true,
      });
    }

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

export const editAddresses = async (req, res) => {
  const userId = req.userId;
  const email = req.email;

  try {
    const isUserExist = await User.findOne({ email });
    let updatedBasket;
    if (req.body.hasOwnProperty("billingAddress")) {
      isUserExist.address = { ...req.body.billingAddress };
      updatedBasket = await User.findByIdAndUpdate(userId, isUserExist, {
        new: true,
      });
    } else if (req.body.hasOwnProperty("deliveryAddress")) {
      isUserExist.delivery_address = { ...req.body.deliveryAddress };
      updatedBasket = await User.findByIdAndUpdate(userId, isUserExist, {
        new: true,
      });
    }

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

export const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const token = jwt.sign(
      {
        email: user.email,
        id: user._id,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.send({ result: user, token });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const deleteDeliveryAddress = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    const resetDeliveryAddress = {
      first_name: "",
      last_name: "",
      street_address: "",
      flat_number: "",
      city: "",
      postcode: "",
      country: "",
    };
    user.delivery_address = { ...resetDeliveryAddress };
    const updatedUser = await User.findByIdAndUpdate(id, user, { new: true });

    const token = jwt.sign(
      {
        email: updatedUser.email,
        id: updatedUser._id,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.send({ result: updatedUser, token });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const editUserInformation = async (req, res) => {
  const userId = req.userId;

  try {
    const user = await User.findById(userId);
    let updatedUser;
    //check if the request body has userInformation as property and update user profile
    if (req.body.hasOwnProperty("userInformation")) {
      const { userInformation } = req.body;
      user.first_name = userInformation.first_name;
      user.last_name = userInformation.last_name;
      user.address.postcode = userInformation.postcode;
      user.address.country = userInformation.country;
      updatedUser = await User.findByIdAndUpdate(userId, user, {
        new: true,
      });
    }
    //check request body has passwordEntries as property and change password
    else if (req.body.hasOwnProperty("passwordEntries")) {
      const { passwordEntries } = req.body;
      const isPasswordCorrect = await bcrypt.compare(
        passwordEntries.oldPassword,
        user.password
      );
      //send message if current password is invalid
      if (!isPasswordCorrect) {
        res.status(400).send({ message: "Current password is incorrect" });
      }
      //send message if password don't match
      if (passwordEntries.newPassword !== passwordEntries.confirmPassword) {
        res.status(400).send({ message: "Passwords don't match" });
      }
      //modify password
      const hashedPassword = await bcrypt.hash(passwordEntries.newPassword, 12);
      user.password = hashedPassword;
      updatedUser = await User.findByIdAndUpdate(userId, user, {
        new: true,
      });
    }
    const token = jwt.sign(
      {
        email: updatedUser.email,
        id: updatedUser._id,
      },
      process.env.SECRET,
      { expiresIn: "1h" }
    );
    res.send({ result: updatedUser, token });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};

export const deleteUserAccount = async (req, res) => {
  // console.log(req.userId, "we are inside the controller wooohaaa");
  const userId = req.userId;
  // console.log(req.params)
  try {
    if (!mongoose.Types.ObjectId.isValid(userId))
      return res.status(404).send("No user with that id");
    await User.findByIdAndRemove(userId);
    res.send({ message: "User deleted" });
  } catch (error) {
    res.status(500).send({ message: "Something went wrong" });
  }
};
