import puppeteer from 'puppeteer';
import devices from "puppeteer/DeviceDescriptors";
import { rename } from '@/file';
import * as fs from "fs";

export const saveScreenShot = async (browser: puppeteer.Browser,
                                     url: string,
                                     deviceType: DeviceType,
                                     filePath: string) => {
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

  await page.goto(url,  {waitUntil: 'load', timeout: 0});
  const title = await page.title();
  const fileTitle = rename(title);

  if(fs.existsSync(`${filePath}-${fileTitle}.png`)){
    console.log(`skip: ${filePath}-${fileTitle}.png`);
    await page.close();
    return;
  }

  console.log(`save screenshot[${deviceType}]: ${fileTitle}`);
  await page.screenshot({path: `${filePath}-${fileTitle}.png`, fullPage: true});
  await page.close();
};

export enum DeviceType {
  PC_2K = '2K',
  PC_4K = '4K',
  SP = 'iPhone X',
  TABLET = 'iPad Pro'
}