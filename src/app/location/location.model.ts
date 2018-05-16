import {observable} from 'mobx';

export class LocationModel {

  @observable name: string;
  @observable address: string;
  @observable lat: number;
  @observable lng: number;
  @observable category: string;

  constructor(location) {
    this.name = location.name;
    this.address = location.address;
    this.lat = location.lat;
    this.lng = location.lng;
    this.category = location.category;
  }
}
