import { $, browser } from '@wdio/globals'
import { Before } from '@wdio/cucumber-framework';

class LoginPage {
    // ====== Locator (element yang dicari) ======
    get username() {
      return $("#username");
    }
  
    get password() {
      return $("#password");
    }
  
    // tombol login di OpenMRS biasanya id="loginButton"
    get loginBtn() {
      return $("#loginButton");
    }

    // tombol logout di OpenMRS
    get logoutBtn() {
      return $("li.nav-item.logout a");
    } 

    // show text error 
    get errormessage(){
      return $("#error-message")
    }
    
  
    // Locator location berdasar text (pakai XPath)
    locationItem(name) {
      return $(`//li[normalize-space()="${name}"]`);
    }
  
    // ====== Action (fungsi yang dipanggil step) ======
    async open() {
      await browser.url("https://o2.openmrs.org/openmrs/login.htm");
      await this.username.waitForDisplayed({ timeout: 20000 });
    }
  
    async fillCredential(username, password) {
      await this.username.setValue(username);
      await this.password.setValue(password);
    }
  
    async selectLocation(locationName) {
      const location = await this.locationItem(locationName);
      await location.waitForDisplayed({ timeout: 20000 });
      await location.click();
    }
  
    async submit() {
      await this.loginBtn.waitForClickable({ timeout: 20000 });
      await this.loginBtn.click();
    }

    async logout(){
      // await browser.pause(20000);
      await this.logoutBtn.waitForClickable({timeout: 50000});
      await this.logoutBtn.click();
    }

    async showerror() {
      await this.errormessage.waitForDisplayed({timeout: 50000});
    }
  
    // ====== Assertion ======
    async assertLoginSuccess() {
      await browser.waitUntil(
        async () => !(await browser.getUrl()).includes("login.page"),
        {
          timeout: 50000,

          timeoutMsg:
            "Masih berada di halaman login. Kemungkinan: credential salah atau location belum dipilih.",
        }
      );
    }
    async assertLogoutSucccess(){
      await browser.waitUntil(
        async () => !(await browser.getUrl()).includes("home.page"),
        {
          timeout: 20000,
          timeoutMsg:
            "Masih berada di halaman dashboard. Kemungkinan: credential salah atau location belum dipilih.",
        }
      )
    }
    async assertloginfailed(){
      await browser.waitUntil(
        async () => (await browser.getActiveElement.url()).includes("login.page"),
        {
          timeout : 20000,
          timeoutMsg:
            "Sudah berpindah halaman ke halaman dashboard. Kemungkinan : login berhasil",          
        }
      )
    }
  }
  
export default new LoginPage();
