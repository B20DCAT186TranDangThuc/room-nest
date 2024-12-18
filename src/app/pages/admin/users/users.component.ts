import { Component } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { AdminService } from 'src/app/services/admin.service';

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

  constructor(private adminService: AdminService) { }

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
      console.log(this.listOfUser);

      this.total = res.meta.total;
    })
  }

  onQueryParamsChange($event: NzTableQueryParams) {

  }
}
