/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from "@angular/core/testing";
import { StaticdataService } from "./staticdata.service";

describe("Service: Staticdata", () => {
	beforeEach(() => {
		TestBed.configureTestingModule({
			providers: [StaticdataService],
		});
	});

	it("should ...", inject([StaticdataService], (service: StaticdataService) => {
		expect(service).toBeTruthy();
	}));
});
