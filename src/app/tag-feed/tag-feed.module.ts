import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TagFeedComponent } from './components/tag-feed/tag-feed.component';
import {BannerModule} from '../shared/modules/banner/banner.module';
import {PopularTagsModule} from '../shared/modules/popular-tags/popular-tags.module';
import {FeedTogglerModule} from '../shared/modules/feed-toggler/feed-toggler.module';
import {FeedModule} from '../shared/modules/feed/feed.module';
import {RouterModule} from '@angular/router';



const routes = [
  {
    path: 'tags/:slug',
    component: TagFeedComponent
  }
];

@NgModule({
  declarations: [TagFeedComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    BannerModule,
    PopularTagsModule,
    FeedTogglerModule,
    FeedModule
  ],
  exports: [TagFeedComponent]
})
export class TagFeedModule { }
