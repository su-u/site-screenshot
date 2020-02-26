import puppeteer from 'puppeteer';
import devices from "puppeteer/DeviceDescriptors";
import path from 'path';
import { checkDir } from '@/file';

type fileNameType = 'url' | 'title'

export const saveScreenShot = async (browser: puppeteer.Browser,
                                     url: string,
                                     deviceType: DeviceType,
                                     filePath: string,
                                     fileNameType: fileNameType = 'url') => {
  const page = await browser.newPage();
  switch(deviceType){
    case DeviceType.PC_2K:
      await page.setViewport({width: 1920, height: 1080});
      break;
    case DeviceType.PC_4K:
      await page.setViewport({width: 3840, height: 2160});
      break;
    default:
      await page.emulate(devices[deviceType]);
      break;
  }

  await page.goto(url);
  console.log(`save screenshot[${deviceType}]: ${filePath}`);
  await page.screenshot({path: `${filePath}.png`, fullPage: true});
  await page.close();
};

export enum DeviceType {
  PC_2K = '2K',
  PC_4K = '4K',
  SP = 'iPhone X',
  TABLET = 'iPad Pro'
}