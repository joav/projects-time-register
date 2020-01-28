import { NgModule } from "@angular/core";
import { MatButtonModule, MatIconModule, MatDialogModule } from "@angular/material";

@NgModule({
	imports: [
		MatButtonModule,
		MatIconModule,
		MatDialogModule
	],
	exports: [
		MatButtonModule,
		MatIconModule,
		MatDialogModule
	]
})
export class MaterialModule { }
