import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { Article, Category, CategoryDetails, SiteDataService } from 'src/app/site-data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-category-route',
  templateUrl: './category-route.component.html',
  styleUrls: ['./category-route.component.scss']
})
export class CategoryRouteComponent implements OnInit {

  articles$!: Observable<Article[]>;
  hasArticlesAndCategories$!: Observable<boolean>;
  childCategories!: Category[];
  category?: CategoryDetails;
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
      this.childCategories = category.children;
    });

    this.articles$ = category$.pipe(
      map(category => category.articles)
    );

    this.hasArticlesAndCategories$ = category$.pipe(
      map(category => !!(category.articles?.length && category.children?.length))
    );
  }

}
