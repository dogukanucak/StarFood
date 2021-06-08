import { Component } from "@angular/core";
import { FormControl, FormGroup, Validators } from "@angular/forms";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { ListItem } from "ng-multiselect-dropdown/multiselect.model";
import { BehaviorSubject } from "rxjs";
import { Meal, MealWithQuantity } from "src/app/models/collection.model";
import { OrderService } from "src/app/services/firebase/order.service/Order.service";
import { StaticDataService } from "src/app/services/firebase/staticdata.service/staticdata.service";

@Component({
	selector: "star-createorderpage",
	templateUrl: "./createorder.page.component.html",
	styleUrls: ["./createorder.page.component.scss"],
})
export class CreateOrderPageComponent {
	mealList: Meal[] = [];
	orderForm: FormGroup;
	selectedMeals: MealWithQuantity[] = [];
	dropdownSettings: any = {};
	canOrder = false;
	submitted = false;

	totalPriceSubject: BehaviorSubject<string> = new BehaviorSubject("-");

	constructor(private staticDataService: StaticDataService, private orderService: OrderService) {
		this.orderForm = this.createOrderForm();
		this.staticDataService.getMeals().subscribe((meals) => {
			this.mealList = meals;
		});
	}

	ngOnInit() {
		this.dropdownSettings = {
			singleSelection: false,
			idField: "id",
			textField: "Name",
			enableCheckAll: false,
			itemsShowLimit: 3,
			allowSearchFilter: true,
		};
	}
	onAddMeal(meal: ListItem): void {
		this.addMeal(meal);
	}

	onRemoveMeal(item: ListItem): void {
		this.removeMeal(item);
	}

	onSubmit(): void {
		this.submitted = true;
		if (this.orderForm.valid) {
			this.orderService
				.createOrder({
					...this.orderForm.value,
					...{ SelectedItems: this.selectedMeals, TotalPrice: this.totalPriceSubject.value },
				})
				.subscribe();
		}
	}

	onCancelOrder(): void {
		this.selectedMeals = [];
		this.orderForm.reset();
		this.updateTotalAmount();
	}

	get orderFormControl() {
		return this.orderForm.controls;
	}

	private createOrderForm(): FormGroup {
		return new FormGroup({
			RequesterName: new FormControl(null, [Validators.required]),
			RequesterContact: new FormControl(null, [Validators.required]),
			TransferType: new FormControl("0", [Validators.required]),
			Message: new FormControl(),
			SelectedItems: new FormControl(null, [Validators.required]),
		});
	}

	private addMeal(meal: ListItem): void {
		const selectedMeal = this.mealList.find((m) => m.id === meal.id);
		const existingMeal = this.selectedMeals.find((m) => m.id === meal.id);
		if (existingMeal) {
			this.addToExistingMeal(existingMeal);
		} else {
			if (selectedMeal) {
				this.selectedMeals.push({ ...selectedMeal, ...{ quantity: 1, totalPrice: selectedMeal.Price } });
			}
		}
		this.updateTotalAmount();
	}

	private removeMeal(meal: ListItem): void {
		const removedMeal = this.selectedMeals.find((m) => m.id === meal.id);
		if (removedMeal && removedMeal.quantity > 1) {
			this.removeFromExistingMeal(removedMeal);
		} else {
			const removeIndex = this.selectedMeals.findIndex((item) => item.id === meal.id);
			if (removeIndex >= 0) {
				this.selectedMeals.splice(removeIndex, 1);
			}
		}
		this.updateTotalAmount();
	}

	private updateTotalPrice(existingMeal: MealWithQuantity): void {
		existingMeal.totalPrice = existingMeal.Price * existingMeal.quantity;
	}

	private addToExistingMeal(existingMeal: MealWithQuantity) {
		existingMeal.quantity = existingMeal.quantity + 1;
		this.updateTotalPrice(existingMeal);
	}

	private removeFromExistingMeal(existingMeal: MealWithQuantity) {
		existingMeal.quantity = existingMeal.quantity - 1;
		this.updateTotalPrice(existingMeal);
	}

	private updateTotalAmount(): void {
		const totalAmount = this.selectedMeals.reduce((n, { totalPrice }) => n + totalPrice, 0);
		this.canOrder = totalAmount > 0;
		this.totalPriceSubject.next(`${totalAmount}$`);
	}
}
