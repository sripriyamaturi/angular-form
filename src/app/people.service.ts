import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

interface person {
  firstName: string;
  lastName: string;
  isDelete: boolean;
  isEdit: boolean;
  id: number | null;
  gender: string;
}

@Injectable()
export class PeopleService {
  public Subj = new Subject<person>();
  public personSub = new Subject<person[]>();
  people: person[] = [
    {
      firstName: 'Priya',
      lastName: 'M',
      isDelete: false,
      isEdit: false,
      id: 1,
      gender: 'Female',
    },
    {
      firstName: 'pqrs',
      lastName: 'K',
      isDelete: false,
      isEdit: false,
      id: 2,
      gender: 'Female',
    },
  ];
  constructor() {}

  save(p: person) {
    //let k = this.people.length;
    // let s = this.people[k];
    // console.log('index is : ', s.id + 1);
    p.id = this.people.length + 1;
    this.people.push(p);
    this.people = [...this.people];
    this.personSub.next(this.people);
  }
  updateUser(p: person) {
    var i = this.people.findIndex((x) => x.id === p.id);

    //console.log(i);
    this.people[i] = p;
    console.log('aftre updating', this.people[i]);
    this.people = [...this.people];
    this.people[i].isEdit = false;
    this.personSub.next(this.people);
  }
  deleteUser(i: number) {
    this.people[i].isDelete = true;
    this.people.splice(i, 1);
    return this.people;
  }
}
