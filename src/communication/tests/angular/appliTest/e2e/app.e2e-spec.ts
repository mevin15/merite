import { AppliTestPage } from './app.po';

describe('appli-test App', () => {
  let page: AppliTestPage;

  beforeEach(() => {
    page = new AppliTestPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!');
  });
});
