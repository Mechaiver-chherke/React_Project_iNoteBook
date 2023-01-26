var jwt = require('jsonwebtoken');
const JWT_SECRET = "mack_24";
const fetchuser = (req, res, next)=>{
   //get the user from jwt token and id to req object 
   const token = req.header('auth-token');
   if(!token){
    res.status(402).send({error: "Please Authenticate using a valid Token"})
   }
   try {
    const data = jwt.verify(token,JWT_SECRET );
 req.user = data.user;
   next();
   } catch (error) {
    res.status(403).send({error: "Please Authenticate using a valid Token"})
}
   

}
module.exports = fetchuser;