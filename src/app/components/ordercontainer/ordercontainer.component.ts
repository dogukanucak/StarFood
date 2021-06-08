import { Component, Input, OnInit } from "@angular/core";
import { Order } from "src/app/models/collection.model";
import { TransferTypeEnum } from "src/app/models/order.model";

const TAKEAWAY_CLASS = "badge--takeaway";
const DELIVERY_CLASS = "badge--delivery";

@Component({
	selector: "star-ordercontainer",
	templateUrl: "./ordercontainer.component.html",
	styleUrls: ["./ordercontainer.component.scss"],
})
export class OrderContainerComponent {
	@Input() order!: Order;

	getTransferText(): string {
		return TransferTypeEnum[this.order.TransferType];
	}

	getTransferClass(): string {
		return `badge--${this.getTransferText()?.toLocaleLowerCase()}`;
	}
}
