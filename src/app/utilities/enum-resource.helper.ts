import { OrderStateEnum } from "../models/order.model";

export function getOrderStateEnumResourceText(type: OrderStateEnum): string {
	switch (type) {
		case OrderStateEnum.Accepted:
			return "Accepted";
		case OrderStateEnum.Completed:
			return "Completed";
		case OrderStateEnum.Cooking:
			return "Cooking";
		case OrderStateEnum.Delivered:
			return "Delivered";
		case OrderStateEnum.New:
			return "New Order";
		case OrderStateEnum.ParcelReady:
			return "Parcel Ready";
		default:
			throw new TypeError("Provided Order Type Is Not In OrderStateEnum Enum List");
	}
}
