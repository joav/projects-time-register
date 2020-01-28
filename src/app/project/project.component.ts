import { Component, Input } from "@angular/core";
import { Project } from '../models/project';
import { RegProjectService } from '../reg-project.service';

@Component({
	selector: 'app-project',
	templateUrl: './project.component.html',
	styleUrls: ['./project.component.scss']
})
export class ProjectComponent {
	@Input() project:Project;
	constructor(private regProjectServ:RegProjectService) { }
	open(){
		this.regProjectServ.main.openProject(this.project);
		this.regProjectServ.openProjects.push(this.project);
	}
}
