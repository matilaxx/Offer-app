const { ProfileUser } = require("../models");
// const { User } = require("../models");

class ProfileController {
    static async getProfile(req, res, next){
        try {
            const userProfile = await ProfileUser.findOne({
                where: {
                    id: req.ProfileUser.id
                    },
            })
            if (!userProfile) {
                throw {
                    status: 404,
                    message: 'Produk tidak ditemukan!'
                }
            } else {
                res.status(200).json(userProfile);
            }
            }catch(err){
                next(err)
            }
    }

    static async create(req, res, next) {
        try { 
            const createProfileUser = await ProfileUser.create({
                user_id: req.params.id,
                //nama: req.body.nama,
                kota: req.body.kota,
                alamat: req.body.alamat,
                no_handphone: req.body.no_handphone,
                image_url: req.file.path
            })
            res.status(200).json(createProfileUser)
            }catch(err){
                next(err)
            }
    }

    static async update(req, res, next){
        try {
                await ProfileUser.update(//req.body,
                    {kota: req.body.kota,
                    alamat: req.body.alamat,
                    no_handphone: req.body.no_handphone,
                    image_url: req.file.path
                },
                {
                where: {
                    id: req.params.id,
                    user_id: req.user.id
                }
            })
            res.status(200).json({
                message: 'Successfully Update'
            })
        } catch (err) {
            next(err);
        }
    }
}

module.exports = ProfileController