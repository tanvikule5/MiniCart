import prisma from "../config/prisma.js";

// Add Product to Favorites
export const addFavorite = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.userId;

    // Check if product exists
    const product = await prisma.product.findUnique({
      where: {
        id: productId
      }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    // Check if already favorited
    const existingFavorite = await prisma.favorite.findFirst({
      where: {
        userId,
        productId
      }
    });

    if (existingFavorite) {
      return res.status(400).json({
        success: false,
        message: "Product already added to favorites"
      });
    }

    // Add favorite
    const favorite = await prisma.favorite.create({
      data: {
        userId,
        productId
      }
    });

    return res.status(201).json({
      success: true,
      message: "Product added to favorites",
      favorite
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get My Favorites
export const getFavorites = async (req, res) => {
  try {
    const userId = req.user.userId;

    const favorites = await prisma.favorite.findMany({
      where: {
        userId
      },
      include: {
        product: {
          include: {
            category: true
          }
        }
      }
    });

    return res.status(200).json({
      success: true,
      count: favorites.length,
      favorites
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Remove Favorite
export const removeFavorite = async (req, res) => {
  try {
    const { productId } = req.params;
    const userId = req.user.userId;

    const favorite = await prisma.favorite.findFirst({
      where: {
        userId,
        productId
      }
    });

    if (!favorite) {
      return res.status(404).json({
        success: false,
        message: "Favorite not found"
      });
    }

    await prisma.favorite.delete({
      where: {
        id: favorite.id
      }
    });

    return res.status(200).json({
      success: true,
      message: "Product removed from favorites"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};