import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';
import {AboutMeComponent} from './components/about-me/about-me.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {NotFoundComponent} from './shared/components/not-found/not-found.component';
import {PortfolioComponent} from './portfolio/portfolio.component';

const routes: Routes = [
  { path: '', redirectTo: 'portfolio', pathMatch: 'full'},
  { path: 'portfolio', data: {isActive: false}, component: PortfolioComponent},
  { path: 'about-me', component: AboutMeComponent},
  { path: 'contacts', component: ContactsComponent}
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
}
