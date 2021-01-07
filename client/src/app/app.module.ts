import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { AppMainComponent } from './app-main/app-main.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { CategoryModule } from './category/category.module';
import { ArticleModule } from './article/article.module';
import { MarkdownModule } from 'ngx-markdown';
import { InvalidRouteComponent } from './invalid-route/invalid-route.component';
import { HomePageModule } from './home-page/home-page.module';
import { DonateModule } from './donate/donate.module';
import { StripeModule } from 'stripe-angular';
import { ExemptionFormModule } from './exemption-form/exemption-form.module';

@NgModule({
  declarations: [
    AppComponent,
    AppMainComponent,
    InvalidRouteComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    GraphQLModule,
    MarkdownModule.forRoot(),
    HttpClientModule,
    LayoutModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    CategoryModule,
    ArticleModule,
    DonateModule,
    ExemptionFormModule,
    HomePageModule,
    AppRoutingModule,
    StripeModule.forRoot('')
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
