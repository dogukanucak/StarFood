export enum OrderType {
	New = 0,
	Accepted = 1,
	Cooking = 2,
	ParcelReady = 3,
	Delivered = 4,
	Completed = 5,
}

export type OrderState = {
	amount: number;
	type: OrderType;
	route: string;
};
