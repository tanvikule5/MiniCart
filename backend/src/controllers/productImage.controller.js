import prisma from "../config/prisma.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadProductImage = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }
    //ownership check 
    if (product.sellerId !== req.user.userId) {
  return res.status(403).json({
    success: false,
    message: "Unauthorized"
  });
}
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload an image"
      });
    }

    // Cloudinary uploadproductimage will come here
    const result = await new Promise((resolve, reject) => {
  const uploadStream = cloudinary.uploader.upload_stream(
    {
      folder: "minicart-products"
    },
    (error, result) => {
      if (error) {
        reject(error);
      } else {
        resolve(result);
      }
    }
  );

  streamifier
    .createReadStream(req.file.buffer)
    .pipe(uploadStream);
});
const image = await prisma.productImage.create({
  data: {
    imageUrl: result.secure_url,
    productId: id
  }
});
return res.status(201).json({
  success: true,
  message: "Image uploaded successfully",
  image
});
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

//getproductimagesapi
export const getProductImages = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id }
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found"
      });
    }

    //ownershipcheck

    if (product.sellerId !== req.user.userId) {
  return res.status(403).json({
    success: false,
    message: "Unauthorized"
  });
}
    const images = await prisma.productImage.findMany({
      where: {
        productId: id
      }
    });

    return res.status(200).json({
      success: true,
      count: images.length,
      images
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// delete product image api
export const deleteProductImage = async (req, res) => {
  try {
    const { imageId } = req.params;

    const image = await prisma.productImage.findUnique({
      where: {
        id: imageId
      },
      include: {
        product: true
      }
    });

    if (!image) {
      return res.status(404).json({
        success: false,
        message: "Image not found"
      });
    }

    // Ownership Check
    if (image.product.sellerId !== req.user.userId) {
      return res.status(403).json({
        success: false,
        message: "Unauthorized"
      });
    }

    await prisma.productImage.delete({
      where: {
        id: imageId
      }
    });

    return res.status(200).json({
      success: true,
      message: "Image deleted successfully"
    });

  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message
    });
  }
};