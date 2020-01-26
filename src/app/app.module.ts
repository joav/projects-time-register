import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LastProjectsComponent } from './last-projects/last-projects.component';
import { OpenProjectsComponent } from './open-projects/open-projects.component';
import { BoxesModule } from './boxes/boxes.module';
import { ProjectComponent } from './project/project.component';
import { RegProjectComponent } from './reg-project/reg-project.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material.module';
import { ActionsComponent } from './actions/actions.component';
import { NgScrollbarModule } from "ngx-scrollbar";


@NgModule({
  declarations: [
	AppComponent,
	LastProjectsComponent,
	OpenProjectsComponent,
	ProjectComponent,
	RegProjectComponent,
	ActionsComponent
  ],
  imports: [
	BrowserModule,
	BoxesModule,
	BrowserAnimationsModule,
	MaterialModule,
	NgScrollbarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
