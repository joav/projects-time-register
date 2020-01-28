import { Component, Inject } from "@angular/core";
import { MatDialogRef } from '@angular/material';
import { RegProjectService } from 'src/app/reg-project.service';
import { Customer } from 'src/app/models/customer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
	templateUrl: './create-project.component.html'
})
export class CreateProjectComponent {
	customers:Customer[] = [];
	form:FormGroup;
	constructor(public ref:MatDialogRef<CreateProjectComponent>, private reg:RegProjectService, private fb:FormBuilder) {
		this.reg.main.loadCustomers().then( c => {
			this.customers = c;
			console.log(c);
		});
		this.form = this.fb.group({
			name: ['', Validators.required],
			customer: [null, Validators.required],
			path: ['', Validators.required],
			cmd: ['code']
		});
	}
	save(){
		if(this.form.valid){
			const data = this.form.value;
			this.reg.main.createProject({
				name: data.name,
				path: data.path,
				cmd: 'code',
				customer: data.customer
			}).then(p => {
				this.reg.projects.unshift(p);
				this.ref.close(p);
			});
		}
	}
	selectDir(){
		this.reg.main.selectDir().then(r => {
			if(!r.canceled){
				this.form.controls.path.setValue(r.filePaths[0]);
			}
		});
	}
}
