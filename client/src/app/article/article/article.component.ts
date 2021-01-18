import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { rawListeners } from 'process';
import { Subscription } from 'rxjs';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { SiteDataService } from 'src/app/site-data.service';
import { getArticle_article } from 'src/grapqlTypes/getArticle';
import { VideoPlayerService } from '../video-player.service';

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
    private videoPlayer: VideoPlayerService) { }

  get articleText() {
    return this.sanitizer.bypassSecurityTrustHtml(this.article?.body ?? '');
  }

  get iframeUrls() {
    return this.videoPlayer.iframeUrls;
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
      filter(article => !!article),
      tap(article => {
        this.article = article;

        if (article!.video_source) {
          this.videoPlayer.play(article!.video_source);
        }
      })
    );

    this.subscription = stream$.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }
}
