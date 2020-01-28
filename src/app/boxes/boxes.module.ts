import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatSelectModule, MatOptionModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { GnrlBoxComponent } from './gnrl-box/gnrl-box.component';
import { CreateProjectComponent } from './create-project/create-project.component';

@NgModule({
	declarations: [
		CreateCustomerComponent,
		GnrlBoxComponent,
		CreateProjectComponent
	],
	imports: [
		CommonModule,
		MatDialogModule,
		FormsModule,
		MatFormFieldModule,
		MatButtonModule,
		MatSelectModule,
		MatOptionModule,
		ReactiveFormsModule,
		MatInputModule
	],
	exports: [
		CreateCustomerComponent,
		GnrlBoxComponent,
		CreateProjectComponent
	],
	entryComponents: [
		CreateCustomerComponent,
		GnrlBoxComponent,
		CreateProjectComponent
	]
})
export class BoxesModule {}
