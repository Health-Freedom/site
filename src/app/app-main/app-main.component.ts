import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { SiteDataService, Category, SiteSetting } from '../site-data.service';

@Component({
  selector: 'app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.scss']
})
export class AppMainComponent implements OnInit {
  siteTitle$!: Observable<string>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  menuCategories: Observable<Category[]> = this.siteDataService.getSettings()
    .valueChanges
    .pipe(map(value => value?.data?.setting.main_categories));

  constructor(private breakpointObserver: BreakpointObserver,
    private siteDataService: SiteDataService) {
  }

  ngOnInit(): void {
    this.siteTitle$ = this.siteDataService.getSettings().valueChanges.pipe(
      map(settings => settings.data?.setting?.site_title)
    )
  }

}
