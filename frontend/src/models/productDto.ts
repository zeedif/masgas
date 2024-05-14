export class ProductDto {
  constructor(
    public name: string,
    public price: number,
    public imageUrl: string,
    public description: string,
    public stock: number
  ) {}
}
