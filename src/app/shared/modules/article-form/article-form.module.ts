import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleFormComponent } from './components/article-form/article-form.component';
import {ReactiveFormsModule} from '@angular/forms';
import {ErrorMessageModule} from '../errorMessage/error-message.module';
import {BackendErrorMessagesModule} from '../backendErrorMessages/backendErrorMessages.module';



@NgModule({
  declarations: [ArticleFormComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ErrorMessageModule,
    BackendErrorMessagesModule
  ],
  exports: [ArticleFormComponent]
})
export class ArticleFormModule { }
