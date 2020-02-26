import puppeteer from 'puppeteer';
import urlToFileName from '@/urlToFileName';
import { checkDir } from '@/file';
import { saveScreenShot, DeviceType } from '@/saveScreenShot';

const screenShotList: string[] = [
  'https://www.te-nu.com/entry/2017/12/02/225022',
  'https://techblog.gmo-ap.jp/2018/12/28/puppeteer%E3%81%A7%E3%81%A7%E3%81%8D%E3%82%8B%E3%81%93%E3%81%A8%E3%81%BE%E3%81%A8%E3%82%81/'
];

const deviceList: DeviceType[] = [
  DeviceType.PC_2K,
  DeviceType.PC_4K,
  DeviceType.SP,
  DeviceType.TABLET
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

main();
checkDir('img');