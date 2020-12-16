import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { EmptyObject } from 'apollo-angular/types';
import { Subscription } from 'rxjs';

const getMainSettings = gql`
{
  setting {
    site_title
    main_categories {
      id
      title
    }
  }
}
`

const getCategoryDetails = gql`
query categoryContents($id: ID!) {
  category(id: $id) {
    id
    title
    description
    articles {
      id
      title
      summary
    }
    children {
      id
      title
      description
    }
  }
}
`;

const getArticleDetails = gql`
query($id: ID!) {
  article(id: $id) {
    id
    title
    summary
    body
  }
}
`;


@Injectable({
  providedIn: 'root'
})
export class SiteDataService implements OnDestroy {

  private settings!: QueryRef<SettingResponse, EmptyObject>;
  private subscription!: Subscription;
  constructor(private apollo: Apollo) {
    this.settings = this.apollo.watchQuery<SettingResponse>({
      query: getMainSettings
    });

    // We need settings everywhere, so load ASAP.
    this.subscription = this.settings.valueChanges.subscribe();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  getSettings() {
    return this.settings;
  }

  getCategoryDetails(id: string) {
    return this.apollo.watchQuery<CategoryDetailsResponse, IdArgument>(
      {
        query: getCategoryDetails,
        variables: {
          id: id
        }
      }
    );
  }

  getArticle(id: number) {
    //return this.apollo.watchQuery<>();
  }
}

export type SettingResponse = {
  setting: SiteSetting;
}

export type SiteSetting = {
  main_categories: Category[];
  site_title: string;
}

export type CategoryReponse = {
  categories: Category[];
}

export type Category = {
  id: string;
  title: string;
}

export type CategoryDetailsResponse = {
  category: CategoryDetails;
}

export type CategoryDetails = {
  id: string;
  title: string;
  description: string;
  articles: Article[];
  children: Category[];
}

export type ArticleResponse = {
  article: Article;
}

export type Article = {
  id: string;
  title: string;
  summary?: string;
  body?: string;
}

export type IdArgument = {
  id: string;
}