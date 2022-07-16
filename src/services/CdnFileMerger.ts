import * as fs from "fs";

import { Logger } from "./Logger";
export const CdnFileMerger = () => {
  try {
    const originalCucumberReportHtmlFile = "Reports/report/index.html";
    const newCucumberReportHtmlFile = "Reports/report/index2.html";
    if (fs.existsSync(originalCucumberReportHtmlFile)) {
      //Copy html report file
      fs.copyFileSync(
        originalCucumberReportHtmlFile,
        newCucumberReportHtmlFile
      );

      //Modify CSS/JS cdn file path
      let text: any = fs.readFileSync(newCucumberReportHtmlFile);
      let files = new Map();

      //HTML5 Shiv
      files.set(
        "assets/js/html5shiv.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/html5shiv/3.7.3/html5shiv.min.js"
      );

      //Respond
      files.set(
        "assets/js/respond.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/respond.js/1.4.2/respond.min.js"
      );

      //jQuery
      files.set(
        "assets/js/jquery-3.2.1.min.js",
        "https://code.jquery.com/jquery-3.2.1.min.js"
      );

      //Font-awesome
      files.set(
        "assets/css/font-awesome.min.css",
        "https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css"
      );

      //Bootstrap
      files.set(
        "assets/css/bootstrap.min.css",
        "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
      );
      files.set(
        "assets/js/bootstrap.min.js",
        "https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/js/bootstrap.min.js"
      );

      //Datatable
      files.set(
        "assets/css/dataTables.bootstrap.min.css",
        "https://cdn.datatables.net/1.10.19/css/dataTables.bootstrap.min.css"
      );
      files.set(
        "assets/js/dataTables.bootstrap.min.js",
        "https://cdn.datatables.net/1.10.19/js/dataTables.bootstrap.min.js"
      );
      files.set(
        "assets/js/jquery.dataTables.min.js",
        "https://cdn.datatables.net/1.10.15/js/jquery.dataTables.min.js"
      );

      //Responsitve table
      files.set(
        "assets/css/responsive.dataTables.min.css",
        "https://cdn.datatables.net/responsive/2.2.3/css/responsive.dataTables.min.css"
      );
      files.set(
        "assets/js/dataTables.responsive.min.js",
        "https://cdn.datatables.net/responsive/2.2.3/js/responsive.dataTables.min.js"
      );

      //Chart
      files.set(
        "assets/js/Chart.min.js",
        "https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.5.0/Chart.js"
      );

      files.forEach((value, key) => {
        text = text.toString().replace(key, value);
      });

      //Create new cucumber html report file.
      fs.writeFileSync(newCucumberReportHtmlFile, text);
      Logger.log(
        `src.services.CdnFileMerger : Html report file created successfully with CDN assets.`
      );
    } else
      Logger.log(
        `src.services.CdnFileMerger : ${originalCucumberReportHtmlFile} html report file does not exist.`
      );
  } catch (ex: any) {
    Logger.log(
      `src.services.CdnFileMerger : Error occurred while embedding CSS/JS cdn file path to html report file - \n ${ex.message}`
    );
  }
};
