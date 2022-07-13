import { ILocatorMetadataObject, LocatorTypes } from "../types";
export const common_PO: ILocatorMetadataObject = {
  user: {
    description: "user id",
    locator: [
      {
        locatorType: LocatorTypes.ID,
        locatorValue: "replaceText",
      },
    ],
  },
  password: {
    description: "password",
    locator: [{ locatorType: LocatorTypes.ID, locatorValue: "password" }],
  },
};

export const user_preference_po: ILocatorMetadataObject = {
  submit: {
    description: "submit button",
    locator: [
      {
        locatorType: LocatorTypes.CSS,
        locatorValue: "button[type='submity']",
      },
      {
        locatorType: LocatorTypes.XPATH,
        locatorValue: ".//button[@type='submits']",
      },
      // {
      //   locatorType: LocatorTypes.CSS,
      //   locatorValue: ".ABCD",
      // },
      // {
      //   locatorType: LocatorTypes.XPATH,
      //   locatorValue: 'button[type="submitnow"]',
      // },
    ],
  },
};
