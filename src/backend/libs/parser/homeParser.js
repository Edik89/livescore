import phantom from "phantom";
import LastResult from "./lastResults";

import LiveResultModel from "../../data/schema/LiveResultSchema";

const urlPageParser = {
  jq: "https://ajax.googleapis.com/ajax/libs/jquery/3.1.1/jquery.min.js",
  urlPage: "http://www.myscore.com.ua"
};

export default async function createParser(url) {

  const browser = await phantom.create();

  const page = await browser.createPage();

    let timerId = setTimeout( async function tick() {

      let status = await page.open(urlPageParser.urlPage);

      console.log("status request: " + status);

      await page.includeJs(urlPageParser.jq);

      const result = await LastResult(page);

        LiveResultModel.update(result, function (err, raw) {

          if (err) return handleError(err);

          console.log('The raw response from Mongo was ', raw);

        });

      setTimeout(tick, 60000);

    }, 2000);

}().catch((err) => {

  console.error(err.stack);

});

