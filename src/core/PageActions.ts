"use strict";
import { ExceptionHandler } from "./ExceptionHandler";
import { IClick, IEnterText, WAITCONDITIONS } from "../types";
import { Element } from "./Element";
// import { Assertion } from "./Assertions";

export class Action extends ExceptionHandler {
  Element: Element;
  // Assertion: Assertion;

  constructor() {
    super();
    this.Element = Element.getInstance();
  }

  /**
   * Scrolls until the element is in view
   * @method scrollIntoView
   * @param elementDetails {string | locatorDetails | ElementFinder} KeyName or type locatorDetails or an element
   * @param oTimeWait {number} optional wait time for an element - default wait time is 40000ms
   */
  //   async scrollIntoView(
  //     elementDetails: locatorDetails | string | ElementFinder,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this;
  //     let element: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     try {
  //       await browser.execute("arguments[0].scrollIntoView()", element);
  //       Logger.log("Scroll Successful");
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () => await self.scrollIntoView(elementDetails, oTimeWait)
  //       );
  //     }
  //   }

  //   /**
  //    * Accepts Alert
  //    * Switches to the alert and accepts the alert
  //    * @method acceptAlert
  //    * @throws {NoSuchAlertException} if alert doessn't exists
  //    */
  //   async acceptAlert(): Promise<void> {
  //     let self: this = this;
  //     try {
  //       Logger.log(
  //         "Accepting alert box with text: " + (await browser.getAlertText())
  //       );
  //       await browser.acceptAlert();
  //     } catch (ex) {
  //       await super.catchException(ex, async () => await self.acceptAlert());
  //     }
  //   }

  //   /**
  //    * Accepts Alert and returns text in the alert
  //    * Switches to the alert ,accepts the alert and returns text in the alert
  //    * @method acceptAlertandGetText
  //    * @returns {Promise<string>} text in alert
  //    * @throws {NoSuchAlertException} if alert doessn't exists
  //    */
  //   async acceptAlertandGetText(): Promise<string> {
  //     let self: this = this;
  //     try {
  //       let alertText: string = await browser.getAlertText();
  //       Logger.log("Accepting alert box with text: " + alertText);
  //       await browser.acceptAlert();
  //       return alertText;
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () => await self.acceptAlertandGetText()
  //       );
  //     }
  //   }

  //   /**
  //    * Dismisses Alert
  //    * Switches to the alert and dismisses the alert
  //    * @method DismissAlert
  //    * @throws {NoSuchAlertException} if alert doesn't exists
  //    */
  //   async dismissAlert(): Promise<void> {
  //     let self: this = this;
  //     try {
  //       Logger.log(
  //         "Dismissing alert box with text: " + (await browser.getAlertText())
  //       );
  //       await browser.dismissAlert();
  //     } catch (ex) {
  //       await super.catchException(ex, async () => await self.dismissAlert());
  //     }
  //   }

  //   /**
  //    * Dismisses Alert and returns text in the alert
  //    * Switches to the alert ,dismisses the alert  and returns text in the alert
  //    * @method DismissAlertandGetText
  //    * @return {Promise<string>} text in alert
  //    * @throws {NoSuchAlertException} if alert doesn't exists
  //    */
  //   async dismissAlertandGetText(): Promise<string> {
  //     let self: this = this;
  //     try {
  //       let alertText = await browser.getAlertText();
  //       Logger.log("Dismissing alert box with text: " + alertText);
  //       await browser.dismissAlert();
  //       return alertText;
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () => await self.dismissAlertandGetText()
  //       );
  //     }
  //   }

  /**
   * Enters data to the input element
   * Enters Data to an element that is either resolved using passed  parameter: locator_details or keyname.
   * @method enterData
   * @param elementDetails {string |locatorDetails | ElementFinder} KeyName or type locatorDetails or an element
   * @param inputText {string} data that needs to be passed to input
   * @param oTimeWait {number} optional wait time for an element - default wait time is 40000ms
   * @throws {TimeOutError} when the element is not present
   * @throws {Please Provide Element Details} when elementDetails param is null or undefined
   */
  async enterText(args: IEnterText): Promise<void> {
    let self: this = this;
    let element: WebdriverIO.Element = await self.Element.findElement({
      ...args,
      waitCondition: WAITCONDITIONS.ELEMENTTOBEENABLED,
    });
    try {
      if (args.clickBeforeTextInput) {
        await self.click(args);
      }
      await element.setValue(args.inputText);
      Logger.log("Entered text '" + args.inputText + "' to the element");
    } catch (exception) {
      args.clickBeforeTextInput = !args.clickBeforeTextInput;
      await super.catchException(
        exception,
        async () => await self.enterText(args)
      );
    }
  }

