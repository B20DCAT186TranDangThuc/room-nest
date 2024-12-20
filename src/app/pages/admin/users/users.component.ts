import { Component, TemplateRef, ViewContainerRef } from '@angular/core';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RoleService } from 'src/app/services/role.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { UserDetail } from 'src/app/models/UserDetail';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  total: number = 0;
  listOfUser: any[] = [];
  loading = false;
  visible = false;
  pageIndex: number = 0;
  tplModalButtonLoading = false;
  userForm!: FormGroup
  listOfRole: any[] = [];
  updateOrAdd: string = '';
  userDetail: {
    firstName: string,
    lastName: string,
    email: string,
    imageUrl: string,
    role: string,
    permissions: any[]
  } =
    {
      firstName: '',
      lastName: '',
      email: '',
      imageUrl: '',
      role: '',
      permissions: []
    };

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
      id: [null],
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

  createTplModal(tplTitle: TemplateRef<{}>, tplContent: TemplateRef<{}>, tplFooter: TemplateRef<{}>, type?: string, user?: any): void {
    this.updateOrAdd = type;
    this.generateRole();
    if (type == '02') {
      this.adminService.getUserById(user.id).subscribe((res) => {
        console.log(res);

        this.userForm.patchValue({
          id: res.id,
          firstName: res.firstName,
          lastName: res.lastName,
          email: res.email,
          role: res.role.id
        })
      });

    }
    this.modal.create({
      nzTitle: tplTitle,
      nzContent: tplContent,
      nzFooter: tplFooter,
      nzMaskClosable: false,
      nzClosable: false,
      nzOnOk: () => console.log('Click ok')
    });
  }

  onAddUser(modelRef: NzModalRef): void {
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

  onUpdateUser(modelRef: NzModalRef): void {
    const userUpdateDto = {
      id: this.userForm.value.id,
      firstName: this.userForm.value.firstName,
      lastName: this.userForm.value.lastName,
      email: this.userForm.value.email,
      role: { id: this.userForm.value.role }
    }
    this.tplModalButtonLoading = true;
    this.adminService.updateUser(userUpdateDto).subscribe((res) => {
      this.tplModalButtonLoading = false;
      this.message.success("Cập nhật thành công", { nzDuration: 2000 });
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

  open(data): void {
    this.visible = true;
    this.adminService.getUserById(data.id).subscribe((res) => {
      this.userDetail.firstName = res.firstName;
      this.userDetail.lastName = res.lastName;
      this.userDetail.email = res.email;
      this.userDetail.imageUrl = res.imageUrl;
      this.userDetail.role = res.role.role;
      this.roleService.getRoleById(res.role.id).subscribe((roleRes) => {
        this.userDetail.permissions = roleRes.permissions;
        console.log(this.userDetail);
      });

    });
  }

  close(): void {
    this.visible = false;
  }

  deleteUser(data) {
    this.adminService.deleteUserById(data.id).subscribe((res) => {
      this.message.success("Xóa thành công", { nzDuration: 2000 });
      this.fetchData();
    }, error => {
      this.message.error("Xóa thất bại", { nzDuration: 2000 });

    })
  }

  cancelDelete() {

  }

  beforeConfirmDelete(): Observable<boolean> {
    return new Observable(observer => {
      setTimeout(() => {
        observer.next(true);
        observer.complete();
      }, 1000);
    });
  }

}
