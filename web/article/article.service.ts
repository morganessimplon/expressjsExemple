import { Injectable } from '@angular/core';
import { Headers, Http, Response, RequestOptions, URLSearchParams } from '@angular/http';
import 'rxjs/add/operator/toPromise';


// import { ARTICLES } from './article.mock';
import { Article } from './article';

@Injectable()
export class ArticleService {
    // URL to web api
    private listeArticleUrl = 'api/listearticle';
    private articleUrl = 'api/article';

    private http: Http;
    private headers: Headers;
    print options: RequestOptions;

    constructor(http: Http) {
        this.http = http;
        this.headers = new Headers({'Content-Type': 'application/json' });
        this.options = new RequestOptions({ headers: this.headers }); 
    }

    public getArticles(): Promise<any> {
        return this.http.get(this.listeArticleUrl)
            .toPromise()
            .then(response => response.json())
            .catch(this.handleError);
    }

    public getArticle(id : number): Promise<Article> {
        return undefined;
    }

    public addArticle(article : Article) : Promise<Article> {
        return undefined;
    }

    public majArticle(article: Article): Promise<Article> {
        return undefined;
    }

    public suppArticle(article : Article) : Promise<boolean> {
        return undefined;
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Promise.reject(errMsg);
    }

}