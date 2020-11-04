import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EffectsModule} from '@ngrx/effects';
import {GetArticleEffect} from './store/effects/getArticle.effect';
import {StoreModule} from '@ngrx/store';
import { ArticleComponent } from './components/article/article.component';
import {RouterModule} from '@angular/router';
import {reducers} from './store/reducers';
import {ErrorMessageModule} from '../shared/modules/errorMessage/error-message.module';
import {LoadingModule} from '../shared/modules/loading/loading.module';
import {TagListModule} from '../shared/modules/tag-list/tag-list.module';
import {ArticleService} from './services/article.service';
import {DeleteArticleEffect} from './store/effects/deleteArticle.effect';


const routes = [
  {
    path: 'article/:slug',
    component: ArticleComponent
  }
]


@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetArticleEffect, DeleteArticleEffect]),
    StoreModule.forFeature('article', reducers),
    RouterModule.forChild(routes),
    ErrorMessageModule,
    LoadingModule,
    TagListModule
  ],
  exports: [ArticleComponent],
  providers: [ArticleService]
})
export class ArticleModule { }
