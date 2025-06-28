// @ts-nocheck
import { test, expect } from '@playwright/test';

test('renders ', async ({ page }) => {
  await page.goto('/tests');
  const initial = await page.content() 

  await page.evaluate(() => data.update({ name: 'boo' }, 'c'))
  const updated = await page.content() 

  await page.click('.test-event')
  const clicked = await page.locator('.test-event').innerHTML()

  expect(initial).toMatchSnapshot()
  expect(updated).toMatchSnapshot()
  expect(clicked).toMatchSnapshot()
});
