import { DemoBlogPage } from './app.po';

describe('demo-blog App', function() {
  let page: DemoBlogPage;

  beforeEach(() => {
    page = new DemoBlogPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