  /**
   * Clicks the element passed
   * Clicks on element that is resolved using passed parameter: locator_details or keyname
   * @method click
   * @param elementDetails {string |locatorDetails | ElementFinder} KeyName or type locatorDetails or an element
   * @param oTimeWait {number} optional wait time for an element - default wait time is 40000ms
   * @throws {TimeOutError} when the element is not present
   * @throws {Please Provide Element Details} when elementDetails param is null or undefined
   */
  async open(path: string): Promise<void> {
    let self: this = this;

    try {
      await browser.url(path);
      Logger.log("Element is clicked");
    } catch (ex) {
      await super.catchException(ex, async () => await self.open(path));
    }
  }

  /**
   * Clicks the element passed
   * Clicks on element that is resolved using passed parameter: locator_details or keyname
   * @method click
   * @param elementDetails {string |locatorDetails | ElementFinder} KeyName or type locatorDetails or an element
   * @param oTimeWait {number} optional wait time for an element - default wait time is 40000ms
   * @throws {TimeOutError} when the element is not present
   * @throws {Please Provide Element Details} when elementDetails param is null or undefined
   */
  async click(args: IClick): Promise<void> {
    let self: this = this;
    let element: WebdriverIO.Element = await self.Element.findElement({
      ...args,
      waitCondition: WAITCONDITIONS.ELEMENTTOBECLICKABLE,
    });

    try {
      await element.click();
      Logger.log("Element is clicked");
    } catch (ex) {
      await super.catchException(ex, async () => await self.click(args));
    }
  }

  //   /**
  //    * Clicks the element passed using javascript directly
  //    * Clicks on element using executeScript that is resolved using passed parameter: locator_details or keyname
  //    * @method jsClick
  //    * @param elementDetails {string |locatorDetails | ElementFinder} KeyName or type locatorDetails or an element
  //    * @param oTimeWait {number} optional wait time for an element - default wait time is 40000ms
  //    * @throws {TimeOutError} when the element is not present
  //    * @throws {Please Provide Element Details} when elementDetails param is null or undefined
  //    */
  //   async jsClick(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this;
  //     let element: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     try {
  //       await browser.execute("arguments[0].click()", element);
  //       Logger.log("Element is clicked using javascript directly");
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () => await self.jsClick(elementDetails, oTimeWait)
  //       );
  //     }
  //   }

  //   /**
  //    * clears the text in the input element
  //    * clears the text in an element that is resolved using passed parameter: locator_details or keyname
  //    * @method clear
  //    * @param elementDetails {string |locatorDetails | ElementFinder} KeyName or type locatorDetails or an element
  //    * @param oTimeWait {number} optional wait time for an element - default wait time is 40000ms
  //    * @throws {TimeOutError} when the element is not present
  //    * @throws {Please Provide Element Details} when elementDetails param is null or undefined
  //    */
  //   async clear(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this;
  //     let element: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     try {
  //       await element.clearValue();
  //       Logger.log("Text in the element is cleared");
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () => await self.clear(elementDetails, oTimeWait)
  //       );
  //     }
  //   }

  //   /**
  //    * Selects drop-down item by index
  //    * @method selectDropdownByIndex
  //    * @param elementDetails {string | locatorDetails | ElementFinder} KeyName or type locatorDetails or an element
  //    * @param index {number} index value to select drop down element
  //    * @param oTimeWait {number} optional wait time for an element - default wait time is 40000ms
  //    * @returns {Promise<void>}
  //    */
  //   async selectDropdownByIndex(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     index: number,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this;
  //     let dropDownElement: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails
  //     );
  //     try {
  //       if (!index || index < 0) {
  //         throw new Error("Please provide positive index value");
  //       }
  //       await self.click(dropDownElement);
  //       let dropDownLoadedResult = await self.Assertion.isDropDownLoaded(
  //         dropDownElement,
  //         oTimeWait
  //       );
  //       if (dropDownLoadedResult) {
  //         let dropDownItemToSelect = await dropDownElement.$(
  //           ".//option[" + index + "]"
  //         );
  //         await dropDownItemToSelect.click();
  //         let dropDownItemSelectedText = await dropDownItemToSelect.getText();
  //         let selectedIndex: number = await browser.execute(
  //           "return arguments[0].selectedIndex",
  //           dropDownElement
  //         );
  //         let dropDownText = await dropDownElement
  //           .$(".//option[" + (selectedIndex + 1) + "]")
  //           .getText();
  //         if (dropDownItemSelectedText == dropDownText) {
  //           Logger.log(
  //             "Dropdown value selected at index " +
  //               index +
  //               " is :" +
  //               dropDownItemSelectedText
  //           );
  //         } else {
  //           Logger.log("Provided wrong index : " + index);
  //         }
  //       } else {
  //         Logger.log("Dropdown is not loaded!");
  //       }
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () =>
  //           await self.selectDropdownByIndex(elementDetails, index, oTimeWait)
  //       );
  //     }
  //   }

