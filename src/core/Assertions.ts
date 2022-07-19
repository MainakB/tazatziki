// "use strict";
import {ExceptionHandler} from './ExceptionHandler';
// import { assert } from "chai";
// import { locatorDetails, SortingOrder, ElementFinder } from "../types";
// import { Element } from "./Element";
// import {
//   toElementFinder,
//   verifyAttrContains,
//   verifyAttrEquals,
//   verifyElementPresent,
//   isElementFinder,
// } from "../lib";

/**
 *
 * Contains verifications and assertions that can be performed on elements
 * @class Assertion
 */
export class Assertion extends ExceptionHandler {
  // Element: Element;

  constructor() {
    super();
  }

  //   /**
  //    * Asserts if the element is currently not present
  //    * @method assertElementNotPresent
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    */
  //   async assertElementNotPresent(
  //     elementDetails: string | locatorDetails | ElementFinder
  //   ): Promise<void> {
  //     let self: this = this;
  //     try {
  //       assert.isFalse(
  //         await verifyElementPresent(self.Element, elementDetails),
  //         "Element Found"
  //       );
  //       self.Logger.logMessage("Element not Found");
  //     } catch (exception) {
  //       await super.catchException(
  //         exception,
  //         async () => await self.assertElementNotPresent(elementDetails)
  //       );
  //     }
  //   }

  //   /**
  //    * Asserts if the element is currently present
  //    * @method assertElementPresent
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    */
  //   async assertElementPresent(
  //     elementDetails: string | locatorDetails | ElementFinder
  //   ): Promise<void> {
  //     let self: this = this;
  //     try {
  //       assert.isTrue(
  //         await verifyElementPresent(self.Element, elementDetails),
  //         "Element not Found"
  //       );
  //       self.Logger.logMessage("Element Found");
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () => await self.assertElementPresent(elementDetails)
  //       );
  //     }
  //   }

  //   /**
  //    * Verifies whether the element is currently Present
  //    * @method isElementPresent
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    * @returns {Promise<boolean>} whether the element is currently present or not
  //    */
  //   async isElementPresent(
  //     elementDetails: string | locatorDetails | ElementFinder
  //   ): Promise<boolean> {
  //     let self: this = this;
  //     let isPresent: boolean = await verifyElementPresent(
  //       self.Element,
  //       elementDetails
  //     );
  //     try {
  //       if (isPresent) self.Logger.logMessage("Element Found");
  //       else self.Logger.logMessage("Element Not Found");
  //       return isPresent;
  //     } catch (exception) {
  //       return super.catchException(
  //         exception,
  //         async () => await self.isElementPresent(elementDetails)
  //       );
  //     }
  //   }

  //   /**
  //    * Asserts if the expected text is selected in the dropdown- if text is not present, text in "value" is considered
  //    * @method assertDropDownSelectedOption
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    * @param {string} expectedText expected string to be selected
  //    * @param {number} [oTimeWait=40000] optional wait time for an element
  //    * @throws {AssetionError} when Text expected is not selected in the dropDown
  //    * @throws {TimeoutError} when element is not present in the DOM
  //    * @throws {WebdriverError} when element doesn't exists.
  //    * @throws {Error} when elementDetails are not provided.
  //    * @throws {Error} when expectedText is not provided
  //    */
  //   async assertDropDownSelectedOption(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     expectedText: string,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this;
  //     let dropDownElement: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     let loaded: boolean = await self.isDropDownLoaded(dropDownElement);
  //     try {
  //       if (!expectedText && expectedText != "") {
  //         throw new Error("Please provide proper text to verify");
  //       }
  //       let actualSelectedText: string;
  //       //Check whether the dropDown is loaded or not. If not loaded directly assert it.
  //       if (loaded) {
  //         let selectedOptionElement: ElementFinder = await dropDownElement.$(
  //           "option:checked"
  //         );
  //         if (selectedOptionElement) {
  //           actualSelectedText = await selectedOptionElement.getText();
  //           if (actualSelectedText === "") {
  //             actualSelectedText =
  //               (await selectedOptionElement.getAttribute("value")) ||
  //               (await browser.execute(
  //                 "return arguments[0].value",
  //                 selectedOptionElement
  //               ));
  //           }
  //         }
  //       }
  //       assert.equal(
  //         actualSelectedText,
  //         expectedText,
  //         "Selected option on the dropdown is different"
  //       );
  //       self.Logger.logMessage(
  //         "Selected option on the dropdown is '" +
  //           actualSelectedText +
  //           "' as Expected"
  //       );
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () =>
  //           await self.assertDropDownSelectedOption(
  //             elementDetails,
  //             expectedText,
  //             oTimeWait
  //           )
  //       );
  //     }
  //   }

