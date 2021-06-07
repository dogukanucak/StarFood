import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { OrderCollection } from "../collections";
import { map } from "rxjs/operators";
import { convertDocumentListToModelArray } from "src/app/utilities/firebase-data.adapter";
import { Order } from "src/app/models/collection.model";
import { Observable } from "rxjs";

@Injectable({
	providedIn: "root",
})
export class OrderService {
	constructor(private firestore: AngularFirestore) {}

	getOrders(): Observable<Order[]> {
		console.log("TTTT");
		return this.firestore
			.collection(OrderCollection.Order)
			.snapshotChanges()
			.pipe(map((value) => convertDocumentListToModelArray<Order>(value)));
	}
}
