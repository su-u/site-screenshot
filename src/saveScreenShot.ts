import puppeteer from 'puppeteer';
import devices from "puppeteer/DeviceDescriptors";
import * as fs from "fs";

export const saveScreenShot = async (page: puppeteer.Page,
                                     deviceType: DeviceType,
                                     fileTitle: string,
                                     filePath: string) => {
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


if(fs.existsSync(`${filePath}-${fileTitle}.png`)){
  console.log(`skip: ${filePath}-${fileTitle}.png`);
  return;
}

console.log(`save screenshot[${deviceType}]: ${fileTitle}`);
await page.screenshot({path: `${filePath}-${fileTitle}.png`, fullPage: true});
};

export enum DeviceType {
  PC_2K = '2K',
  PC_4K = '4K',
  SP = 'iPhone X',
  TABLET = 'iPad Pro'
}