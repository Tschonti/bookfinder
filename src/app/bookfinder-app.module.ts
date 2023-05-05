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

const routes: Routes = [{
  path: '', component: BooklistComponent
}, {path: 'books/:id', component: BookdetailsComponent}];

@NgModule({
  declarations: [
    BookfinderAppComponent,
    BooklistComponent,
    BookdetailsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    MatListModule,
    MatCardModule
  ],
  providers: [OpenLibraryService],
  bootstrap: [BookfinderAppComponent]
})
export class BookfinderAppModule {
}
