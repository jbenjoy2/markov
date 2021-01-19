const { MarkovMachine } = require('./markov');

describe('markov tests', function() {
	test('properly make chains', function() {
		let mm = new MarkovMachine('They dont know we know');
		expect(mm.chains).toEqual(
			new Map([
				[ 'They', [ 'dont' ] ],
				[ 'dont', [ 'know' ] ],
				[ 'know', [ 'we', null ] ],
				[ 'we', [ 'know' ] ]
			])
		);
	});
	test('pick random choice', function() {
		expect(MarkovMachine.randomWord([ 'hello', 'hello' ])).toEqual('hello');
		expect([ 'hello', 'howdy', 'shalom' ]).toContain(
			MarkovMachine.randomWord([ 'hello', 'howdy', 'shalom' ])
		);
	});

	test('generate proper text', function() {
		let mm = new MarkovMachine('I am Joe');
		let text = mm.makeText();
		expect([ 'I am Joe', 'am Joe', 'Joe' ]).toContain(text);
		expect(text.endsWith('Joe')).toBe(true);
	});
	test('generate text of max length', function() {
		let mm = new MarkovMachine('My name is Joe and i work in a button factory');
		let text = mm.makeText(3);
		let arr = text.split(/[ \r\n]+/);

		expect([ 1, 2, 3 ]).toContain(arr.length);
	});
});
