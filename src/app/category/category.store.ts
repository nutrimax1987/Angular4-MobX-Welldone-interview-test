import {observable, computed, action, autorun, toJS} from 'mobx';
import {Injectable} from '@angular/core';
import {CategoryModel} from './category.model';

@Injectable()
export class Categories {
  @observable categories = [];

  constructor() {
    this.localStorageSync();
  }

  @action add(name) {
    if (!this._alreadyExist(name)) {
      this.categories.push(new CategoryModel({name}));
      console.log('category added');
    }
  }

  @action update({selected, value}) {
    if (selected !== value) {
      this.categories.forEach((cat) => {
        if (cat.name === selected) {
          return cat.name = value;
        }
      });
      console.log('category updated');
    }
  }

  @action remove(data) {
    const index = this.categories.indexOf(data);
    this.categories.splice(index, 1);
    console.log('category removed');
  }

  @computed get getAll() {
    return this.categories;
  }

  _alreadyExist(name) {
    return this.categories.some(category => category.name === name);
  }

  private localStorageSync() {
    const initialCategories = JSON.parse(localStorage.categories || '[]');
    this.categories = initialCategories.map((category) => new CategoryModel(category));

    autorun(() => {
      localStorage.categories = JSON.stringify(toJS(this.categories));
    });
  }
}
