import { FileInput } from 'ngx-material-file-input';
export default interface JobApplication {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    attachments: any;
    comments: string;
}