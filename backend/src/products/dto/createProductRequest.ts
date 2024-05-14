export class createProductRequest {
  constructor(
    public imageUrl: string,
    public name: string,
    public price: number,
    public description: string,
    public stock: number
  ) {}
}
