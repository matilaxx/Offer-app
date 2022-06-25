const { Product } = require("../models");

const { Op } = require("sequelize");

class ProductController {
  static async daftarProduk(req, res, next) {
    try {
      const where = {};
      if (req.user) {
        Object.assign(where, {
          user_id: {
            [Op.ne]: req.user.id,
          },
        });
      }
      const products = await Product.findAll({
        attributes: [
          "id",
          "nama",
          "deskripsi",
          "harga",
          "image_url",
          "categories",
          "user_id",
          "createdAt",
          "updatedAt",
        ],
        where,
      });
      res.status(200).json({
        statusCode: "200",
        status: "Success",
        message: "Successfully get all products",
        products,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req, res, next) {
    try {
      const product = await Product.findOne({
        where: {
          id: req.params.id,
        },
      });
      if (!product) {
        throw {
          status: 404,
          message: "Product Not Found !",
        };
      } else {
        res.status(200).json({
          statusCode: "200",
          status: "Success",
          message: `Successfully get product by id ${req.params.id}`,
          product,
        });
      }
    } catch (err) {
      next(err);
    }
  }

  static async tambahProduk(req, res, next) {
    try {
      const createdProduct = await Product.create({
        nama: req.body.nama,
        deskripsi: req.body.deskripsi,
        harga: req.body.harga,
        image_url: req.file.path,
        categories: req.body.categories,
        user_id: req.user.id,
      });

      res.status(201).json({
        statusCode: "201",
        status: "Created",
        message: "Successfully create product",
        createdProduct,
      });
    } catch (err) {
      next(err);
    }
  }

  static async updateProduk(req, res, next) {
    try {
      const user = await Product.findOne({
        where: {
          user_id: req.user.id,
        },
      });

      const product = await Product.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!user) {
        throw {
          status: 401,
          message: "You dont have access for this product",
        };
      }

      if (!product) {
        throw {
          status: 404,
          message: "Product not found",
        };
      }

      const updatedProduct = await Product.update(
        {
          nama: req.body.nama,
          deskripsi: req.body.deskripsi,
          harga: req.body.harga,
          image_url: req.file.path,
          categories: req.body.categories,
        },
        {
          where: {
            id: req.params.id,
            user_id: req.user.id,
          },
          returning: true,
        }
      );
      const data = updatedProduct[1][0];

      res.status(200).json({
        statusCode: "200",
        status: "Updated",
        message: "Berhasil mengupdate produk",
        data,
      });
    } catch (err) {
      next(err);
    }
  }

  static async deleteProduk(req, res, next) {
    try {
      const user = await Product.findOne({
        where: {
          user_id: req.user.id,
        },
      });

      const product = await Product.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!user) {
        throw {
          status: 401,
          message: "You dont have access for this product",
        };
      }

      if (!product) {
        throw {
          status: 404,
          message: "Product not found",
        };
      }

      await Product.destroy({
        where: {
          id: req.params.id,
          user_id: req.user.id,
        },
      });
      res.status(200).json({
        statusCode: "200",
        status: "Delete",
        message: "Successfully delete product",
        product,
      });
    } catch (err) {
      next(err);
    }
  }
}

module.exports = ProductController;
