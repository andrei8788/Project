import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ModalGalleryModule} from '@ks89/angular-modal-gallery';
import 'hammerjs';
import 'mousetrap';

import {PortfolioComponent} from './portfolio.component';
import {PortfolioRoutingModule} from './portfolio-routing.module';
import {MessageComponent} from '../core/components/message.component';
import {BattleshipComponent} from './ui/battleship/battleship.component';
import {CalculatorComponent} from './ui/calculator/calculator.component';
import {CanvasComponent} from './ui/canvas/canvas.component';
import {GmapsComponent} from './ui/gmaps/gmaps.component';
import {TasksService} from './ui/main-todolist/shared/services/tasks.service';
import {TodolistComponent} from './ui/main-todolist/todolist/todolist.component';
import {TodoformComponent} from './ui/main-todolist/todolist/todoform/todoform.component';
import {MainTodolistComponent} from './ui/main-todolist/main-todolist.component';
import {TodotaskComponent} from './ui/main-todolist/todolist/todotask/todotask.component';
import {TodofiltrComponent} from './ui/main-todolist/todolist/todofiltr/todofiltr.component';
import {ImagesLinkService} from './ui/photo-gallery/shared/services/images-link.service';
import {PhotoGalleryComponent} from './ui/photo-gallery/photo-gallery.component';


@NgModule({
  declarations: [
    MessageComponent,
    PortfolioComponent,
    BattleshipComponent,
    CalculatorComponent,
    CanvasComponent,
    GmapsComponent,
    MainTodolistComponent,
    TodolistComponent,
    TodoformComponent,
    TodotaskComponent,
    TodofiltrComponent,
    PhotoGalleryComponent

  ],
  imports: [
    CommonModule,
    PortfolioRoutingModule,
    ModalGalleryModule,
    ModalGalleryModule.forRoot()
  ],
  providers: [
    TasksService,
    ImagesLinkService
  ]
})

export class PortfolioModule {}

