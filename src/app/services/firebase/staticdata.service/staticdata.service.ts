import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Observable } from "rxjs";
import { Meal } from "src/app/models/collection.model";
import { convertDocumentListToModelArray } from "src/app/utilities/firebase-data.adapter";
import { OrderCollection } from "../collections";
import { map, publishReplay, refCount } from "rxjs/operators";
import { TransferTypeEnum } from "src/app/models/order.model";

@Injectable({
	providedIn: "root",
})
export class StaticDataService {
	constructor(private firestore: AngularFirestore) {}

	getTransferTypes(): Observable<TransferTypeEnum[]> {
		return this.firestore
			.collection(OrderCollection.TransferType)
			.snapshotChanges()
			.pipe(
				map((value) => convertDocumentListToModelArray<TransferTypeEnum>(value)),
				publishReplay(),
				refCount()
			);
	}

	getMeals(): Observable<Meal[]> {
		return this.firestore
			.collection(OrderCollection.Meal)
			.snapshotChanges()
			.pipe(
				map((value) => convertDocumentListToModelArray<Meal>(value)),
				publishReplay(),
				refCount()
			);
	}
}
