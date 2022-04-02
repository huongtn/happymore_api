const mongoose = require('mongoose');
const userSchema = require('./user')(mongoose);
const productSchema = require('./product')(mongoose);
const orderSchema = require('./order')(mongoose)
const trainingSchema = require('./training')(mongoose)
const appConfigSchema = require('./app_config')(mongoose)
const incomeSchema = require('./income')(mongoose)

const User = mongoose.models.User || mongoose.model('User', userSchema);
const Product = mongoose.models.Product || mongoose.model('Product', productSchema);
const Order = mongoose.models.Order || mongoose.model('Order', orderSchema);
const Training = mongoose.models.Training || mongoose.model('Training', trainingSchema);
const AppConfig = mongoose.models.AppConfig || mongoose.model('AppConfig', appConfigSchema);
const Income = mongoose.models.Income || mongoose.model('Income', incomeSchema);

module.exports = { User, Product, Order, Training, AppConfig,Income};
