import { Controller, Get } from "@nestjs/common";

@Controller()
export class HomeController {
  constructor() {}

  @Get()
  handleImAlive() {
    return {
      message: "I'm alive!"
    }
  }
}
