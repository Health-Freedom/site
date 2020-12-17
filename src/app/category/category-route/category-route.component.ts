import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { SiteDataService } from 'src/app/site-data.service';
import { Observable } from 'rxjs';
import { categoryContents_category, categoryContents_category_articles, categoryContents_category_children } from 'src/grapqlTypes/categoryContents';

@Component({
  selector: 'app-category-route',
  templateUrl: './category-route.component.html',
  styleUrls: ['./category-route.component.scss']
})
export class CategoryRouteComponent implements OnInit {

  articles$: Observable<(categoryContents_category_articles|null)[]|null>|null= null;
  hasArticlesAndCategories$!: Observable<boolean>;
  childCategories: (categoryContents_category_children|null)[]|null = null;
  category: categoryContents_category | null = null;
  is404 = false;

  constructor(private route: ActivatedRoute,
    private siteDataService: SiteDataService) { }

  ngOnInit(): void {
    const category$ = this.route.paramMap.pipe(
      switchMap(params =>
        this.siteDataService.getCategoryDetails(params.get('id')!).valueChanges
      ),
      tap(response => {
        if (!response.loading && !response.data?.category) {
          this.is404 = true;
        } else {
          this.is404 = false;
        }
      }),
      map(response => response.data.category),
      filter(response => !!response)
    );

    category$.subscribe(category => {
      this.category = category;
      this.childCategories = category?.children ?? null
    });

    this.articles$ = category$.pipe(
      map(category => category?.articles ?? null)
    );

    this.hasArticlesAndCategories$ = category$.pipe(
      map(category => !!(category?.articles?.length && category.children?.length))
    );
  }

}
