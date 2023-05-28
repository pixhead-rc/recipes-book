export enum Modals {
    EditRecipeModal,
    DeleteRecipeModal
}

export interface ModalState {
    active: boolean;
    context: Map<string, any>;
}