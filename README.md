# Tests for Dietly application

## Dietly Application

Follow instructions in app README

## Prepare

### Local recommended tools:

- VS Code
- Git
- Node.js (version >16)

### Installation and setup

- (optional) install VSC recommended plugins
- install dependencies: `npm install`
- setup Playwright with: `npx playwright install --with-deps chromium`

## Use

Run all tests:

```
npx playwright test
```

Run all tests with tags:

```
npx playwright test --grep "@smoky"
```

Run all tests without tags:

```
npx playwright test --grep-invert "@smoky"
```

For more usage cases look in `package.json` scripts section.
