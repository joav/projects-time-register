import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Customer } from 'src/app/models/customer';
import { RegProjectService } from 'src/app/reg-project.service';

@Component({
	templateUrl: './create-customer.component.html'
})
export class CreateCustomerComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public customer:Customer, public dialogRef:MatDialogRef<CreateCustomerComponent>, private reg:RegProjectService) { }
	save(){
		if(this.customer.name && this.customer.name != ''){
			this.reg.main.createCustomer(this.customer).then( c => {
				this.dialogRef.close(c);
			});
		}else{
			this.dialogRef.close(null);
		}
	}
}
