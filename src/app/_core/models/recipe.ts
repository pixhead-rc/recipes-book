export interface Recipe {
    id: string;
    date: Date;
    duration: number;
    title: string;
    subtitle: string;
    description: string;
    ingredients: Ingredient[];
    steps: Step[];
}

export interface Ingredient {
    name: string;
    value: string;
    valueType: ValueTypes;
}

export interface Step {
    value: string;
}

export enum ValueTypes {
    'Count',
    'Weight',
    'Volume'
}
