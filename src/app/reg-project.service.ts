import { Injectable } from "@angular/core";
import { Project } from './models/project';
import { Customer } from './models/customer';
import { RegTime } from './models/reg-time';
import { Observable } from 'rxjs';
import { RegProject } from './models/reg-project';

@Injectable({
	providedIn: "root"
})
export class RegProjectService {
	main:Main;
	constructor() {
		this.init();
		this.main.loadProjects().then(p => this.projects = p);
	}
	projects:Project[] = [];
	openProjects:Project[] = [];
	init(){
		this.main = (window as any).ptrMainProc;
	}
}

export interface Main {
	createCustomer:(customer:Customer)=>Promise<Customer>;
	loadCustomers:()=>Promise<Customer[]>;
	loadProjects:()=>Promise<Project[]>;
	createProject:(project:Project)=>Promise<Project>;
	newRegProject:(project:Project, regs:RegTime[])=>Promise<boolean>;
	selectDir:()=>Promise<{canceled:boolean; filePaths:string[]; bookmarks?:string[];}>
	openProject:(project:Project)=>void;
	getReport:(dateInit:Date, dateFinal:Date, num:number)=>Promise<RegProject[]>;
	close:()=>void;
}
