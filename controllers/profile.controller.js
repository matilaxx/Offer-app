const { ProfileUser, User } = require("../models");

class ProfileController {
  static async getProfile(req, res, next) {
    try {
      const userProfile = await ProfileUser.findOne({
        where: {
          user_id: req.user.id,
        },
        include: {
          model: User,
          attibutes : ['id','email','createdAt','updatedAt']
        },
      });
      {
        res.status(200).json({
          statusCode: "200",
          status: "Get Profile",
          message: "Successfully get profile",
          userProfile,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async update(req, res, next) {
    try {
      const updateProfileUser = await ProfileUser.update(
        {
          nama: req.body.nama,
          kota: req.body.kota,
          alamat: req.body.alamat,
          no_handphone: req.body.no_handphone,
          image_url: req.file.path,
        },
        {
          where: {
            user_id: req.user.id,
          },
        }
      );
      res.status(200).json({
        statusCode: "200",
        status: "Updated",
        message: "Successfully update profile",
        updateProfileUser,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProfileController;
