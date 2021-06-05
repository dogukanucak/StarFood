/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from "@angular/core/testing";
import { By } from "@angular/platform-browser";
import { DebugElement } from "@angular/core";

import { CreateorderpageComponent } from "./createorder.page.component";

describe("CreateorderpageComponent", () => {
	let component: CreateorderpageComponent;
	let fixture: ComponentFixture<CreateorderpageComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [CreateorderpageComponent],
		}).compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(CreateorderpageComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it("should create", () => {
		expect(component).toBeTruthy();
	});
});
