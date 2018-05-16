import {CategoryComponent} from './category/category.component';
import {LocationComponent} from './location/location.component';
import {Routes} from '@angular/router';

export const appRoutes: Routes = [
  {
    path: 'location',
    component: LocationComponent
  }, {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: '',
    redirectTo: 'location',
    pathMatch: 'full'
  },
  {path: '**', component: LocationComponent}
];
