import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, NavigationEnd, NavigationStart, Router } from "@angular/router";
import { BehaviorSubject, Subscription } from "rxjs";

@Component({
	selector: "star-header",
	templateUrl: "./header.component.html",
	styleUrls: ["./header.component.scss"],
})
export class HeaderComponent implements OnInit {
	private routeEventSubscription!: Subscription;
	readonly currentRouteTextSubject = new BehaviorSubject("");
	constructor(private router: Router) {}

	ngOnInit(): void {
		this.routeEventSubscription = this.router.events.subscribe((event) => {
			if (event instanceof NavigationStart || event instanceof NavigationEnd) {
				const routeText = this.getRouteTextByURL(event.url);
				this.currentRouteTextSubject.next(routeText);
			}
		});
	}

	private getRouteTextByURL(url: string): string {
		console.log("URL: ", url);
		switch (url) {
			case "/create":
				return "Create Order";
			case "/accepted":
				return "Accepted";
			default:
				throw new Error(`No Text Could Be Found For Specified URL: ${url}`);
		}
	}
}
