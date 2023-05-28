export class Recipe {
    id!: string;
    date!: Date;
    duration!: number;
    title!: string;
    subtitle!: string;
    description!: string;
    ingredients: Ingredient[] = [];
    steps: Step[] = [];
}

export class Ingredient {
    name!: string;
    value!: string;
    valueType!: ValueTypes;
}

export class Step {
    value!: string;
}

export enum ValueTypes {
    'Count',
    'Weight',
    'Volume',
    'Spoons',
    'Any'
}
