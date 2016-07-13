import {Db, Collection} from "mongodb";
import { Article } from "../web/article/article";

const COLLECTION = 'article';

export class BdArticle {
    private _db: Db;
    private _collection: Collection;

    constructor(db: Db) {
        this._db = db;
        this._collection = db.collection(COLLECTION);
    }

    public listerTousLesArticles(): Promise<any[]> {
        return this._collection.find().toArray();
    }
}