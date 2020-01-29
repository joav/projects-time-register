import { Component, Inject } from "@angular/core";
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { RegProjectService } from 'src/app/reg-project.service';
import * as moment from "moment";
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
	templateUrl: 'create-report.component.html'
})
export class CreateReportComponent {
	link = 'reporte-personalizado.csv';
	title = 'Reporte personalzado';
	download = '';
	form:FormGroup;
	constructor(@Inject(MAT_DIALOG_DATA) public report:ReportData, public ref:MatDialogRef<CreateReportComponent>, private reg:RegProjectService, fb:FormBuilder) {
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
					this.download = 'Reporte mensual';
					dateFinal = dateInit;
					dateInit = moment().add('-'+dateInit.getDate()+' days').toDate();
					break;
			}

			this.reg.main.getReport(dateInit, dateFinal, 0).then(regs => {
				const data = regs.map(reg => `${reg.project.name};${(reg.time / 3600000)};${reg.date};`).join("\n");
				this.link = `data:text/csv;charset=utf8,${encodeURIComponent(data)}`;
			});
		}
	}
	async onDownload(){
		if(this.report.type == 'custom'){
			this.reg.main.getReport(this.form.value.dateInit, this.form.value.dateFinal, this.form.value.num).then(regs => {
				const data = regs.map(reg => `${reg.project.name};${(reg.time / 3600000)};${reg.date};`).join("\n");
				this.link = `data:text/csv;charset=utf8,${encodeURIComponent(data)}`;
			});
		}
	}
}

export type ReportData = {
	type: 'day' | 'week' | 'month' | 'custom';
};
