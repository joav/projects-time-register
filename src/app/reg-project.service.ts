import { Injectable } from "@angular/core";
import { Project } from './models/project';
import { Customer } from './models/customer';
import { RegTime } from './models/reg-time';
import { Observable } from 'rxjs';

@Injectable({
	providedIn: "root"
})
export class RegProjectService {
	main:Main;
	ipc:Ipc;
	constructor() {
		this.init();
		this.main.loadProjects().then(p => this.projects = p);
		this.ipc = (window as any).ptrIpc;
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
}

export interface Ipc {
	on(e:'close', fn:()=>void);
	send(e:'closed');
}