  //   /**
  //    * Asserts if element contains the sub text provided in the Element's Text
  //    * @method assertElementContainsText
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    * @param {string} partialTextToMatch Expected partial text to match
  //    * @param {number} [oTimeWait=40000] optional wait time for an element - default wait time is 40000ms
  //    * @return {Promise<boolean>}
  //    * @throws {AssertionError} if Text on Element doesn't contain text provided or Element not Found
  //    * @throws {Error} if elementDetails or Partial text to verify is not provided
  //    * @throws {WebDriverError} if element is not found on webpage
  //    * @throws {TimeoutError} if Element is not present in the DOM.
  //    */
  //   async assertElementContainsText(
  //     elementDetails: locatorDetails | string | ElementFinder,
  //     partialTextToMatch: string,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this;
  //     let elementToVerify: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     try {
  //       if (!partialTextToMatch && partialTextToMatch != "") {
  //         throw new Error("Please provide proper text to assert");
  //       }
  //       let actualString: string = await elementToVerify.getText();
  //       assert.isTrue(
  //         actualString.includes(partialTextToMatch),
  //         "Element text doesn't contain the text provided"
  //       );
  //       self.Logger.logMessage(
  //         "Element Text is '" +
  //           actualString +
  //           "', contains '" +
  //           partialTextToMatch +
  //           "'"
  //       );
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () =>
  //           await self.assertElementContainsText(
  //             elementDetails,
  //             partialTextToMatch,
  //             oTimeWait
  //           )
  //       );
  //     }
  //   }

  //   /**
  //    * Asserts if element contains the sub text provided in the provided attribute value.
  //    * @method assertElementContainsAttributeValue
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    * @param {string} [attribute='value'] attribute name
  //    * @param {string} partialTextToMatch Expected partial text to match
  //    * @param {number} [oTimeWait=40000] optional wait time for an element - default wait time is 40000ms
  //    * @return {Promise<boolean>}
  //    * @throws {AssertionError} if Text on Element doesn't contain text provided or Element not Found
  //    * @throws {Error} if elementDetails or Partial text to verify is not provided
  //    * @throws {WebDriverError} if element is not found on webpage
  //    * @throws {TimeoutError} if Element is not present in the DOM.
  //    */
  //   async assertElementContainsAttributeValue(
  //     elementDetails: locatorDetails | string | ElementFinder,
  //     partialTextToMatch: string,
  //     oTimeWait?: number,
  //     attribute: string = "value"
  //   ): Promise<void> {
  //     let self: this = this;
  //     let elementToVerify: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     try {
  //       if (!partialTextToMatch && partialTextToMatch != "") {
  //         throw new Error("Please provide proper attribute value to assert");
  //       }
  //       let actualString: string =
  //         (await elementToVerify.getAttribute(attribute)) ||
  //         (await browser.execute(
  //           "return arguments[0]." + attribute,
  //           elementToVerify
  //         ));
  //       assert.isTrue(
  //         actualString.includes(partialTextToMatch),
  //         "Element's attribute'" +
  //           attribute +
  //           "has a value " +
  //           actualString +
  //           "' doesn't contain the '" +
  //           partialTextToMatch +
  //           "'"
  //       );
  //       self.Logger.logMessage(
  //         "Element's attribute'" +
  //           attribute +
  //           "has a value " +
  //           actualString +
  //           "', contains '" +
  //           partialTextToMatch +
  //           "'"
  //       );
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () =>
  //           await self.assertElementContainsAttributeValue(
  //             elementDetails,
  //             partialTextToMatch,
  //             oTimeWait,
  //             attribute
  //           )
  //       );
  //     }
  //   }

