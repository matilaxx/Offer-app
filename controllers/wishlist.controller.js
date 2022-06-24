const { Wishlist, Product } = require("../../models");

class WishlistController {
  static async add(req, res, next) {
    try {
      const product = await Product.findOne({
        where: {
          id: req.body.product_id,
        },
      });
      if (!product) {
        throw {
          status: 404,
          message: "Product not found",
        };
      } else {
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
          res.status(200).json({
            statusCode: "200",
            status: "Add wishlist",
            message: "Successfully add to wishlist",
          });
        }
      }
    } catch (err) {
      next(err);
    }
  }
}

module.exports = WishlistController;
