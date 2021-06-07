import { Component, EventEmitter, Input, Output } from "@angular/core";

@Component({
	selector: "star-button",
	templateUrl: "./button.component.html",
	styleUrls: ["./button.component.scss"],
})
export class ButtonComponent {
	/**
	 * Button text
	 */
	@Input() title?: string;

	/**
	 * Emit custom click event on button click
	 */
	@Output() readonly onClick: EventEmitter<Event> = new EventEmitter();

	onButtonClick($event: Event): void {
		this.onClick.emit($event);
	}
}
