import {observable, computed, action, autorun, toJS} from 'mobx';
import {Injectable} from '@angular/core';
import {LocationModel} from './location.model';

@Injectable()
export class Locations {

  @observable locations = [];
  @observable sorting = 'ASC';
  @observable filter;

  constructor() {
    this.localStorageSync();
  }

  @action add(location) {
    if (!this._alreadyExist(name)) {
      this.locations.push(new LocationModel(location));
      console.log('location added');
    }
  }

  @action update(l1, l2) {
    this.locations.forEach((loc) => {
      if (JSON.stringify(loc) === JSON.stringify(l1)) {
        loc.name = l2.name;
        loc.address = l2.address;
        loc.lat = l2.lat;
        loc.lng = l2.lng;
        loc.category = l2.category;

      }
    });
    this._sort(this.locations);
    console.log('location updated');
  }

  @action remove(location) {
    const index = this.locations.indexOf(location);
    this.locations.splice(index, 1);
    console.log('location removed');
  }

  @action sortAZ() {
    this.sorting = 'ASC';
  }


  @action sortZA() {
    this.sorting = 'DESC';
  }

  @action filterBy(cat) {
    this.filter = cat;
  }

  @computed get getAll() {
    return this._filter(this._sort(this.locations, this.sorting), this.filter);
  }

  private _filter(locations, value?: string) {
    return value ? locations.filter(loc => loc.category === value) : locations;
  }


  private _sort(locations, value ?: string) {
    switch (value) {
      case 'DESC':
        return locations.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA > nameB) {
            return -1;
          }
          if (nameA < nameB) {
            return 1;
          }
          return 0;
        });
      case 'ASC':
      default:
        return locations.sort((a, b) => {
          const nameA = a.name.toUpperCase();
          const nameB = b.name.toUpperCase();
          if (nameA < nameB) {
            return -1;
          }
          if (nameA > nameB) {
            return 1;
          }
          return 0;
        });
    }
  }


  _alreadyExist(location) {
    return this.locations.some(l => JSON.stringify(l) === JSON.stringify(location));
  }

  private localStorageSync() {
    const initialLocations = JSON.parse(localStorage.locations || '[]');
    this.sorting = JSON.parse(localStorage.sorting || '"ASC"');
    this.filter = JSON.parse(localStorage.sorting || '"ASC"');
    this.locations = initialLocations.map(location => new LocationModel(location));

    autorun(() => {
      localStorage.locations = JSON.stringify(toJS(this.locations));
      localStorage.sorting = JSON.stringify(toJS(this.sorting));
      localStorage.filter = JSON.stringify(toJS(this.filter));
    });
  }
}
