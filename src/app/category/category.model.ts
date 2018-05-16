import {observable} from 'mobx';

export class CategoryModel {

  @observable name: string;

  constructor({name}) {
    this.name = name;
  }
}
