import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {PopularTagType} from '../types/popularTag.type';
import {environment} from '../../../environments/environment';
import {GetFeedResponseInterface} from '../modules/feed/types/get-feed-response.interface';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {GetPopoularTagsResponseInterface} from '../modules/popular-tags/types/get-popoular-tags';

@Injectable({
  providedIn: 'root'
})
export class PopularTagsService {

  constructor(private http: HttpClient) { }

  getPopularTags(): Observable<PopularTagType[]> {
    const fullUrl = environment.apiUrl + '/tags';
    return this.http.get(fullUrl).pipe(map((response: GetPopoularTagsResponseInterface) => response.tags));
  }
}
