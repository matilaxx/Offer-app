const { User } = require("../models");

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

class AuthController {
  static async register(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        }
      })

      if(user){
        throw {
          status: 422,
          message: "Email already exists"
        }
      }

      await User.create({
        nama: req.body.nama,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 10),
      });

      res.status(201).json({
        message: "Successfuly create user",
      });
    } catch (error) {
      next(error)
    }
  }

  static async login(req, res, next) {
    try {
      const user = await User.findOne({
        where: {
          email: req.body.email,
        },
      });

      if (!user) {
        throw {
          status: 401,
          message: "Invalid email or password",
        };
      }

      if (bcrypt.compareSync(req.body.password, user.password)) {
        const token = jwt.sign(
          {
            id: user.id,
            email: user.email,
          },
          "secret"
        );

        res.status(200).json({ token });
      } else {
        throw {
          status: 401,
          message: "Invalid email or password",
        };
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = AuthController;
