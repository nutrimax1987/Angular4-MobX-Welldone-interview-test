import {BrowserModule} from '@angular/platform-browser';
import {NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {MobxAngularModule} from 'mobx-angular';
import {AgmCoreModule} from '@agm/core';
import {Categories} from './category/category.store';
import {AppComponent} from './app.component';
import {CategoryComponent} from './category/category.component';
import {RouterModule} from '@angular/router';
import {LocationComponent} from './location/location.component';
import {NavigationComponent} from './navigation/navigation.component';
import {TooltipComponent} from './tooltip/tooltip.component';
import {Locations} from './location/location.store';
import {appRoutes} from './app.routes';


@NgModule({
  declarations: [
    AppComponent,
    CategoryComponent,
    LocationComponent,
    NavigationComponent,
    TooltipComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MobxAngularModule,
    ReactiveFormsModule,
    RouterModule.forRoot(
      appRoutes,
      {enableTracing: false}
    ),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDoEcMwzGeau34p8sROqSDx8nT8xzMB6RQ\n',
      libraries: ['places']
    })
  ],
  schemas: [NO_ERRORS_SCHEMA],
  providers: [Categories, Locations],
  bootstrap: [AppComponent]
})
export class AppModule {
}
