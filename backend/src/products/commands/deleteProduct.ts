import {PrismaClient} from "@prisma/client";
import {Request, Response} from "express";
const prisma = new PrismaClient();

export function deleteProduct(
  req: Request<{id: number}, {}, {}>,
  res: Response<{} | {error: string}>
) {
  try {
    prisma.product.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(204).send();
    console.log(`Product with id ${req.params.id} deleted`);
    prisma.$disconnect();
  } catch (error) {
    res
      .status(500)
      .json({error: "An error occurred while deleting the product"});
    prisma.$disconnect();
  }
}
