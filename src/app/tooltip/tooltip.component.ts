import {Component, OnChanges, OnDestroy, Input, Output, EventEmitter, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-tooltip',
  templateUrl: './tooltip.component.html',
  styleUrls: ['./tooltip.component.css']
})
export class TooltipComponent implements OnChanges, OnDestroy {


  @Input()
  title = '';
  @Input() isSelected = false;
  _isSelected: boolean;
  @Output() add = new EventEmitter();
  @Output() update = new EventEmitter();
  @Output() remove = new EventEmitter();

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.isSelected) {
      this._isSelected = changes.isSelected.currentValue;
    }
  }

  ngOnDestroy() {
    this._isSelected = false;
  }

}
