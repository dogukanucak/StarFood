import { Injectable } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { BehaviorSubject } from "rxjs";
import { OrderState, OrderType } from "src/app/models/order.model";
import { IMenuService } from "./menu.interface";

@Injectable({
	providedIn: "root",
})
export class OrderMenuService implements IMenuService<OrderState> {
	menuItemsSubject!: BehaviorSubject<OrderState[]>;

	constructor() {
		this.initMenuSubjects();
	}

	private initMenuSubjects(): void {
		this.menuItemsSubject = new BehaviorSubject(this.getOrderStatus());
	}

	private notifyItemUpdate(): void {
		this.menuItemsSubject.next(this.getOrderStatus());
	}

	private getOrderStatus(): OrderState[] {
		return [
			{
				amount: 0,
				type: OrderType.New,
				route: "create",
			},
			{
				amount: 3,
				type: OrderType.Accepted,
				route: "accepted",
			},
			{
				amount: 3,
				type: OrderType.Cooking,
				route: "cooking",
			},
			{
				amount: 3,
				type: OrderType.ParcelReady,
				route: "parcelready",
			},
			{
				amount: 3,
				type: OrderType.Delivered,
				route: "delivered",
			},
			{
				amount: 3,
				type: OrderType.Completed,
				route: "completed",
			},
		];
	}
}
