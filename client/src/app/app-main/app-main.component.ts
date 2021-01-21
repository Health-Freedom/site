import { Component, OnDestroy, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable, Subscription } from 'rxjs';
import { first, map, shareReplay } from 'rxjs/operators';
import { SiteDataService, } from '../site-data.service';
import { IdleMonitorService, isScullyRunning } from '@scullyio/ng-lib';

@Component({
  selector: 'app-main',
  templateUrl: './app-main.component.html',
  styleUrls: ['./app-main.component.scss']
})
export class AppMainComponent implements OnInit, OnDestroy {
  siteTitle$!: Observable<string|null>;

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  menuCategories = this.siteDataService.getSettings()
    .valueChanges
    .pipe(map(value => value?.data?.setting?.main_categories));

  subscription!:Subscription;

  constructor(private breakpointObserver: BreakpointObserver,
    private idleMonitorService:IdleMonitorService,
    private siteDataService: SiteDataService) {
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription = this.idleMonitorService.idle$.subscribe(() => {
      window.dispatchEvent(new Event('resize'));
    });

    this.siteTitle$ = this.siteDataService.getSettings().valueChanges.pipe(
      map(settings => settings.data?.setting?.site_title ?? null)
    )

    if (isScullyRunning()) {
      // The desktop-menu-margin class is only added when the site is rendered for mobile.
      // In such case, if the mobile is being presented for desktop, add margin so that the content doesn't jump around.
      const style = `
      app-root-scully .desktop-menu-margin {
        position:relative;
        left: 200px;
      }
      @media ${Breakpoints.Handset} {
        app-root-scully .desktop-menu-margin {
          left: 0;
        }
      }`;
    
      const styleElement = document.createElement('style');
      styleElement.innerHTML = style;
      document.head.append(styleElement);
      } 
    } 
}
