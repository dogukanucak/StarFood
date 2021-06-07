import { OrderStateEnum, TransferTypeEnum } from "./order.model";

export type FireBaseDoc = {
	id: string;
};

export type Order = FireBaseDoc & {
	date: Date;
	ID: number;
	message: string;
	orderItems: OrderItem[];
	orderState: OrderStateEnum;
	transferType: TransferTypeEnum;
};

export type Meal = FireBaseDoc & {
	name: string;
	price: number;
};

export type OrderItem = {
	amount: number;
	meal: string;
};
