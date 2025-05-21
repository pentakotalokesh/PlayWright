import { test, expect } from "@playwright/test";

test("Manfacturer should be Honda", async ({ page }) => {
  await page.goto("/upcoming-honda-bikes");

  let models = await page.$$eval("#modelList > li.modelItem", (items) =>
    items.map((item) => {
      const name = item.querySelector("strong")?.textContent?.trim() || "";
      const price = item.querySelector(".b.fnt-15")?.textContent?.trim() || "";
      const launchDate =
        item
          .querySelector(".clr-try.fnt-14")
          ?.textContent?.replace("Expected Launch : ", "")
          .trim() || "";

      //if you want image urls enable it
      // const imageUrl = item.querySelector("img")?.getAttribute("src") || "";
      // const modelUrl = item.querySelector("a")?.getAttribute("href") || "";

      const priceRaw = item.getAttribute("data-price");

      //Extra attributes
      // const bodyType = item.getAttribute("data-body-type");
      // const popularity = item.getAttribute("data-popularity");
      const launchTimestamp = item.getAttribute("data-explaunch");

      return {
        name,
        price,
        launchDate,
        priceRaw,
        launchTimestamp,
      };
    })
  );
  models = models.filter((model) => {
    return parseInt(model.priceRaw) < 400000;
  });
  console.log(JSON.stringify(models, null, 2));
});
