import {PrismaClient} from "@prisma/client";
import {Request, Response} from "express";
const prisma = new PrismaClient();

export async function deleteProduct(
  req: Request<{id: number}, {}, {}>,
  res: Response<{} | {error: string}>
) {
  try {
    const id = Number(req.params.id);
    if (isNaN(id)) {
      res.status(400).json({error: "Invalid product id"});
      return;
    }
    await prisma.product.delete({
      where: {
        id: id,
      },
    });
    res.status(204).send();
    await prisma.$disconnect();
  } catch (error) {
    res
      .status(500)
      .json({error: "An error occurred while deleting the product: " + error});
    await prisma.$disconnect();
  }
}
