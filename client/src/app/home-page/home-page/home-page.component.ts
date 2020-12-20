import { Component, OnInit } from '@angular/core';
import { filter, map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { SiteDataService } from 'src/app/site-data.service';
import { getRecentArticles_articles } from 'src/grapqlTypes/getRecentArticles';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  mostRecentArtices$!: Observable<(getRecentArticles_articles | null)[]>;

  constructor(private siteData: SiteDataService) { }

  ngOnInit(): void {
    this.mostRecentArtices$ = this.siteData.getMostRecentArticles().valueChanges.pipe(
      map(response => response.data?.articles ?? []),
    )
  }

}
