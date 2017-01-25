import { EFormsPage } from './app.po';

describe('e-forms App', function() {
  let page: EFormsPage;

  beforeEach(() => {
    page = new EFormsPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
