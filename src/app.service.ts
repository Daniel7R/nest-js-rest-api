import { Injectable, Inject } from "@nestjs/common";

@Injectable()
export class AppService {
    constructor(
        @Inject("TASKS") private tasks,
        @Inject("API_KEY") private Apikey: string,
    ) {}
    getHello(): string {
        console.log(this.tasks);
        return `Hola mundo! ${this.Apikey}`;
    }
}
