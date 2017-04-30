import { MahjongAppPage } from './app.po';

describe('mahjong-app App', () => {
  let page: MahjongAppPage;

  beforeEach(() => {
    page = new MahjongAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
