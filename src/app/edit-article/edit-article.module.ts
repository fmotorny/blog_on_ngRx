import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditArticleComponent } from './components/edit-article/edit-article.component';
import {ArticleFormModule} from '../shared/modules/article-form/article-form.module';
import {LoadingModule} from '../shared/modules/loading/loading.module';
import {EffectsModule} from '@ngrx/effects';
import {StoreModule} from '@ngrx/store';
import {UpdateArticleEffect} from './store/effects/updateArticle.effect';
import {GetArticleEffect} from './store/effects/getArticle.effect';
import {reducers} from './store/reducers';
import {RouterModule} from '@angular/router';




const routes = [
  {
    path: 'article/:slug/edit',
    component: EditArticleComponent
  }
];

@NgModule({
  declarations: [EditArticleComponent],
  imports: [
    CommonModule,
    ArticleFormModule,
    LoadingModule,
    EffectsModule.forFeature([UpdateArticleEffect, GetArticleEffect]),
    StoreModule.forFeature('editArticle', reducers),
    RouterModule.forChild(routes)
  ],
  exports: [EditArticleComponent]
})
export class EditArticleModule { }
