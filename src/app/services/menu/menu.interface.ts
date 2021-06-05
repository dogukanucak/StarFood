import { BehaviorSubject } from "rxjs";

export interface IMenuService<T> {
	menuItemsSubject: BehaviorSubject<Array<T>>;
}
