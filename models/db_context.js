const mongoose = require('mongoose');
const userSchema = require('./user')(mongoose);
const productSchema = require('./product')(mongoose);
const orderSchema = require('./order')(mongoose)

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
module.exports = { User, Product,Order };
