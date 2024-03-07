//https://youtu.be/3VGZP5MoGtc?si=IKuA7OdeDAP8bMqO

//and easygraphql - https://youtu.be/WuAZ91_U6C8?si=RtvpXQd8XbpW5jeP

//and js mocha POM -https://www.youtube.com/watch?v=Fsgt2v-Aat0

const { Builder, By, Key, until } = require('selenium-webdriver');

var expect = require('chai').expect;
var should = require('chai').should();
const driver = new Builder().forBrowser('chrome').build();

async function fetchUserInfo () {

  await driver.get('http://localhost:3000/admin')
  await driver.findElement(By.xpath('//input[@placeholder="Email"]')).sendKeys('butura.vlad.ionut@gmail.com');
  await driver.findElement(By.xpath('//input[@placeholder="Password"]')).sendKeys('Vladd123$');
  await driver.findElement(By.className('button')).click();

  const navPanel = await driver.findElement(By.className('admin-navigation'));
  //await driver.executeAsyncScript("arguments[0].scrollTop = 100;",navPanel);

  await driver.executeAsyncScript("function myFunction() {const element = document.getElementByClass('admin-navigation'); element.scrollIntoView();} myFunction();",navPanel);

  await driver.findElement(By.xpath('//a[normalize-space()="Coupons"]')).click();
  
  await driver.findElement(By.xpath('//a[@class="hover:underline font-semibold"]')).click();
  await driver.findElement(By.xpath('//input[@placeholder="Enter coupon code"]')).clear().sendKeys('coupon2');
  await driver.findElement(By.xpath('//button[@class="button primary"]')).click();

  const cookie = '__stripe_mid=9e782857-9b8e-4b53-a883-2010dec43a7118ba21; sid=s%3Auehzxg2R_NFxBp8cZmEunRIVfnxh4xQS.oyESCTNAwfYQnq0qlp2JtHBshZWgtzGcBy4Ym9ueYA0; asid=s%3AYb7G7Xrqm7jWkwH78knRAqxiSfShw6_v.b7d3f9%2BieztKXKOFpTaiILXo3rG2u26uKXxOK5Lc0tg';
  const response = await fetch('http://localhost:3000/api/coupons/4e23f979-c141-47bf-a40b-42df38a5e0cd', {
    method: 'PATCH',
    body: JSON.stringify({key: 'value'}),
    headers: {
      'Content-Type': 'application/json',
      'Cookie': cookie,
    }
  });

  if(!response.ok) {
    throw new Error(`user data not found... ${response.status}`);
  }

  //parse json response:

  const userData = await response.json();

  //console.log(userData);

  return userData;

}

describe('Login Page Test suite', () => {
  it("tries to login with wrong email", async function () {

    await fetchUserInfo().then( result => {
      expect(result.data.status).to.be.false;
    } );
    
  });

});