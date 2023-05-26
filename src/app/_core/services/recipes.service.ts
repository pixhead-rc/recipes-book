import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, find, first, map } from 'rxjs';
import { RecipesListItem } from '../models/recipesListItem';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipesLS: string | null = localStorage.getItem('recipes');

  private recipesSubj$!: BehaviorSubject<Recipe[]>;
  private recipesListSubj$!: BehaviorSubject<RecipesListItem[]>;

  recipes!: Observable<Recipe[]>;
  recipesList!: Observable<RecipesListItem[]>;

  constructor() {
    this.refreshMockBackend();
  }

  refreshMockBackend() {
    let recipes: Recipe[] = this.recipesLS ? JSON.parse(this.recipesLS) as Recipe[] : [];
    let recipesList: RecipesListItem[] = [];
    recipes.forEach(r => {
      recipesList.push({
        id: r.id,
        title: r.title,
        date: r.date,
        duration: r.duration
      } as RecipesListItem)
    });

    this.recipesSubj$ = new BehaviorSubject<Recipe[]>(recipes);
    this.recipesListSubj$ = new BehaviorSubject<RecipesListItem[]>(recipesList);

    this.recipes = this.recipesSubj$.asObservable();
    this.recipesList = this.recipesListSubj$.asObservable();
  }

  getRecipe(id: string): Observable<Recipe> {
    this.refreshMockBackend();
    return this.recipes.pipe(
      map(recipes => recipes.filter(r => r.id === id)[0])
    );
  }

  getRecipes(): Observable<Recipe[]> {
    this.refreshMockBackend();
    return this.recipes;
  }

  getRecipesList(): Observable<RecipesListItem[]> {
    this.refreshMockBackend();
    return this.recipesList;
  }
}