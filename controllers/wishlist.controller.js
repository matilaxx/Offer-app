const { Wishlist, Product } = require("../models");

class WishlistController {
    static async getWishlist (req, res, next){
        try {
            const wishlistAll = await Wishlist.findAll({
                include : {
                    model : Product
                }
            })
            // let sortedDataWishlist = wishlistAll.slice().sort((a, b) => b.id - a.id)
            res.status(200).json({
                statusCode: 200 ,
                status: "Get all",
                message: "Successfully get all wishlist"
                ,wishlistAll
            })
            }catch(err){
                next(err)
            }
    }
    static async add(req, res, next) {
        try {
            const wishlist = await Wishlist.findOne({
                where: {
                    product_id: req.body.product_id,
                    user_id: req.user.id,
                },
            });
            if (wishlist) {
                throw {
                    status: 400,
                    message: "Product already added to the wishlist",
                };
            } else {
                await Wishlist.create({
                    product_id: req.body.product_id,
                    user_id: req.user.id,
                });
                res.status(201).json({
                    statusCode: 201 ,
                    status: "Add wishlist",
                    message: "Successfully add to wishlist"
                });
            }
        } catch (err) {
            next(err);
        }
    }
    static async remove(req, res, next) {
        try {
            const findId = await Wishlist.findOne({
                where: {
                    id: req.params.id
                }
            })
            if (!findId){
                throw{
                    status : 404,
                    message : "Id not found"
                }
            }else { 
                await Wishlist.destroy({
                    where: {
                        id: req.params.id
                    }
                });
                res.status(200).json({
                    statusCode: 200,
                    status : "Delete Wishlist",
                    message: 'Succesfully delete data'
                });
            }
        }catch(err) {
            next(err)
        }
    }
}

module.exports = WishlistController