import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {BookfinderAppComponent} from './components/bookfinder-app/bookfinder-app.component';
import {RouterModule, Routes} from "@angular/router";
import {BooklistComponent} from "./components/booklist/booklist.component";
import {HttpClientModule} from "@angular/common/http";
import {OpenLibraryService} from "./services/open-library.service";
import { BookdetailsComponent } from './components/bookdetails/bookdetails.component';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {FormsModule} from "@angular/forms";
import {MatIconModule} from "@angular/material/icon";
import {MatButtonModule} from "@angular/material/button";
import {MatFormFieldModule} from '@angular/material/form-field';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { FavouritesComponent } from './components/favourites/favourites.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { CoverComponent } from './components/cover/cover.component';

const routes: Routes = [
  {path: '', component: BooklistComponent},
  {path: 'books/:isbn', component: BookdetailsComponent},
  {path: 'favourites', component: FavouritesComponent},
  {path: 'covers/:coverId', component: CoverComponent}
];

@NgModule({
  declarations: [
    BookfinderAppComponent,
    BooklistComponent,
    BookdetailsComponent,
    FavouritesComponent,
    CoverComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatListModule,
    MatCardModule,
    MatSelectModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatChipsModule,
    MatDividerModule,
    NgbModule,
    MatProgressBarModule,
    MatSnackBarModule
  ],
  providers: [OpenLibraryService],
  bootstrap: [BookfinderAppComponent]
})
export class BookfinderAppModule {
}
