import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RoutesRecognized } from '@angular/router';
import { BehaviorSubject, Subscription, debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { Modals } from 'src/app/_core/models/modals';
import { RecipesListItem } from 'src/app/_core/models/recipesListItem';
import { Sorts } from 'src/app/_core/models/sortsEnum';
import { ModalService } from 'src/app/_core/services/modal.service';
import { RecipesService } from 'src/app/_core/services/recipes.service';

@Component({
  selector: 'recipes-list',
  templateUrl: './recipes-list.component.html',
  styleUrls: ['./recipes-list.component.scss']
})
export class RecipesListComponent implements OnInit {
  recipes: RecipesListItem[] = [];
  filteredRecipes: RecipesListItem[] = [];
  selectedRecipeId!: string | null;

  _search!: string;
  _search$ = new BehaviorSubject(this._search);
  searchSubscription!: Subscription;
  set search(value: string) {
    this._search = value;
    this._search$.next(this._search);
  }

  get sortsArray() {
    return Object.values(Sorts)
  }

  currentSortingSetting: Sorts = Sorts.DateDesc;
  sortDropdownExpanded: boolean = false;

  constructor(
    private recipesService: RecipesService,
    private modalService: ModalService,
    private router: Router
  ) { }

  ngOnInit() {
    this.recipesService.getRecipesList().subscribe(
      response => {
        this.recipes = response;
        this.filteredRecipes = response;
        this.sortList();
      }
    );

    this.searchSubscription = this._search$.asObservable().pipe(
      filter(searchText => !!searchText && searchText.length > 2 || searchText === ''),
      debounceTime(500),
      distinctUntilChanged(),
    ).subscribe(
      searchText => {
        this.filteredRecipes = this.filterInList(searchText);
      }
    );

    this.markSelectedRecipe();
  }

  ngDoCheck() {
    this.markSelectedRecipe();
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  filterInList(text: string) {
    return this.recipes.filter(
      recipe => recipe.title.toLocaleLowerCase().includes(text.toLowerCase())
    );
  }

  sortList() {
    switch (this.currentSortingSetting) {
      case Sorts.DateAsc:
        this.filteredRecipes =  this.filteredRecipes.sort((a, b) => a.date.toString().localeCompare(b.date.toString()));
        break;
      case Sorts.DateDesc:
        this.filteredRecipes =  this.filteredRecipes.sort((a, b) => b.date.toString().localeCompare(a.date.toString()));
        break;
      case Sorts.NameAsc:
        this.filteredRecipes =  this.filteredRecipes.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case Sorts.NameDesc:
        this.filteredRecipes =  this.filteredRecipes.sort((a, b) => b.title.localeCompare(a.title));
        break;
    }
  }

  markSelectedRecipe() {
    this.selectedRecipeId = this.router.url.split('/')[this.router.url.split('/').length - 1];
  }

  openEditModal() {
    this.modalService.openModal(Modals.EditRecipeModal);
  }

}
