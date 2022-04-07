import { Injectable } from "@angular/core";
import { Action } from "@ngrx/store";
import {person} from './app.model'

export const ADD = '[person] Add'
export const REMOVE  = '[person] Remove'
export const EDIT = '[person] Edit'

export class AddPerson implements Action {
    readonly type = ADD;
    constructor(public payload: person) {}
}

export class RemovePerson implements Action {
    readonly type = REMOVE;
    constructor(public payload: number) {}
}

export class EditPerson implements Action {
    readonly type = EDIT;
    constructor(public index: number, public person: person) {}
}
export type personActions = AddPerson | RemovePerson | EditPerson