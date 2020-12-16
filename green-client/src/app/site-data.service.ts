import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SiteDataService implements OnInit, OnDestroy {

  private settings!: QueryRef<SettingResponse, EmptyObject>;
  private subscription!: Subscription;
  constructor(private apollo: Apollo) { }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.settings = this.apollo.watchQuery<SettingResponse>({
      query: gql`
      {
        setting {
          main_categories {
            id
            title
          }
        }
      }
`
    });

    // We need settings everywhere, so load ASAP.
    this.subscription = this.settings.valueChanges.subscribe();
  }

  getSettings() {
    return this.settings;
  }

  getCategory(id: number) {

  }

  getArticle(id: number) {

  }
}

type SettingResponse = {
  setting: Setting;
}

type Setting = {
  main_categories: Category[];
}

type CategoryReponse = {
  categories: Category[];
}

type Category = {
  id: string;
  title: string;
}