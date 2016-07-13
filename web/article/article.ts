/**
 * Article
 */
export class Article {
	id: number;
	code: number;
	description: string;
	prix: number;

	
	constructor(id: number, code: number, description: string, prix: number) {
		this.id = id;
		this.code = code;
		this.description = description;
		this.prix = prix;
	}
}