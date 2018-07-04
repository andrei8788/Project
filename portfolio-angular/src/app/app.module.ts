import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AppRoutingModule} from './app.routing.module';
import {ModalGalleryModule} from '@ks89/angular-modal-gallery';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {LazyLoadImageModule} from 'ng-lazyload-image';
import 'hammerjs';
import 'mousetrap';

import {TasksService} from './shared/services/tasks.service';
import {AppComponent} from './app.component';
import {SidebarComponent} from './sidebar/sidebar.component';
import {ContactsComponent} from './components/contacts/contacts.component';
import {AboutMeComponent} from './components/about-me/about-me.component';

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
    LazyLoadImageModule,
    ModalGalleryModule.forRoot()
  ],
  providers: [TasksService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
