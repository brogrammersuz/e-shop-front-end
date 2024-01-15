export class Product {
  id: string;
  title: string;
  price: number;
  category: string;
  imgUrl: string;

  constructor(
    id: string,
    title: string,
    price: number,
    category: string,
    imgUrl: string
  ) {
    this.id = id;
    this.title = title;
    this.price = price;
    this.category = category;
    this.imgUrl = imgUrl;
  }
}
