const { ProfileUser, User } = require("../models");


class ProfileController {
    static async getProfile(req, res, next){
        try {
            const userProfile = await ProfileUser.findOne({
                where: {
                    user_id: req.user.id
                    },
                include : {
                    model: User
                }    
            })
            if (!userProfile) {
                throw {
                    status: 404,
                    message: 'User tidak ditemukan!'
                }
            } else {
                res.status(200).json(userProfile);
            }
            }catch(err){
                next(err)
            }
    }

    static async update(req, res, next){
        try {
            const updateProfileUser = await ProfileUser.update({
                nama: req.body.nama,
                kota: req.body.kota,
                alamat: req.body.alamat,
                no_handphone: req.body.no_handphone,
                image_url: req.file.path,
                    
            },
            {
            where: {
                user_id : req.user.id
            }  
        });
        // await User.update({
        //     nama: req.body.nama
        // })
        res.status(202).json({
            statusCode: "20",
            status: "Updated",
            message: "Successfully update profile",
            updateProfileUser
        })
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ProfileController