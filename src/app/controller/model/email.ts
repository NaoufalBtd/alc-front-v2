export class Email {
    id: number;
    subject: string;
    content = '';
    date: Date = new Date();
    from: string = 'noreply@engflexy.com';
    to: string;
}
