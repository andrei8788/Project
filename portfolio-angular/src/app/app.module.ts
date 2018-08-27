import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app.routing.module';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';


import {AppComponent} from './app.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {AboutMeComponent} from './components/about-me/about-me.component';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';
import {PortfolioModule} from './portfolio/portfolio.module';
import {WildcardRoutingModule} from './wildcard-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    ContactsComponent,
    AboutMeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    PortfolioModule,
    WildcardRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
