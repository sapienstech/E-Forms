import { EformsPage } from './app.po';

describe('eforms App', () => {
  let page: EformsPage;

  beforeEach(() => {
    page = new EformsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('ef works!');
  });
});
