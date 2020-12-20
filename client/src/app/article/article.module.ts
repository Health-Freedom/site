import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';

import { ArticleRoutingModule } from './article-routing.module';
import { ArticleComponent } from './article/article.component';
import { MarkdownModule } from 'ngx-markdown';


@NgModule({
  declarations: [ArticleComponent],
  imports: [
    CommonModule,
    ArticleRoutingModule,
    MatToolbarModule,
    MarkdownModule.forChild()
  ]
})
export class ArticleModule { }
