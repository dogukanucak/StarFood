import { OrderStateEnum, TransferTypeEnum } from "./order.model";

export type FireBaseDoc = {
	id: string;
};

export type Order = FireBaseDoc & {
	Date: Date;
	ID: number;
	RequesterName: string;
	RequesterContact: string;
	Message: string;
	OrderItems: OrderItem[];
	OrderState: OrderStateEnum;
	TransferType: TransferTypeEnum;
	TotalPrice: number;
};

export type Meal = FireBaseDoc & {
	Name: string;
	Price: number;
};

export type MealWithQuantity = Meal & {
	quantity: number;
	totalPrice: number;
};

export type OrderItem = {
	amount: number;
	meal: string;
};
