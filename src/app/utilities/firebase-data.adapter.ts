import { DocumentChangeAction } from "@angular/fire/firestore";
import { FireBaseDoc, OrderItem } from "../models/collection.model";
import { OrderStateEnum, TransferTypeEnum } from "../models/order.model";

const ORDER_ITEM_SEPARATOR = "&";

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

export function convertDocumentListToModelArray<T>(docList: DocumentChangeAction<unknown>[]): Array<T> {
	return docList.map((doc) => {
		return convertDocumentToModel<T>(doc);
	});
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function convertProperties<T>(data: any): T {
	if (data.OrderItems && data.OrderItems.length) {
		data.OrderItems = data.OrderItems.map((item: string) => convertOrderItem(item));
	} else if (data.TransferType) {
		data.TransferType = convertTransferType(data.TransferType);
	} else if (data.OrderType) {
		data.OrderState = convertOrderState(data.OrderState);
	}
	return data;
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

function convertTransferType(type: string): TransferTypeEnum {
	return Object.keys(TransferTypeEnum).indexOf(type);
}

function convertOrderState(type: string): OrderStateEnum {
	return Object.keys(OrderStateEnum).indexOf(type);
}
