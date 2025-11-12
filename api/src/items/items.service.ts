import { Injectable } from '@nestjs/common';
import { CreateItemRequest, GetItemRequest, Item, Items } from './items';
import { randomUUID } from 'node:crypto';
import { Observable, Subject } from 'rxjs';

@Injectable()
export class ItemsService {
  private readonly items: Item[] = [];
  private readonly itemsSubject = new Subject<Items>();

  createItem(request: CreateItemRequest): Item {
    const item: Item = {
      id: randomUUID(),
      ...request,
    };
    this.items.push(item);
    this.itemsSubject.next({
      items: [...this.items],
    });

    return item;
  }

  getItem(request: GetItemRequest): Item {
    return (
      this.items.find((item: Item) => item.id === request.id) || ({} as Item)
    );
  }

  streamItems(): Observable<Items> {
    return this.itemsSubject.asObservable();
  }
}
