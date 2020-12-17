/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getSettings
// ====================================================

export interface getSettings_setting_main_categories {
  __typename: "Category";
  id: string;
  title: string | null;
}

export interface getSettings_setting {
  __typename: "Settings";
  site_title: string | null;
  main_categories: (getSettings_setting_main_categories | null)[] | null;
}

export interface getSettings {
  setting: getSettings_setting | null;
}
