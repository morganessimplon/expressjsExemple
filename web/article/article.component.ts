import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Article }    from './article';
import { ArticleService } from './article.service';

@Component({
    selector: 'article-form',
    templateUrl: 'app/article/article.component.html',
    providers: [ArticleService]

})

export class ArticleDetailComponent implements OnInit {
    private _listeArticles: Article[];
    private _articleService: ArticleService;
    private _indiceEnCours: number;
    private _router: Router;
    private error: any;

    constructor(articleService: ArticleService, router: Router) {
        this._articleService = articleService;
        this._router = router;
    }

    @Input() enrArticle: Article;
    titre = 'Saisie article';

    submitted = false;

    ngOnInit() {
        // this._listeArticles = this._articleService.getArticles();
        this._listeArticles = [];

        this._articleService.getArticles()
            .then(articles => {
                this._listeArticles = articles;
                this.setEncours(0);
                });
                .catch(error => this.error = error);
    }

    onSubmit() {
        this.submitted = true;
        if (this.enrArticle.id < 0)
            this._articleService.addArticle(this.enrArticle)
            .then(article => {
                this.enrArticle = article;
                this._listeArticles[this._indiceEnCours] = this.enrArticle;
            });
        else
            this._articleService.majArticle(this.enrArticle)
            .then(article => {
                this.enrArticle = article;
                this._listeArticles[this._indiceEnCours] = this.enrArticle;
            });
    }

    active = true;

    private ajouterArticle() {
        this.enrArticle = new Article(-1, 0, '', 0);
        this.active = false;
        setTimeout(() => this.active = true, 0);
        this._indiceEnCours = this._listeArticles.push(this.enrArticle) - 1;
    }

    private supprimerArticle() {
        if (this.enrArticle.id >= 0)
            this._articleService.supprimerArticle(this.enrArticle.id);
        this._listeArticles.splice(this._indiceEnCours, 1);
        this._listeArticles.splice(this._indiceEnCours, 1);
        if (this._indiceEnCours > 0)
            this._indiceEnCours--;
        this.setEncours(this._indiceEnCours);
    }

    private setEncours(ind: number): void {
        this.enrArticle = this._listeArticles[ind];
        this._indiceEnCours = ind;
    }

    private setSuivant() {
        if (this._indiceEnCours < this._listeArticles.length - 1)
            this.setEncours(++this._indiceEnCours);
    }

    private setPrecedent() {
        if (this._indiceEnCours > 0)
            this.setEncours(--this._indiceEnCours);
    }

}
