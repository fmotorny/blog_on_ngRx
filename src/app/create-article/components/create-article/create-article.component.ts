import { Component, OnInit } from '@angular/core';
import {ArticleInputInterface} from '../../../shared/types/articleInput.interface';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {errorSelector, isLoadingSelector} from '../../store/selectors';
import {createArticleAction} from '../../store/actions/createArticleaction';

@Component({
  selector: 'app-create-article',
  templateUrl: './create-article.component.html',
  styleUrls: ['./create-article.component.scss']
})
export class CreateArticleComponent implements OnInit {
  initialValues: ArticleInputInterface = {
    title: '',
    description: '',
    body: '',
    tagList: []
  };

  isSubmitting$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>;

  constructor(private store: Store) { }


  ngOnInit(): void {
    this.isSubmitting$ = this.store.pipe(select(isLoadingSelector));
    this.backendErrors$ = this.store.pipe(select(errorSelector));
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(createArticleAction({articleInput}));
  }

}
