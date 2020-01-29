import { Component, ViewChildren, QueryList, HostListener } from "@angular/core";
import { RegProjectService } from '../reg-project.service';
import { RegProjectComponent } from '../reg-project/reg-project.component';
import { forkJoin } from 'rxjs';

@Component({
	selector: 'app-open-projects',
	templateUrl: './open-projects.component.html',
	styleUrls: ['./open-projects.component.scss']
})
export class OpenProjectsComponent {
	@ViewChildren(RegProjectComponent) openProjects:QueryList<RegProjectComponent>;
	constructor(public regServ:RegProjectService) {}

	@HostListener('window:beforeunload')
	saveAll(){
		if(this.openProjects.length){
			const openProjects = this.openProjects.toArray();
			const regs:Promise<boolean>[] = [];
			for (const p of openProjects) {
				p.pause();
				regs.push(this.regServ.main.newRegProject(p.project, p.regs));
			}
			forkJoin(regs).subscribe(r => {
				this.regServ.main.close();
			});
		}else{
			this.regServ.main.close();
		}
	}
	remove(i:number){
		this.regServ.openProjects.splice(i,1);
	}
}
