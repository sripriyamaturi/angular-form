import { Action } from '@ngrx/store';
import { person } from './app.model';
import * as personActions from './app.actions';

const initialState: person = {
  firstName: 'priya',
  lastName: 'maturi',
  isDelete: false,
  isEdit: false,
  id: 1,
  gender: 'female',
};

export function reducer(
  state: person[] = [initialState],
  action: personActions.personActions
) {
  switch (action.type) {
    case personActions.ADD:
      return [...state, action.payload];
    default:
      return state;
  }
}
