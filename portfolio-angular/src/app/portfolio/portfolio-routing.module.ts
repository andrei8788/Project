import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';


import {PortfolioComponent} from './portfolio.component';
import {PhotoGalleryComponent} from './ui/photo-gallery/photo-gallery.component';
import {BattleshipComponent} from './ui/battleship/battleship.component';
import {MainTodolistComponent} from './ui/main-todolist/main-todolist.component';
import {CalculatorComponent} from './ui/calculator/calculator.component';
import {GmapsComponent} from './ui/gmaps/gmaps.component';
import {CanvasComponent} from './ui/canvas/canvas.component';


const portfolioRoutes: Routes = [
  { path: 'portfolio', component: PortfolioComponent, children: [
      { path: 'photo-gallery', component: PhotoGalleryComponent },
      { path: 'battleship', component: BattleshipComponent },
      { path: 'todolist', component: MainTodolistComponent },
      { path: 'calculator', component: CalculatorComponent},
      { path: 'map', component: GmapsComponent},
      { path: 'canvas', component: CanvasComponent}
  ]}
];

@NgModule({
  imports: [
    RouterModule.forChild(portfolioRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class PortfolioRoutingModule {

}
