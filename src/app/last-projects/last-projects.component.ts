import { Component } from "@angular/core";
import { Project } from '../models/project';
import { RegProjectService } from '../reg-project.service';

@Component({
	selector: 'app-last-projects',
	templateUrl: './last-projects.component.html',
	styleUrls: ['./last-projects.component.scss']
})
export class LastProjectsComponent {
	constructor(public regProjectServ:RegProjectService) {
	}
	ngOnInit(){
	}
}