  //   /**
  //    * Provides the count of options with text as provided.- if text is not present, text in "value" is considered
  //    * @private getDropdownCount
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    * @param {string} expectedText text to be matched
  //    * @param {number} [oTimeWait=40000] optional wait time for an element - default wait time is 40000ms
  //    * @throws {Error} when elementdetails or expected text is not provided
  //    * @throws {TimeoutError} when element is not present in the DOM
  //    * @throws {WebdriverError} when element doesn't exists.
  //    */
  //   private async getDropdownCount(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     expectedText: string,
  //     oTimeWait?: number
  //   ): Promise<number> {
  //     let self: this = this;
  //     let dropDownElement: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     let loaded: boolean = await self.isDropDownLoaded(dropDownElement);
  //     try {
  //       if (!expectedText && expectedText != "") {
  //         throw new Error("Please provide proper text to verify");
  //       }
  //       let expectedElements: ElementFinder[] = [];
  //       //Check whether the dropDown is loaded or not. If not loaded directly assert it.
  //       if (loaded)
  //         expectedElements = await dropDownElement.$$(
  //           "(.//option[text()='" +
  //             expectedText +
  //             "'])|(.//option[@value= '" +
  //             expectedText +
  //             "'])"
  //         );
  //       self.Logger.logMessage(
  //         expectedElements.length +
  //           " option(s) available with exact text '" +
  //           expectedText +
  //           "'"
  //       );
  //       return expectedElements.length;
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () =>
  //           await self.getDropdownCount(elementDetails, expectedText, oTimeWait)
  //       );
  //     }
  //   }

  //   /**
  //    * Provides the count of options with sub text as provided- if text is not present, text in "value" is considered
  //    * @private subTextinDropdownCount
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    * @param {string} subTextToMatch subtext in value that needs to be matched
  //    * @param {number} [oTimeWait=40000] optional wait time for an element - default wait time is 40000ms
  //    * @throws {Error} when elementdetails or sub string is not provided
  //    * @throws {TimeoutError} when element is not present in the DOM
  //    * @throws {WebdriverError} when element doesn't exists.
  //    */
  //   private async subTextinDropdownCount(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     subTextToMatch: string,
  //     oTimeWait?: number
  //   ): Promise<number> {
  //     let self: this = this;
  //     let dropDownElement: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     let loaded: boolean = await self.isDropDownLoaded(dropDownElement);
  //     try {
  //       if (!subTextToMatch && subTextToMatch != "") {
  //         throw new Error("Please provide sub text to match");
  //       }
  //       let matchedOptionElements: ElementFinder[];
  //       if (loaded) {
  //         matchedOptionElements = await dropDownElement.$$(
  //           "(.//option[contains(text(),'" +
  //             subTextToMatch +
  //             "')])|(.//option[contains(@value,'" +
  //             subTextToMatch +
  //             "')])"
  //         );
  //       }
  //       self.Logger.logMessage(
  //         matchedOptionElements.length +
  //           " option(s) contain partial Text '" +
  //           subTextToMatch +
  //           "'"
  //       );
  //       return matchedOptionElements.length;
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () =>
  //           await self.subTextinDropdownCount(
  //             elementDetails,
  //             subTextToMatch,
  //             oTimeWait
  //           )
  //       );
  //     }
  //   }

  //   /**
  //    * Asserts on available options in dropdown
  //    * @method assertDropDownOptionsCount
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    * @param {number} expectedItemCount Expected no.of items in the select element
  //    * @param {number} [oTimeWait=40000] optional wait time for an element - default wait time is 40000ms
  //    * @throws {Error} when elementdetails or expected count of items is not provided
  //    * @throws {AssertionError} when expected items count is different from available options in dropdown
  //    */
  //   async assertDropDownOptionsCount(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     expectedItemCount: number,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this;
  //     let dropDownElement: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     let loaded: boolean = await self.isDropDownLoaded(dropDownElement);
  //     try {
  //       if (!expectedItemCount) {
  //         throw new Error("Please provide items count to verify");
  //       }
  //       let optionsElements: ElementFinder[] = [];
  //       if (loaded) {
  //         optionsElements = await dropDownElement.$$("option");
  //       }
  //       assert.equal(
  //         optionsElements.length,
  //         expectedItemCount,
  //         "Options count is different than expected"
  //       );
  //       self.Logger.logMessage(
  //         expectedItemCount + " option(s) present in dropDown as expected"
  //       );
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () =>
  //           await self.assertDropDownOptionsCount(
  //             elementDetails,
  //             expectedItemCount,
  //             oTimeWait
  //           )
  //       );
  //     }
  //   }

