import {ChangeDetectionStrategy, Component} from '@angular/core';
import {Categories} from './category.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-category',
  templateUrl: `category.component.html`,
  styleUrls: []
})

export class CategoryComponent {

  _input = '';
  selectedIndex = null;
  selectedCat = null;
  justUpdated = false;

  constructor(public categories: Categories) {
  }

  setSelected(category, index) {
    if (this.selectedIndex === index) {
      this.selectedIndex = null;
      this.selectedCat = null;
    } else {
      this.selectedCat = category;
      this.selectedIndex = index;
    }
  }

  add() {
    this.categories.add(this._input);
    this.resetSelected();
  }

  update() {
    this.categories.update({selected: this.selectedCat.name, value: this._input});
    this.resetSelected();
  }

  remove() {
    this.categories.remove(this.selectedCat);
    this.resetSelected();
  }

  resetSelected() {
    this.selectedCat = null;
    this.selectedIndex = null;
    this._input = '';
  }

}
