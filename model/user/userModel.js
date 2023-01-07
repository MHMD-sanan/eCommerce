  const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Product = require('../admin/product');
const Coupon=require('../admin/coupen');
const userSchema = new mongoose.Schema({
  name: {
    type: String
  },
  email: {
    type: String
  },
  password: {
    type: String
  },
  status: {
    type: Boolean,
    default: true
  },
  cart: {
    items: [{
      productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
      },
      qty: {
        type: Number,
        default:0,
        required: true
      }
    }],
    totalPrice:{
      type:Number,
      default:0
    },
    coupon:{
      type:Number,
      default:0
    }
  },
  wishlist: [{
      productId: {
        type: mongoose.Types.ObjectId,
        ref: 'Product',
        required: true
      }
    }],
  address:[{
    name:String,
    home:String,
    state:String,
    pincode:String,
    email:String,
    mobile_num:String,
    status:{
      type:Boolean,
      default:true
    }
  }],
  coupon:[{
      couponId:{
        type:mongoose.Types.ObjectId,
        ref:'Coupon'
      }
  }]
});


userSchema.methods.addToCart = function (product) {
  let cart = this.cart;
  const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(product._id).trim());
  if (isExisting >= 0) {
    cart.items[isExisting].qty += 1;
  } else {
    cart.items.push({ productId: product._id, qty: 1 });
  }
  cart.totalPrice += product.price;
  return this.save();

}

userSchema.methods.addToWishlist = function (product) {

  let wishlist = this.wishlist;
  const isExisting = wishlist.findIndex(objInItems => new String(objInItems.productId).trim() === new String(product._id).trim());
  if (isExisting >= 0) {
    let msg='exist';
    return msg;
  } else {
    wishlist.push({ productId: product._id });
    return this.save();
  }
  

}


userSchema.methods.applyCoupon=async function (isLogin,code){
  const cart=this.cart;
  const user=await User.findById(isLogin);
  const data=await Coupon.find({code:code});
  const coupon=this.coupon;
  const isExisting = coupon.findIndex(objInItems => new String(objInItems.couponId).trim() === new String(data[0]._id).trim());
  if(isExisting>=0){
    let msg='exist';
    return msg;
  }else{
    const currentDate=new Date();
    if(currentDate>=data[0].startDate && currentDate<=data[0].endDate){
      const value=data[0].discount;
      const discount=(cart.totalPrice/100)*value;
      coupon.push({couponId:data[0]._id});
      cart.coupon=discount;
      return this.save();
    }else{
      let msg='expired';
      return msg;
    }
  }
}

userSchema.methods.decQty=async function(product){
  let cart = this.cart;
  const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(product._id).trim());
  if (isExisting >= 0) {
    if(cart.items[isExisting].qty>1){
      cart.items[isExisting].qty-=1;
    }else{
      cart.items.splice(isExisting, 1);
    }
    
  } else {
    console.log('else worked in usermodel decqty')
  }
  cart.totalPrice-=product.price;
  return this.save();
}


userSchema.methods.removeFromCart =async function(productId) {
  const cart = this.cart;
  const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(productId).trim());
  if (isExisting >= 0) {
      const prod=await Product.findById(productId);
      cart.totalPrice-=prod.price*cart.items[isExisting].qty;
      cart.items.splice(isExisting, 1);
      return this.save();
  }
}

userSchema.methods.addAdd=async function(data){
  const address=this.address;
  address.push({   
    name:data.name,
    home:data.home,
    state:data.state,
    pincode:data.pincode,
    email:data.email,
    mobile_num:data.mobile_num
  })
  return this.save();
}

userSchema.methods.updateAddress=function (addData){
  const address=this.address;
  const isExisting = address.findIndex(objInItems => new String(objInItems._id).trim() === new String(addData.addId).trim());
  if(isExisting>=0){
    address[isExisting].name=addData.name;
    address[isExisting].home=addData.home;
    address[isExisting].state=addData.state;
    address[isExisting].pincode=addData.pincode;
    address[isExisting].email=addData.email;
    address[isExisting].mobile_num=addData.mobile_num;
  }
  return this.save();
}

userSchema.methods.removeAddress=async function (addId){
  const address=this.address;
  const isExisting = address.findIndex(objInItems => new String(objInItems._id).trim() === new String(addId).trim());
  if(isExisting>=0){
    address[isExisting].status=false;
    return this.save();
  }
 
 }

userSchema.methods.addOrders=async function(order){
  const orders=this.orders;
  orders.push(order);
  return this.save();   
}


// userSchema.pre('save',async function(next){
//   if(!this.isModified('password'))next()

//   this.password=await bcrypt.hash(this.password,10)
//   next()
// })

const User = mongoose.model('User', userSchema);

module.exports = User;
