import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, concatMap, find, first, map } from 'rxjs';
import { RecipesListItem } from '../models/recipesListItem';
import { Recipe } from '../models/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipesService {
  private recipesLS!: string | null;

  private recipesSubj$ = new BehaviorSubject<Recipe[]>([]);
  private recipesListSubj$ = new BehaviorSubject<RecipesListItem[]>([]);

  recipes: Observable<Recipe[]> = this.recipesSubj$.asObservable();
  recipesList: Observable<RecipesListItem[]> = this.recipesListSubj$.asObservable();

  constructor() {
    this.refreshMockBackend();
  }

  refreshMockBackend() {
    this.recipesLS = localStorage.getItem('recipes');
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

    this.recipesSubj$.next(recipes);
    this.recipesListSubj$.next(recipesList);
  }

  getRecipe(id: string): Observable<Recipe> {
    this.refreshMockBackend();
    return this.recipes.pipe(
      map(recipes => {
        const recipe = recipes.filter(r => r.id === id)[0];
        if (recipe) {
          return recipe;
        }
        else {
          throw new Error('No recipe for given id');
        }
      })
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
