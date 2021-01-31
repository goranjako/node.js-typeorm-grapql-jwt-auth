import { UserInputError } from 'apollo-server-express'
import { getRepository } from "typeorm";
import bcrypt from 'bcrypt-nodejs';
import auth from '../config/auth';
import {signIn,signUp} from '../config/verify';
import jwt from 'jsonwebtoken';

import dotenv from 'dotenv';
dotenv.config();


const user ={
    Query: {
      users:async (parent:any, args:any,{req,User}:any) => {
        const userRepository = getRepository(User)
        try{
           const user = auth(req);
          const users= await userRepository.find({});;
      
        return users;
        }
        catch (error) {
          throw error;
        }
      },
      userId:async (parent:any, args:any,{req,User}:any) => {
        const user = auth(req);
        const userRepository = getRepository(User)
        try {
         
          const user= await userRepository.findOne({where:{id:args.id}});
          return user;
        }
          catch (error) {
            throw error;
          }
      },
      login: async (paren:any,{input}: any,{User}:any) => {
        await signIn.validate(input, {abortEarly: false});
       const userRepository = getRepository(User)
        try{
          const finduser:any= await userRepository.findOne({email:input.email});
          if(!finduser){
            throw new UserInputError('User  not found');
          } 
          const isEqual = await bcrypt.compareSync(input.password, finduser.password);
          if (!isEqual) {
            
            throw new UserInputError('Wrong credentials!');
          }
          const token=jwt.sign({finduser}, process.env.SECRET_KEY, {
            expiresIn: 60 * 60,
          })
          return {token}

        }
        catch (error) {
          throw error;
        }
    } 
    },
    Mutation: {
    
      register: async (paren:any,{input}:any,{User}:any) => {
          await signUp.validate(input, {abortEarly: false});
          const userRepository = getRepository(User)
          
        try{
          const finduser= await userRepository.findOne({email:input.email});
          if(finduser){
            throw new UserInputError('User already Exists');
          }
          const newuser = new User();
            newuser.fullName=input.fullName,
             newuser.email=input.email,
             newuser.password=input.password,
             newuser.hashPassword()   
          
          const saveduser= await getRepository(User).save(newuser);
          const token=jwt.sign({saveduser}, process.env.SECRET_KEY, {
            expiresIn: 60 * 60,
          })
          return {token}

        }
        catch (error) {
          throw error;
        }
    
      } 
    }
   
}
   
export default user