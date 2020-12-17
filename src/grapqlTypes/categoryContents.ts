/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: categoryContents
// ====================================================

export interface categoryContents_category_articles {
  __typename: "Article";
  id: string;
  title: string | null;
  summary: string | null;
}

export interface categoryContents_category_children {
  __typename: "Category";
  id: string;
  title: string | null;
  description: string | null;
}

export interface categoryContents_category {
  __typename: "Category";
  id: string;
  title: string | null;
  description: string | null;
  articles: (categoryContents_category_articles | null)[] | null;
  children: (categoryContents_category_children | null)[] | null;
}

export interface categoryContents {
  category: categoryContents_category | null;
}

export interface categoryContentsVariables {
  id: string;
}
