import { Component, Input, OnInit } from '@angular/core';
import { CategoryService } from '@shopping/services/category.service';

@Component({
  selector: 'app-product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {
  @Input('category') category;
  categories$;

  constructor(private categoryService: CategoryService) {
    this.categories$ = this.categoryService.getAllCategories();
  }

  ngOnInit() {}
}
