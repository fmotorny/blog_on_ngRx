import {Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges} from '@angular/core';
import {getFeedAction} from '../../store/actions/getFeed.action';
import {Observable, Subscription} from 'rxjs';
import {GetFeedResponseInterface} from '../../types/get-feed-response.interface';
import {select, Store} from '@ngrx/store';
import {errorSelector, feedSelector, isLoadingSelector} from '../../store/selectors';
import {environment} from '../../../../../../environments/environment';
import {ActivatedRoute, Params, Router} from '@angular/router';
import {parseUrl, stringify} from 'query-string';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.scss']
})
export class FeedComponent implements OnInit, OnDestroy, OnChanges {

  @Input('apiUrl') apiUrlProps: string;

  feed$: Observable<GetFeedResponseInterface | null>;
  error$: Observable<string | null>;
  isLoading$: Observable<boolean>;

  limit = environment.limit;
  baseUrl: string;
  queryParamsSubscription: Subscription;
  currentPage: number;

  constructor(private store: Store, private router: Router,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.initializeValues();
    this.fetchFeed();
    this.initializeListeners();
  }

  //test commit
  //test cyrr22

  // tslint:disable-next-line:typedef
  ngOnChanges(changes: SimpleChanges) {

    const isApiUrlChanged = !changes.apiUrlProps.firstChange && changes.apiUrlProps.currentValue !== changes.apiUrlProps.previousValue;
    if (isApiUrlChanged) {
      this.fetchFeed();
    }
  }

  initializeListeners(): void {
    this.queryParamsSubscription = this.route.queryParams.subscribe(
      (params: Params) => {
        this.currentPage = Number(params.page || '1');
        this.fetchFeed();
      }
    )
  }

  initializeValues(): void {
    this.feed$ = this.store.pipe(select(feedSelector));
    this.error$ = this.store.pipe(select(errorSelector));
    this.isLoading$ = this.store.pipe(select(isLoadingSelector));
    this.baseUrl = this.router.url.split('?')[0];
  }

  ngOnDestroy(): void {
    this.queryParamsSubscription.unsubscribe();
  }

  fetchFeed(): void {

    setTimeout(() => {
      const offset = (this.currentPage * this.limit) - this.limit;

      const parsedUrl = parseUrl(this.apiUrlProps);

      const stringifiedParams = stringify({
        limit: this.limit,
        offset,
        ...parsedUrl.query
      });
      const apiUrlWithParams = `${parsedUrl.url}?${stringifiedParams}`;
      this.store.dispatch(getFeedAction({url: apiUrlWithParams}));
    }, 100)


  }

}
