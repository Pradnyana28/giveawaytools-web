import puppeteer from 'puppeteer';
import Logger from './logger';

const logger = new Logger();

const browser = async (): Promise<puppeteer.Browser | undefined> => {
  try {
    const browser = await puppeteer.launch({
      headless: false,
      args: ["--disable-setuid-sandbox"],
      'ignoreHTTPSErrors': true
    });
    return browser;
  } catch (err) {
    logger.error('Could not start browser engine', err, __filename);
    return undefined;
  }
}

export default browser;