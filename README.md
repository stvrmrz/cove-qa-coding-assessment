# # QA Engineer Test Automation Coding Assessment

## Introduction

Thank you for your interest in joining Cove! We appreciate the time you're taking to complete this assessment.

The estimated time for completing this challenge is approximately ~1-2 hours. However, you're welcome to spend more or less time as you see fit. We understand that everyone works at different paces, and we're more interested in your approach and thought process than the exact time spent.

It's okay if you don't complete every aspect of the challenge or if some tests don't pass. We still want to see your submission!

## How To Get Started


### Setup

```bash
npm install
```

### Writing Tests

We've provided boilerplates and example spec files for both Cypress and Selenium, see below:

#### Cypress [(reference)](https://docs.cypress.io/api/table-of-contents)

Write you tests into [test/GymReservationForm.spec.mjs](cypress/e2e/GymReservationForm.cy.ts)

To create custom commands or utilities for testing, take a look at [cypress/support/commands.ts](cypress/support/commands.ts)

#### Selenium [(reference)](https://www.selenium.dev/documentation/webdriver/actions_api/)

Write your tests into [test/GymReservationForm.spec.mjs](test/GymReservationForm.spec.mjs)

#### Linting

Once you've written your code, you can also lint it using this command:
```bash
npm run lint           # runs eslint
```

### Testing

You will need to use two terminal windows to run the web app, and test it.
In one terminal:

```bash
npm start              # starts the webapp
```

In another terminal:
```bash
npm run test:cypress   # runs the cypress tests

# OR

npm run test:selenium  # runs the selenium tests
```

Please note, when using Selenium the browser window closes once the test finished.

## Problem Statement

Automation of UX/UI tests.

Imagine that you're a QA automation engineer in a startup and you need to create regression tests a Gym reservation form.

- Start the app, and get familiarized with the form. Find edge cases, happy and unhappy scenarios.
- Implement tests with either Cypress or Selenium with the provided boilerplates.
  - or if you feel comfortable with boilerplating another tech and using it, teach us something new!
- Make sure the tests you write cover as many edge cases, which you can think of, of the behavior of the provided form.
- Think of everything from a go-to-production standpoint, for example - happy and unhappy scenarios.
- The tests should prevent the experience of a user of the form from degraging.
- Recommended: Add helpful comments around your tests so we understand what your intentions were in the code.

## Submission Guidelines

When you are done:
- run tests (see How To Get Started)
- run `npm run lint`, it should not have any errors
- remove the node_module: `rm -rf ./node_modules`
- compress the repo into a ZIP file and
- upload the zip to Dropbox/Drive/... (in the past we had issues  sharing the zip directly via email due to our malware scanning, it should technically work now, but a file-share is playing it safe)
- email us your submission back!

## Final Thoughts

Remember, we're interested in your problem-solving approach and coding style. Don't stress if you can't complete everything – focus on demonstrating your strengths and thought process. Good luck, and we look forward to reviewing your submission!
