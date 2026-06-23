import prisma from "../config/prisma.js";
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