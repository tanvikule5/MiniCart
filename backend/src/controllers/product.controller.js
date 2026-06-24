import prisma from "../config/prisma.js";
//create product
export const createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      condition,
      status,
      type,
      sellingPrice,
      rentPrice,
      rentDuration,
      categoryId
    } = req.body;

    // Validation
    if (
      !title ||
      !description ||
      !condition ||
      !status ||
      !type ||
      !categoryId
    ) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided"
      });
    }

    const sellerId = req.user.userId;

    const product = await prisma.product.create({
      data: {
        title,
        description,
        condition,
        status,
        type,
        sellingPrice,
        rentPrice,
        rentDuration,
        sellerId,
        categoryId
      }
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
//getallproducts
  export const getAllProducts = async (req, res) => {
  try {
    const products = await prisma.product.findMany({
      include: {
  seller: {
    select: {
      id: true,
      name: true,
      email: true,
      phoneNumber: true,
      department: true,
      year: true,
      profileImage: true
    }
  },
  category: true
}
    });

    return res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
  };

  //getproductbyid
  export const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            email: true,
            phoneNumber: true,
            department: true,
            year: true,
            profileImage: true
          }
        },
        category: true
      }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    return res.status(200).json({
      success: true,
      product
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
//getMyProducts
export const getMyProducts = async (req, res) => {
  try {

    const sellerId = req.user.userId;

    const products = await prisma.product.findMany({
      where: {
        sellerId
      },
      include: {
        category: true
      }
    });

    return res.status(200).json({
      success: true,
      count: products.length,
      products
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message
    });

  }
};
//update product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find product
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Check ownership
    if (product.sellerId !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    // Update product
    const updatedProduct = await prisma.product.update({
      where: { id },
      data: req.body
    });

    return res.status(200).json({
      success: true,
      message: "Product updated successfully",
      updatedProduct
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};
//delete product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    // Find product
    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Check ownership
    if (product.sellerId !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    // Delete product
    await prisma.product.delete({
      where: { id }
    });

    return res.status(200).json({
      success: true,
      message: "Product deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};