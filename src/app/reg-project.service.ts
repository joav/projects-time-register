import { Injectable } from "@angular/core";
import { Project } from './models/project';
import { Customer } from './models/customer';
import { RegTime } from './models/reg-time';

@Injectable({
	providedIn: "root"
})
export class RegProjectService {
	main:Main;
	constructor() {
	}
	projects:Project[] = [];
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
}
