import { browser, by, element } from 'protractor';

export class DashboardPage {
    private formData = {
        customerName: 'testuser',
        customerNumber: '12345678',
        transferCurrency : 'AED',
        customerAddress: 'Pune, India',
        phoneNumber: '098765555',
        transferAmount: '1000',
        beneficiaryBank:'ABC Bank',
        beneficiaryAccNum: '9348599999',
        paymentDetails: 'Test Payment',
        beneficiaryName: 'Jon Dow'

    };
    navigateTo() {
        return browser.get('/new-transaction'); // we can navigate to '/' for get pblic page since this is the default route
    }

    getPageTitleText() {
        return element(by.css('app-new-bank-transaction .title-page')).getText();
    }

    fillDetails(formData: any = this.formData) {
        element(by.css('[name="customerName"]')).sendKeys(formData.customerName);
        element(by.css('[name="customerNumber"]')).sendKeys(formData.customerNumber);
        element(by.css('[name="customerAddress"]')).sendKeys(formData.customerAddress);
        element(by.css('[name="phoneNumber"]')).sendKeys(formData.customerAddress);
        element(by.css('.btn-primary')).click();
    }

    logout(){
        return element(by.css('.nav-link')).click();
    }
}