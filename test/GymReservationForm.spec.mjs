import { Browser, Builder, By } from 'selenium-webdriver';
import assert from 'assert';

describe('GymReservationForm', function () {
  let driver;

  before(async function () {
    driver = await new Builder().forBrowser(Browser.CHROME).build();
  });

  beforeEach(async () => {
    await driver.get('http://localhost:5173');
  });

  it('Check if form is displayed', async function () {
    const title = await driver.findElement(By.id('title')).getText();

    assert.equal(title, 'Gym Reservation');
  });

  after(async () => await driver.quit());
});
