import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentChange } from "@angular/fire/firestore";
import { OrderCollection } from "../collections";
import { map } from "rxjs/operators";
import { convertDocumentListToModelArray, convertRequestOrderData } from "src/app/utilities/firebase-data.adapter";
import { MealWithQuantity, Order } from "src/app/models/collection.model";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class OrderService {
	constructor(private firestore: AngularFirestore) {}

	getOrders(): Observable<Order[]> {
		return this.firestore
			.collection(OrderCollection.Order, (ref) => ref.orderBy("Date", "desc"))
			.snapshotChanges()
			.pipe(map((value) => convertDocumentListToModelArray<Order>(value)));
	}

	createOrder(order: Order & { SelectedItems: MealWithQuantity[] }): Observable<void> {
		return new Observable((observer) => {
			this.firestore
				.collection(OrderCollection.Order)
				.doc()
				.set(convertRequestOrderData(order))
				.then((response) => {
					observer.next(response);
				})
				.catch((error) => console.log("Create Order Error: ", error));
		});
	}
}
