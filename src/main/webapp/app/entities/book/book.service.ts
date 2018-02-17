import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Book } from './book.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Book>;

@Injectable()
export class BookService {

    private resourceUrl =  SERVER_API_URL + 'api/books';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(book: Book): Observable<EntityResponseType> {
        const copy = this.convert(book);
        return this.http.post<Book>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(book: Book): Observable<EntityResponseType> {
        const copy = this.convert(book);
        return this.http.put<Book>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Book>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Book[]>> {
        const options = createRequestOption(req);
        return this.http.get<Book[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Book[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Book = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Book[]>): HttpResponse<Book[]> {
        const jsonResponse: Book[] = res.body;
        const body: Book[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Book.
     */
    private convertItemFromServer(book: Book): Book {
        const copy: Book = Object.assign({}, book);
        copy.publicationDate = this.dateUtils
            .convertLocalDateFromServer(book.publicationDate);
        return copy;
    }

    /**
     * Convert a Book to a JSON which can be sent to the server.
     */
    private convert(book: Book): Book {
        const copy: Book = Object.assign({}, book);
        copy.publicationDate = this.dateUtils
            .convertLocalDateToServer(book.publicationDate);
        return copy;
    }
}
