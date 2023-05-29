import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  //{
  //  path: "",
  //  loadChildren: () => import("./auth/auth.module").then((m) => m.AuthModule),
  //},
  {
    path: "recipes",
    loadChildren: () => import("./recipes/recipes.module").then((m) => m.RecipesModule),
  },
  {
    path: "**",
    redirectTo: "/recipes/recipe/",
    pathMatch: "full",
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
