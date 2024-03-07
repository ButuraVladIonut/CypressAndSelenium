const { Builder, By, Key, until } = require('selenium-webdriver');

var expect = require('chai').expect;
var should = require('chai').should();
const driver = new Builder().forBrowser('chrome').build();

//----------------PRODUCT MODULE----------------------

async function useSearchBar() {
  await driver.get('http://localhost:3000/account/login');
  
  await driver.quit();
}

async function usePriceRange() {
  await driver.get('http://localhost:3000/account/login');
  
  await driver.quit();
}

async function useSortBy() {
  await driver.get('http://localhost:3000/account/login');
  
  await driver.quit();
}

async function useSortByWithUpArrow() {
  await driver.get('http://localhost:3000/account/login');
  
  await driver.quit();
}

//----------------PRODUCT DETAILS MODULE----------------------

async function seeProductDetails() {
  await driver.get('http://localhost:3000/account/login');
  
  await driver.quit();
}

async function seeProductImages() {
  await driver.get('http://localhost:3000/account/login');
  
  await driver.quit();
}

//----------------PRODUCT OPTIONS MODULE----------------------

async function addToCartTwoSameProducts() {
  await driver.get('http://localhost:3000/account/login');
  
  await driver.quit();
}

async function addedProductsPopup() {
  await driver.get('http://localhost:3000/account/login');
  
  await driver.quit();
}

async function viewcartOption() {
  await driver.get('http://localhost:3000/account/login');
  
  await driver.quit();
}

async function continueShoppingOption() {
  await driver.get('http://localhost:3000/account/login');
  
  await driver.quit();
}

describe('Product Module Test Suite', () => {
  describe('Products Test Suite', () => {
    it('tries to filter results using search bar', async function () {
      await useSearchBar();
    })

    it('tries to filter results using price range', async function () {
      await usePriceRange();
    })

    it('tries to filter results using sort by', async function () {
      await useSortBy();
    })

    it('tries to filter results using sort by with up arrow', async function () {
      await useSortByWithUpArrow();
    })
  })

  describe('Product Details Test Suite', () => {
    it('tries to see product details', async function () {
      await seeProductDetails();
    })

    it('tries to see other product images', async function () {
      await seeProductImages();
    })
  })
  
  describe('Product Options Test Suite', () => {
    it('tries to add to cart a selected number of products to cart', async function () {
      await addToCartTwoSameProducts();
    })

    it('tries to see the pop-up when adding to cart', async function () {
      await addedProductsPopup();
    })

    it('tries to use "View cart" option', async function () {
      await viewcartOption();
    })

    it('tries to use "Continue shopping" option', async function () {
      await continueShoppingOption();
    })
    
  })



  describe
})