var crypto = require('crypto');
var async = require('async');

var mongoose = require('../mongoose'),
	Schema = mongoose.Schema;

var schema = new Schema({
	login: {
		type: String,
		unique: true,
		required: true
	},
	passwordHash: {
		type: String,
		required: true
	},
	salt: {
		type: String,
		required: true
	}
});

schema.methods.encryptPassword = function(password) {
	var hash = crypto.createHmac('sha1', this.salt)
		.update(password).digest('hex');
	return hash;
};

schema.virtual('password')
	.set(function(password) {
		this._plainPassword = password;
		this.salt = Math.random() + '';
		this.passwordHash = this.encryptPassword(password);
	})
	.get(function() {
		return this._plainPassword;
	});

schema.methods.checkPassword = function(password) {
	return this.encryptPassword(password) == this.passwordHash;
}

schema.statics.authorize = function(login, password, callback) {
	var User = this;
	async.waterfall([
		function(callback) {
			User.findOne({login: login}, callback);
		},
		function(user, callback) {
			if (user) {
				if (user.checkPassword(password)) {
					callback(null, user);
				} else {
					callback(new Error("Неверный пароль"));
				}
			} else {
				var user = new User({login: login, password: password});
				user.save(function(err) {
					if (err) return callback(err);
					callback(null, user);
				});
			}
		}
	], callback);
}

exports.User = mongoose.model('User', schema);

var util = require('util');

