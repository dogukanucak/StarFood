import { Component, OnInit } from "@angular/core";
import { Subject } from "rxjs";
import { Order } from "src/app/models/collection.model";
import { OrderService } from "src/app/services/firebase/order.service/Order.service";

@Component({
	selector: "star-acceptedorderpage",
	templateUrl: "./acceptedorder.page.component.html",
	styleUrls: ["./acceptedorder.page.component.scss"],
})
export class AcceptedOrderPageComponent implements OnInit {
	orderList: Subject<Order[]> = new Subject();

	constructor(private orderService: OrderService) {}
	ngOnInit(): void {
		this.orderService.getOrders().subscribe((orders) => {
			this.orderList.next(orders);
		});
	}
}
