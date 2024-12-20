export class UserDetail {
    firstName: string;
    lastName: string;
    email: string;
    imageUrl: string;
    role: string;
    permissions: [{
        name: string;
        method: string;
        module: string;
    }];
}