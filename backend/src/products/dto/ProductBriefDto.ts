export class ProductBriefDto {
  constructor(
    public id: number,
    public imageUrl: string,
    public name: string,
    public price: number
  ) {}
}
