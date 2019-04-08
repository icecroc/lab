import {Injectable} from '@angular/core'
import {OrderPosition, Position} from '../shared/interfaces'

@Injectable()
export class OrderService {

  public list: OrderPosition[] = []

  add(position: Position) {
    const orderPosition: OrderPosition = Object.assign({}, {
      name: position.name,
      content: position.content,
      _id: position._id
    })

    const candidate = this.list.find(p => p._id === orderPosition._id)

    if (candidate) {
      // Изменяем кол-во
      candidate.content = position.content
    } else {
      this.list.push(orderPosition)
    }
  }

  remove(orderPosition: OrderPosition) {
    const idx = this.list.findIndex(p => p._id === orderPosition._id)
    this.list.splice(idx, 1)
  }

  clear() {
    this.list = []
  }
}
