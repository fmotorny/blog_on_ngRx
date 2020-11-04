import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {select, Store} from '@ngrx/store';
import {registerAction} from '../../store/actions/register.action';
import {Observable} from 'rxjs';
import {isSubmittingSelector, validationErrorSelector} from '../../store/selectors';
import {RegisterRequestInterface} from '../../../shared/types/registerRequest.interface';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
// import {registerAction} from "../../store/actions/register.action";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  form: FormGroup;
  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;


  constructor(private fb: FormBuilder, private store: Store) {}

  ngOnInit(): void {
   this.initializeForm();

   this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
   this.backendErrors$ = this.store.pipe(select(validationErrorSelector));
  }

  initializeForm(): void {
    console.log('initializeForm')
    this.form = this.fb.group({
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit(): void {
    console.log('submit', this.form.value, this.form.valid);
    const request: RegisterRequestInterface = {
      user: this.form.value
    };
    this.store.dispatch(registerAction({request}));
  }
}
