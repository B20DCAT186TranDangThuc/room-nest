import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './users/users.component';
import { NgZorroImportsModule } from 'src/app/NgZorroImportModule';
import { AddUserComponent } from './users/add-user/add-user.component';

const routes: Routes = [
    { path: "dashboard", component: AdminDashboardComponent },
    { path: "users", component: UsersComponent },
    { path: "users/add", component: AddUserComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, NgZorroImportsModule]
})
export class AdminRoutingModule { }
