import { Component } from '@angular/core';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { ClientDetailComponent } from './client/client.component';
import { ClientService } from './client/client.service';
import { ArticleDetailComponent } from './article/article.component';
import { ArticleService } from './article/article.service';


@Component({
    selector: 'my-app',
    template: `<router-outlet></router-outlet>`,
    directives: [ROUTER_DIRECTIVES],
    providers: [ClientService, ArticleService],
    precompile : [ClientDetailComponent, ArticleDetailComponent]

})

export class AppComponent  {
   
}