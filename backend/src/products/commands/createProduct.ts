import {PrismaClient} from "@prisma/client";
import {Request, Response} from "express";
import {createProductRequest} from "../dto/createProductRequest";

const prisma = new PrismaClient();

export async function createProduct(
  req: Request<{}, {}, createProductRequest>,
  res: Response<number | {error: string}>
) {
  try {
    const product = await prisma.product.create({
      data: {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        stock: req.body.stock,
      },
    });

    res.status(201).json(product.id);
    await prisma.$disconnect();
  } catch (error) {
    res
      .status(500)
      .json({error: "An error occurred while creating the product"});
    await prisma.$disconnect();
  }
}
