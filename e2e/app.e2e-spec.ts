import { browser } from 'protractor';
import { MahjongMayhemPage } from './app.po';

describe('mahjong-mayhem App', () => {
  let page: MahjongMayhemPage;

  beforeEach(() => {
    page = new MahjongMayhemPage();
  });

  it('should display welcome message', () => {
    page.navigateTo('/');
    expect(page.getTitleText()).toEqual('MahjongMayhem');
  });
  
  it('should create a game', () => {
    page.navigateTo('/');
    browser.executeScript('localStorage.setItem("token","eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.ImpnLmltbWlua0BzdHVkZW50LmF2YW5zLm5sIg.DhIckJhLdwT-dfykycjGjpx6INAI78BIyuKQdrXxn3w");');
    browser.executeScript('localStorage.setItem("email","jg.immink@student.avans.nl");');
    page.navigateTo('/newgame');
    page.setplayer();
    page.Submit();
    var result = page.getUrl();
    browser.executeScript('localStorage.clear();');
    expect(result).toContain('/games/all');
    
  });
  
it('should login', () => {
    page.navigateTo('/');
    browser.ignoreSynchronization = true;
    page.login();
    page.loginengine();
    expect(browser.getCurrentUrl()).toBe('https://login.avans.nl/nidp/saml2/sso');
  });
  
  
});
