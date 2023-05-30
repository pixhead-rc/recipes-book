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

    constructor(ingredient: Ingredient) {
        this.name = ingredient.name;
        this.value = ingredient.value;
        this.valueType = ingredient.valueType;
    }
}

export class Step {
    value!: string;
}

export enum ValueTypes {
    Count = 'шт',
    Weight = 'гр',
    Volume = 'мл',
    Spoons = 'лож',
    Any = 'по вкусу'
}
