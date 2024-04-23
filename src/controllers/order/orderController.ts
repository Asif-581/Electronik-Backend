import prisma from "../../config/db";
import { Request, Response } from "express";


const createOrder = async (req: Request, res: Response) => {
  try {
    await prisma.$transaction(async (prisma) => {
      // Create the order
      const order = await prisma.orders.create({
        data: {
          user_id: req.body.user_id,
          address_info: req.body.address_info,
          payment_id: req.body.payment_id,
          email: req.body.email,
          status: "CREATED",
        },
      });

      // Extract the ID of the created order
      const orderId = order.id;

      // Fetch the cart items and update them with the order ID
      const cart = await prisma.cart.findMany({
        where: {
          cart_id: {
            in: req.body.cart_ids,
          },
        },
        include: {
          products: {
            select: {
              id: true,
              stock: true,
            },
          },
        },
      });

      const updateCartPromises = cart.map(async (c) => {
        await prisma.cart.update({
          where: { cart_id: c.cart_id },
          data: { order_id: orderId },
        });

        // Update the product stock
        const updatedStock = c.products.stock - c.quantity;
        await prisma.products.update({
          where: { id: c.products.id },
          data: { stock: updatedStock },
        });
      });

      await Promise.all(updateCartPromises);
    });

    res.status(201).json({
      error: false,
      success: true,
      message: "Order created successfully and cart updated.",
    });
  } catch (err: any) {
    res.status(400).json({
      message: "An error occurred while creating order: " + err.message,
      error: true,
      success: false,
    });
  }
};


const getAllOrders = async (req: Request, res: Response) => {
  try {
    const order = await prisma.orders.findMany({
      where: {
        user_id: `${req.params.userId}`,
      },
      include: {
        cart: {
          include: {
            products: {
              select: {
                name: true,
                image: true,
                colors: true,
                price:true
              }
            }
          }
        }
      },
      orderBy: {
        created_at: "desc",
      },
    });



    res.status(200).json({
      data: order,
      error: false,
      success: true,
      message: "order received sucessfully",
    });
  } catch (err: any) {
    console.log(err)
    res.status(400).json({
      message: err,
      error: true,
      success: true,
    });
  }
};
export { createOrder, getAllOrders };
