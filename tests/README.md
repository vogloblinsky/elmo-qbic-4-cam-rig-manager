# Running the tests

To get started, simply run the following commands in the root directory:
```
npm install
```

This will install Intern and some supporting libraries in `node_modules`.

Once complete, intern tests may be tested by several `npm run` scripts issued
from the root of the repository. 

To run the server tests suite, run the following command:

```
npm run test-server
```

To run the client tests suite via SauceLabs, run the following command:

```
npm run test-client-remote
```

This command will attempt to open a tunnel to SauceLabs and run the test
suite in all of the browsers defined in `tests/client/intern.js`.

If a local Selenium instance is more desirable, install "selenium-standalone-server"
and the drivers for the browsers to test, launch Selenium on port 4444, and issue
the following command:

```
npm run test-client-local
```

During development of tests, it is often desirable to run the test suite
or portions of the test suite in a local browser. To do this, simply run
the test runner in proxy-only mode:

```
http://PATH_TO_PROJECT/node_modules/intern/client.html?config=test/client/intern
```

This will run the entire unit test suite and output the results in the
console. To only run certain modules, use the "suites" query parameter.
The following URL will only run the client tests:
```
http://PATH_TO_PROJECT/node_modules/intern/client.html?config=tests/client/intern&suites=tests/request/script
```

Intern can also produce code coverage reports in HTML format. Simply append
`-coverage` to any of the test run commands:
```
npm run test-server-coverage
npm run test-client-remote-coverage
npm run test-local-coverage
```

This will output HTML files to the `html-report` directory which can be
viewed to see code coverage information for individual files (including a
view of the source code with which lines were not covered).