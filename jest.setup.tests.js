/**
 * Expect at Least 1 assertion in each test('')
 * This helps to identify if the asynchronous code is running the assertions or not;
 */
afterEach(() => {
	expect.hasAssertions();
});
