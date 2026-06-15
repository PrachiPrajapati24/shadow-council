const authService =
  require("../services/authService");

const register = async (
  req,
  res
) => {
  try {
    const {
      username,
      email,
      password,
    } = req.body;

    if (
      !username ||
      !email ||
      !password
    ) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "All fields are required",
        });
    }

    const user =
      await authService.registerUser(
        username,
        email,
        password
      );

    res.status(201).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const login = async (
  req,
  res
) => {
  try {
    const {
      email,
      password,
    } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({
          success: false,
          message:
            "Email and password are required",
        });
    }

    const user =
      await authService.loginUser(
        email,
        password
      );

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  register,
  login,
};