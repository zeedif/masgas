import {PrismaClient} from "@prisma/client";
import {Request, Response} from "express";
import {ProductDto} from "../dto/ProductDto";

const prisma = new PrismaClient();

export async function getProduct(
  req: Request<{id: string}>,
  res: Response<ProductDto | {error: string}>
) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).send({error: "Invalid product ID"});
    return;
  }

  try {
    const product = await prisma.product.findUnique({
      where: {id: id},
    });

    if (!product) {
      res.status(404).send({error: "Product not found"});
      await prisma.$disconnect();
      return;
    }

    const productDto: ProductDto = {
      id: product.id,
      name: product.name,
      price: product.price,
      description: product.description,
      imageUrl: product.imageUrl,
      stock: product.stock,
    };

    res.send(productDto);
    await prisma.$disconnect();
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({error: "An error occurred while getting the product"});
    await prisma.$disconnect();
  }
}
