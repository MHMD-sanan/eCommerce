const mongoose=require('mongoose');
const bcrypt=require('bcrypt');
const userSchema = new mongoose.Schema({
  name:  String,
  email: String,
  password:   String,
  status:{
    type:Boolean,
    default:true
  }
});

  // userSchema.pre('save',async function(next){
  //   if(!this.isModified('password'))next()

  //   this.password=await bcrypt.hash(this.password,10)
  //   next()
  // })

//3rd make a model
const User = mongoose.model('User', userSchema);

module.exports=User;
