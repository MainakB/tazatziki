import { GLOBALFLAGS } from "../constants";

export class StepDurationCalculator {
  static _instance: StepDurationCalculator;
  private dateTime: Date = new Date();
  private actionDateTime: Date = new Date();
  private actionWaitConditionTime: number =
    GLOBALFLAGS.WAITCONDITIONTIMEOUTACTIONS;
  private stopStep: boolean = false;

  private constructor() {
    // this.actionDateTime = new Date();
  }

  static getInstance() {
    if (!StepDurationCalculator._instance) {
      StepDurationCalculator._instance = new StepDurationCalculator();
    }
    return StepDurationCalculator._instance;
  }

  public setDateTime(): void {
    this.dateTime = new Date();
  }

  public getDateTime(): Date {
    return this.dateTime;
  }

  public getActionDateTime(): Date {
    return this.actionDateTime;
  }

  public setActionDateTime(): void {
    this.actionDateTime = new Date();
  }

  public setActionWaitConditionTime(time: number): void {
    this.actionWaitConditionTime = time;
  }

  public getActionWaitConditionTime(): number {
    return this.actionWaitConditionTime;
  }

  public setStopStep(value: boolean): void {
    this.stopStep = value;
  }

  public getStopStep(): boolean {
    return this.stopStep;
  }
}
