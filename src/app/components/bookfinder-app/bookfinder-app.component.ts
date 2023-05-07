import { Component } from '@angular/core';

@Component({
  selector: 'bookfinder-app',
  templateUrl: './bookfinder-app.component.html',
  styleUrls: ['./bookfinder-app.component.css']
})
export class BookfinderAppComponent {
  title = 'bookfinder';
  navbarOpen = false

  /**
   * Toggles the state of the navbar (on mobile), so closes or opens it.
   */
  toggleNavbar() {
    this.navbarOpen = !this.navbarOpen;
  }
}
