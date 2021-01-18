import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article/article.component';
import { MarkdownModule } from 'ngx-markdown';
import { VideoPlayerService } from './video-player.service';
import { ScriptLoaderModule } from 'ngx-script-loader';


@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    MatToolbarModule,
    VideoPlayerService,
    ScriptLoaderModule,
    MarkdownModule.forChild()
  ]
})
export class ArticleModule { }
