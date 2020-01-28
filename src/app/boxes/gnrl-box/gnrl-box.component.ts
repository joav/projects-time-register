import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
	templateUrl: './gnrl-box.component.html'
})
export class GnrlBoxComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public info:Info, public dialogRef:MatDialogRef<GnrlBoxComponent>){}
	onClick(){
		this.dialogRef.close();
	}
}

export type Info = {
	title?: string;
	desc?: string;
}
