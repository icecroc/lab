import {Component, OnInit} from '@angular/core'
import {CategoriesService} from '../../shared/services/categories.service'
import {Observable} from 'rxjs/index'
import {Category} from '../../shared/interfaces'
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.css']
})
export class OrderCategoriesComponent implements OnInit {

  categories$: Observable<Category[]>

  constructor(private categoriesService: CategoriesService,
              private router: Router) {
  }

  ngOnInit() {
    let url = this.router.url
    console.log(url)
    this.categories$ = this.categoriesService.fetch()
  }

}
