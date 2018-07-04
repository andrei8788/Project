import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {fadeStateTrigger} from '../../shared/animations/fade.animation';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css'],
  animations: [fadeStateTrigger]
})
export class ContactsComponent implements OnInit {

  form: FormGroup;

  constructor() { }

  ngOnInit() {
    this.form = new FormGroup({
      'name': new FormControl(null, [Validators.required]),
      'email': new FormControl(null, [Validators.required, Validators.email]),
      'message': new FormControl(null, [])
    });
  }

  onSubmit() {
    console.log(this.form);
  }

}
