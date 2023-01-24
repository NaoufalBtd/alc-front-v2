
export class CustomError implements Error {
    message: string;
    name: string;
    status: string;


    constructor(message: string, name: string, status: string) {
        this.message = message;
        this.name = name;
        this.status = status;
    }
}
