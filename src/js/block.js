/*
 * A Block is an object which represents a chunk of text which is separated by other chunks of text by new lines.
 *
 * Block objects have 2 main properties:
 *
 * 1. words
 *    - Array of all the Word objects which are its children.
 * 2. parent
 *    - A reference to its parent Document object.
 */
var Block = function (words, parent) {
	this.parent = parent;

	if (!words || !words.length) {
		this.words = [new Word([new Char('')], this)];
	} else {
		this.words = words;
		this.words.forEach(function (word) {
			word.parent = this;
		}, this);
	}
}

Block.prototype = {
	type: 'p',

	getChars: function () {
		return this.words.reduce(function (prev, curr) {
			return prev.concat(curr.getChars());
		}, []);
	},

	insertAfter: function (refWord, word) {
		if (!word) {
			return;
		}

		word.parent = this;

		var targetIndex = this.words.indexOf(refWord);
		if (targetIndex === -1) {
			targetIndex = this.words.length;
		} else {
			targetIndex += 1;
		}

		this.words.splice(targetIndex, 0, word);

		word.split();
	},

	insertBefore: function (refWord, word) {
		if (!word) {
			return;
		}

		word.parent = this;

		var targetIndex = this.words.indexOf(refWord);
		this.words.splice(targetIndex, 0, word);

		word.split();
	},

	removeWordsAfter: function (refWord) {
		var targetIndex = this.words.indexOf(refWord);
		if (targetIndex === -1 || targetIndex === (this.words.length - 1)) {
			return [];
		}

		return this.words.splice(targetIndex + 1, this.words.length);
	},

	toString: function () {
		return this.words.join('');
	},

	toJSON: function (id) {
		var json = {
			id: 'b' + id,
			name: 'B',
			children: []
		};
		this.words.forEach(function (word, index) {
			json.children.push(word.toJSON(id + '-' + index));
		});
		return json;
	},

	toHTML: function () {
		var content = '';
		this.words.forEach(function (word, index) {
			content += word.toHTML();
			if (index !== (this.words.length - 1)) {
				content += Util.Char.SPACE;
			}
		}, this);
		return '<' + this.type + '>' + content + '</' + this.type + '>';
	}
}