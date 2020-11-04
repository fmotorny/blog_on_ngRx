import {Component, OnDestroy, OnInit} from '@angular/core';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {combineLatest, Observable, Subscription} from 'rxjs';
import {currentUserSelector} from '../../../auth/store/selectors';
import {CurrentUserInterface} from '../../../shared/types/currentUser.interface';
import {getArticleAction} from '../../store/actions/getArticle.action';
import {select, Store} from '@ngrx/store';
import {ActivatedRoute} from '@angular/router';
import {delay, map} from 'rxjs/operators';
import {articleSelector, errorSelector, isLoadingSelector} from '../../store/selectors';
import {deleteArticleAction} from '../../store/actions/deleteArticle.action';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss']
})
export class ArticleComponent implements OnInit, OnDestroy {
  slug: string;
  article: ArticleInterface | null;
  articleSubscription: Subscription;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;
  isAuthor$: Observable<boolean>;
  constructor(private store: Store, private routeActivated: ActivatedRoute) { }

  ngOnInit(): void {
    this.initializeValues();
    this.initializeListeners();
    this.fetchData();
  }

  ngOnDestroy(): void {
    this.articleSubscription.unsubscribe();
  }

  initializeValues(): void {
    this.slug = this.routeActivated.snapshot.paramMap.get('slug');
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector))
    this.isAuthor$ = combineLatest(
      this.store.pipe(select(articleSelector)),
      this.store.pipe(select(currentUserSelector))
    ).pipe(
      map(
        ([article, currentUser]: [
          ArticleInterface | null,
          CurrentUserInterface | null
        ]) => {
          if (!article || !currentUser) {
            return false;
          }
          return currentUser.username === article.author.username;
        }
      )
    );
  }

  initializeListeners(): void {
    this.articleSubscription = this.store
      .pipe(select(articleSelector))
      .subscribe((article: ArticleInterface | null) => {
        this.article = article;
      });
  }

  fetchData(): void {
    this.store.dispatch(getArticleAction({slug: this.slug}));
  }

  deleteArticle(): void {
    this.store.dispatch(deleteArticleAction({slug: this.slug}));
  }

}
