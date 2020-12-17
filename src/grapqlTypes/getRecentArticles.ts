/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getRecentArticles
// ====================================================

export interface getRecentArticles_articles {
  __typename: "Article";
  id: string;
  title: string | null;
  summary: string | null;
  created_at: any;
}

export interface getRecentArticles {
  articles: (getRecentArticles_articles | null)[] | null;
}
