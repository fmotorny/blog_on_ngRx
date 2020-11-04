import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PopularTagsService} from '../../services/popular-tags.service';
import {EffectsModule} from '@ngrx/effects';
import {GetPopularTagsEffect} from './store/effects/getPopularTags.effect';
import {StoreModule} from '@ngrx/store';
import { PopularTagsComponent } from './components/popular-tags/popular-tags.component';
import {ErrorMessageModule} from '../errorMessage/error-message.module';
import {LoadingModule} from '../loading/loading.module';
import {RouterModule} from '@angular/router';
import {reducers} from './store/reducers';



@NgModule({
  declarations: [PopularTagsComponent],
  imports: [
    CommonModule,
    EffectsModule.forFeature([GetPopularTagsEffect]),
    StoreModule.forFeature('popularTags', reducers),
    ErrorMessageModule,
    LoadingModule,
    RouterModule
  ],
  exports: [PopularTagsComponent],
  providers: [PopularTagsService]
})
export class PopularTagsModule { }
