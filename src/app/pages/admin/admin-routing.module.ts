import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { UsersComponent } from './users/users.component';
import { NgZorroImportsModule } from 'src/app/NgZorroImportModule';

const routes: Routes = [
    { path: "dashboard", component: AdminDashboardComponent },
    { path: "users", component: UsersComponent }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule, NgZorroImportsModule]
})
export class AdminRoutingModule { }
