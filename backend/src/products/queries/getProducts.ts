import {PrismaClient} from "@prisma/client";
import {Request, Response} from "express";
import {ProductBriefDto} from "../dto/ProductBriefDto";

const prisma = new PrismaClient();

export function getProducts(
  req: Request<{}, {}, {}, {limit: string; offset: string}>,
  res: Response<ProductBriefDto[] | {error: string}>
) {
  const limit = parseInt(req.query.limit) || 10;
  const offset = parseInt(req.query.offset) || 0;

  prisma.product
    .findMany({
      take: limit,
      skip: offset,
      select: {
        id: true,
        imageUrl: true,
        name: true,
        price: true,
      },
    })
    .then((products) => {
      console.log(`Fetched ${products.length} products`);
      res.json(products);
    })
    .catch(() => {
      res
        .status(500)
        .json({error: "An error occurred while fetching products"});
    });
}
