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
    async signIn(email,plainPassword){
        try {
            //step 1-> fetch the user using the email
            const user =await this.UserRepository.getByEmail(email);
            // step =>2 comparing emailplainpassword with encrypted password
            const passwordsMatch=this.checkPassword(plainPassword,user.password);
            if(!passwordsMatch){
                console.log('password does not match');
                throw {error:'incorrect password'}
            }
            // step -> if password match create the token and send it to the user
            const newJwt=this.createToken({email:user.email,id:user.id});
                return newJwt;
            } catch (error) {
            console.log("something went wrong in sign in process");
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
    async isAuthenticated(token){
        try {
            const response=this.verifyToken(token);
            if(!response)throw {error: 
            'invalid token'};
            const user=this.UserRepository.getById(response.id);
            if(!user)throw {error: 'no user with the corresponding token'};
            return user.id;
        } catch (error) {
            console.log("something went wrong in auth process");
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