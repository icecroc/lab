import { AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core'
import { Order} from '../../shared/interfaces'
import { MaterialInstance, MaterialService} from '../../shared/classes/material.service';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-answer-list',
  templateUrl: './answer-list.component.html',
  styleUrls: ['./answer-list.component.css']
})
export class AnswerListComponent implements OnDestroy, AfterViewInit {
  @Input() orders: Order[]
  @ViewChild('modal') modalRef: ElementRef

  oSub: Subscription
  selectedOrder: Order
  modal: MaterialInstance

  constructor(private ordersService: OrdersService) {}

  ngOnDestroy() {
    this.modal.destroy()
    if (this.oSub) {
      this.oSub.unsubscribe()
    }
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  selectOrder(order: Order) {
    this.selectedOrder = order
    this.modal.open()
  }

  closeModal() {
    console.log(this.selectedOrder)
    this.modal.close()
  }

  submit() {
    this.oSub = this.ordersService.updateOrder(this.selectedOrder._id, this.selectedOrder, "Закрыта").subscribe(
      updatedOrder => {
        MaterialService.toast(`Заявка №${updatedOrder.order} была закрыта.`)
      },
      error => MaterialService.toast(error.error.message),
      () => {
        this.modal.close()
      }
    )

  }
}