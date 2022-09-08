export default class StandardError {
    private error: string[] | string;
    private status: number;
    private timestamp: number = Number(new Date())
    

    constructor(error: string[] | string, status: number) {
        this.error = error; 
        this.status = status;
    }

    public getStatus() {
        return this.status
    }

}