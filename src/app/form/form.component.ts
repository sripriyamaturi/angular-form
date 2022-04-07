import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PeopleService } from '../people.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { person } from '../app.model';
import { AppState } from '../app.state';
import * as personActions from '../app.actions';

// interface person {
//   firstName: string;
//   lastName: string;
//   isDelete: boolean;
//   isEdit: boolean;
//   id: number | null;
//   gender: string;
// }

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  tutorials: Observable<person[]>;
  details: FormGroup;
  people: any = [];
  user: person = {
    firstName: '',
    lastName: '',
    isDelete: false,
    isEdit: false,
    id: null,
    gender: '',
  };
  operation: string;
  constructor(
    fb: FormBuilder,
    private serv: PeopleService,
    private store: Store<AppState>
  ) {
    this.tutorials = store.select('tutorial');
    this.details = fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      gender: [''],
    });
  }

  ngOnInit() {
    this.serv.Subj.subscribe((a) => {
      let newU: person = {
        firstName: '',
        lastName: '',
        isDelete: false,
        isEdit: false,
        id: null,
        gender: '',
      };
      this.user = Object.assign(newU, a);
      console.log('form populated with user -');
      console.log(this.user);
    });
  }

  saveDetails(): void {
    this.user = this.details.value;
    this.store.dispatch(new personActions.AddPerson(this.user));
    //this.user = this.details.value;
    // this.serv.personSub.next(this.user);
    const u: person = Object.assign({}, this.user);
    const newRow = this.details.value;
    this.people = this.serv.save(u);
    console.log('clicked on submit, details are -');
    console.log(this.user);
    this.details.reset();
  }
  update(u: person) {
    this.user.isEdit = false;
    const updatedU: person = Object.assign({}, u);
    console.log('clicked on update and new user details are - ', u);
    this.serv.updateUser(updatedU);

    this.details.reset();
  }
}
