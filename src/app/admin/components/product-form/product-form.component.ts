import { MinPriceValidators } from '@admin/validators/min-price.validators';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryService } from '@shopping/services/category.service';
import { ProductService } from '@shopping/services/product.service';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {
  categories$: Observable<any>;
  selectedFile = null;
  imageUrl = '';
  id;
  oldProductImage = '';

  form = new FormGroup({
    title: new FormControl('', Validators.required),
    price: new FormControl('', [
      Validators.required,
      MinPriceValidators.minPrice
    ]),
    category: new FormControl('', Validators.required),
    image: new FormControl('', Validators.required)
  });

  constructor(
    private catergoryService: CategoryService,
    private productService: ProductService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.categories$ = this.catergoryService.getAllCategories();
    this.id = this.route.snapshot.paramMap.get('id');

    if (this.id) {
      this.productService.getOneProductById(+this.id).subscribe(
        data => {
          this.imageUrl = data['imageUrl'];
          this.oldProductImage = data['imageUrl'];
          this.form = new FormGroup({
            title: new FormControl(data['title'], Validators.required),
            price: new FormControl(data['price'], [
              Validators.required,
              MinPriceValidators.minPrice
            ]),
            category: new FormControl(data['category'], Validators.required),
            image: new FormControl('', [])
          });
        },
        error => {
          console.log(error);
        }
      );
    }

  }

  get title() {
    return this.form.get('title');
  }

  get price() {
    return this.form.get('price');
  }

  get category() {
    return this.form.get('category');
  }

  get image() {
    return this.form.get('image');
  }

  onFileSelected(event) {
    if (event.target.files.length > 0) {
      this.selectedFile = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (event1: any) => {
        this.imageUrl = event1.target.result;
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      this.imageUrl = this.oldProductImage || '';
    }
  }

  addProduct() {
    this.id = this.route.snapshot.paramMap.get('id');
    const data = new FormData();
    if (this.selectedFile) {
      data.append('file', this.selectedFile, this.selectedFile.name);
    }
    data.append('title', this.title.value);
    data.append('price', this.price.value);
    data.append('categoryId', this.category.value);

    if (this.id) {
      this.productService.updateProduct(this.id, data).subscribe(
        result => {
          this.router.navigate(['/admin/products']);
        },
        error => {
          console.log(error);
        }
      );
    } else {
      this.productService.createProduct(data).subscribe(
        returnedData => {
          this.router.navigate(['/admin/products']);
        },
        error => console.log(error)
      );
    }
  }

  deleteProduct() {
    this.productService.deleteProduct(this.id).subscribe(
      data => {
        this.router.navigate(['/admin/products']);
      },
      error => console.log(error)
    );
  }
}
