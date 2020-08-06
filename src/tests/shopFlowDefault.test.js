import { step } from "mocha-steps";
import { expect } from "chai";

import Page from "../builder";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";

describe.skip("Tests for adding Default product to shopping cart", () => {
  let page;
  let homepage;
  let loginPage;

  before(async () => {
    page = await Page.build("Desktop");
    homepage = new HomePage(page);
    loginPage = new LoginPage(page);
  });
  afterEach(async () => {
    //Empty Cart
    await page.waitAndClick(".action-delete");
    await homepage.navigation();
  }); 
  after(async () => {
    await page.close();
  });

  describe("Adding DEFAULT Products for Non Customers", () => {
    step("Step 1.1: Adding from listview", async () => {
      await page.goto("https://www.staging.apotheka.ee/tooted/ilu/huulepulgad",{ waitUntil: 'networkidle0'});
      await homepage.navigation();
      await page.waitAndClick(".product-item:nth-of-type(1) .tocart");
      await page.waitForSelector(".counter-number");
      await homepage.navigation();
      expect(await page.getText(".subtotal")).not.to.equal("0.00 €");
      await homepage.navigation();
      await page.waitAndClick(".subtotal");
      await page.waitForSelector(".item-info .product-item-name");
      expect(await page.getText(".item-info .product-item-name")).to.include("BABE");
    });
    step("Step 1.2: Adding from detailview", async () => {
      await page.goto("https://www.staging.apotheka.ee/babe-huulepulk-spf20-4g-pmm0100409ee",{ waitUntil: 'networkidle0'});
      await page.waitAndClick("#product-addtocart-button");
      await page.waitForSelector(".counter-number");
      await homepage.navigation();
      expect(await page.getText(".subtotal")).not.to.equal("0.00 €");
      await homepage.navigation();
      await page.waitAndClick(".subtotal");
      await page.waitForSelector(".item-info .product-item-name");
      expect(await page.getText(".item-info .product-item-name")).to.include("BABE");
    });
    step("Step 1.3: Adding with link", async () => {
      await page.goto("https://www.staging.apotheka.ee/products/link/add/pmm0100409ee",{ waitUntil: 'networkidle0'});
      await homepage.navigation();
      expect(await page.getText(".subtotal")).not.to.equal("0.00 €");
      await homepage.navigation();
      await page.waitAndClick(".subtotal");
      await page.waitForSelector(".item-info .product-item-name");
      expect(await page.getText(".item-info .product-item-name")).to.include("BABE");
    });
  });
  describe("Adding DEFAULT Products for Customers", () => {
    step("Step 2.1: Adding from listview", async () => {
        await loginPage.loginMobileID("https://www.staging.apotheka.ee","37200000566");
        await page.goto("https://www.staging.apotheka.ee/tooted/ilu/huulepulgad",{ waitUntil: 'networkidle0'});
        await homepage.navigation();
        await page.waitAndClick(".product-item:nth-of-type(1) .tocart");
        await page.waitForSelector(".counter-number");
        expect(await page.getText(".subtotal")).not.to.equal("0.00 €");
        await homepage.navigation();
        await page.waitAndClick(".subtotal");
        await page.waitForSelector(".item-info .product-item-name");
        expect(await page.getText(".item-info .product-item-name")).to.include("BABE");
    });
    step("Step 2.2: Adding from detailview", async () => {
        await page.goto("https://www.staging.apotheka.ee/babe-huulepulk-spf20-4g-pmm0100409ee",{ waitUntil: 'networkidle0'});
        await page.waitAndClick("#product-addtocart-button");
        await page.waitForSelector(".counter-number");
        await homepage.navigation();
        expect(await page.getText(".subtotal")).not.to.equal("0.00 €");
        await homepage.navigation();
        await page.waitAndClick(".subtotal");
        await page.waitForSelector(".item-info .product-item-name");
        expect(await page.getText(".item-info .product-item-name")).to.include("BABE");
    });
    step("Step 2.3: Adding with link", async () => {
      await page.goto("https://www.staging.apotheka.ee/products/link/add/pmm0100409ee",{ waitUntil: 'networkidle0'}); 
      await homepage.navigation();
      expect(await page.getText(".subtotal")).not.to.equal("0.00 €");
      await homepage.navigation();
      await page.waitAndClick(".subtotal");
      await page.waitForSelector(".item-info .product-item-name");
      expect(await page.getText(".item-info .product-item-name")).to.include("BABE");
    });
  });
});
