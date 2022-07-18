// import { apm_m, predix_essentials } from "@apm_modules";
// import * as commonLocators from "./locators-common";
// import * as leftNavLocators from "./locators-left-navigation";

// const commonPoList: any[] = Object.values(commonLocators);
// // const leftNavPoList: any[] = Object.values(leftNavLocators);

// // const getLocatorsFromPromise = async () => {
// //   const apmmLocators = await apm_m.locators;
// //   const predixessentialsLocators = await predix_essentials.locators;
// //   const locators = { ...apmmLocators, ...predixessentialsLocators };
// //   const importedModulePoList: any[] = Object.values(locators);
// //   return importedModulePoList;
// // };

// // const reduceLocators = (accumulator: any, currentValue: any) => [
// //   ...accumulator,
// //   ...Object.values(currentValue),
// // ];

// const convertMapToObj = (map: any) => {
//   const obj = {} as any;
//   for (const [k, v] of map) obj[k] = v;
//   return obj;
// };

// const reduceLocatorsToObject = (sources: any) => {
//   const originalProperties = new Map();
//   const duplicateLocators = new Map();
//   for (const src of sources) {
//     for (const prop of Object.keys(src)) {
//       if (originalProperties.has(prop)) {
//         duplicateLocators.set(
//           prop,
//           `${JSON.stringify(src[prop])}. Name "${prop}" already exists in ${
//             originalProperties.get(prop).poParentObject
//           }`
//         );
//       } else {
//         originalProperties.set(prop, src[prop]);
//       }
//     }
//   }
//   if (duplicateLocators.size) {
//     throw new Error(`${JSON.stringify(convertMapToObj(duplicateLocators))}`);
//   }
//   return originalProperties;
// };

// const importedPoList = () => {
//   console.time("Duplicate locators check completed in: ");
//   const cachedLocators = reduceLocatorsToObject([
//     ...commonPoList,
//     // ...leftNavPoList,
//     // ...(await getLocatorsFromPromise()).reduce(reduceLocators, []),
//   ]);
//   console.timeEnd("Duplicate locators check completed in: ");
//   return cachedLocators;
// };
// export const initPageObjects = () => {
//   global.cachedPageLocators = importedPoList();
//   console.log("test glovbal", global);
// };

import {Utils} from '../lib/Utils';
// Utils.traverseForLocatorsFiles
export class LocatorsCache {
  private static _instance: LocatorsCache;
  private cachedLocators: any;
  private commonPoList: any[] = [];
  private fileName = 'src.services.LocatorsCache';

  private constructor() {}

  static getInstance() {
    if (!LocatorsCache._instance) {
      LocatorsCache._instance = new LocatorsCache();
    }
    return LocatorsCache._instance;
  }

  getCachedLocators() {
    return this.cachedLocators;
  }

  computeAndAppendCachedLocators(locators: any) {
    this.commonPoList = Object.values(locators);
    this.cachedLocators = this.initPageObjects(this.commonPoList);
  }

  setCachedLocators(locators: any) {
    this.cachedLocators = locators;
  }

  async getProjectLocators() {
    const utils = Utils.getInstance();
    const locatorFiles = Array.from(utils.traverseForLocatorsFiles());
    const locators = this.initPageObjects(Object.values(Array.from(await utils.importList(locatorFiles))[0]));
    this.setCachedLocators(locators);
  }

  protected convertMapToObj(map: any) {
    const obj = {} as any;
    for (const [k, v] of map) obj[k] = v;
    return obj;
  }

  protected reduceLocatorsToObject(sources: any) {
    let originalProperties: any = {};
    let duplicateLocators: any = {};
    for (const src of sources) {
      for (const prop of Object.keys(src)) {
        if (originalProperties[prop] !== undefined) {
          duplicateLocators = {
            ...duplicateLocators,
            [prop]: `${JSON.stringify(src[prop], null, 4)}. Name "${prop}" already exists in ${
              originalProperties[prop].poParentObject
            }`,
          };
        } else {
          originalProperties = {
            ...originalProperties,
            [prop]: src[prop],
          };
        }
      }
    }
    if (Object.values(duplicateLocators).length) {
      throw new Error(`${this.fileName} Duplicate Locators Error: \n${JSON.stringify(duplicateLocators)}`);
    }
    return originalProperties;
  }

  protected importedPoList(commonPoList: any[]) {
    console.time(`${this.fileName} Duplicate locators check completed in: `);
    const cachedLocators = this.reduceLocatorsToObject([
      ...commonPoList,
      ...(this.cachedLocators ? [this.cachedLocators] : []),
    ]);
    console.timeEnd(`${this.fileName} Duplicate locators check completed in: `);
    return cachedLocators;
  }

  protected initPageObjects(commonPoList: any[]) {
    const locatorsList = this.importedPoList(commonPoList);
    return locatorsList;
  }
}
