import {ElementRef, NgModule, ViewChild} from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AboutMeComponent} from './components/about-me/about-me.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {PortfolioModule} from './portfolio/portfolio.module';

const routes: Routes = [
  { path: '', redirectTo: 'portfolio;isActive=false', pathMatch: 'full' },
  { path: 'about-me', component: AboutMeComponent},
  { path: 'contacts', component: ContactsComponent},
  { path: 'portfolio', loadChildren: './portfolio/portfolio.module#PortfolioModule'}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule {
  @ViewChild('wrapper') wrapper: ElementRef;
}