  //   /**
  //    * Selects drop-down item by Text
  //    * @method selectDropdownByText
  //    * @param elementDetails {string |locatorDetails | ElementFinder} KeyName or type locatorDetails or an element
  //    * @param textString {string} text/value to select drop down element
  //    * @param oTimeWait {number} optional wait time for an element - default wait time is 40000ms
  //    * @return {Promise<void>}
  //    */
  //   async selectDropdownByText(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     textString: string,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this;
  //     let dropDownElement: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails
  //     );
  //     try {
  //       if (!textString) {
  //         throw new Error("Please provide proper text to select dropdown");
  //       }
  //       await self.click(dropDownElement);
  //       let dropDownLoadedResult = await self.Assertion.isDropDownLoaded(
  //         dropDownElement,
  //         oTimeWait
  //       );
  //       if (dropDownLoadedResult) {
  //         let dropDownElementToSelect = await dropDownElement.$(
  //           "(.//option[text()='" +
  //             textString +
  //             "'])|(.//option[@value= '" +
  //             textString +
  //             "'])"
  //         );
  //         await dropDownElementToSelect.click();
  //         let dropDownItemSelectedText: string =
  //           await dropDownElementToSelect.getText();
  //         let dropDownItemSelectedValue: string =
  //           await dropDownElementToSelect.getAttribute("value");
  //         if (
  //           dropDownItemSelectedText == textString ||
  //           dropDownItemSelectedValue == textString
  //         ) {
  //           Logger.log(
  //             "Dropdown is selected using text or value: " + textString
  //           );
  //         } else {
  //           Logger.log("Provided improper text: " + textString);
  //         }
  //       } else {
  //         Logger.log("Dropdown is not loaded!");
  //       }
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () =>
  //           await self.selectDropdownByText(elementDetails, textString, oTimeWait)
  //       );
  //     }
  //   }

  //   /**
  //    * Performs double click operation on the passed element
  //    * Performs double click operation on the passed element which is resolved using passed parameter: locator_details or keyname
  //    * @method doubleClick
  //    * @param elementDetails {string | locatorDetails | ElementFinder} KeyName or type locatorDetails or an element
  //    * @param oTimeWait {number} optional wait time for an element - default wait time is 40000ms
  //    * @throws {TimeOutError} when the element is not present
  //    * @throws {Please provide element details} when elementDetails param is null or undefined
  //    */
  //   async doubleClick(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this;
  //     let element: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     try {
  //       await element.doubleClick();
  //       Logger.log(
  //         "Double click operation is performed on the element"
  //       );
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () => await self.doubleClick(elementDetails, oTimeWait)
  //       );
  //     }
  //   }

  //   /**
  //    * Performs mouse hover operation on the passed element
  //    * Performs mouse hover operation on the passed element which is resolved using passed parameter: locator_details or keyname
  //    * @method mouseHover
  //    * @param elementDetails {string | locatorDetails | ElementFinder} KeyName or type locatorDetails or an element
  //    * @param oTimeWait {number} optional wait time for an element - default wait time is 40000ms
  //    * @throws {TimeOutError} when the element is not present
  //    * @throws {Please provide element details} when elementDetails param is null or undefined
  //    */
  //   async mouseHover(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this;
  //     let element: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     try {
  //       await element.moveTo();
  //       Logger.log(
  //         "Mouse hover operation is performed on the element"
  //       );
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () => await self.mouseHover(elementDetails, oTimeWait)
  //       );
  //     }
  //   }

