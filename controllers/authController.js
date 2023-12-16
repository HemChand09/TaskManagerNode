const catchAsync = require("../utils/catchAsyncHandler");
const User = require("../models/userModel");
const generateTokenHandler = require("../utils/token");
const { promisify } = require("util");
const { v4: uuidv4 } = require("uuid");
const AppError = require("../utils/appError");
const jwt = require("jsonwebtoken");

const signup = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    userId: uuidv4(),
  });
  const token = await generateTokenHandler(newUser.userId);
  if (!token) return next(new AppError("Invalid token", 400));
  res.status(201).json({
    status: "success",
    data: {
      newUser,
      token,
    },
  });
});

const signIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  if (!email || !password) {
    return next(new AppError("Please provide email and password!", 400));
  }
  const user = await User.findOne({ email }).select("+password");
  console.log(user);
  if (user === null || user === undefined)
    return next(new AppError("No User Found", 404));
  if (!(await user.correctPassword(password, user?.password))) {
    return next(new AppError("Incorrect email or password", 401));
  }
  const token = await generateTokenHandler(user?.userId);
  user.password = undefined;
  res.status(200).json({
    status: "success",
    token,
    user,
  });
});

const protect = catchAsync(async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }
  console.log(token, "decoded token");

  if (!token)
    return next(
      new AppError("You are not logged in! Please log in to get access.", 401)
    );

  const decoded = await promisify(jwt.verify)(token, process.env.SECRET_KEY);
  // const decoded = await jwt.verify(token,process.env.SECRET_KEY)

  const currentUser = await User.findOne({ userId: decoded.userId });
  console.log(currentUser, "currentUser ");
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to this token does no longer exist.",
        401
      )
    );
  }
  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
});

const restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.roles)) {
      return next(
        new AppError("You do not have permission to perform this action", 403)
      );
    }
    next();
  };
};
module.exports = { signup, signIn, protect, restrictTo };
