import { Component, OnInit } from '@angular/core';
import { RecipesListItem } from 'src/app/_core/models/recipesListItem';
import { RecipesService } from 'src/app/_core/services/recipes.service';

@Component({
  selector: 'recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  recipes: RecipesListItem[] = [];

  currentSortingSetting: string = 'Сначала недорогие';
  sortDropdownExpanded: boolean = false;

  constructor(
    private recipesService: RecipesService
  ) { }

  ngOnInit() {
    this.recipesService.getRecipesList().subscribe(
      response => {
        this.recipes = response;
      }
    );
  }

  expandSortDropdown() {
    this.sortDropdownExpanded = !this.sortDropdownExpanded;
  }

  sortList(sortSetting: string) {
    this.currentSortingSetting = sortSetting;
  }

}
