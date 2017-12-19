import { Component, OnChanges, Input } from '@angular/core';

@Component({
  selector: 'app-article-viewer',
  templateUrl: './article-viewer.component.html',
  styleUrls: ['./article-viewer.component.scss']
})
export class ArticleViewerComponent implements OnChanges {
  @Input() articles = [];
  @Input() allowSearch = false;

  public activeArticle: any = {};

  // when input changes, view first item
  ngOnChanges() {
    this.view(this.articles[0], 0);
  }

  /**
   * view Mark the given article as active
   * @param {any} article
   * @param {number} index  The index of the article in the articles list
   */
  view(article, index) {
    this.activeArticle = { index, ...article };
  }

  /**
   * getArticle Returns the next item, within the provided direction
   * @param {enum(0,1)} dir = 1
   */
  getArticle(dir = 1) {
    const index = (this.activeArticle.index || 0) + 1 * dir;

    if (!this.articles[index]) {
      return;
    }

    return {
      index,
      ...this.articles[index],
    };
  }

  // get the previous article
  get prevArticle() {
    return this.getArticle(-1);
  }

  // get the next article
  get nextArticle() {
    return this.getArticle();
  }
}
