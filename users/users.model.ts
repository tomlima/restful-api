import * as mongoose from 'mongoose'
import * as bcrypt from 'bcrypt'

export interface User extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    matches?(password:string): boolean
}

export interface UserModel extends mongoose.Model<User>{
    findByEmail(email:string, projection?:string): Promise<User>
}

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        select: false,
        required: true
    }
})

userSchema.statics.findByEmail = function(email: string, projection: string){
    return this.findOne({email}, projection )
}

userSchema.methods.matches = function(password: string): boolean{
    return bcrypt.compareSync(password, this.password)
}

userSchema.pre('save', async function (next){
    const user: User =  this
    if(!user.isModified('password')){
        next()
    }else{
        try{
            const hash = await bcrypt.hash(user.password, 10)
            user.password = hash;
            next()
        }catch(err){
            next(err)
        }
    }
})


userSchema.pre('findOneAndUpdate', async function (next){
   // To do
})

export const User = mongoose.model<User, UserModel>('User', userSchema)