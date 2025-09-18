import { expect, test } from '@playwright/test'

import { loggerUtil } from './utils'

// Home page
test('home page should display correctly', async ({ page }) => {
  await page.goto('/')

  await expect(page).toHaveURL('/')

  loggerUtil({
    text: 'Home page was successfully displayed',
    value: 'Done!',
  })
})
