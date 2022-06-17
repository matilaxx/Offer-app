const { ProfileUser } = require("../models");
const { User } = require("../models");

class ProfileController {
    static async getProfile(req, res, next){
        try {
            const userProfile = await ProfileUser.findAll({
                where: {
                    id: req.ProfileUser.id
                    },
                attributes: ['user_id','nama','kota','alamat','no_handphone','image_url'],
            })
            res.status(200).json(userProfile[0]);
            }catch(err){
                next(err)
            }
    }

    static async create(req, res, next) {
        try { 
            console.log(req.file)
            await ProfileUser.create({
                //user_id: User.id,
                //nama: req.body.nama,
                kota: req.body.kota,
                alamat: req.body.alamat,
                no_handphone: req.body.no_handphone,
                image_url: req.body.path
            })
            res.status(200).json({
                message:'Successfully create user'
            })
            }catch(err){
                next(err)
            }
    }

    static async update(req, res, next){
        try {
            const findId = await User.findOne({
                where: {
                    id: req.ProfileUser.id
                }
            })
            if (!findId){
                throw{
                    status : 404,
                    message : 'Id not found'
                }
            }else { 
                await ProfileUser.update({
                    kota: req.body.kota,
                    alamat: req.body.alamat,
                    no_handphone: req.body.no_handphone,
                    image_url: req.body.path
            }),{
                where: {
                    id: req.ProfileUser.id
                }
            }
            res.status(200).json({
                message: 'Successfully Update'
            })
        }
            } catch (err) {
                next(err);
            }
    }
}

module.exports = ProfileController