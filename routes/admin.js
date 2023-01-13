const express = require('express');
const auth=require('../middleware/admin/autj')
const router = express.Router();

const admin=require('../controller/admin/login');
router.get('/login',auth.isLogout,admin.login);
router.post('/login',auth.isLogout,admin.loginVerification);
router.get('/logout',admin.logout);

const adminHome=require('../controller/admin/dashboard');
router.get('/',auth.isLogin,adminHome.loadAdmin);

const user=require('../controller/admin/user');
router.get('/users',auth.isLogin,user.loadUser);
router.get('/updateUser',auth.isLogin,user.updateUser);

const category=require('../controller/admin/category');
router.get('/category',auth.isLogin,category.category);
router.post('/category',auth.isLogin,category.insertCategory);
router.get('/editCategory',auth.isLogin,category.editCategory);
router.post('/editCategory',auth.isLogin,category.updateCategory);
router.get('/statusCategory',auth.isLogin,category.statusCategory);

const product=require('../controller/admin/product');
router.get('/product',auth.isLogin,product.product);
router.post('/product',auth.isLogin,product.insertProduct);
router.get('/statusProduct',auth.isLogin,product.statusProduct);
router.get('/editProduct',auth.isLogin,product.editProduct);
router.post('/editProduct',auth.isLogin,product.updateProduct);

const coupen=require('../controller/admin/coupon');
router.get('/coupen',auth.isLogin,coupen.coupen);
router.post('/coupen',auth.isLogin,coupen.insertCoupen);
router.get('/editCoupen',auth.isLogin,coupen.editCoupen);
router.post('/editCoupen',auth.isLogin,coupen.updateCoupen);
router.get('/deleteCoupen',auth.isLogin,coupen.statusCoupen);

const order=require('../controller/admin/order');
router.get('/orders',auth.isLogin,order.viewOrders);
router.post('/orderStatus',auth.isLogin,order.orderStatus);
router.get('/sales',auth.isLogin,order.viewSales);

const report=require('../controller/admin/export');
router.post('/downloadSalesReport',auth.isLogin,report.exportsales);

module.exports = router;