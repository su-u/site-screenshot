import puppeteer from 'puppeteer';
import urlToFileName from '@/urlToFileName';
import { checkDir } from '@/file';
import { saveScreenShot, DeviceType } from '@/saveScreenShot';

const screenShotList: string[] = [
  'https://slack.com/intl/ja-jp/',
  'https://slack.com/intl/ja-jp/features',
  'https://slack.com/intl/ja-jp/why/slack-vs-email',
  'https://slack.com/intl/ja-jp/customer-stories'
];

const deviceList: DeviceType[] = [
  DeviceType.PC_2K,
  // DeviceType.PC_4K,
  DeviceType.SP,
  // DeviceType.TABLET
];

const main = async () => {
  try {
    const browser = await puppeteer
      .launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      })
      .catch((e: any) => {
        throw e;
      });
    await Promise.all([
      ...screenShotList.map(async url => {
        await Promise.all([
          ...deviceList.map(async deviceType => {
            await saveScreenShot(browser, url, deviceType, urlToFileName(url));
          }),
        ]);
      }),
    ]);
    await browser.close();
  } catch (e) {
    throw e.message;
  } finally {
  }
};

console.log(`access count ${screenShotList.length * deviceList.length}`)
checkDir('img');
main();
