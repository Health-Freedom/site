import { Injectable, OnDestroy, OnInit } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Subscription } from 'rxjs';
import { categoryContents, categoryContentsVariables } from 'src/grapqlTypes/categoryContents';
import { getArticle } from 'src/grapqlTypes/getArticle';
import { getRecentArticles } from 'src/grapqlTypes/getRecentArticles';
import { getSettings, getSettings_setting } from 'src/grapqlTypes/getSettings';

const getMainSettings = gql`
query getSettings {
  setting {
    site_title
    stripe_key
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
query getArticle($id: ID!) {
  article(id: $id) {
    id
    title
    summary
    body
    video_source
  }
}
`;

const getMostRecentArticle = gql`
query getRecentArticles {
  articles(sort: "published_at", limit: 5) {
    id
    title
    summary
    created_at
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class SiteDataService implements OnDestroy {

  private settings!: QueryRef<getSettings>;
  private subscription!: Subscription;
  constructor(private apollo: Apollo) {
    this.settings = this.apollo.watchQuery<getSettings>({
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
    return this.apollo.watchQuery<categoryContents, categoryContentsVariables>(
      {
        query: getCategoryDetails,
        variables: {
          id: id
        }
      }
    );
  }

  getArticle(id: string) {
    return this.apollo.watchQuery<getArticle>(
      {
        query: getArticleDetails,
        returnPartialData: true,
        variables: {
          id: id
        }
      }
    );
  }

  getMostRecentArticles() {
    return this.apollo.watchQuery<getRecentArticles>({
      query: getMostRecentArticle
    });
  }
}