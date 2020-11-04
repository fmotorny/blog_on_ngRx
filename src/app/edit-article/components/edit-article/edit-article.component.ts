import { Component, OnInit } from '@angular/core';
import {ArticleInputInterface} from '../../../shared/types/articleInput.interface';
import {BackendErrorsInterface} from '../../../shared/types/backendErrors.interface';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {Observable} from 'rxjs';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {updateArticleAction} from '../../store/actions/updateArticle.action';
import {getArticleAction} from '../../store/actions/getArticle.action';
import {filter, map} from 'rxjs/operators';
import {articleSelector, errorSelector, isLoadingSelector, isSubmittingSelector} from '../../store/selectors';

@Component({
  selector: 'app-edit-article',
  templateUrl: './edit-article.component.html',
  styleUrls: ['./edit-article.component.scss']
})
export class EditArticleComponent implements OnInit {

  initialValues$: Observable<ArticleInputInterface>;
  isSubmitting$: Observable<boolean>;
  isLoading$: Observable<boolean>;
  backendErrors$: Observable<BackendErrorsInterface | null>
  slug: string;

  constructor(private store: Store, private routeActivated: ActivatedRoute) {}

  ngOnInit(): void {
    this.initialValues();
    this.fetchData();
  }

  initialValues(): void {
    this.slug = this.routeActivated.snapshot.paramMap.get('slug');
    this.isSubmitting$ = this.store.pipe(select(isSubmittingSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.backendErrors$ = this.store.pipe(select(errorSelector));
    this.initialValues$ = this.store.pipe(
      select(articleSelector),
      filter(Boolean),
      map((article: ArticleInterface) => {
        return {
          title: article.title,
          description: article.description,
          body: article.body,
          tagList: article.tagList
        };
      })
    );
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}));
  }

  onSubmit(articleInput: ArticleInputInterface): void {
    this.store.dispatch(updateArticleAction({slug: this.slug, articleInput}));
  }

}
