import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
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

  constructor(private route: ActivatedRoute,
    private siteDataService: SiteDataService) { }

  ngOnInit(): void {
    const stream$ = this.route.paramMap.pipe(
      switchMap(params =>
        this.siteDataService.getArticle(params.get('id')!).valueChanges
      ),
      map(response => response.data.article),
    );

    this.subscription = stream$.subscribe(article => this.article = article);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