  //   /**
  //    * Mouse is moved to the element and the element is clicked
  //    * Performs mouse move and click operation on the passed element which is resolved using passed parameter: locator_details or keyname
  //    * @method moveToElementAndClick
  //    * @param elementDetails {string | locatorDetails | ElementFinder} KeyName or type locatorDetails or an element
  //    * @param oTimeWait {number} optional wait time for an element - default wait time is 40000ms
  //    * @throws {TimeOutError} when the element is not present
  //    * @throws {Please provide element details} when elementDetails param is null or undefined
  //    */
  //   async moveToElementAndClick(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this;
  //     let element: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     try {
  //       await element.moveTo();
  //       await element.click();
  //       Logger.log(
  //         "Mouse is moved to the element and click operation is performed"
  //       );
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () => await self.moveToElementAndClick(elementDetails, oTimeWait)
  //       );
  //     }
  //   }

  //   /**
  //    * Switch back to default window, after dealing with some framed elements
  //    * This command has no effect if the driver is already focused on the top-level browsing context
  //    * @method switchToDefaultContent
  //    */
  //   async switchToDefaultContent(): Promise<void> {
  //     let self: this = this;
  //     try {
  //       await browser.switchToParentFrame();
  //       Logger.log(
  //         "Switched back to default window, after dealing with some framed elements"
  //       );
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () => await self.switchToDefaultContent()
  //       );
  //     }
  //   }

  //   /**
  //    * Takes screenshot of the passed element
  //    * Takes screenshot of the passed element which is resolved using passed parameter: locator_details or keyname
  //    * @method takeElementScreenShot
  //    * @param elementDetails {string | locatorDetails | ElementFinder} KeyName or type locatorDetails or an element
  //    * @param fileName {string} Screenshot file name with full path
  //    * @param oTimeWait {number} optional wait time for an element - default wait time is 40000ms
  //    * @throws {TimeOutError} when the element is not present
  //    * @throws {Please Provide Element Details} when elementDetails param is null or undefined
  //    */
  //   async takeElementScreenShot(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     fileName: string,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this;
  //     let screensPath = "./Screens/";
  //     let element: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     try {
  //       if (!fileName) {
  //         throw new Error("Please provide filename details");
  //       }
  //       let imageData = await element.takeScreenshot();
  //       mkdirp(screensPath, function (err) {
  //         if (err) {
  //           console.error(err);
  //         } else {
  //         }
  //       });
  //       var stream = fs.createWriteStream(screensPath + fileName);
  //       stream.write(new Buffer(imageData, "base64"));
  //       stream.end();
  //       Logger.log(
  //         "Screenshot operation is performed on the element"
  //       );
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () =>
  //           await self.takeElementScreenShot(elementDetails, fileName, oTimeWait)
  //       );
  //     }
  //   }

  //   /**
  //    * Appends the given text to an existing string
  //    * @method appendText : Text to be appended to the existing text
  //    * @param elementDetails {string | locatorDetails | ElementFinder}  KeyName or object of type locatorDetails or Element
  //    * @param textToAppend {string} text to be appended
  //    * @param oProvideSpace {boolean} optional provide space
  //    */
  //   async appendText(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     textToAppend: string,
  //     oProvideSpace?: boolean
  //   ): Promise<void> {
  //     let self: this = this;
  //     let element: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails
  //     );
  //     try {
  //       let previousText = await element.getAttribute("value");
  //       await element.clearValue();
  //       if (oProvideSpace) {
  //         await self.enterData(element, previousText + " " + textToAppend);
  //         Logger.log(
  //           "Appended given text and added a space between the given and existing text : " +
  //             previousText
  //         );
  //       } else {
  //         await self.enterData(element, previousText + textToAppend);
  //         Logger.log(
  //           "Appended given text to the existing text : " + previousText
  //         );
  //       }
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () =>
  //           await self.appendText(elementDetails, textToAppend, oProvideSpace)
  //       );
  //     }
  //   }

