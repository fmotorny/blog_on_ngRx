import { Component, OnInit } from '@angular/core';
import {PopularTagType} from '../../../../types/popularTag.type';
import {select, Store} from '@ngrx/store';
import {Observable} from 'rxjs';
import {errorSelector, isLoadingSelector, popularTagsSelector} from '../../store/selectors';
import {getPopularTagsAction} from '../../store/actions/getPopularTags.action';

@Component({
  selector: 'app-popular-tags',
  templateUrl: './popular-tags.component.html',
  styleUrls: ['./popular-tags.component.scss']
})
export class PopularTagsComponent implements OnInit {

  popularTags$: Observable<PopularTagType[] | null>;
  isLoading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchData();
  }

  initializeValues(): void {
    this.popularTags$ = this.store.pipe(select(popularTagsSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.error$ = this.store.pipe(select(errorSelector));
  }

  fetchData(): void {
    this.store.dispatch(getPopularTagsAction());
  }

}
