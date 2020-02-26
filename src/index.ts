import puppeteer from 'puppeteer';
import path from 'path';
import { checkDir, readUrls } from '@/file';
import { saveScreenShot, DeviceType } from '@/saveScreenShot';
import data from './data.json';
import crypto from 'crypto';


const deviceList: DeviceType[] = [
  DeviceType.PC_2K,
  DeviceType.PC_4K,
  DeviceType.SP,
  DeviceType.TABLET
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
        // headless: false,
      })
      .catch((e: any) => {
        throw e;
      });
    // siteごとのループ
    await Promise.all([
      ...data.sites.map(async site => {
        const siteDir = path.join('img', site.name);
        checkDir(siteDir);
        const dateDir = path.join(siteDir, date);
        checkDir(dateDir);
        // デバイスごとのループ
        await Promise.all([
          ...deviceList.map(async deviceType => {
            const deviceDir = path.join(dateDir, deviceType.replace(/\s/g, '_'));
            checkDir(deviceDir);
            // URLごとのループ
            await Promise.all([
              ...site.urls.map(async (url: string) => {
                const shaSum = crypto.createHash('sha1');
                shaSum.update(url);
                const hash = shaSum.digest('hex');
                const filePath = path.join(deviceDir, hash.slice(0, 10));
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
