import { Page } from "puppeteer";
import { ISitesObject } from "@app/Services/Sites";

export interface IService extends ISitesObject { }

export default class Service<T extends IService> {
  protected classInjector: T;
  public page: Page | undefined;

  constructor(classInjector: T) {
    this.classInjector = classInjector;
  }

  public async boot() {
    const CI = this.classInjector;
    await CI.checkSession();

    this.page = await CI.browser.newPage();

    try {
      await this.page.goto(CI.url, { waitUntil: 'networkidle2' });
      await this.page.waitForTimeout(1000);
      await CI.login(this.page);
    } catch (err) {
      console.log('The error', err);
    }

    return this.page;
  }
}