  //   /**
  //    * Prepends the given text to an existing string
  //    * @method prependText : Text to be prepended to the existing text
  //    * @param elementDetails {string | locatorDetails | ElementFinder}  KeyName or object of type locatorDetails or Element
  //    * @param textToPrepend {string} text to be prepended
  //    * @param oProvideSpace {boolean} optional provide space
  //    */
  //   async prependText(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     textToPrepend: string,
  //     oProvideSpace?: boolean
  //   ): Promise<void> {
  //     let self: this = this;
  //     let element: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails
  //     );
  //     try {
  //       let previousText = await element.getAttribute("value");
  //       await element.clearValue();
  //       if (oProvideSpace) {
  //         await self.enterData(element, textToPrepend + " " + previousText);
  //         Logger.log(
  //           "Prepended and added a space between the given and existing text : " +
  //             previousText
  //         );
  //       } else {
  //         await self.enterData(element, textToPrepend + previousText);
  //         Logger.log(
  //           "Prepended given text to the existing text : " + previousText
  //         );
  //       }
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () =>
  //           await self.prependText(elementDetails, textToPrepend, oProvideSpace)
  //       );
  //     }
  //   }

  //   /**
  //    * To move forward in the browser history
  //    * @method browseForward
  //    */
  //   async browseForward(): Promise<void> {
  //     let self: this = this;
  //     try {
  //       await browser.forward();
  //     } catch (ex) {
  //       await super.catchException(ex, async () => await self.browseForward());
  //     }
  //   }

  //   /**
  //    * To move backward in the browser history
  //    * @method browseBackWard
  //    */
  //   async browseBackWard(): Promise<void> {
  //     let self: this = this;
  //     try {
  //       await browser.back();
  //     } catch (ex) {
  //       await super.catchException(ex, async () => await self.browseBackWard());
  //     }
  //   }

  //   /**
  //    * To refresh the current page
  //    * @method browseRefresh
  //    */
  //   async browseRefresh(): Promise<void> {
  //     let self: this = this;
  //     try {
  //       await browser.refresh();
  //     } catch (ex) {
  //       await super.catchException(ex, async () => await self.browseRefresh());
  //     }
  //   }

  //   /**
  //    * Takes the screenshot of entire page
  //    * @method takeScreenshot
  //    * @param screenShotName : Provide the screenshot filename
  //    * @param oDirPath : Provide the folder path to store screenshot
  //    */
  //   async takeScreenshot(
  //     screenShotFileName: string,
  //     oDirPath?: string
  //   ): Promise<void> {
  //     let self: this = this;
  //     try {
  //       var base64Matcher = new RegExp(
  //         "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})$"
  //       );
  //       var imageData: string = await browser.takeScreenshot();
  //       if (base64Matcher.test(imageData)) {
  //         var tempDir: string;
  //         if (!fs.existsSync(oDirPath)) {
  //           if (!fs.existsSync("./ScreenShots")) {
  //             await fs.mkdirSync("./ScreenShots");
  //             tempDir = "./ScreenShots";
  //           } else tempDir = "./ScreenShots";
  //         } else {
  //           var tempDir = oDirPath;
  //         }
  //         if (!screenShotFileName) screenShotFileName = "PageScreenShot";
  //         var stream = await fs.createWriteStream(
  //           tempDir + "/" + screenShotFileName + ".png"
  //         );
  //         await stream.write(new Buffer(imageData, "base64"));
  //         await stream.end();
  //         Logger.log(
  //           "Please find the screenshot in the following path : " + tempDir
  //         );
  //       }
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () => await self.takeScreenshot(screenShotFileName, oDirPath)
  //       );
  //     }
  //   }

  //   /**
  //    * gets the elements count matching the locator
  //    * @method getElementsCount
  //    * @param elementDetails {string | locatorDetails | ElementFinder} KeyName or type locatorDetails or an element
  //    * @returns {Promise<number>}
  //    */
  //   async getElementsCount(
  //     elementDetails: string | locatorDetails
  //   ): Promise<number> {
  //     let self: this = this;
  //     let elements: ElementFinder[] = await self.Element.getElements(
  //       elementDetails
  //     );
  //     return elements.length;
  //   }

  //   /**
  //    * gets text of all elements matching locator
  //    * @method getElementsText
  //    * @param elementDetails {string | locatorDetails | ElementFinder} KeyName or type locatorDetails or an element
  //    * @returns {Promise<string[]>}
  //    */
  //   async getElementsText(
  //     elementDetails: string | locatorDetails
  //   ): Promise<string[]> {
  //     let self: this = this;
  //     let elements: ElementFinder[] = await self.Element.getElements(
  //       elementDetails
  //     );
  //     try {
  //       let elementsText: string[] = [],
  //         tempText: string;
  //       for (let i = 0; i < elements.length; i++) {
  //         tempText = await elements[i].getText();
  //         elementsText.push(tempText);
  //       }
  //       return elementsText;
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () => await self.getElementsText(elementDetails)
  //       );
  //     }
  //   }

