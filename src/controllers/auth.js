/* eslint-disable consistent-return */
const asyncHandler = require('../middleware/async');
const User = require('../models/User');
const ErrorResponse = require('../utils/errorResponse');

// Get token from model, create cookie, and send response
const sendTokenResponse = (user, statusCode, res) => {
  const token = user.generateSignedToken();
  const expiryDays = process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000;
  const options = {
    expires: new Date(Date.now() + expiryDays),
    httpOnly: true,
  };

  if (process.env.NODE_ENV === 'production') {
    options.secure = true;
  }

  res.status(statusCode).cookie('token', token, options).json({
    success: true,
    token,
  });
};

/**
 * @description Register new user
 * @route POST /api/v1/auth/register
 * @access Public
 */
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  const user = await User.create({
    name,
    email,
    password,
    role,
  });

  sendTokenResponse(user, 200, res);
});

/**
 * @description Login user
 * @route POST /api/v1/auth/login
 * @access Public
 */
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(
      new ErrorResponse('Please provide with email and password', 400),
    );
  }

  const user = await User.findOne({ email }).select('+password');
  if (!user) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  const isMatch = user.matchPassword(password);
  if (!isMatch) {
    return next(new ErrorResponse('Invalid credentials', 401));
  }

  sendTokenResponse(user, 200, res);
});

/**
 * @description Get current logged in user
 * @route GET /api/v1/auth/me
 * @access Private
 */
exports.getMyData = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  res.status(200).json({
    success: true,
    data: user,
  });
});
