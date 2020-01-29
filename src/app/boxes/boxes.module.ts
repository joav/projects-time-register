import { NgModule } from "@angular/core";
import { CommonModule } from '@angular/common';
import { MatDialogModule, MatFormFieldModule, MatButtonModule, MatSelectModule, MatOptionModule, MatInputModule, MatDatepickerModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateCustomerComponent } from './create-customer/create-customer.component';
import { GnrlBoxComponent } from './gnrl-box/gnrl-box.component';
import { CreateProjectComponent } from './create-project/create-project.component';
import { CreateReportComponent } from './create-report/create-report.component';

@NgModule({
	declarations: [
		CreateCustomerComponent,
		GnrlBoxComponent,
		CreateProjectComponent,
		CreateReportComponent
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
		MatInputModule,
		MatDatepickerModule
	],
	exports: [
		CreateCustomerComponent,
		GnrlBoxComponent,
		CreateProjectComponent,
		CreateReportComponent
	],
	entryComponents: [
		CreateCustomerComponent,
		GnrlBoxComponent,
		CreateProjectComponent,
		CreateReportComponent
	]
})
export class BoxesModule {}
