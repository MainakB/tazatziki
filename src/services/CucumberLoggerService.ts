export class CucumberLoggerService {
  static _instance: CucumberLoggerService;
  private message: string | null = null;

  private constructor() {}

  static getInstance() {
    if (!CucumberLoggerService._instance) {
      CucumberLoggerService._instance = new CucumberLoggerService();
    }
    return CucumberLoggerService._instance;
  }

  public setMessage(message: string | null): void {
    this.message = message;
  }

  public getMessage(): string | null {
    return this.message;
  }
}
