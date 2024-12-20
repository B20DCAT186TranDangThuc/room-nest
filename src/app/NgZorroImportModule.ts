import { NgModule } from "@angular/core";

import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzModalModule } from "ng-zorro-antd/modal";
import { NzDropDownModule } from "ng-zorro-antd/dropdown";
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
@NgModule({
    exports: [
        NzLayoutModule,
        NzSpinModule,
        NzFormModule,
        NzButtonModule,
        NzInputModule,
        NzSelectModule,
        NzDatePickerModule,
        NzTableModule,
        NzBreadCrumbModule,
        NzIconModule,
        NzMenuModule,
        NzBreadCrumbModule,
        NzTableModule,
        NzAvatarModule,
        NzModalModule,
        NzDropDownModule,
        NzDrawerModule,
        NzDividerModule,
        NzDescriptionsModule,
        NzPopconfirmModule
    ]
})

export class NgZorroImportsModule {

}