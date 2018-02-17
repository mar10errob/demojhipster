import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs/Subscription';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Author } from './author.model';
import { AuthorService } from './author.service';
import { Principal } from '../../shared';

@Component({
    selector: 'jhi-author',
    templateUrl: './author.component.html'
})
export class AuthorComponent implements OnInit, OnDestroy {
authors: Author[];
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(
        private authorService: AuthorService,
        private jhiAlertService: JhiAlertService,
        private eventManager: JhiEventManager,
        private principal: Principal
    ) {
    }

    loadAll() {
        this.authorService.query().subscribe(
            (res: HttpResponse<Author[]>) => {
                this.authors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }
    ngOnInit() {
        this.loadAll();
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.registerChangeInAuthors();
    }

    ngOnDestroy() {
        this.eventManager.destroy(this.eventSubscriber);
    }

    trackId(index: number, item: Author) {
        return item.id;
    }
    registerChangeInAuthors() {
        this.eventSubscriber = this.eventManager.subscribe('authorListModification', (response) => this.loadAll());
    }

    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
