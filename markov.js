/** Textual markov chain generator */

class MarkovMachine {
	/** build markov machine; read in text.*/

	constructor(text) {
		let words = text.split(/[ \r\n]+/);
		this.words = words.filter((c) => c !== '');
		this.makeChains();
	}

	/** set markov chains:
   *
   *  for text of "the cat in the hat", chains will be
   *  {"the": ["cat", "hat"], "cat": ["in"], "in": ["the"], "hat": [null]} */

	makeChains() {
		// TODO
		let markovChains = new Map();

		for (let i = 0; i < this.words.length; i++) {
			let word = this.words[i];
			let next = this.words[i + 1] || null;

			if (markovChains.has(word)) {
				markovChains.get(word).push(next);
			} else {
				markovChains.set(word, [ next ]);
			}
		}
		this.chains = markovChains;
	}

	/** return random text from chains */

	// class method to pick random word from array
	static randomWord(arr) {
		let choice = Math.floor(Math.random() * arr.length);
		return arr[choice];
	}

	// method to create output text from markov machine- default number of words that will be taken at maximum
	makeText(numWords = 100) {
		// all the possible words are in the keys of the map; pick one of them at random to start with
		let chainKeys = Array.from(this.chains.keys);
		let randomKey = MarkovMachine.randomWord(chainKeys);

		// initializie output array
		let output = [];

		// while loop- as long as the max number of words hasnt been reached AND null hasnt been chosen as a key, continue to add a word to the output.
		while (output.length < numWords && randomKey !== null) {
			output.push(randomKey);
			randomKey = MarkovMachine.randomWord(this.chains.get(randomKey));
		}
		return output.join(' ');
	}
}
