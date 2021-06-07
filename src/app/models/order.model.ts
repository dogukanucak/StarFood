export enum OrderStateEnum {
	New = 0,
	Accepted = 1,
	Cooking = 2,
	ParcelReady = 3,
	Delivered = 4,
	Completed = 5,
}

export enum TransferTypeEnum {
	Delivery = 0,
	Takeaway = 1,
}

export type OrderState = {
	amount: number;
	type: OrderStateEnum;
	route: string;
};