  //   /**
  //    * Asserts drop down is in alphabetical order
  //    * @method assertDropDownInAlphabaticOrder
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    * @param {SortingOrder} sortOrder select the enum option as ascending or descending -by default Ascending
  //    * @returns {Promise<boolean>}
  //    */
  //   async assertDropDownInAlphabaticOrder(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     sortOrder: SortingOrder = SortingOrder.Ascending
  //   ): Promise<void> {
  //     let self: this = this,
  //       notSorted: boolean = false,
  //       dropDownelement: ElementFinder,
  //       isDropDownLoaded: boolean = await self.isDropDownLoaded(elementDetails);
  //     if (isDropDownLoaded) {
  //       dropDownelement = await toElementFinder(self.Element, elementDetails);
  //     }
  //     try {
  //       if (isDropDownLoaded) {
  //         var options = await dropDownelement.$$("option").getText();
  //         if (sortOrder == SortingOrder.Ascending) {
  //           for (var i = 0; i < options.length - 1; i++) {
  //             if (
  //               options[i]
  //                 .toLowerCase()
  //                 .localeCompare(options[i + 1].toLowerCase()) > 0
  //             ) {
  //               self.Logger.logMessage(
  //                 "Drop down is not in Ascending Alphabatic order"
  //               );
  //               notSorted = true;
  //             }
  //           }
  //         } else if (sortOrder == SortingOrder.Descending) {
  //           for (var i = 0; i < options.length - 1; i++) {
  //             if (
  //               options[i + 1]
  //                 .toLowerCase()
  //                 .localeCompare(options[i].toLowerCase()) > 0
  //             ) {
  //               self.Logger.logMessage(
  //                 "Drop down is not in Descending Alphabatic order"
  //               );
  //               notSorted = true;
  //             }
  //           }
  //         }
  //         self.Logger.logMessage(
  //           "Drop down is in " + SortingOrder[sortOrder] + " Alphabatic order"
  //         );
  //       } else notSorted = true;
  //       assert.isFalse(
  //         notSorted,
  //         "DropDown is not in " + SortingOrder[sortOrder] + " Alphabatic order"
  //       );
  //     } catch (exception) {
  //       return super.catchException(
  //         exception,
  //         async () =>
  //           await self.assertDropDownInAlphabaticOrder(elementDetails, sortOrder)
  //       );
  //     }
  //   }

  //   /**
  //    * Asserts if the exact expected text is present in the dropdown - if text is not present, text in "value" is considered
  //    * @method assertDropDownHasOption
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    * @param {string} expectedText expected string to be selected
  //    * @param {number} [oTimeWait=40000] optional wait time for an element - default wait time is 40000ms
  //    * @throws {AssetionError} when expected Text doesn't exists in the dropDown
  //    * @throws {TimeoutError} when element is not present in the DOM
  //    * @throws {WebdriverError} when element doesn't exists.
  //    * @throws {Error} when elementDetails are not provided.
  //    * @throws {Error} when expectedText is not provided
  //    */
  //   async assertDropDownHasOption(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     expectedText: string,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this;
  //     let matchedElementsCount = await self.getDropdownCount(
  //       elementDetails,
  //       expectedText,
  //       oTimeWait
  //     );
  //     try {
  //       assert.isTrue(
  //         matchedElementsCount > 0,
  //         "Option doesn't exists in the dropDown"
  //       );
  //     } catch (exception) {
  //       return super.catchException(
  //         exception,
  //         async () =>
  //           await self.assertDropDownHasOption(
  //             elementDetails,
  //             expectedText,
  //             oTimeWait
  //           )
  //       );
  //     }
  //   }

