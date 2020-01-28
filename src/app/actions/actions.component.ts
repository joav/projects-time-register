import { Component } from "@angular/core";
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { Customer } from '../models/customer';
import { CreateCustomerComponent } from '../boxes/create-customer/create-customer.component';
import { GnrlBoxComponent, Info } from '../boxes/gnrl-box/gnrl-box.component';
import { Project } from '../models/project';
import { CreateProjectComponent } from '../boxes/create-project/create-project.component';

@Component({
	selector: 'app-actions',
	templateUrl: './actions.component.html',
	styleUrls: ['./actions.component.scss']
})
export class ActionsComponent {
	constructor(private dialog:MatDialog) { }
	createCustomer(){
		const customer:Customer = {
			name: ''
		};
		this.dialog.closeAll();
		const ref = this.dialog.open<CreateCustomerComponent, Customer, Customer>(CreateCustomerComponent, {
			data: customer,
			disableClose: false
		});
		ref.afterClosed().subscribe(c => {
			if(c){
				this.dialog.open<GnrlBoxComponent, Info>(GnrlBoxComponent, {
					data: {
						title: 'Cliente creado',
						desc: `El cliente "${c.name}" ha sido creado`
					},
					disableClose: false
				});
			}
		});
	}
	createProject(){
		this.dialog.closeAll();
		const ref = this.dialog.open<CreateProjectComponent, null, Project>(CreateProjectComponent, {
			disableClose: false
		});
		ref.afterClosed().subscribe(p => {
			if(p){
				this.dialog.open<GnrlBoxComponent, Info>(GnrlBoxComponent, {
					data: {
						title: 'Projecto creado',
						desc: `El projecto "${p.name}" ha sido creado`
					},
					disableClose: false
				});
			}
		});
	}
	createReport(type:'day' | 'week' | 'month' | 'custom' = 'custom'){}
}
