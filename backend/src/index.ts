import express from "express";
import cors from "cors";

import {createProduct} from "./products/commands/createProduct";
import {updateProduct} from "./products/commands/updateProduct";
import {deleteProduct} from "./products/commands/deleteProduct";
import {getProducts} from "./products/queries/getProducts";
import {getProduct} from "./products/queries/getProduct";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

app.post("/products", createProduct);
app.get("/products", getProducts);
app.get("/products/:id", getProduct);
app.put("/products/:id", updateProduct);
app.delete("/products/:id", deleteProduct);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
