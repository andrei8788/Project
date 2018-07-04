import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalGalleryModule} from '@ks89/angular-modal-gallery';

import {TodolistComponent} from './components/main-todolist/todolist/todolist.component';
import {TodoformComponent} from './components/main-todolist/todolist/todoform/todoform.component';
import {TodotaskComponent} from './components/main-todolist/todolist/todotask/todotask.component';
import {TodofiltrComponent} from './components/main-todolist/todolist/todofiltr/todofiltr.component';
import {BattleshipComponent} from './components/battleship/battleship.component';
import {MainTodolistComponent} from './components/main-todolist/main-todolist.component';
import {CalculatorComponent} from './components/calculator/calculator.component';
import {PhotoGalleryComponent} from './components/photo-gallery/photo-gallery.component';
import {PortfolioComponent} from './portfolio.component';
import {PortfolioRoutingModule} from './portfolio-routing.module';
import {MessageComponent} from '../core/components/message.component';

@NgModule({
  declarations: [
    MessageComponent,
    TodolistComponent,
    TodoformComponent,
    TodotaskComponent,
    TodofiltrComponent,
    BattleshipComponent,
    MainTodolistComponent,
    CalculatorComponent,
    PhotoGalleryComponent,
    PortfolioComponent
  ],
  imports: [
    CommonModule,
    ModalGalleryModule,
    PortfolioRoutingModule
  ]
})

export class PortfolioModule {}
