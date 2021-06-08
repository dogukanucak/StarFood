import { DocumentChangeAction } from "@angular/fire/firestore";
import { FireBaseDoc, MealWithQuantity, Order, OrderItem } from "../models/collection.model";
import { OrderStateEnum, TransferTypeEnum } from "../models/order.model";

const ORDER_ITEM_SEPARATOR = "&";

/**
 * Converts firebase document object to any given model type
 * @param doc Firebase doc
 * @returns
 */
export function convertDocumentToModel<T>(doc: DocumentChangeAction<unknown>): T & FireBaseDoc {
	if (doc && doc.payload && doc.payload.doc && typeof doc.payload.doc.data === "function") {
		const fireBaseDoc = <T & FireBaseDoc>{};
		const data: T = doc.payload.doc.data() as T;
		fireBaseDoc.id = doc.payload.doc.id;

		return { ...fireBaseDoc, ...convertProperties<T>(data) };
	} else {
		throw new Error("Could not cast document to model");
	}
}

/**
 * Converts doc list to model array
 */
export function convertDocumentListToModelArray<T>(docList: DocumentChangeAction<unknown>[]): Array<T> {
	return docList.map((doc) => {
		return convertDocumentToModel<T>(doc);
	});
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertProperties<T>(data: any): T {
	if (data.SelectedItems && data.SelectedItems.length) {
		data.OrderItems = data.SelectedItems.map((item: string) => convertOrderItem(item));
	}
	if (data.TransferType) {
		data.TransferType = convertTransferType(data.TransferType);
	}
	if (data.OrderType) {
		data.OrderState = convertOrderState(data.OrderState);
	}
	if (data.Date) {
		data.Date = data.Date.toDate();
	}
	return data;
}

export function convertRequestOrderData(order: Order & { SelectedItems: MealWithQuantity[] }) {
	return {
		Date: new Date(),
		ID: random(988812, 1200000),
		Message: order.Message,
		SelectedItems: order.SelectedItems.map((item) => convertRequestOrderItem(item)),
		OrderState: "New",
		RequesterContact: order.RequesterContact,
		RequesterName: order.RequesterName,
		TotalPrice: order.TotalPrice,
		TransferType: order.TransferType,
	};
}

export function convertRequestOrderItem(item: MealWithQuantity): string {
	return `${item.Name}&${item.quantity}`;
}

function convertOrderItem(item: string | unknown): OrderItem {
	if (typeof item === "string") {
		if (item.includes(ORDER_ITEM_SEPARATOR)) {
			const [meal, amount] = item.split(ORDER_ITEM_SEPARATOR);
			return {
				meal: meal,
				amount: Number(amount),
			};
		} else {
			throw new Error("Could not cast to OrderItem");
		}
	} else {
		throw new Error("Parameter for order item is not given in string type");
	}
}

function convertTransferType(type: number): TransferTypeEnum {
	return type as TransferTypeEnum;
}

function convertOrderState(type: string): OrderStateEnum {
	return Object.keys(OrderStateEnum).indexOf(type);
}

const random = (min: number, max: number) => Math.floor(Math.random() * (max - min)) + min;
