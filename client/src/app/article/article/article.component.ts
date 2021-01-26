import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, SecurityContext, ViewChild } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { TransferStateService } from '@scullyio/ng-lib';
import { SeoSocialShareService } from 'ngx-seo';
import { defer, Observable, Subscription } from 'rxjs';
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
export class ArticleComponent implements OnInit, OnDestroy, AfterViewInit {

  article?: getArticle_article | null;

  subscriptions: Subscription[] = [];

  is404 = false;

  @ViewChild('rumbleParent', { static: false }) rumbleParent!: ElementRef;

  articleStream$!: Observable<getArticle_article | null>;

  constructor(private route: ActivatedRoute,
    private siteDataService: SiteDataService,
    private sanitizer: DomSanitizer,
    private videoPlayer: VideoPlayerService,
    private seo: SeoSocialShareService,
    private tss: TransferStateService) {
  }

  get articleText() {
    return this.sanitizer.sanitize(SecurityContext.HTML, this.article?.body ?? '');
  }

  get iframeUrls() {
    return this.videoPlayer.iframeUrls;
  }

  ngAfterViewInit() {
    (this.rumbleParent.nativeElement as HTMLDivElement).appendChild(this.videoPlayer.rumbleElement);

    this.subscriptions.push(this.articleStream$.subscribe(article => {
      if (article!.video_source) {
        this.videoPlayer.play(article!.video_source);
      }
    }));
  }

  ngOnInit(): void {
    const stream = this.route.paramMap.pipe(
      map(params => params.get('id')),
      filter(id => !!id),
      switchMap(id => this.tss.useScullyTransferState(`article${id}`,
        defer(() => this.siteDataService.getArticle(id!).valueChanges
          .pipe(
            filter(response => !response.loading)
          )))));

    this.articleStream$ = stream.pipe(
      tap(response => {
        if (!response.data?.article) {
          this.is404 = true;
        } else {
          this.is404 = false;
        }
      }),
      map(response => response.data.article),
      filter(article => !!article),
      tap(article => {
        this.article = article;

        this.seo.setData({
          title: article!.title ?? 'Article',
          description: article!.summary ?? undefined
        })
      }));

    this.subscriptions.push(this.articleStream$.subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe())
    this.subscriptions = [];
    this.videoPlayer.stop();
  }
}
