import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-tag-feed',
  templateUrl: './tag-feed.component.html',
  styleUrls: ['./tag-feed.component.scss']
})
export class TagFeedComponent implements OnInit {
  tagName: string;
  apiUrl: string;
  constructor(private routeActivated: ActivatedRoute) { }

  ngOnInit(): void {
    this.tagName = this.routeActivated.snapshot.paramMap.get('slug');
    this.apiUrl = `/articles?tag=${this.tagName}`;

    this.routeActivated.params.subscribe((params: Params) => {
      this.tagName = params.slug;
      this.apiUrl = `/articles?tag=${this.tagName}`;
    });
  }

}
