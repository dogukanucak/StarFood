import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { BrowserModule } from "@angular/platform-browser";
import { environment } from "src/environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BadgeComponent } from "./components/badge/badge.component";
import { ButtonComponent } from "./components/button/button.component";
import { HeaderComponent } from "./components/header/header.component";
import { MenuComponent } from "./components/menu/menu.component";
import { AcceptedOrderPageComponent } from "./pages/acceptedorderpage/acceptedorder.page.component";
import { CreateOrderPageComponent } from "./pages/createorderpage/createorder.page.component";
import { ActionMenuService } from "./services/menu/actionmenu.service";
import { OrderMenuService } from "./services/menu/ordermenu.service";

const UI_COMPONENTS = [ButtonComponent, BadgeComponent, MenuComponent, HeaderComponent];
const PAGES = [CreateOrderPageComponent, AcceptedOrderPageComponent];

@NgModule({
	declarations: [AppComponent, ...UI_COMPONENTS, ...PAGES],
	imports: [
		BrowserModule,
		AppRoutingModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFirestoreModule,
	],
	providers: [OrderMenuService, ActionMenuService],
	bootstrap: [AppComponent],
})
export class AppModule {}
