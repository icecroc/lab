import {HttpClient, HttpParams} from '@angular/common/http'
import {Injectable} from '@angular/core'
import {Order} from '../interfaces'
import {Observable} from 'rxjs'
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { MaterialService } from '../classes/material.service';

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  constructor(private http: HttpClient) {
  }

  create(order: Order): Observable<Order> {
    return this.http.post<Order>('/api/order', order)
  }

  fetch(params: any = {}): Observable<Order[]> {
    return this.http.get<Order[]>('/api/order', {
      params: new HttpParams({
        fromObject: params
      })
    })
  }

  fetchClosed(params: any = {}): Observable<Order[]> {
    return this.http.get<Order[]>('api/order/closed', {
      params: new HttpParams({
        fromObject: params
      })
    })
  }

  fetchArchived(params: any = {}): Observable<Order[]> {
    return this.http.get<Order[]>('api/order/archived', {
      params: new HttpParams({
        fromObject: params
      })
    })
  }

  updateOrder(id:string , order: Order, status: string): Observable<Order> {
    return this.http.post<Order>(`/api/order/${id}`, {order ,status})
  }

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
}
