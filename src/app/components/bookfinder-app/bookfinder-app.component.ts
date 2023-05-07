import { Component } from '@angular/core';

@Component({
  selector: 'bookfinder-app',
  templateUrl: './bookfinder-app.component.html',
  styleUrls: ['./bookfinder-app.component.css']
})
export class BookfinderAppComponent {
  title = 'bookfinder';
  navbarOpen = false

  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
