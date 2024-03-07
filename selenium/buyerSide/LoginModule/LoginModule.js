const { Builder, By, Key, until } = require('selenium-webdriver');

var expect = require('chai').expect;
var should = require('chai').should();
const driver = new Builder().forBrowser('chrome').build();

//----------------LOGIN----------------------

async function loginWrongEmail() {
  await driver.get('http://localhost:3000/account/login');
  
  await driver.findElement(By.name('email')).sendKeys('testN@test.com', Key.RETURN);
  await driver.findElement(By.name('email')).getAttribute('value').then( valuue => {
    expect(valuue).to.equal('testV@test.com')
  })
  
  await driver.findElement(By.name('password')).sendKeys('test123', Key.RETURN);
  await driver.findElement(By.name('password')).getAttribute('value').then( valuue => {
    expect(valuue).to.equal('test123')
  })

  await driver.findElement(By.className('button')).click(); 

  //await driver.findElement(By.xpath('//div[@class="text-critical mb-1"]/parent::div/parent::div//div[@class="text-critical mb-1"]'))
  await driver.findElement(By.className('text-critical')).getText().then( textValue => {
    
    textValue.should.be.equal('Invalid email or password');
    //add 4 sec to mocha timeout- it does not wait enough - https://stackoverflow.com/questions/44149096/for-async-tests-and-hooks-ensure-done-is-called-if-returning-a-promise-en
    
  })

/*
  let valueNEW = await driver.findElement(By.className('text-critical')).getText().then(function(valueA) {
    return valueA;
  })

  //expect(valueNEW).to.equal('Invalid email or password2');
  valueNEW.should.equal('Invalid email or password2');
*/  

  await driver.quit();
}

async function loginWrongPassword() {
  await driver.get('http://localhost:3000/account/login');
  
  await driver.findElement(By.name('email')).sendKeys('testV@test.com', Key.RETURN);
  await driver.findElement(By.name('email')).getAttribute('value').then( valuue => {
    expect(valuue).to.equal('testV@test.com')
  })
  
  await driver.findElement(By.name('password')).sendKeys('test12345', Key.RETURN);
  await driver.findElement(By.name('password')).getAttribute('value').then( valuue => {
    expect(valuue).to.equal('test12345')
  })

  await driver.findElement(By.className('button')).click(); 

  await driver.findElement(By.className('text-critical')).getText().then( textValue => {
    textValue.should.be.equal('Invalid email or password');
  })

  await driver.quit();
}

async function loginWrongEmailAndPassword() {
  await driver.get('http://localhost:3000/account/login');
  
  await driver.findElement(By.name('email')).sendKeys('testN@test.com', Key.RETURN);
  await driver.findElement(By.name('email')).getAttribute('value').then( valuue => {
    expect(valuue).to.equal('testN@test.com')
  })
  
  await driver.findElement(By.name('password')).sendKeys('test12345', Key.RETURN);
  await driver.findElement(By.name('password')).getAttribute('value').then( valuue => {
    expect(valuue).to.equal('test12345')
  })

  await driver.findElement(By.className('button')).click(); 

  await driver.findElement(By.className('text-critical')).getText().then( textValue => {
    textValue.should.be.equal('Invalid email or password');
  })

  await driver.quit();
}

async function loginEmptyEmailAndPassword() {
  await driver.get('http://localhost:3000/account/login');
  
  await driver.findElement(By.name('email')).sendKeys('', Key.RETURN);
  await driver.findElement(By.name('email')).getAttribute('value').then( valuue => {
    expect(valuue).to.be.empty
  })
  
  await driver.findElement(By.name('password')).sendKeys('', Key.RETURN);
  await driver.findElement(By.name('password')).getAttribute('value').then( valuue => {
    expect(valuue).to.be.empty
  })

  await driver.findElement(By.className('button')).click(); 

  await driver.findElement(By.xpath('//div[@class="login-form-inner"]//div//div[1]//div[2]//span[1]')).getText().then( textValue => {
    textValue.should.be.equal('This field can not be empty');
  })

  await driver.findElement(By.xpath('//div[@class="flex justify-center items-center"]//div[2]//div[2]//span[1]')).getText().then( textValue => {
    textValue.should.be.equal('This field can not be empty');
  })

  await driver.quit();
}

