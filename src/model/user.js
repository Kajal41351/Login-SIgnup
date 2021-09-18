const mongoose = require('mongoose')
const validator = require('validator')
const bcryptjs = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name : {
        type: String,
        required : true,
        trim:true
    },
    email :{
        type : String,
        required : true,
        lowercase : true,
        trim : true,
        unique : true,
        validate(value){
            if(!validator.isEmail(value)){
                 throw new Error('Invalid Email!')
            }
        }
    },
    password:{
        type: String,
        required : true,
        minLength : 7,
        trim:true,
        validate(value){
            if(value.includes('password')){
                throw new Error('Password cannot be set as or include password.')
           }
        }
    }
})


userSchema.methods.toJSON = function (){
    const user = this
    const userObject = user.toObject()

    delete userObject.password
    delete userObject.__v
    return userObject
}

userSchema.statics.findByCredentials = async (email,password) =>{
    const user = await User.findOne({email})
    if(!user){
        throw new Error('User not registered!')
    }
    const isMatch = await bcryptjs.compare(password,user.password)
    if(!isMatch){
        throw new Error('Invalid credentials!')
    }
    return user
}

userSchema.pre('save',async function(next){
    const user = this
    if(user.isModified('password')){
        user.password = await bcryptjs.hash(user.password,8)
    }
})

const User = mongoose.model('user',userSchema)

module.exports= User