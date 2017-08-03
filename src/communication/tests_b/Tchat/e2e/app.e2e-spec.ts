import { TchatPage } from './app.po';

describe('tchat App', () => {
  let page: TchatPage;

  beforeEach(() => {
    page = new TchatPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
