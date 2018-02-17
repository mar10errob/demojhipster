import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { DemojhipsterSharedModule } from '../../shared';
import {
    AuthorService,
    AuthorPopupService,
    AuthorComponent,
    AuthorDetailComponent,
    AuthorDialogComponent,
    AuthorPopupComponent,
    AuthorDeletePopupComponent,
    AuthorDeleteDialogComponent,
    authorRoute,
    authorPopupRoute,
} from './';

const ENTITY_STATES = [
    ...authorRoute,
    ...authorPopupRoute,
];

@NgModule({
    imports: [
        DemojhipsterSharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AuthorComponent,
        AuthorDetailComponent,
        AuthorDialogComponent,
        AuthorDeleteDialogComponent,
        AuthorPopupComponent,
        AuthorDeletePopupComponent,
    ],
    entryComponents: [
        AuthorComponent,
        AuthorDialogComponent,
        AuthorPopupComponent,
        AuthorDeleteDialogComponent,
        AuthorDeletePopupComponent,
    ],
    providers: [
        AuthorService,
        AuthorPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DemojhipsterAuthorModule {}
