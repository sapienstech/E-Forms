import { browser, element, by } from 'protractor';

export class EformsPage {
  navigateTo() {
    return browser.get('/');
  }

  getParagraphText() {
    return element(by.css('ef-root h1')).getText();
  }
}
