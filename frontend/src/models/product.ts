export class Product {
  constructor(
    public id: number,
    public imageUrl: string,
    public name: string,
    public price: number,
    public description: string,
    public stock: number
  ) {}
}
