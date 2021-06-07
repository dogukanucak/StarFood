import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { RouterModule, Routes } from "@angular/router";
import { AcceptedOrderPageComponent } from "./pages/acceptedorderpage/acceptedorder.page.component";
import { CreateOrderPageComponent } from "./pages/createorderpage/createorder.page.component";

const routes: Routes = [
	{ path: "create", component: CreateOrderPageComponent },
	{ path: "accepted", component: AcceptedOrderPageComponent },
];

@NgModule({
	imports: [BrowserModule, RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule {}
