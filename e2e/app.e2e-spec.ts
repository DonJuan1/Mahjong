import { MahjongMayhemPage } from './app.po';

describe('mahjong-mayhem App', () => {
  let page: MahjongMayhemPage;

  beforeEach(() => {
    page = new MahjongMayhemPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
