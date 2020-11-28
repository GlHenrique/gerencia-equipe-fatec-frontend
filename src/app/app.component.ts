import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'Dashboard';
  toolbarName = '';

  constructor(
    private titleService: Title,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

 ngOnInit() {
   this.setTitle();
 }

 setTitle() {
   const appTitle = this.titleService.getTitle();
   this.router
     .events.pipe(
     filter(event => event instanceof NavigationEnd),
     map(() => {
       const child = this.activatedRoute.firstChild;
       if (!child) {
         return this.title;
       }
       if (child.snapshot.data.title) {
         return child.snapshot.data.title;
       }
       return appTitle;
     })
   ).subscribe((ttl: string) => {
     this.titleService.setTitle(ttl);
     this.toolbarName = ttl;
   });
 }

  closeDrawer(drawer) {
    drawer.toggle();
  }

}
