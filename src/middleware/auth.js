const jwt = require('jsonwebtoken');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');
const User = require('../models/User');

const extractToken = (headers) => {
  const { cookie, authorization } = headers;
  let token;
  if (cookie && cookie.startsWith('token')) {
    token = cookie.split('=')[1];
  } else if(
    authorization &&
    authorization.startsWith('Bearer')
  ) {
    token = authorization.split(' ')[1];
  }

  return token;
};

// Protect private routes
exports.protect = asyncHandler(async (req, res, next) => {
  const token = extractToken(req.headers);

  if (!token) {
    return next(new ErrorResponse('Not authorized to access route', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.id);

    next();
  } catch(e) {
    console.log(e.message);
    console.log(e.name);
    return next(new ErrorResponse('Not authorized to access route', 401));
  }
})

exports.authorize = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorResponse(
          `${req.user.role.toUpperCase()} role is unauthorized to access route`,
          403
        )
      );
    }
    next();
  }
}