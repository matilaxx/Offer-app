const { Product } = require("../models");
const { Op } = require("sequelize");

const { pagination } = require("../helpers/pagination.helper");

class ProductController {
  static async daftarProduk(req, res, next) {
    try {
      const where = {};

      if (req.user) {
        Object.assign(where, {
          seller_id: {
            [Op.ne]: req.user.id,
          },
        });
      }

      const { nama, deskripsi, categories } = req.query;
      const page = req.query.page ? parseInt(req.query.page) : 1;
      const per_page = req.query.per_page ? parseInt(req.query.per_page) : 1;

      if (nama) where.nama = { [Op.like]: `%${nama}%` };
      if (deskripsi) where.deskripsi = { [Op.substring]: deskripsi };

      if (req.query.page && req.query.per_page) {
        const { count, rows } = await Product.findAndCountAll({
          where,
          offset: (page - 1) * page,
          limit: per_page,
          distinct: true,
          order: [["createdAt", "ASC"]],
        });

        const result = pagination({
          data: rows,
          count,
          page,
          per_page,
        });

        res.status(200).json({
          statusCode: "200",
          status: "Success",
          message: "Successfully get product",
          products: result,
        });
      }

      const products = await Product.findAll({
        where,
        order: [["createdAt", "ASC"]],
      });

      res.status(200).json({
        statusCode: "200",
        status: "Success",
        message:
          nama || deskripsi
            ? "Successfully get product"
            : "Successfully get all products",
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
      // next(err);
      console.log(err)
    }
  }

  static async tambahProduk(req, res, next) {
    try {
      if (!Array.isArray(req.body.categories)) {
        req.body.categories = [req.body.categories];
      }

      const createdProduct = await Product.create({
        nama: req.body.nama,
        deskripsi: req.body.deskripsi,
        harga: req.body.harga,
        image_url: req.file.path,
        categories: req.body.categories,
        seller_id: req.user.id,
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
      if (!Array.isArray(req.body.categories)) {
        req.body.categories = [req.body.categories];
      }

      const seller = await Product.findOne({
        where: {
          seller_id: req.user.id,
        },
      });

      const product = await Product.findOne({
        where: {
          id: req.params.id,
        },
      });

      if (!seller) {
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
            seller_id: req.user.id,
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
          seller_id: req.user.id,
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
          seller_id: req.user.id,
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