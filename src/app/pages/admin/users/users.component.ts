import { Component } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  total: number = 0;
  listOfUser: any[] = [];
  loading = false;
  pageIndex: number = 0;

  constructor(private adminService: AdminService,
    private authService: AuthService
  ) { }

  ngOnInit() {
    this.fetchData(this.pageIndex);
  }

  fetchData(page: number): void {
    this.loading = true;
    this.adminService.getAllUser().subscribe((res) => {
      this.loading = false;
      this.listOfUser = res.result.map(user => ({
        ...user,
        role: user.role.role
      }));
      console.log(document.cookie.includes("refresh_token"));

      this.total = res.meta.total;
    })
  }

  testRefresh() {
    this.authService.refreshAccessToken().subscribe((res) => {
      console.log(res);

    })
  }

  onQueryParamsChange($event: NzTableQueryParams) {

  }
}