  //   /**
  //    * Asserts on count of items with exact text as provided
  //    * @method assertDropDownSameOptionsCount
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    * @param {string} textToMatch Text in the options of dropDown
  //    * @param {number} expectedItemCount Expected no.of items in the select element
  //    * @param {number} [oTimeWait=40000] optional wait time for an element - default wait time is 40000ms
  //    * @throws {Error} when elementdetails or expected count of items is not provided
  //    * @throws {AssertionError} when expected count of items with expected Text is different from available options with expected Text in dropdown
  //    */
  //   async assertDropDownSameOptionsCount(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     textToMatch: string,
  //     expectedItemCount: number,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this;
  //     let matchedElementsCount = await self.getDropdownCount(
  //       elementDetails,
  //       textToMatch,
  //       oTimeWait
  //     );
  //     try {
  //       if (!expectedItemCount) {
  //         throw new Error("Please provide items count to verify");
  //       }
  //       assert.equal(
  //         matchedElementsCount,
  //         expectedItemCount,
  //         "Options count with Text '" +
  //           textToMatch +
  //           "' is different than expected"
  //       );
  //     } catch (exception) {
  //       return super.catchException(
  //         exception,
  //         async () =>
  //           await self.assertDropDownSameOptionsCount(
  //             elementDetails,
  //             textToMatch,
  //             expectedItemCount,
  //             oTimeWait
  //           )
  //       );
  //     }
  //   }

  //   /**
  //    * Asserts count of options with Partial text provided
  //    * @method assertDropDownPartialOptionsCount
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    * @param {string} PartialTextToMatch partial-Text in the options of dropDown
  //    * @param {number} expectedItemCount Expected no.of items in the select element
  //    * @param {number} [oTimeWait=40000] optional wait time for an element - default wait time is 40000ms
  //    * @throws {Error} when elementdetails or expected count of items is not provided
  //    * @throws {AssertionError} when expected count of items with expected Text is different from available options with expected Text in dropdown
  //    */
  //   async assertDropDownPartialOptionsCount(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     partialTextToMatch: string,
  //     expectedItemCount: number,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this;
  //     let matchedElementsCount = await self.subTextinDropdownCount(
  //       elementDetails,
  //       partialTextToMatch,
  //       oTimeWait
  //     );
  //     try {
  //       if (!expectedItemCount) {
  //         throw new Error("Please provide items count to verify");
  //       }
  //       assert.equal(
  //         matchedElementsCount,
  //         expectedItemCount,
  //         "Options count containing partial text '" +
  //           partialTextToMatch +
  //           "' is different than expected"
  //       );
  //     } catch (exception) {
  //       return super.catchException(
  //         exception,
  //         async () =>
  //           await self.assertDropDownPartialOptionsCount(
  //             elementDetails,
  //             partialTextToMatch,
  //             expectedItemCount,
  //             oTimeWait
  //           )
  //       );
  //     }
  //   }

  //   /**
  //    * Asserts if expected partial text is present in any of the dropdown options' text- if text is not present text in "value" is considered
  //    * @method assertDropDownContainOptionWithPartialText
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    * @param {string} partialTextToMatch Sub-Text in the options of dropDown
  //    * @param {number} [oTimeWait=40000] optional wait time for an element - default wait time is 40000ms
  //    * @throws {Error} when elementdetails or expected count of items is not provided
  //    * @throws {AssertionError} when expected count of items with expected Text is different from available options with expected Text in dropdown
  //    */
  //   async assertDropDownContainOptionWithPartialText(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     partialTextToMatch: string,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this;
  //     let matchedElementsCount = await self.subTextinDropdownCount(
  //       elementDetails,
  //       partialTextToMatch,
  //       oTimeWait
  //     );
  //     try {
  //       assert.isTrue(
  //         matchedElementsCount > 0,
  //         "Options Containing partial text '" +
  //           partialTextToMatch +
  //           "' doesn't exist in dropdown"
  //       );
  //     } catch (exception) {
  //       return super.catchException(
  //         exception,
  //         async () =>
  //           await self.assertDropDownContainOptionWithPartialText(
  //             elementDetails,
  //             partialTextToMatch,
  //             oTimeWait
  //           )
  //       );
  //     }
  //   }

