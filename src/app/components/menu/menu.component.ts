import { Component, OnDestroy, OnInit } from "@angular/core";
import { BehaviorSubject, Subscription } from "rxjs";
import { MenuActionItem } from "src/app/models/menu.model";
import { OrderState } from "src/app/models/order.model";
import { ActionMenuService } from "src/app/services/menu/actionmenu.service";
import { OrderMenuService } from "src/app/services/menu/ordermenu.service";
import { getOrderTypeResourceText } from "src/app/utilities/enum-resource.helper";

type OrderStateWithText = OrderState & {
	text?: string;
};

@Component({
	selector: "star-menu",
	templateUrl: "./menu.component.html",
	styleUrls: ["./menu.component.scss"],
})
export class MenuComponent implements OnInit, OnDestroy {
	activeOrderItemIndex = 0;
	menuSubscriptions: Subscription = new Subscription();
	actionMenuItems: BehaviorSubject<MenuActionItem[]> = new BehaviorSubject([] as MenuActionItem[]);
	orderMenuItems: BehaviorSubject<OrderStateWithText[]> = new BehaviorSubject([] as OrderStateWithText[]);
	constructor(private actionMenuService: ActionMenuService, private orderMenuService: OrderMenuService) {}

	ngOnInit(): void {
		this.connectToMenuServices();
	}

	ngOnDestroy(): void {
		this.menuSubscriptions.unsubscribe();
	}

	private connectToMenuServices(): void {
		this.connectToActionMenu();
		this.connectToOrderMenu();
	}

	private connectToActionMenu(): void {
		const actionMenuSubscription = this.actionMenuService.menuItemsSubject.subscribe((items) => {
			this.actionMenuItems.next(items);
		});
		this.menuSubscriptions.add(actionMenuSubscription);
	}

	private connectToOrderMenu(): void {
		const orderMenuSubscription = this.orderMenuService.menuItemsSubject.subscribe((items) => {
			const orderItems: OrderStateWithText[] = items.map((item: OrderStateWithText) => {
				item.text = getOrderTypeResourceText(item.type);
				return item;
			});
			this.orderMenuItems.next(orderItems);
		});
		this.menuSubscriptions.add(orderMenuSubscription);
	}
}
