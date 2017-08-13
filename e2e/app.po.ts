import { browser, by, element, protractor } from 'protractor';

export class MahjongMayhemPage {
  navigateTo(url) {
    return browser.get(url);
  }
  getUrl(){
    return browser.getCurrentUrl();
  }

  getTitleText() {
    return browser.getTitle();
  }

  Submit(){
    return element(by.buttonText('Submit')).click();
  }
  setplayer(){
    return element(by.id('max-players')).sendKeys('1');
  }
  login(){
    return element(by.className('btn')).click();
  }
  loginengine(){
    return element(by.className('result active access focussed')).click();
  }
}
