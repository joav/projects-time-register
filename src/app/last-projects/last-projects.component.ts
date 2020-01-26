import { Component } from "@angular/core";
import { Project } from '../models/project';
import { RegProjectService } from '../reg-project.service';

@Component({
	selector: 'app-last-projects',
	templateUrl: './last-projects.component.html',
	styleUrls: ['./last-projects.component.scss']
})
export class LastProjectsComponent {
	projects:Project[] = [];
	constructor(private regProjectServ:RegProjectService) {
	}
	ngOnInit(){
		console.log('hpppp',(window as any).ptrMainProc);
		this.regProjectServ.init();
		this.regProjectServ.main.loadProjects().then(projects => this.projects = projects);
	}
}
