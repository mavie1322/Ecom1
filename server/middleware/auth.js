import jwt from "jsonwebtoken";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    let decodedData = jwt.verify(token, process.env.SECRET);
    req.userId = decodedData?._id;
    next();
  } catch (error) {
    console.log(error);
  }
};

export default auth;