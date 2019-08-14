import { browser, by, element } from 'protractor';

export class LoginPage {
    private credentias = {
        username: 'admin@admin',
        password:  "admin"
    };

    navigateTo() {
        return browser.get('/'); // we can navigate to '/' for get pblic page since this is the default route
    }

    getPageTitleText() {
        return element(by.css('app-user-login .text-center')).getText();
    }

    fillData(credentias: any = this.credentias) {
        element(by.css('[formControlName="email"]')).sendKeys(credentias.username);
        element(by.css('[formControlName="password"]')).sendKeys(credentias.password);
        element(by.css('.btn-primary')).click();
    }

    getErrorMessage() {
        return element(by.css('.error-text')).getText();
    }
}