const {Builder, By, Key, until} = require('selenium-webdriver');

(async function example() {
  var webdriver = require('selenium-webdriver');
  var chrome = require('selenium-webdriver/chrome');
  var o = new chrome.Options();
  o.addArguments("user-data-dir=selenium");

  let driver = await new Builder().withCapabilities(webdriver.Capabilities.chrome())
  .setChromeOptions(o).build();
  try {
    console.log('Press any key to continue');
    await keypress();
    /*--------------------------------------------------*/
    await driver.get('https://www.nike.com/it/launch/t/air-jordan-7-retro-black-gloss/');
    // Aspetta size
    console.log("Waiting for size");
    await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div[1]/div/div[3]/div[2]/section[1]/div[2]/aside/div/div[2]/div/div[2]/ul/li[4]/button')), 5000);
    console.log("Clicking size button");
    await (await driver.findElement(By.xpath('//*[@id="root"]/div/div/div[1]/div/div[3]/div[2]/section[1]/div[2]/aside/div/div[2]/div/div[2]/ul/li[4]/button'))).click();
    // Aspetta Acquista
    console.log("Waiting for buy button");
    await driver.wait(until.elementLocated(By.xpath('//*[@id="root"]/div/div/div[1]/div/div[3]/div[2]/section[1]/div[2]/aside/div/div[2]/div/div[2]/div/button')), 5000);
    console.log("Clicking buy button");
    await (await driver.findElement(By.xpath('//*[@id="root"]/div/div/div[1]/div/div[3]/div[2]/section[1]/div[2]/aside/div/div[2]/div/div[2]/div/button'))).click();
    console.log("Waiting for popup");
    await driver.wait(until.elementLocated(By.xpath('//button[@data-qa="checkout-link"]')), 5000);

    console.log("Navigate to cart");
    await driver.navigate().to("https://www.nike.com/it/cart");
    console.log("Finding go to checkout button");
    await driver.wait(until.elementLocated(By.xpath('//button[@data-automation="checkout-button"]')))
    console.log("Waiting go to checkout button to be enabled");
    var element =  (await driver.findElement(By.xpath('//button[@data-automation="checkout-button"]')));
    await driver.wait(function(){
      return element.isDisplayed().then(function (displayed) {
        if (!displayed)
            return false;
        
        return element.isEnabled();
      });
    });
    await (await driver.findElement(By.xpath('//button[@data-automation="checkout-button"]'))).click();
    /*console.log("Waiting for checkout popup");
    await driver.wait(until.elementLocated(By.xpath('//button[@data-automation="member-checkout-button"]')),10000)
    console.log("Clicking checkout popup");
    element =  (await driver.findElement(By.xpath('//button[@data-automation="member-checkout-button"]')));
    await driver.wait(function(){
      return element.isDisplayed().then(function (displayed) {
        if (!displayed)
            return false;
        
        return element.isEnabled();
      });
    });
    await (await driver.findElement(By.xpath('//button[@data-automation="member-checkout-button"]'))).click();*/
    await driver.wait(until.titleIs('Nike.com Checkout'), 10000);
    /*console.log("Waiting for firstname input");
    await driver.wait(until.elementLocated(By.xpath('//*[@id="firstName"]')),10000)
    console.log("Filling info");
    await (await driver.findElement(By.xpath('//*[@id="firstName"]'))).sendKeys("Marco");
    await (await driver.findElement(By.xpath('//*[@id="lastName"]'))).sendKeys("Ciarmoli");
    await (await driver.findElement(By.xpath('//*[@id="addressSuggestionOptOut"]'))).click();
    console.log("Wait until manual address");
    await driver.wait(until.elementLocated(By.xpath('//*[@id="address1"]')),10000)
    console.log("Filling info");
    await (await driver.findElement(By.xpath('//*[@id="address1"]'))).sendKeys("Via Vittorio Alfieri 17");
    await (await driver.findElement(By.xpath('//*[@id="postalCode"]'))).sendKeys("10121");
    await (await driver.findElement(By.xpath('//*[@id="city"]'))).sendKeys("Torino");
    await (await driver.findElement(By.xpath('//*[@id="email"]'))).sendKeys("ciarmoli.mc@gmail.com");
    await (await driver.findElement(By.xpath('//*[@id="phoneNumber"]'))).sendKeys("+393456250412");
    console.log("Save and continue");
//*[@id="shipping"]/div/div/div/form/div/div/div/div[2]/button*/

//*[@id="payment"]/div/div[1]/div[2]/div[3]/div/span[3]/div/div/label
    console.log("Wait for paypal");
    await driver.wait(until.elementLocated(By.id('paypal')),10000)
    console.log("Selecting paypal");
    driver.executeScript("document.getElementById('paypal').click()");
    await driver.wait(until.elementLocated(By.xpath('//*[@data-attr="continueToOrderReviewBtn"]')),10000);
    await (await driver.findElement(By.xpath('//*[@data-attr="continueToOrderReviewBtn"]'))).click();
    console.log("Waiting for final paypal");
    await driver.wait(until.elementLocated(By.xpath('//*[@id="orderreview"]/div/div/div/div/section[2]/div/button')),10000)
    console.log("Clicking final paypal");
    await (await driver.findElement(By.xpath('//*[@id="orderreview"]/div/div/div/div/section[2]/div/button'))).click();

    console.log("Waiting paypal");
    await driver.wait(until.titleIs('Accedi al tuo conto PayPal'), 3000000);
    console.log("Getting email field");
    await driver.wait(until.elementLocated(By.id('email')),10000)
    console.log("Writing email");
    await (await driver.findElement(By.id('email'))).sendKeys("ciarmoli.mc@gmail.com");
    //await (await driver.findElement(By.id('btnNext'))).click();

    await driver.wait(until.titleIs('dio'), 3000000);

  } finally {
    await driver.quit();
  }
})();



const keypress = async () => {
  process.stdin.setRawMode(true)
  return new Promise(resolve => process.stdin.once('data', () => {
    process.stdin.setRawMode(false)
    resolve()
  }))
}
function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}   
