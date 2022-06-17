const { Product } = require("../models");

class ProductController {
    static async daftarProduk (req, res, next) {
      try {
        const products = await Product.findAll({
          attributes: [
            'nama', 
            'deskripsi', 
            'harga',
            'image_url',
          ]
        })
        res.status(200).json(products);
      } catch(err) {
        next(err);
      }
    }
  
    static async getById (req, res, next) {
      try {
        const product = await Product.findOne({
          where: {
            id: req.params.id,
          }
        })
        if (!product) {
          throw {
            status: 404,
            message: 'Produk tidak ditemukan!'
          }
        } else {
          res.status(200).json(product);
        }
      } catch (err) {
        next(err)
      }
  
    }
    
    static async tambahProduk(req, res, next) {
      try {
        const createdProduct = await Product.create({
          nama: req.body.nama,
          deskripsi: req.body.deskripsi,
          harga: req.body.harga,
          image_url: req.body.image_url,
        })
        res.status(201).json(createdProduct)
      } catch (err) {
        next(err)
      }
    }
  };
  
  module.exports = ProductController;
  