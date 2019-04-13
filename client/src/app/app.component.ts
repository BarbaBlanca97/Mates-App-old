import { Component } from '@angular/core';
import { Router, RouterEvent, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeRouterLink = '';

  constructor(
    private router: Router
  ) {
    router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          this.activeRouterLink = router.url;
          return;
        }
      }
    );
  }
}
