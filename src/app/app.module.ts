import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BadgeComponent } from "./components/badge/badge.component";
import { ButtonComponent } from "./components/button/button.component";

const UI_COMPONENTS = [ButtonComponent, BadgeComponent];

@NgModule({
	declarations: [AppComponent, ...UI_COMPONENTS],
	imports: [BrowserModule, AppRoutingModule],
	providers: [],
	bootstrap: [AppComponent],
})
export class AppModule {}
