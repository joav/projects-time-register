import { Component, Input } from "@angular/core";
import { Project } from '../models/project';

@Component({
	selector: 'app-reg-project',
	templateUrl: './reg-project.component.html',
	styleUrls: ['./reg-project.component.scss']
})
export class RegProjectComponent {
	@Input() project:Project;
	regs:number[] = [];
	constructor() { }

	addReg() {
		this.regs.push(Date.now());
	}
}
