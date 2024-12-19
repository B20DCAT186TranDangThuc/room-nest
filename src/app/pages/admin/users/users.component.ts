import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from 'src/app/services/role.service';
import { NzMessageService } from 'ng-zorro-antd/message';

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
  tplModalButtonLoading = false;
  userForm!: FormGroup
  listOfRole: any[] = [];

  constructor(private adminService: AdminService,
    private roleService: RoleService,
    private authService: AuthService,
    private modal: NzModalService,
    private fb: FormBuilder,
    private message: NzMessageService
  ) { }

  ngOnInit() {
    this.fetchData();
    this.userForm = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      role: [null, Validators.required],
    });
    this.generateRole();
  }

  fetchData(): void {
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

  createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>): void {
    this.generateRole();
    this.modal.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => console.log('Click ok')
    });
  }

  onSubmit(modelRef: NzModalRef): void {
    const userCreateDto = {
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      password: this.userForm.value.password,
      role: { id: this.userForm.value.role }
    }
    this.tplModalButtonLoading = true;
    this.adminService.createUser(userCreateDto).subscribe((res) => {
      this.tplModalButtonLoading = false;
      this.message.success("Thêm mới thành công", { nzDuration: 2000 });
      this.fetchData()
      modelRef.destroy();
    }, error => {
      this.tplModalButtonLoading = false;
      modelRef.destroy();
    })
  }

  onCancel(modelRef: NzModalRef): void {
    this.userForm.reset();
    modelRef.destroy()
  }

  generateRole() {
    this.roleService.getAllRole().subscribe((res) => {
      this.listOfRole = res.result.map(role => ({
        id: role.id,
        name: role.name
      }));
    })
  }

  onQueryParamsChange($event: NzTableQueryParams) {

  }
}
