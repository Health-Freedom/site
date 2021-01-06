/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getArticle
// ====================================================

export interface getArticle_article {
  __typename: "Article";
  id: string;
  title: string | null;
  summary: string | null;
  body: string | null;
  video_source: string | null;
}

export interface getArticle {
  article: getArticle_article | null;
}

export interface getArticleVariables {
  id: string;
}
