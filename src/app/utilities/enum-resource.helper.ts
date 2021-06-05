import { OrderType } from "../models/order.model";

export function getOrderTypeResourceText(type: OrderType): string {
	switch (type) {
		case OrderType.Accepted:
			return "Accepted";
		case OrderType.Completed:
			return "Completed";
		case OrderType.Cooking:
			return "Cooking";
		case OrderType.Delivered:
			return "Delivered";
		case OrderType.New:
			return "New Order";
		case OrderType.ParcelReady:
			return "Parcel Ready";
		default:
			throw new TypeError("Provided Order Type Is Not In OrderType Enum List");
	}
}
