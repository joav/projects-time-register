import { Component } from "@angular/core";
import { Project } from '../models/project';
import { RegProjectService } from '../reg-project.service';

@Component({
	selector: 'app-open-projects',
	templateUrl: './open-projects.component.html',
	styleUrls: ['./open-projects.component.scss']
})
export class OpenProjectsComponent {
	constructor(public regServ:RegProjectService) { }
}