  //   /**
  //    * Asserts the exact text on given element
  //    * @method assertElementText
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    * @param {string} expectedText expected Text on dropDown.
  //    * @param {number} oTimeWait optional wait time for an element - default wait time is 40000ms
  //    */
  //   async assertElementText(
  //     elementDetails: locatorDetails | string | ElementFinder,
  //     expectedText: string,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this;
  //     let elementToVerify: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     try {
  //       if (!expectedText && expectedText != "") {
  //         throw new Error("Please provide proper text to assert");
  //       }
  //       let actualString = await elementToVerify.getText();
  //       assert.equal(
  //         actualString,
  //         expectedText.trim(),
  //         "Text on Element doesn't match with expected text"
  //       );
  //       self.Logger.logMessage(
  //         "Element Text is " + actualString + " as Expected"
  //       );
  //     } catch (exception) {
  //       return super.catchException(
  //         exception,
  //         async () =>
  //           await self.assertElementText(elementDetails, expectedText, oTimeWait)
  //       );
  //     }
  //   }

  //   /**
  //    * Asserts the attribute's value of given element with provided text
  //    * @method assertElementAttributeValue
  //    * @param {(locatorDetails | string | ElementFinder)} elementDetails KeyName or type locatorDetails or an element object
  //    * @param {string} [attribute='value'] attribute name
  //    * @param {string} expectedAttributeValue expected attribute value
  //    * @param {number} [oTimeWait=40000] optional wait time for an element
  //    * @returns {Promise<void>}
  //    * @memberof Assertion
  //    */
  //   async assertElementAttributeValue(
  //     elementDetails: locatorDetails | string | ElementFinder,
  //     expectedAttributeValue: string,
  //     oTimeWait?: number,
  //     attribute: string = "value"
  //   ): Promise<void> {
  //     let self: this = this;
  //     let elementToVerify: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     try {
  //       if (!expectedAttributeValue && expectedAttributeValue != "") {
  //         throw new Error("Please provide proper attribute value to assert");
  //       }
  //       if (!attribute) {
  //         throw new Error("Please provide attribute name");
  //       }
  //       let actualString =
  //         (await elementToVerify.getAttribute(attribute)) ||
  //         (await browser.execute(
  //           "return arguments[0]." + attribute,
  //           elementToVerify
  //         ));
  //       assert.equal(
  //         actualString,
  //         expectedAttributeValue.trim(),
  //         "'" +
  //           attribute +
  //           "' attribute's value on Element doesn't match with expected text '" +
  //           expectedAttributeValue +
  //           "'"
  //       );
  //       self.Logger.logMessage(
  //         "Element's value attribute's value is " + actualString + " as Expected"
  //       );
  //     } catch (exception) {
  //       return super.catchException(
  //         exception,
  //         async () =>
  //           await self.assertElementAttributeValue(
  //             elementDetails,
  //             expectedAttributeValue,
  //             oTimeWait,
  //             attribute
  //           )
  //       );
  //     }
  //   }

  //   /**
  //    * Verifies whether element is enabled
  //    * @method isElementEnabled
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    * @param {number} [oTimeWait=40000] optional wait time for an element - default wait time is 40000ms
  //    * @returns {Promise<boolean>}
  //    */
  //   async isElementEnabled(
  //     elementDetails: locatorDetails | string | ElementFinder,
  //     oTimeWait?: number
  //   ): Promise<boolean> {
  //     let self: this = this;
  //     let elementToVerify: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     try {
  //       let isEnabled: boolean = await elementToVerify.isEnabled();
  //       if (isEnabled) self.Logger.logMessage("Element is in Enabled state");
  //       else self.Logger.logMessage("Element is not in Enabled state");
  //       return isEnabled;
  //     } catch (exception) {
  //       return super.catchException(
  //         exception,
  //         async () => await self.isElementEnabled(elementDetails, oTimeWait)
  //       );
  //     }
  //   }

