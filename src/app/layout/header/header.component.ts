import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  isCustomerLoggedIn: boolean = StorageService.isCustomerLoggedIn();
  isAdminLoggedIn: boolean = StorageService.isAdminLoggedIn();
  imageUrl: string | null = null;
  nameAccount: string;
  constructor(private router: Router,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "NavigationEnd") {
        this.isAdminLoggedIn = StorageService.isAdminLoggedIn();
        this.isCustomerLoggedIn = StorageService.isCustomerLoggedIn();
        if (this.isAdminLoggedIn || this.isCustomerLoggedIn) {
          this.fillHeaderInfo();
        }
      }
    })
  }

  fillHeaderInfo() {
    this.nameAccount = StorageService.getUser().fullName;
    this.imageUrl = StorageService.getUser().image != null ? StorageService.getUser().image : null;

  }

  logout() {
    StorageService.logout();
    this.router.navigateByUrl("/login");
  }
}
