var Char = function (char, parent) {
	this.parent = parent;

	this.char = char || '';
	this.props = {};
}

Char.prototype = {

	toString: function () {
		return this.char;
	},

	toJSON: function (id) {
		var name = this.char;
		if (this.char.match('\r')) {
			name = '\\r';
		} else if (Util.isNewLine(this.char)) {
			name = '\\n';
		} else if (Util.isSpace(this.char)) {
			name = '[ ]';
		}
		return {
			id: 'c' + id,
			name: name,
			children: []
		};
	},

	toDebugString: function () {
		var str = this.char;
		this.getProps().forEach(function (prop) {
			str += '(' + prop + ')';
		}, this);
		return str;
	},

	getProps: function () {
		var props = [];
		Object.keys(this.props).forEach(function (prop) {
			if (this.props[prop]) {
				props.push(prop);
			}
		}, this);
		return props;
	},

	toHTML: function () {
		return this.char;
	}
}