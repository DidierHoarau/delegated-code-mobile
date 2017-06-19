import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TnsSideDrawer } from 'nativescript-sidedrawer';

@Component({
  selector: 'ns-app',
  templateUrl: 'app.component.html'
})
export class AppComponent implements OnInit {
  public constructor(private router: Router) {}

  ngOnInit(): void {
    TnsSideDrawer.build({
      templates: [
        {
          title: 'Servers',
          androidIcon: 'ic_cloud_black_24dp',
          iosIcon: 'ic_home_white'
        },
        {
          title: 'Local Repos',
          androidIcon: 'ic_phone_android_black_24dp',
          iosIcon: 'ic_gavel_white'
        }
      ],
      title: 'Delegated Code',
      subtitle: '',
      listener: index => {
        if (index === 0) {
          this.router.navigate(['/servers']);
        } else if (index === 1) {
          this.router.navigate(['/local-repos']);
        }
      },
      context: this
    });
  }
}
