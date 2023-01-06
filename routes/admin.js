const express = require('express');
const auth=require('../middleware/admin/autj')
const upload = require('../utils/admin/multer')
const router = express.Router();

const admin=require('../controller/admin/login')
router.get('/login',admin.login)
router.post('/login',admin.loginVerification)
router.get('/logout',admin.logout)

const adminHome=require('../controller/admin/dashboard');
router.get('/' ,adminHome.loadAdmin)

const user=require('../controller/admin/user')
router.get('/users',user.loadUser)
router.get('/updateUser',  user.updateUser);

const category=require('../controller/admin/category')
router.get('/category',  category.category);
router.post('/category', upload.single('image'), category.insertCategory);
router.get('/editCategory',  category.editCategory);
router.post('/editCategory', upload.single('image'), category.updateCategory);
router.get('/statusCategory',  category.statusCategory)

const product=require('../controller/admin/product')
router.get('/product',  product.product);
router.post('/product', upload.single('image'), product.insertProduct);
router.get('/statusProduct',  product.statusProduct);
router.get('/editProduct',  product.editProduct)
router.post('/editProduct', upload.single('image'), product.updateProduct);

const coupen=require('../controller/admin/coupon')
router.get('/coupen',  coupen.coupen);
router.post('/coupen',coupen.insertCoupen);
router.get('/editCoupen', coupen.editCoupen);
router.post('/editCoupen',coupen.updateCoupen);
router.get('/deleteCoupen',coupen.statusCoupen);

const order=require('../controller/admin/order');
router.get('/orders',order.viewOrders);
router.post('/orderStatus',order.orderStatus);

const sales=require('../controller/admin/sales');
router.get('/sales',sales.viewSales);

const report=require('../controller/admin/export');
router.get('/exportPDF',report.exportPdf);
router.get('/exportExcel',report.exportExcel);

module.exports = router;