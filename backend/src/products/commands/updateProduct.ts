import {PrismaClient} from "@prisma/client";
import {Request, Response} from "express";
import {updateProductRequest} from "../dto/updateProductRequest";

const prisma = new PrismaClient();

export async function updateProduct(
  req: Request<{id: number}, {}, updateProductRequest>,
  res: Response<{} | {error: string}>
) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({error: "Invalid product id"});
      return;
    }

    await prisma.product.update({
      where: {
        id: id,
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
    await prisma.$disconnect();
  } catch (error) {
    res
      .status(500)
      .json({error: "An error occurred while updating the product: " + error});
    await prisma.$disconnect();
  }
}
