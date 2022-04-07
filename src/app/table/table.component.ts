import { Component, OnInit } from '@angular/core';

import { PeopleService } from '../people.service';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { person } from '../app.model';
import { AppState } from '../app.state';

//interface person {
// firstName: string;
//lastName: string;
// isDelete: boolean;
//isEdit: boolean;
//id: number | null;
//gender: string;
//}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent implements OnInit {
  people: any = [];
  tutorials: Observable<person[]>;
  constructor(private serv: PeopleService, private store: Store<AppState>) {
    this.tutorials = store.select('tutorial');
  }
  displayedColumns: string[] = [
    'firstName',
    'lastName',
    'gender',
    'operation',
    'operation1',
  ];

  dataSource = this.serv.people;
  user: person = {
    firstName: '',
    lastName: '',
    isDelete: false,
    isEdit: false,
    id: null,
    gender: '',
  };
  ngOnInit() {
    this.serv.personSub.subscribe((a) => {
      let newU: person[] = [];
      console.log(a);
      this.people = Object.assign(newU, a);
      // this.people = [...this.people];
    });
    //this.people = this.serv.people;
  }

  delete(index: number) {
    console.log('clicked on delete');
    const Task = this.people[index];
    console.log('index of deleted item =', index);
    Task.isDelete = true;
    //setTimeout(() => {
    //  if (Task.isDelete) {
    //    const ind = this.people.indexOf(Task);
    //    this.people.splice(index, 1);
    //  }
    //}, 4000);

    this.people = this.serv.deleteUser(index);
    this.people = [...this.people];
  }

  edit(p: person) {
    console.log('clicked on edit');
    p.isEdit = true;
    this.serv.Subj.next(p);
  }
}
