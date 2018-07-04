import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {PhotoGalleryComponent} from './components/photo-gallery/photo-gallery.component';
import {BattleshipComponent} from './components/battleship/battleship.component';
import {MainTodolistComponent} from './components/main-todolist/main-todolist.component';
import {CalculatorComponent} from './components/calculator/calculator.component';
import {PortfolioComponent} from './portfolio.component';

const portfolioRoutes: Routes = [
  { path: '', component: PortfolioComponent, children: [
      { path: 'photo-gallery', component: PhotoGalleryComponent },
      { path: 'battleship', component: BattleshipComponent },
      { path: 'todolist', component: MainTodolistComponent },
      { path: 'calculator', component: CalculatorComponent}
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
