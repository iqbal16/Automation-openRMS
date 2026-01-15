import { Given, When, Then } from "@wdio/cucumber-framework";
import LoginPage from "../pageobjects/logincms.page.js";

Given("user membuka halaman login OpenMRS", async () => {
  await LoginPage.open();
});

When(
  'user input username {string} dan password {string}',
  async (username, password) => {
    await LoginPage.fillCredential(username, password);
  }
);

When('user memilih location {string}', async (locationName) => {
  await LoginPage.selectLocation(locationName);
});

When('user klik tombol login', async  () =>{
   await LoginPage.submit();
})

When('user klik tombol logout', async () =>{
   await LoginPage.logout();
})

Then("user berhasil login dan keluar dari halaman login", async () => {
  await LoginPage.assertLoginSuccess();
});

Then ("user berhasil kembali ke halaman login", async () =>{
  await LoginPage.assertLogoutSucccess();
})

Then ("user melihat error login dan tetap di halaman login", async () =>{
  await LoginPage.showerror();
})
