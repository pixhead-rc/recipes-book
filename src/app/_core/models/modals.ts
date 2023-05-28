export enum Modals {
    EditRecipeModal
}

export interface ModalState {
    active: boolean;
    context: Map<string, any>;
}