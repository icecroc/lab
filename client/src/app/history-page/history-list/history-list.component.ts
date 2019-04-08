import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core'
import {Order} from '../../shared/interfaces'
import {MaterialInstance, MaterialService} from '../../shared/classes/material.service'
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/shared/services/orders.service';


@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {
  @Input() orders: Order[]
  @ViewChild('modal') modalRef: ElementRef

  constructor(private ordersService: OrdersService) {}

  oSub : Subscription
  selectedOrder: Order
  modal: MaterialInstance

  ngOnDestroy() {
    this.modal.destroy()
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  selectOrder(order: Order) {
    this.selectedOrder = order
    this.modal.open()
  }

  closeModal() {
    this.modal.close()
  }

  submit() {
    this.oSub = this.ordersService.updateOrder(this.selectedOrder._id, this.selectedOrder, "Архивная").subscribe(
      updatedOrder => {
        MaterialService.toast(`Заявка №${updatedOrder.order} была отправлена в Архив.`)
      },
      error => MaterialService.toast(error.error.message),
      () => {
        this.modal.close()
      }
    )

  }

}
