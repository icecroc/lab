import {Component, OnInit} from '@angular/core'
import {ActivatedRoute, Params, Router, Route} from '@angular/router'
import {PositionsService} from '../../shared/services/positions.service'
import {Observable} from 'rxjs/index'
import {Position} from '../../shared/interfaces'
import {switchMap, map} from 'rxjs/operators'
import {OrderService} from '../order.service'
import {MaterialService} from '../../shared/classes/material.service'
import { CategoriesService } from 'src/app/shared/services/categories.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit {

  positions$: Observable<Position[]>
  myLink: string
  constructor(private route: ActivatedRoute,
              private positionsService: PositionsService,
              private order: OrderService,
              private router: Router,
              private categoriesService: CategoriesService) {
  }

  ngOnInit() {
    this.myLink = this.router.url
    this.myLink = this.myLink.substr(7)    
    this.categoriesService.getById(this.myLink).subscribe(
      (res) => localStorage.setItem('catName', res.name),
      (err) => console.log(err),
      () => console.log('done')
    )
    this.positions$ = this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            return this.positionsService.fetch(params['id'])
          }
        ),
        map(
          (positions: Position[]) => {
            return positions.map(position => {
              // position.content = ''
              return position
            })
          }
        )
      )
  }

  addToOrder(position: Position) {
    MaterialService.toast(`Добавлено ${position.name}`)
    // console.log(position.content)
    
    //console.log(position)
    this.order.add(position)
  }

}
