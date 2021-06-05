import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { MenuActionItem } from "src/app/models/menu.model";
import { IMenuService } from "./menu.interface";

const ACTION_ITEMS: MenuActionItem[] = [
	{
		iconName: "star-main",
		routeLink: "/home",
	},
	{
		iconName: "order",
		routeLink: "/order",
	},
	{
		iconName: "receipt",
		routeLink: "/home",
	},
	{
		iconName: "settings",
		routeLink: "/home",
	},
];

@Injectable({
	providedIn: "root",
})
export class ActionMenuService implements IMenuService<MenuActionItem> {
	menuItemsSubject!: BehaviorSubject<MenuActionItem[]>;

	constructor() {
		this.initMenuSubjects();
	}

	private initMenuSubjects(): void {
		this.menuItemsSubject = new BehaviorSubject(this.getActionMenuItems());
	}

	private getActionMenuItems(): MenuActionItem[] {
		return ACTION_ITEMS;
	}
}
