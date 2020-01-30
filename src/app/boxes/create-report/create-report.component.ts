import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RegProjectService } from 'src/app/reg-project.service';
import * as moment from "moment";
import { FormGroup, FormBuilder } from '@angular/forms';
import { RegProject } from 'src/app/models/reg-project';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
	templateUrl: 'create-report.component.html'
})
export class CreateReportComponent {
	_link = 'reporte-personalizado.csv';
	title = 'Reporte personalzado';
	download = '';
	form:FormGroup;
	constructor(@Inject(MAT_DIALOG_DATA) public report:ReportData, public ref:MatDialogRef<CreateReportComponent>, private reg:RegProjectService, private sanit:DomSanitizer, fb:FormBuilder) {
		this.form = fb.group({
			dateInit: [''],
			dateFinal: [''],
			num: [0]
		});
		if(this.report.type != 'custom'){
			let dateInit = new Date();
			let dateFinal:Date = null;
			this.download = 'reporte-diario.csv';
			this.title = 'Reporte diario';
			switch (this.report.type) {
				case 'week':
					this.download = 'reporte-semanal.csv';
					this.title = 'Reporte semanal';
					dateFinal = dateInit;
					dateInit = moment().add('-'+dateInit.getDay()+' days').toDate();
					break;
				case 'month':
					this.download = 'reporte-mensual.csv';
					this.title = 'Reporte mensual';
					dateFinal = dateInit;
					dateInit = moment().add('-'+dateInit.getDate()+' days').toDate();
					break;
			}

			this.reg.main.getReport(dateInit, dateFinal, 0).then(regs => {
				this.createCsv(regs);
			});
		}
	}
	async onDownload(){
		if(this.report.type == 'custom'){
			this.reg.main.getReport(this.form.value.dateInit, this.form.value.dateFinal, this.form.value.num).then(regs => {
				this.createCsv(regs);
			});
		}
	}
	private createCsv(regs:RegProject[]){
		const csv = regs.map(r => `${JSON.stringify(r.project.name)};${(r.time / 3600000).toPrecision(1)};${JSON.stringify(r.date)}`).join("\r\n");
		const blob = new Blob([csv], { type: 'text/csv' });
		const url = URL.createObjectURL(blob);
		this._link = url;
	}
	get link(){
		return this.sanit.bypassSecurityTrustUrl(this._link);
	}
}

export type ReportData = {
	type: 'day' | 'week' | 'month' | 'custom';
};
