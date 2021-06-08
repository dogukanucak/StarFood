import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserModule } from "@angular/platform-browser";
import { NgMultiSelectDropDownModule } from "ng-multiselect-dropdown";
import { environment } from "src/environments/environment";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { BadgeComponent } from "./components/badge/badge.component";
import { ButtonComponent } from "./components/button/button.component";
import { HeaderComponent } from "./components/header/header.component";
import { MenuComponent } from "./components/menu/menu.component";
import { OrderContainerComponent } from "./components/ordercontainer/ordercontainer.component";
import { AcceptedOrderPageComponent } from "./pages/acceptedorderpage/acceptedorder.page.component";
import { CreateOrderPageComponent } from "./pages/createorderpage/createorder.page.component";
import { OrderService } from "./services/firebase/order.service/Order.service";
import { StaticDataService } from "./services/firebase/staticdata.service/staticdata.service";
import { ActionMenuService } from "./services/menu/actionmenu.service";
import { OrderMenuService } from "./services/menu/ordermenu.service";

const UI_COMPONENTS = [ButtonComponent, BadgeComponent, MenuComponent, HeaderComponent, OrderContainerComponent];
const PAGES = [CreateOrderPageComponent, AcceptedOrderPageComponent];

@NgModule({
	declarations: [AppComponent, ...UI_COMPONENTS, ...PAGES],
	imports: [
		BrowserModule,
		FormsModule,
		CommonModule,
		AppRoutingModule,
		ReactiveFormsModule,
		AngularFireModule.initializeApp(environment.firebaseConfig),
		AngularFirestoreModule,
		NgMultiSelectDropDownModule.forRoot(),
	],
	providers: [OrderMenuService, ActionMenuService, StaticDataService, OrderService],
	bootstrap: [AppComponent],
})
export class AppModule {}
