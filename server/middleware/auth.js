import jwt from "jsonwebtoken";

export const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData = jwt.verify(token, process.env.SECRET);
    console.log(decodedData, "auth");
    req.email = decodedData.email;
    req.userId = decodedData.id;
    // console.log(typeof req.userId);
    // console.log(req.email);
    next();
  } catch (error) {
    console.log(error);
  }
};
