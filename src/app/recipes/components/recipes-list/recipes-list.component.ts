import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  currentSortingSetting: string = 'Сначала недорогие';
  sortDropdownExpanded: boolean = false;

  constructor() { }

  ngOnInit() {
  }

  expandSortDropdown() {
    this.sortDropdownExpanded = !this.sortDropdownExpanded;
  }

  sortList(sortSetting: string) {
    this.currentSortingSetting = sortSetting;
  }

}
