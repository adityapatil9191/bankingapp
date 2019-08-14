import { DashboardPage } from '../dashboard/dashboard.po';

describe('Test Cases - Transaction', () => {
    let dashboardPage: DashboardPage;
    beforeEach(() => {
        dashboardPage = new DashboardPage();
    });

    it('User Must Enter All fields , when doing transaction', () => {
        dashboardPage.navigateTo();
        dashboardPage.fillDetails();
      //  expect(dashboardPage.getPageTitleText()).toEqual('Welcome Test user');
    });

});
