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
		return {
			id: 'c' + id,
			name: (this.char === ' ') ? '[ ]' : (this.char === '\r\n' || this.char === '\n' ? '\\n' : this.char),
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