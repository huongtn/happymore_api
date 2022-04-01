import dbConnect from '../../../utils/db_connect';
import dbContext from '../../../models/db_context'; 
import getConfig from 'next/config';
import jwt_decode  from 'jwt-decode';
const { publicRuntimeConfig: config } = getConfig()
import jwt from 'jsonwebtoken'
import { isValidObjectId } from 'mongoose';
import axios from 'axios'
import withProtect from '../../../middleware/with_protect';


dbConnect();

const handler = async (req, res) => {
    // {token : ""}
    const { method } = req;

    if (method !== 'POST') {
      return res
        .status(400)
        .json({ success: false, message: 'Only POST requests are allowed.' });
    }

    try{
      
        const {token} = req.body
        console.log("token=>"+token);
        
        const instance = axios.create({
            baseURL : 'https://graph.facebook.com/',
            timeout : 1000
        })
       
       try{

        const response = await instance.get('me?fields=name,email&access_token='+token);
        const {name , email} = response.data;
        console.log(name+"=>" + email);
        let user = await dbContext.User.findOne({ email: email } , "_id email role ");
          
       //aggregate testing
       /* var pipeline = [
         {
             $match : {
                email : email
             }
         }
       ]

      var userAgg =  await dbContext.User.aggregate(pipeline)
   
     
       console.log(JSON.stringify(userAgg))*/
        console.log(user);
          
        if (!user) {
            // create new user
            var newUser = await dbContext.User.create({
              email: email,
            });

            user = newUser;
          }

          
          user.token = await GenerateToken(user).then((token)=> {return token})
          return res.status(200).json({
              "role" : user.role,
              "email" : user.email,
              "token" : user.token
          });
   
       }catch(err){
        console.error(err.response.data)
        return res.status(400).json({"Status" : 400 , "Message" : err.response.data.error.message})
       }

     

    }catch(err){
        res.status(400).json({"Status" : 400 , "Message" : err})
    }
}
async function GenerateToken(user){
    var payload = { email : user.email , role : user.role}
    var token = jwt.sign(
        payload ,
        config.jwt_secret,
        {
            expiresIn: "2h",
        }
    );
    return token
   
  }
  

export default handler;
//export default withProtect();
