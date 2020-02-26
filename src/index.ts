import puppeteer from 'puppeteer';
import urlToFileName from '@/urlToFileName';
import { checkDir, readUrls } from '@/file';
import { saveScreenShot, DeviceType } from '@/saveScreenShot';
import data from './data.json';
import path from 'path';

const deviceList: DeviceType[] = [
  DeviceType.PC_2K,
  // DeviceType.PC_4K,
  DeviceType.SP,
  // DeviceType.TABLET
];

const main = async () => {
  const urlCount = data.sites.reduce((p, x) => p + x.urls.length, 0);
  console.log(`urls: ${urlCount * deviceList.length}`);
  const nowDate = new Date();
  const date = `${nowDate.getFullYear()}-${ nowDate.getMonth()+1}-${nowDate.getDate()}`;
  try {
    const browser = await puppeteer
      .launch({
        args: ['--no-sandbox', '--disable-setuid-sandbox'],
      })
      .catch((e: any) => {
        throw e;
      });
    // siteごとのループ
    await Promise.all([
      ...data.sites.map(async site => {
        const siteDir = path.join('img', site.name);
        checkDir(siteDir);
        // URLごとのループ
        await Promise.all([
          ...site.urls.map(async (url: string) => {
            const dateDir = path.join(siteDir, date);
            checkDir(dateDir);
            // デバイスごとのループ
            await Promise.all([
              ...deviceList.map(async deviceType => {
                const deviceDir = path.join(dateDir, deviceType);
                checkDir(deviceDir);
                const filePath = path.join(deviceDir, urlToFileName(url));
                console.log(filePath);
                await saveScreenShot(browser, url, deviceType, filePath);
              }),
            ]);
          }),
        ]);
      })
    ]);
    await browser.close();
  } catch (e) {
    throw e.message;
  } finally {
  }
};

checkDir('img');
main();
