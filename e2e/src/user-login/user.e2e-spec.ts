import { DashboardPage } from '../dashboard/dashboard.po';
import {LoginPage} from '../user-login/user-login.po';

describe('Testing Page - Login', () => {
    let pageL: LoginPage;
    let dashboardPage: DashboardPage;
    const wrongCredentias = {
        username: 'wrongname',
        password: 'wrongpasswd'
    };

    beforeEach(() => {
        pageL = new LoginPage();
        dashboardPage = new DashboardPage();
    });

    it('Default Login Screen : When user run the application' , () => {
        pageL.navigateTo();
        expect(pageL.getPageTitleText()).toEqual('Sign In');
    });

    it('If Wrong Credentials are entered , user will stay on login page only', () => {
        pageL.navigateTo();
        pageL.fillData(wrongCredentias);
        expect(pageL.getPageTitleText()).toEqual('Sign In');
        expect(pageL.getErrorMessage()).toEqual(`Please enter correct EmailId`);
    });

    it('After Successful login, user will redirect to dashboard page', () => {
        pageL.navigateTo();
        pageL.fillData();
        // expect(dashboardPage.getPageTitleText()).toEqual('Welcome Test user');
    });

    it('when user trying to new transaction — he should fills all required fields', () => {
        dashboardPage.navigateTo();
        dashboardPage.fillDetails();

    });

    it('On Click of Logout btn, it should redirect to login page', () => {
        dashboardPage.navigateTo();
        dashboardPage.logout();
    });


});
