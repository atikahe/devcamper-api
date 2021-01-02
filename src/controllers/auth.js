const asyncHandler = require('../middleware/async');
const User = require('../models/User')

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
    role
  })

  res.status(200).json({
    success: true,
    count: user.length,
    data: user
  })
})