async function loginInvalidEmailAndCorrectPassword() {
  await driver.get('http://localhost:3000/account/login');
  
  await driver.findElement(By.name('email')).sendKeys('valid?', Key.RETURN);
  await driver.findElement(By.name('email')).getAttribute('value').then( valuue => {
    expect(valuue).to.equal('valid?')
  })
  
  await driver.findElement(By.name('password')).sendKeys('test123', Key.RETURN);
  await driver.findElement(By.name('password')).getAttribute('value').then( valuue => {
    expect(valuue).to.equal('test123')
  })

  await driver.findElement(By.className('button')).click(); 

  await driver.findElement(By.className('text-critical')).getText().then( textValue => {
    textValue.should.be.equal('Invalid email');
  })

  await driver.quit();
}

//----------------REGISTER----------------------

async function registerInvalidPassword() {
  await driver.get('http://localhost:3000/account/login');
  
  await driver.findElement(By.xpath('//a[normalize-space()="Create an account"]')).click();

  await driver.findElement(By.xpath('//input[@placeholder="Full Name"]')).sendKeys('Vladd Butura', Key.RETURN);
  await driver.findElement(By.xpath('//input[@placeholder="Full Name"]')).getAttribute('value').then( valuue => {
    expect(valuue).to.equal('Vladd Butura')
  })

  await driver.findElement(By.xpath('//input[@placeholder="Email"]')).sendKeys('testN@test.com', Key.RETURN);
  await driver.findElement(By.xpath('//input[@placeholder="Email"]')).getAttribute('value').then( valuue => {
    expect(valuue).to.equal('testN@test.com')
  })
  
  await driver.findElement(By.name('password')).sendKeys('te', Key.RETURN);
  await driver.findElement(By.name('password')).getAttribute('value').then( valuue => {
    expect(valuue).to.equal('te')
  })

  await driver.findElement(By.className('button')).click(); 

  await driver.findElement(By.className('text-critical')).getText().then( textValue => {
    textValue.should.be.equal('Password is invalid: Password must be at least 6 characters');
  })

  await driver.quit();
}

async function registerToLogin() {
  await driver.get('http://localhost:3000/account/register');
  
  //await driver.get('')
}

//----------------FORGOT PASSWORD----------------------

async function forgotPassword() {
  await driver.get('http://localhost:3000/account/login');

  await driver.findElement(By.xpath('//a[normalize-space()="Forgot your password?"]')).click();

  await driver.findElement(By.xpath('//input[@placeholder="Email"]')).sendKeys('email@email.com', Key.ENTER);

  await driver.findElement(By.xpath('//p[@class="text-center text-success"]')).getText().then( valuue => {
    expect(valuue).to.equal('We have sent you an email with a link to reset your password. Please check your inbox.');
  })
}

//----------------MOCHA TESTS----------------------

describe("Login Module Test Suite", () => {

  describe('Login Page Test suite', () => {
    it.only("tries to login with wrong email", async function () {

      await loginWrongEmail();
      
    })
  
    it("tries to login with wrong password", async function () {
  
      await loginWrongPassword();
      
    })
  
    it('tries to login with wrong name and wrong password', async function () { 
  
      await loginWrongEmailAndPassword();
  
    })
  
    it('tries to login with empty email and password inputs', async function () {
  
      await loginEmptyEmailAndPassword();
  
    })
    
    it('tries to login with invalid email and correct password ', async function () {
  
      await loginInvalidEmailAndCorrectPassword();
  
    })
  })
  
  describe.skip('Register Page Test suite', () => {
    it('tries to register with invalid password', async function () {

      await registerInvalidPassword();
  
    })

    it('tries to navigate from register to login', async function () {

      await registerToLogin();
  
    })
  })

  describe.skip('Forgot Password Page Test Suite', () => {
    it('tries to navigate to "forgot passowrd" page and request a change', async function () {
      await forgotPassword();
    })
  })

})

//https://youtu.be/CoQNtq5z7Bo?si=RW3-zHRAsDTIsvDV - mocha promises and sinon