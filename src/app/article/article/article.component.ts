import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { responsePathAsArray } from 'graphql';
import { Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Article, SiteDataService } from 'src/app/site-data.service';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  preserveWhitespaces: true
})
export class ArticleComponent implements OnInit, OnDestroy {

  article?: Article;
  subscription!: Subscription;
  is404 = false;

  constructor(private route: ActivatedRoute,
    private siteDataService: SiteDataService) { }

  ngOnInit(): void {
    const stream$ = this.route.paramMap.pipe(
      switchMap(params =>
        this.siteDataService.getArticle(params.get('id')!).valueChanges
      ),
      tap(response => {
        if (!response.loading && !response.data?.article) {
          this.is404 = true;
        } else {
          this.is404 = false;
        }
      }),
      map(response => response.data.article),
      filter(response => !!response)
    );

    this.subscription = stream$.subscribe(article => this.article = article);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
