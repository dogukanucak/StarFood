import { Component, Input } from "@angular/core";

@Component({
	selector: "star-badge",
	templateUrl: "./badge.component.html",
	styleUrls: ["./badge.component.scss"],
})
export class BadgeComponent {
	@Input() text?: string;
}
