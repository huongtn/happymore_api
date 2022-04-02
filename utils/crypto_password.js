var crypto = require('crypto'); 

const saltv = process.env.JWT_SECRET;
export function encryptPassword(password, callback) {
    if (!password) {
        return null;
    }
    var defaultIterations = 10000;
    var defaultKeyLength = 64;
    var salt = Buffer.from(saltv, 'base64');
    console.log(salt);
    if (!callback) {
        return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength)
            .toString('base64');
    }

    return crypto.pbkdf2(password, salt, defaultIterations, defaultKeyLength, 'sha512', function (err, key) {
        if (err) {
            callback(err);
        }
        return callback(null, key.toString('base64'));
    });
};
export function makeSalt(byteSize, callback) {
    var defaultByteSize = 16;

    if (typeof arguments[0] === 'function') {
        callback = arguments[0];
        byteSize = defaultByteSize;
    }
    else if (typeof arguments[1] === 'function') {
        callback = arguments[1];
    }

    if (!byteSize) {
        byteSize = defaultByteSize;
    }

    if (!callback) {
        return crypto.randomBytes(byteSize).toString('base64');
    }

    return crypto.randomBytes(byteSize, function (err, salt) {
        if (err) {
            callback(err);
        }
        return callback(null, salt.toString('base64'));
    });
};
