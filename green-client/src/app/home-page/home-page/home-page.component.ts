import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';
import {Observable} from 'rxjs';
import { Article, ArticlesResponse, SiteDataService } from 'src/app/site-data.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  mostRecentArtices$!: Observable<Article[]>;

  constructor(private siteData: SiteDataService) { }

  ngOnInit(): void {
    this.mostRecentArtices$ = this.siteData.getMostRecentArticles().valueChanges.pipe(
      map(response => response.data?.articles)
    )
  }

}