  //   /**
  //    * Verifies whether the element is currently displayed
  //    * @method isElementDisplayed
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    * @returns {Promise<boolean>}
  //    */
  //   async isElementDisplayed(
  //     elementDetails: locatorDetails | string | ElementFinder
  //   ): Promise<boolean> {
  //     let self: this = this,
  //       elementToVerify: ElementFinder,
  //       isDisplayed: boolean;
  //     try {
  //       if (isElementFinder(elementDetails)) elementToVerify = elementDetails;
  //       else elementToVerify = await self.Element.findElement(elementDetails);
  //       try {
  //         isDisplayed = await elementToVerify.isDisplayed();
  //       } catch (e) {
  //         if (e.name == "no such element") {
  //           self.Logger.logMessage(
  //             "Element is not being displayed as it is not present in DOM"
  //           );
  //           return false;
  //         }
  //       }
  //       if (isDisplayed) self.Logger.logMessage("Element is being displayed");
  //       else self.Logger.logMessage("Element is not being displayed");
  //       return isDisplayed;
  //     } catch (exception) {
  //       return super.catchException(
  //         exception,
  //         async () => await self.isElementDisplayed(elementDetails)
  //       );
  //     }
  //   }

  //   /**
  //    * Asserts check box element is selected
  //    * @method assertCheckBoxSelected
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    * @param {number} [oTimeWait=40000] optional wait time for an element - default wait time is 40000ms
  //    */
  //   async assertCheckBoxSelected(
  //     elementDetails: locatorDetails | string | ElementFinder,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this;
  //     let elementToVerify: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     try {
  //       const iSCheckBoxSelected: boolean = await elementToVerify.isSelected();
  //       assert.isTrue(
  //         iSCheckBoxSelected,
  //         "Provided checkbox element is not in selected state"
  //       );
  //       self.Logger.logMessage("Provided checkbox element is in selected state");
  //     } catch (exception) {
  //       return super.catchException(
  //         exception,
  //         async () => await self.assertCheckBoxSelected(elementDetails, oTimeWait)
  //       );
  //     }
  //   }

  //   /**
  //    * Asserts check box element is not selected
  //    * @method assertCheckBoxNotSelected
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    * @param {number} [oTimeWait=40000] optional wait time for an element - default wait time is 40000ms
  //    */
  //   async assertCheckBoxNotSelected(
  //     elementDetails: locatorDetails | string | ElementFinder,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this;
  //     let elementToVerify: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     try {
  //       const iSCheckBoxNotSelected: boolean = await elementToVerify.isSelected();
  //       assert.isFalse(
  //         iSCheckBoxNotSelected,
  //         "Provided checkbox element is already in selected state"
  //       );
  //       self.Logger.logMessage(
  //         "Provided checkbox element is not in selected state"
  //       );
  //     } catch (exception) {
  //       return super.catchException(
  //         exception,
  //         async () =>
  //           await self.assertCheckBoxNotSelected(elementDetails, oTimeWait)
  //       );
  //     }
  //   }

  //   /**
  //    * Asserts whether the radio button element is selected
  //    * @method assertRadioButtonSelected
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    * @param {number} [oTimeWait=40000] optional wait time for an element - default wait time is 40000ms
  //    */
  //   async assertRadioButtonSelected(
  //     elementDetails: locatorDetails | string | ElementFinder,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this;
  //     let elementToVerify: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     try {
  //       const iSRadioButtonSelected: boolean = await elementToVerify.isSelected();
  //       assert.isTrue(
  //         iSRadioButtonSelected,
  //         "Provided radio button element is not selected"
  //       );
  //       self.Logger.logMessage(
  //         "Provided radio button element is in selected state"
  //       );
  //     } catch (exception) {
  //       return super.catchException(
  //         exception,
  //         async () =>
  //           await self.assertRadioButtonSelected(elementDetails, oTimeWait)
  //       );
  //     }
  //   }

  //   /**
  //    * Asserts radio button element is not selected
  //    * @method assertRadioButtonNotSelected
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    * @param {number} [oTimeWait=40000] optional wait time for an element - default wait time is 40000ms
  //    */
  //   async assertRadioButtonNotSelected(
  //     elementDetails: locatorDetails | string | ElementFinder,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this;
  //     let elementToVerify: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     try {
  //       const iSRadioButtonNotSelected: boolean =
  //         await elementToVerify.isSelected();
  //       assert.isFalse(
  //         iSRadioButtonNotSelected,
  //         "Provided radio button element is already in selected state"
  //       );
  //       self.Logger.logMessage(
  //         "Provided radio button element is not in selected state"
  //       );
  //     } catch (exception) {
  //       return super.catchException(
  //         exception,
  //         async () =>
  //           await self.assertRadioButtonNotSelected(elementDetails, oTimeWait)
  //       );
  //     }
  //   }

