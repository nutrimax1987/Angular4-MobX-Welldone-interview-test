import {Component, ElementRef, NgZone, OnInit, ViewChild} from '@angular/core';
import {} from 'googlemaps';
import {FormControl} from '@angular/forms';
import {MapsAPILoader} from '@agm/core';
import {Categories} from '../category/category.store';
import {Locations} from './location.store';
import {Location} from './location.interface';

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.css']
})
export class LocationComponent implements OnInit {

  public _search = '';
  public selectedCategory = null;
  public _locationsOnMap: Location[] = [];
  public _categories = [];
  public location: Location;
  public selectedLocation: Location;
  public searchControl: FormControl;
  public zoom: number;
  public selectedIndex = null;
  public selectedCatIndex = null;
  @ViewChild('search')
  public searchElementRef: ElementRef;

  constructor(
    public categories: Categories,
    public locations: Locations,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone
  ) {
    this._categories = categories.getAll.map(cat => cat.name);
    this.initLocation();
  }

  ngOnInit() {
    if (this._categories && this._categories.length) {
      if (this._categories[0]) {
        this.selectCategory(this._categories[0]);
        this.locations.filterBy(this._categories[0]);
        this._locationsOnMap = this.locations.getAll;
      }
    }
    // set google maps defaults
    this.zoom = 2;
    // create search FormControl
    this.searchControl = new FormControl();
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ['address']
      });
      autocomplete.addListener('place_changed', () => {
        this.ngZone.run(() => {
          // get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();
          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }
          this.selectedIndex = null;
          this.selectedCatIndex = null;
          this.setLocation(place);
          this.addToMap(this.location);
          this.zoom = 2;
        });
      });
    });
  }

  setLocation(location) {
    this.location.name = location.name;
    this.location.address = location.formatted_address || location.address;
    this.location.lat = location.geometry ? location.geometry.location.lat() : location.lat;
    this.location.lng = location.geometry ? location.geometry.location.lng() : location.lng;
    this.location.category = location.types ? location.types[0] : location.category;
    this.selectedCategory = location.types ? location.types[0] : location.category;
  }

  add() {
    const location = {
      name: this.location.name,
      address: this.location.address,
      lat: this.location.lat,
      lng: this.location.lng,
      category: this.location.category || this.selectedCategory || 'No name'
    };
    this.locations.add(location);
    this.categories.add(location.category);
    // this.locations.filterBy(location.category);
    this._locationsOnMap = [];
    this._categories = this.categories.getAll.map(cat => cat.name);
    this.initLocation();
  }

  update() {
    this.locations.update(this.selectedLocation, this.location);
    this.initLocation();
    this.selectedIndex = null;
  }

  remove() {
    this.locations.remove(this.location);
    this.removeFromMap(this.location);
    this.initLocation();
    this._search = '';
    this.selectedCategory = null;
  }

  setSelected(location, index) {
    if (this.selectedIndex === index) {
      this.selectedIndex = null;
      this.initLocation();
    } else {
      this.location = location;
      this.selectedIndex = index;
    }
  }

  initLocation() {
    this.location = {
      name: '',
      address: '',
      lat: null,
      lng: null,
      category: null
    };
    this.selectedLocation = null;
    this._search = '';
  }

  addToMap(location) {
    this._locationsOnMap.push(location);
  }

  removeFromMap(location) {
    const index = this._locationsOnMap.indexOf(location);
    this._locationsOnMap.splice(index, 1);
  }

  searchResult($event) {
    if ($event) {
      this._search = $event.target.value;
    }
    if (this._search === '') {
      this.initLocation();
    }
  }

  selectLocationOnMap($event) {
    if ($event) {
      window.navigator.vibrate(1000);
    }
  }

  onLocationDrag(m) {
    this.location.lat = m.lat;
    this.location.lat = m.lng;
    this.addToMap(this.location);
  }

  onMapClick($event) {
    this.location.lat = $event.coords.lat;
    this.location.lat = $event.coords.lng;
    this.addToMap(this.location);
  }

  onCategoryClick(name, index) {
    this.selectCategory(name, index);
    this.locations.filterBy(this.selectedCategory);
    this._locationsOnMap = this.selectedCategory ? this.locations.getAll : [];
  }

  onLocationClick(loc: Location, index?: number) {
    if (this.selectedIndex === index) {
      this.selectedIndex = null;
      this.initLocation();
    } else {
      this.selectedIndex = index;
      this.selectedLocation = loc;
      this.selectedCategory = loc.category;
      this.selectCategory(loc.category);
      this.setLocation(loc);
      this.removeFromMap(loc);
      this.addToMap(loc);
    }
  }

  selectCategory(param, index?: number) {
    if (this.selectedCatIndex === index) {
      this.selectedCatIndex = null;
      this.selectedCategory = null;
      this.selectedIndex = null;
      this._locationsOnMap = [];
      return;
    }
    if (index === undefined) {
      this._categories.map((catName, i) => {
        if (catName === param) {
          this.selectedCatIndex = i;
          return;
        }
      });
    } else {
      this.selectedCatIndex = index;
    }
    this.selectedCategory = param;
  }

}

