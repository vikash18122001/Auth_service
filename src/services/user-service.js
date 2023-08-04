const userRepository=require('../repository/user-repository');
const jwt=require('jsonwebtoken');
const {JWT_KEY}=require('../config/serverConfig')
const bcrypt=require('bcrypt')

class userService{
    constructor(){
        this.UserRepository=new userRepository();
    }
    async create(data){
        try {
            const user=await this.UserRepository.create(data);
            return user;
        } catch (error) {
            console.log('something went wrong in service layer');
            throw {error};
        }
    }

    createToken(user){
        try {
            const result= jwt.sign(user,JWT_KEY,{expiresIn:'1d'});
            return result;
        } catch (error) {
            console.log("something went wrong in token creation");
            throw error;
        }
    }
    verifyToken(token){
        try {
            const result= jwt.verify(token,JWT_KEY);
            return result;
        } catch (error) {
            console.log("something went wrong in token validation",error);
            throw error;
        }
    }
    checkPassword(userInputPlainPassword,encryptedPassword)
    {
        try {
            return bcrypt.compareSync(userInputPlainPassword,encryptedPassword);
        } catch (error) {
            console.log("something went wrong in  password comparism");
            throw error;
        }
    }

}
module.exports=userService;