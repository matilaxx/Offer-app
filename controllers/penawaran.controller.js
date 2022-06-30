const { Penawaran,Product} = require("../models")
const { getById } = require ("./product.controller")


class PenawaranController{
    static async Offer(req,res,next) {
      try{
        const product = await Product.findOne({
            where: {
              id: req.params.id,
            },
          });
        if(!product){
          throw{
            status: 404,
            message: "Produk not Found"
          };
        }
        const harga = await Penawaran.create({
          harga : req.body.harga,
          productId: req.params.id,
          buyerId: req.user.id,
          
        });
        res.status(201).json({
          status: 201,
          message: "Penawaranmu berhasil dikirim",
          harga,
        });
      }catch (err){
        next (err);
      }
    }

    static async getDetailOffer(req, res, next) {
      try {
        const offer = await Penawaran.findOne({
          where: {
            id: req.params.id,
          },
        });
        if (!offer) {
          throw {
            status: 404,
            message: "Offer Not Found !",
          };
        } else {
          res.status(200).json({
            status: 200,
            message: `Successfully get offer by id ${req.params.id}`,
            offer,
          });
        }
      } catch (err) {
        next(err);
        // console.log(err)
      }
    }

    static async transaksi(req,res,next) {
      try{
        const offerProduct = await Penawaran.findOne({ 
         where :{id: req.params.penawaranId}
        });
        if (!offerProduct){
          throw {
            status: 404,
            message: "Penawaran not Found"
          }
        }
        
        // if (Penawaran.productId !== req.params.productId) {
        //   throw {
        //     status: 401,
        //     message: "Produk not found",
        //   };
        // }
        await Penawaran.update(
          { agreement: false},
          {  where: {productId: req.params.productId}},
          )

        await Penawaran.update(
        { agreement: true},
        {  where: {id: req.params.penawaranId}},
        )

        await Product.update({
          sold: true,
        },
        {where: {id: req.params.productId}})
        
        const updatedOfferProduct = await Penawaran.findOne({ 
          where :{id: req.params.penawaranId}
         });
        res.status(200).json({
          status: 200,
          message: "Penawaran diterima",
          data:updatedOfferProduct
        });



      }
    catch (err){
      console.log(err)
      // next (err)
    }
  }
  }

  module.exports = PenawaranController;