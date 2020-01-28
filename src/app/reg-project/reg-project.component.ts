import { Component, Input, Output, EventEmitter } from "@angular/core";
import { Project } from '../models/project';
import { RegTime } from '../models/reg-time';
import { RegProjectService } from '../reg-project.service';
import { MatDialog } from '@angular/material';
import { GnrlBoxComponent, Info } from '../boxes/gnrl-box/gnrl-box.component';

@Component({
	selector: 'app-reg-project',
	templateUrl: './reg-project.component.html',
	styleUrls: ['./reg-project.component.scss']
})
export class RegProjectComponent {
	@Input() project:Project;
	regs:RegTime[] = [];
	paused = false;
	@Output() saved = new EventEmitter<any>();
	constructor(private regServ:RegProjectService, private dialog:MatDialog) {
		this.addReg();
	}
	addReg() {
		this.regs.push({init: Date.now(), final: 0});
	}
	pause(){
		this.regs[this.regs.length - 1].final = Date.now();
		this.paused =  true;
	}
	continue(){
		this.addReg();
		this.paused = false;
	}
	save(){
		this.pause();
		this.regServ.main.newRegProject(this.project, this.regs).then(r => {
			this.dialog.closeAll();
			const hours = this.regs.reduce((prev,curr) => (curr.final - curr.init) + prev,0)
			this.dialog.open<GnrlBoxComponent, Info>(GnrlBoxComponent, {
				data: {
					title: 'Registro guardado',
					desc: `Se ha registrado el tiempo que ha gastado en el proyecto "${this.project.name}", con un total de ${(hours / 3600000)} horas.`
				}
			});
			this.saved.emit();
		});
	}
}