  //   /**
  //    * Verifies specific text contained in URL
  //    * @method isURLContainsText
  //    * @param {string} urlText url text that need to verify
  //    * @returns {Promise<boolean>}
  //    */
  //   async isURLContainsText(urlText: string): Promise<boolean> {
  //     let self: this = this;
  //     try {
  //       if (!urlText) {
  //         throw new Error("Please provide proper url text to verify");
  //       }
  //       let actualUrl = await browser.getUrl();
  //       let urlContains: boolean = (await actualUrl.indexOf(urlText)) > -1;
  //       if (urlContains)
  //         self.Logger.logMessage("URL " + actualUrl + "contains " + urlText);
  //       else
  //         self.Logger.logMessage(
  //           "URL " + actualUrl + "doesn't contain " + urlText
  //         );
  //       return urlContains;
  //     } catch (exception) {
  //       return super.catchException(
  //         exception,
  //         async () => await self.isURLContainsText(urlText)
  //       );
  //     }
  //   }

  //   /**
  //    * Verifies attribute's value contains expected text
  //    * @method isAttrContains
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    * @param {string} attribute attribute to be verfied on
  //    * @param {string} expectedValue value to be verified with
  //    * @param {number} [oTimeWait=40000] optional wait time for an element - default wait time is 40000ms
  //    * @return {Promise<boolean>} Promise<boolean>
  //    */
  //   async isAttrContains(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     attribute: string,
  //     expectedValue: string,
  //     oTimeWait?: number
  //   ): Promise<boolean> {
  //     let self: this = this;
  //     let targetElement: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     try {
  //       return verifyAttrContains(targetElement, attribute, expectedValue, false);
  //     } catch (exception) {
  //       return super.catchException(
  //         exception,
  //         async () =>
  //           await self.isAttrContains(
  //             elementDetails,
  //             attribute,
  //             expectedValue,
  //             oTimeWait
  //           )
  //       );
  //     }
  //   }

  //   /**
  //    * Verifies attribute's value has expected text
  //    * @method isAttrEquals
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    * @param {string} attribute attribute to be verfied on
  //    * @param {string} expectedValue value to be verified with
  //    * @param {number} [oTimeWait=40000] optional wait time for an element - default wait time is 40000ms
  //    * @return {Promise<boolean>} Promise<boolean>
  //    */
  //   async isAttrEquals(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     attribute: string,
  //     expectedValue: string,
  //     oTimeWait?: number
  //   ): Promise<boolean> {
  //     let self: this = this;
  //     let targetElement: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     try {
  //       return verifyAttrEquals(targetElement, attribute, expectedValue, false);
  //     } catch (exception) {
  //       return super.catchException(
  //         exception,
  //         async () =>
  //           await self.isAttrEquals(
  //             elementDetails,
  //             attribute,
  //             expectedValue,
  //             oTimeWait
  //           )
  //       );
  //     }
  //   }

  //   /**
  //    * Verify is drop-down loaded
  //    * @method isDropDownLoaded
  //    * @param {(string | locatorDetails | ElementFinder)} elementDetails  KeyName or type locatorDetails or an element object
  //    * @param {number} [oTimeWait=40000] optional wait time for an element - default wait time is 40000ms
  //    * @returns {Promise<boolean>}
  //    * @throws {TimeoutError} when element is not present in the DOM
  //    * @throws {WebdriverError} when element doesn't exists.
  //    */
  //   async isDropDownLoaded(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     oTimeWait?: number
  //   ): Promise<boolean> {
  //     let self: this = this;
  //     let dropDownElement: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     try {
  //       let item: ElementFinder[] = await dropDownElement.$$("option");
  //       if (item.length !== null && item.length > 0) {
  //         self.Logger.logMessage("Dropdown loaded");
  //         return true;
  //       } else {
  //         self.Logger.logMessage("Dropdown not loaded");
  //         return false;
  //       }
  //     } catch (exception) {
  //       return super.catchException(
  //         exception,
  //         async () => await self.isDropDownLoaded(elementDetails, oTimeWait)
  //       );
  //     }
  //   }
}
