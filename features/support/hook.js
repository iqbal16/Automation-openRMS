import { Before } from '@wdio/cucumber-framework'

Before(async () => {
  // 1) Bersihin session biar scenario selalu start fresh
  await browser.deleteCookies()

  // 2) Pastikan selalu mulai dari halaman login
  await browser.url('https://o2.openmrs.org/openmrs/login.htm')

  // 3) Tunggu form login muncul (lebih lama sedikit untuk full run)
  await $('#username').waitForDisplayed({ timeout: 30000 })
})
