import { count } from "console";
import prisma from "../../config/db";
import { Request, Response } from "express";
const addToCart = async (req: Request, res: Response): Promise<void> => {
  try {
   
      const cartItem = {
      ...req.body
    };

  
    const cart = await prisma.cart.create({
      data: cartItem,
    });

    res.status(201).json({
      success: true,
      data: cart, 
      error: false,
      message: "Item added to cart successfully!", 
    });
  } catch (err:any) {
    res.status(500).json({
      success: false,
      error: true,
      message: err.message, 
    });
  }
};

const getCartItems = async (req: Request, res: Response) => {
    const {id} = req.params
  try {
      const cartItems = await prisma.cart.findMany({
        where: {
          user_id: `${id}`,
          order_id: null
        },
        include: {
          products: {
            select: {
              name: true,
              image: true,
              price: true,
              stock:true
            },
          },
        },
        orderBy: {
          created_at: "desc",
        },
      });
    res.status(200).json({
      success: true,
      data: cartItems,
      error: false,
      message: "Cart items fetched successfully!",
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: true,
      message: err.message,
    });
  }
};



const deleteCartItem = async (req: Request, res: Response): Promise<void> => {
  try {
      const {id} = req.params
      console.log(id);

    const cart = await prisma.cart.delete({
      where: {
        cart_id: `${id}`,
      },
    });

    res.status(200).json({
      success: true,
      error: false,
      message: "Item deleted successfully!", // Adjusted success message
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: true,
      message: err.message, // Return error message directly
    });
  }
};


const deleteCart = async (req: Request, res: Response): Promise<void> => {

    const { id } = req.params

  try {
      await prisma.cart.deleteMany({
        where: {
          user_id: `${id}`,
        },
      });

    res.status(200).json({
      success: true,
      error: false,
      message: "cart deleted successfully!", // Adjusted success message
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: true,
      message: err.message, // Return error message directly
    });
  }
};

const updateCartQuantity = async (req: Request, res: Response) => {
  const { id} = req.params;
  const { product_id, quantity } = req.body;

  console.log(id);
  try {
    const updatedCart = await prisma.cart.update({
      where: {
        cart_id: `${id}`,
      },
      data: {
        product_id: `${product_id}`,
        quantity: parseInt(`${quantity}`),
      },
    });

    res.status(200).json({
      data: updatedCart,
      success: true,
      error: false,
      message: "cart updated successfully!", // Adjusted success message
    });
  } catch (err: any) {
    res.status(500).json({
      
      success: false,
      error: true,
      message: err.message, // Return error message directly
    });
  }
};



const getCartCount = async (req: Request, res: Response): Promise<void> => {
  const { id } = req.params;

  try {
    const cartLength = await prisma.cart.count({
      where: {
        user_id: `${id}`,
        order_id:null
      },
      
    });

    res.status(200).json({
      count:cartLength,
      success: true,
      error: false,
    });
  } catch (err: any) {
    res.status(500).json({
      success: false,
      error: true,
      message: err.message, // Return error message directly
    });
  }
};

const isProductExistInCart = async (req:Request,res:Response) => {
  try {
   const {product_id,user_id}= req.query
  return res.status(200).json({
    data: await prisma.cart.count({
      where: {
        user_id: `${user_id}`,
        product_id: `${product_id}`
        }
      }),
      success: true,
      error: false,
    });
 } catch (error:any) {
  res.status(500).json({
      success: false,
      error: true,
      message: error.message, // Return error message directly
    });
 }
};



export {
  addToCart,
  getCartItems,
  deleteCartItem,
  deleteCart,
  updateCartQuantity,
  getCartCount,
  isProductExistInCart
};
