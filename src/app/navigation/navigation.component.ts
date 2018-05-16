import {Component} from '@angular/core';

@Component({
  selector: 'app-navigation',
  template: `<div *mobxAutorun>
  <router-outlet></router-outlet>
  <nav class="has-text-centered-desktop">
    <a class="button is-info is-large" routerLink="/location" routerLinkActive="active">
      <span class="">
        <i class="fa fa-map" aria-hidden="true"></i>
        Locations
      </span>
    </a>
    <a class="button is-primary is-large" routerLink="/category" routerLinkActive="active">
      <span class="">
        <i class="fa fa-list-alt" aria-hidden="true"></i>
        Categories
      </span>
    </a>
  </nav>
</div>`
})
export class NavigationComponent {
}
