const { User } = require("../model");
const jwt = require("../util/jwt");
const { jwtSecret } = require("../config/config.default");

// Registration
exports.register = async (req, res, next) => {
  try {
    // 1. data verification

    // 2. save data to database
    let user = new User(req.body.user);
    await user.save();
    // 3. send response
    // 返回的user需要去掉密码：
    user = user.toJSON();
    delete user.password;
    res.status(201).json({
      user,
    });
  } catch (err) {
    next(err);
  }
};

// Authentication
exports.login = async (req, res, next) => {
  try {
    // 数据验证
    const user = req.user.toJSON();
    // 生成token
    const token = await jwt.sign(
      {
        userId: user._id,
      },
      jwtSecret,
      {
        expiresIn: 60 * 60 * 24,
      }
    );
    res.status(200).json({
      ...user,
      token,
    });
  } catch (err) {
    next(err);
  }
};

exports.getCurrUser = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (err) {
    next(err);
  }
};

exports.updateUser = async (req, res, next) => {
  try {
    res.send("update current user");
  } catch (err) {
    next(err);
  }
};
