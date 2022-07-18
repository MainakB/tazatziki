import { Types } from "../types";
export const common_PO: Types.ILocatorMetadataObject = {
  user: {
    description: "user id",
    locator: [
      {
        locatorType: Types.LocatorTypes.ID,
        locatorValue: "replaceText",
      },
    ],
  },
  password: {
    description: "password",
    locator: [{ locatorType: Types.LocatorTypes.ID, locatorValue: "password" }],
  },
};

export const user_preference_po: Types.ILocatorMetadataObject = {
  submit: {
    description: "submit button",
    locator: [
      {
        locatorType: Types.LocatorTypes.CSS,
        locatorValue: "button[type='submity']",
      },
      {
        locatorType: Types.LocatorTypes.XPATH,
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
