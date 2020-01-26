import { Component, Input } from "@angular/core";
import { Project } from '../models/project';
import { RegTime } from '../models/reg-time';

@Component({
	selector: 'app-reg-project',
	templateUrl: './reg-project.component.html',
	styleUrls: ['./reg-project.component.scss']
})
export class RegProjectComponent {
	@Input() project:Project;
	regs:RegTime[] = [];
	paused = false;
	constructor() {
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
}
