import {AfterViewInit, Component, ElementRef, Input, OnDestroy, ViewChild} from '@angular/core'
import {Order} from '../../shared/interfaces'
import {MaterialInstance, MaterialService} from '../../shared/classes/material.service'
import { Subscription } from 'rxjs';
import { OrdersService } from 'src/app/shared/services/orders.service';
import { Router } from '@angular/router';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';


@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnDestroy, AfterViewInit {
  @Input() orders: Order[]
  @ViewChild('modal') modalRef: ElementRef

  constructor(private ordersService: OrdersService, private router: Router) {}

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

  delete() {
    const decision = window.confirm(`Вы уверены, что хотите удалить категорию "${this.selectedOrder.name}"`)

    if (decision) {
      this.ordersService.delete(this.selectedOrder._id)
        .subscribe(
          response => MaterialService.toast(response.message),
          error => MaterialService.toast(error.error.message),
          () => window.location.reload()
        )
    }
  }

}


/* 
delete(id: string): Observable<Message> {
    const perms = localStorage.getItem('perms')
    switch(perms) {
      case '1': {
        MaterialService.toast('Удалять может только Администратор')
        break;
      }
      case '2': {
        MaterialService.toast('Удалять может только Администратор')
        break;
      }
      case '3': {
        MaterialService.toast('Удалять может только Администратор')
        break;
      }
      case '4': {
        return this.http.delete<Message>(`/api/order/${id}`)
      }
    }    
  }
  */