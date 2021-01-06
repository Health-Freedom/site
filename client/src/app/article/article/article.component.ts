import { Component, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { SiteDataService } from 'src/app/site-data.service';
import { getArticle_article } from 'src/grapqlTypes/getArticle';

@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.scss'],
  preserveWhitespaces: true
})
export class ArticleComponent implements OnInit, OnDestroy {

  article?: getArticle_article|null;
  subscription!: Subscription;
  is404 = false;

  constructor(private route: ActivatedRoute,
    private siteDataService: SiteDataService,
    private sanitizer: DomSanitizer,
    private renderer: Renderer2) { }

  get articleText() {
    return this.sanitizer.bypassSecurityTrustHtml(this.article?.body ?? '');
  }

  get videoSource() {
    const rawSource = this.article?.video_source;

    if (!rawSource) {
      return null;
    }

    if (rawSource.toLowerCase().includes('iframe')) {
      const newNode = this.renderer.createElement('div') as HTMLDivElement;
      newNode.innerHTML = rawSource;
      newNode.querySelector('iframe')?.classList.add('aspect-ratio--object');

      return this.sanitizer.bypassSecurityTrustHtml(newNode.innerHTML);
    }

    return null;
  }

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
