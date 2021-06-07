import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { OrderState, OrderStateEnum } from "src/app/models/order.model";
import { OrderService } from "../firebase/order.service/Order.service";
import { StaticDataService } from "../firebase/staticdata.service/staticdata.service";
import { IMenuService } from "./menu.interface";

@Injectable({
	providedIn: "root",
})
export class OrderMenuService implements IMenuService<OrderState> {
	menuItemsSubject!: BehaviorSubject<OrderState[]>;

	constructor(private orderService: OrderService, private staticDataService: StaticDataService) {
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
				type: OrderStateEnum.New,
				route: "create",
			},
			{
				amount: 3,
				type: OrderStateEnum.Accepted,
				route: "/accepted",
			},
			{
				amount: 3,
				type: OrderStateEnum.Cooking,
				route: "cooking",
			},
			{
				amount: 3,
				type: OrderStateEnum.ParcelReady,
				route: "parcelready",
			},
			{
				amount: 3,
				type: OrderStateEnum.Delivered,
				route: "delivered",
			},
			{
				amount: 3,
				type: OrderStateEnum.Completed,
				route: "completed",
			},
		];
	}
}
