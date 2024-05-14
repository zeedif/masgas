import {PrismaClient} from "@prisma/client";
import {Request, Response} from "express";
import {ProductDto} from "../dto/ProductDto";

const prisma = new PrismaClient();

export function getProduct(
  req: Request<{id: string}>,
  res: Response<ProductDto | {error: string}>
) {
  const id = Number(req.params.id);

  if (isNaN(id)) {
    res.status(400).send({error: "Invalid product ID"});
    return;
  }

  prisma.product
    .findUnique({
      where: {id: id},
    })
    .then((product) => {
      if (!product) {
        res.status(404).send({error: "Product not found"});
        prisma.$disconnect();
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
    })
    .catch((error) => {
      console.error(error);
      res
        .status(500)
        .send({error: "An error occurred while getting the product"});
      prisma.$disconnect();
    });
}