  //   /**
  //    * gets attribute values of all elements matching locator
  //    * @method getElementsAttributeValue
  //    * @param elementDetails {string | locatorDetails | ElementFinder} KeyName or type locatorDetails or an element
  //    * @returns {Promise<string[]>}
  //    */
  //   async getElementsAttributeValue(
  //     elementDetails: string | locatorDetails,
  //     attribute: string
  //   ): Promise<string[]> {
  //     let self: this = this;
  //     let elements: ElementFinder[] = await self.Element.getElements(
  //       elementDetails
  //     );
  //     let elementsAttrValues: string[] = [],
  //       tempText: string;
  //     try {
  //       for (let i = 0; i < elements.length; i++) {
  //         tempText = await elements[i].getAttribute(attribute);
  //         Logger.log(
  //           "Element attribute '" + attribute + "' value is " + tempText
  //         );
  //         elementsAttrValues.push(tempText);
  //       }
  //       return elementsAttrValues;
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () =>
  //           await self.getElementsAttributeValue(elementDetails, attribute)
  //       );
  //     }
  //   }

  //   /**
  //    * Select's parent frame
  //    */
  //   async selectParentFrame(): Promise<void> {
  //     let self: this = this;
  //     try {
  //       await browser.switchToParentFrame();
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () => await self.selectParentFrame()
  //       );
  //     }
  //   }

  //   /**
  //    * Get current window handle
  //    */
  //   async getWindowHandle(): Promise<string> {
  //     let self: this = this;
  //     try {
  //       let GUID: string = await browser.getWindowHandle();
  //       return GUID;
  //     } catch (ex) {
  //       await super.catchException(ex, async () => await self.getWindowHandle());
  //     }
  //   }

  //   /**
  //    * Switch's to the given window handle
  //    * @param windowId : Provide the window GUI ID
  //    */
  //   async switchToWindow(windowId: string): Promise<void> {
  //     let self: this = this;
  //     try {
  //       await browser.switchToWindow(windowId);
  //       await Logger.log("switched to the given window");
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () => await self.switchToWindow(windowId)
  //       );
  //     }
  //   }

  //   /**
  //    * Switches to the given frame element
  //    * @param elementDetails {string | locatorDetails | ElementFinder} KeyName or type locatorDetails or an element
  //    * @param oTimeWait
  //    */
  //   async switchToFrame(
  //     elementDetails: string | locatorDetails | ElementFinder,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this;
  //     let element: ElementFinder = await toElementFinder(
  //       self.Element,
  //       elementDetails,
  //       oTimeWait
  //     );
  //     try {
  //       await browser.switchToFrame(element);
  //       Logger.log("switched to the given frame");
  //     } catch (ex) {
  //       await super.catchException(
  //         ex,
  //         async () => await self.switchToFrame(elementDetails, oTimeWait)
  //       );
  //     }
  //   }

  //   /**
  //    * Uploads file in upload dialog box
  //    * @param filePath : Pass the file path
  //    * @param elementDetails {string | locatorDetails | ElementFinder} : KeyName or type locatorDetails or an element
  //    * @param oTimeWait {number} : optional wait time for an element - default wait time is 40000ms
  //    */
  //   async uploadFile(
  //     filePath: string,
  //     elementDetails?: string | locatorDetails | ElementFinder,
  //     oTimeWait?: number
  //   ): Promise<void> {
  //     let self: this = this,
  //       uploadElement: ElementFinder;
  //     try {
  //       let absolutePath = path.resolve(process.cwd(), filePath);
  //       if (elementDetails) {
  //         uploadElement = await toElementFinder(
  //           self.Element,
  //           elementDetails,
  //           oTimeWait
  //         );
  //       } else {
  //         uploadElement = $("input[type='file']");
  //       }
  //       await fsPromise.stat(absolutePath);
  //       Logger.log("File exists");
  //       await uploadElement.setValue(absolutePath);
  //       Logger.log("File Uploaded");
  //     } catch (exception) {
  //       if ((exception.code = "ENOENT")) {
  //         console.log("File does not exist!");
  //         throw exception;
  //       } else {
  //         Logger.log("Some other error: ", exception.code);
  //         await super.catchException(
  //           exception,
  //           async () => await self.uploadFile(filePath, elementDetails, oTimeWait)
  //         );
  //       }
  //     }
  //   }
}
