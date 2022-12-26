const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Product = require('../admin/product')
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
    totalPrice: Number
  },
  address:[{
    name:String,
    home:String,
    state:String,
    pincode:String,
    email:String,
    mobile_num:String
  }],
  orders:[]
});


userSchema.methods.addToCart = function (product) {

  let cart = this.cart;
  const isExisting = cart.items.findIndex(objInItems => new String(objInItems.productId).trim() === new String(product._id).trim());
  if (isExisting >= 0) {
    cart.items[isExisting].qty += 1;
  } else {
    cart.items.push({ productId: product._id, qty: 1 });
  }
  if (!cart.totalPrice) {
    cart.totalPrice = 0;
  }
  cart.totalPrice += product.price;
  return this.save();

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
    console.log("n pro finud");
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
  console.log("saanm ida ethi");
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

//3rd make a model
const User = mongoose.model('User', userSchema);

module.exports = User;
