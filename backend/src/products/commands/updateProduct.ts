import {PrismaClient} from "@prisma/client";
import {Request, Response} from "express";
import {updateProductRequest} from "../dto/updateProductRequest";

const prisma = new PrismaClient();

export function updateProduct(
  req: Request<{id: number}, {}, updateProductRequest>,
  res: Response<{} | {error: string}>
) {
  try {
    prisma.product.update({
      where: {
        id: req.params.id,
      },
      data: {
        name: req.body.name,
        price: req.body.price,
        description: req.body.description,
        imageUrl: req.body.imageUrl,
        stock: req.body.stock,
      },
    });
    res.status(204).send();
    console.log(`Product with id ${req.params.id} updated`);
    prisma.$disconnect();
  } catch (error) {
    res
      .status(500)
      .json({error: "An error occurred while updating the product"});
    prisma.$disconnect();
  }
}
