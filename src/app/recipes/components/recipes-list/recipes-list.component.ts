import { Component, OnInit } from '@angular/core';
import { BehaviorSubject, Subscription, debounceTime, distinctUntilChanged, filter } from 'rxjs';
import { Modals } from 'src/app/_core/models/modals.enum';
import { RecipesListItem } from 'src/app/_core/models/recipesListItem';
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

  _search!: string;
  _search$ = new BehaviorSubject(this._search);
  searchSubscription!: Subscription;
  set search(value: string) {
    this._search = value;
    this._search$.next(this._search);
  }

  currentSortingSetting: string = 'Сначала недорогие';
  sortDropdownExpanded: boolean = false;

  constructor(
    private recipesService: RecipesService,
    private modalService: ModalService
  ) { }

  ngOnInit() {
    this.recipesService.getRecipesList().subscribe(
      response => {
        this.recipes = response;
        this.filteredRecipes = response;
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
  }

  ngOnDestroy() {
    this.searchSubscription.unsubscribe();
  }

  filterInList(text: string) {
    return this.recipes.filter(
      recipe => recipe.title.toLocaleLowerCase().includes(text.toLowerCase())
    );
  }

  toggleSortDropdown() {
    this.sortDropdownExpanded = !this.sortDropdownExpanded;
  }

  sortList(sortSetting: string) {
    this.toggleSortDropdown();
    this.currentSortingSetting = sortSetting;
  }

  open() {
    this.modalService.openModal(Modals.EditRecipeModal);
  }

}
