import {AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core'
import {Router, NavigationEnd} from '@angular/router'
import {MaterialInstance, MaterialService} from '../shared/classes/material.service'
import {OrderService} from './order.service'
import {CategoriesService} from '../shared/services/categories.service'
import {Order, OrderPosition, Category} from '../shared/interfaces'
import {OrdersService} from '../shared/services/orders.service'
import {Subscription, Observable} from 'rxjs'
import {map} from 'rxjs/operators'
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [OrderService]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit {

  @ViewChild('modal') modalRef: ElementRef
  form: FormGroup
  modal: MaterialInstance
  oSub: Subscription
  catSub: Subscription
  isRoot: boolean
  pending = false
  link: string
  catName: string
  cat: Observable<Category>


  constructor(private router: Router,
              private order: OrderService,
              private ordersService: OrdersService,
              private categoriesService: CategoriesService) {
  }

  
  
  ngOnInit() {
    this.link = this.router.url
    console.log(this.link)
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order'
      }
    })
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required)
    })
  }

  ngOnDestroy() {
    this.modal.destroy()
    if (this.oSub) {
      this.oSub.unsubscribe()
    }
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition)
  }

  open() {
    this.modal.open()
  }

  cancel() {
    this.modal.close()
  }

  submit() {
    let lastValue: string
    lastValue = localStorage.getItem('catName')
    this.pending = true
    const order: Order = {
      name: `${lastValue} от ${this.form.value.name}`,
      orderStatus: "Открыта",
      list: this.order.list.map(item => {
        delete item._id
        return item
      })
    }

    this.oSub = this.ordersService.create(order).subscribe(
      newOrder => {
        MaterialService.toast(`Заказ №${newOrder.order} был добавлен.`)
        this.order.clear()
      },
      error => MaterialService.toast(error.error.message),
      () => {
        this.modal.close()
        this.pending = false
      }
    )
  }

}
