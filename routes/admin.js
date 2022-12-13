const express = require('express');
const router = express.Router();

const auth=require('../middleware/admin/autj')

const adminRouter = require('../controller/admin');

const upload = require('../utils/multer')

router.get('/login',auth.isLogout,adminRouter.login)
router.post ('/login',adminRouter.loginVerification)
router.get('/',auth.isLogin,adminRouter.loadAdmin)
router.get('/logout',adminRouter.logout)

router.get('/users', adminRouter.loadUser)
router.get('/updateUser', adminRouter.updateUser);

router.get('/category', adminRouter.category);
router.post('/category', upload.single('image'), adminRouter.insertCategory);
router.get('/editCategory', adminRouter.editCategory);
router.post('/editCategory', upload.single('image'), adminRouter.updateCategory);
router.get('/deleteCategory', adminRouter.deleteCategory)

router.get('/product', adminRouter.product);
router.post('/product', upload.single('image'), adminRouter.insertProduct);
router.get('/deleteProduct', adminRouter.deleteProduct);
router.get('/editProduct', adminRouter.editProduct)
router.post('/editProduct', upload.single('image'), adminRouter.updateProduct);

router.get('/coupen', adminRouter.coupen);

module.exports = router;