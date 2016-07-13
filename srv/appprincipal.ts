import { Server, Db } from "mongodb";
import { Client } from "../web/client/client";
import { Article } from "../web/article/article";
import { BdClient } from "./bdclient";
import { BdArticle } from "./bdarticle";

const PORT_MONGODB = 27017;
const NOMBASE = 'bdcommande';
const NOMSERVEUR = 'localhost';

export class AppPrincipal {
    private _db: Db;
    private _port: number;

    constructor() {
        let server = new Server(NOMSERVEUR, PORT_MONGODB);
        this._db = new Db(NOMBASE, server, { w: 1 });
    }

    private ouvrirConnection() {
        this._db.open(function () { });
        this.ecrireLog("Connection base");
    }

    private fermerConnection() {
        this._db.close();
        this.ecrireLog("Deconnection base");
    }

    public listerLesClients(res: any): Promise<any> {
        let bdClient: BdClient;
        this.ouvrirConnection();
        bdClient = new BdClient(this._db);
        return bdClient.listerTousLesClients()
            .then(liste => {
                this.fermerConnection();
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(liste));
            })
            .catch(function () {
                console.log("erreur listerLesClients")
            });
    }

    public listerLesArticles(res: any): Promise<any> {
        let bdArticle: BdArticle;
        this.ouvrirConnection();
        bdArticle = new BdArticle(this._db);
        return bdArticle.listerTousLesArticles()
            .then(liste => {
                this.fermerConnection();
                res.setHeader('Content-Type', 'application/json');
                res.send(JSON.stringify(liste));
            })
            .catch(function() {
                console.log("erreur listerLesArticles")
            });
    }

    public ecrireLog(texte: string) {
        let date = new Date();
        console.log(`At %s : %s`, date.toLocaleTimeString(), texte);
    }

}
