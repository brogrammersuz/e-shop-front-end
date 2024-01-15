import { Component, OnInit } from '@angular/core';
import { Product } from '@shopping/models/product';
import { ProductService } from '@shopping/services/product.service';
import { DataTableResource } from 'angular5-data-table';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit {
  products: Product[];
  tableResource: DataTableResource<Product>;
  items: Product[] = [];
  itemCount: number;

  constructor(private productService: ProductService) {}

  ngOnInit() {
    this.productService.getAllProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
        this.initializeTable(data);
      },
      error => console.log(error)
    );
  }

  private initializeTable(products: Product[]) {
    this.tableResource = new DataTableResource(products);

    this.tableResource.query({ offset: 0, limit: 10 }).then(items => {
      this.items = items;
    });

    this.tableResource.count().then(count => (this.itemCount = count));
  }

  reloadItems(params) {
    if (!this.tableResource) {
      return;
    }

    this.tableResource.query(params).then(items => {
      this.items = items;
    });
  }

  filter(query: string) {
    const filteredProducts = query
      ? this.products.filter(product =>
          product.title.toLowerCase().includes(query.toLowerCase())
        )
      : this.products;
    this.initializeTable(filteredProducts);
  }
}
