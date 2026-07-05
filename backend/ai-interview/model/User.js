import mongoose , {Schema} from "mongoose";
const userSchema = new Schema({
    email:
    {
       type: String,
    required : true, 
    unique:true
   },
    name:
    {
        type:String,
        required:true},
    password:{
        type:String,
        required:true
    },  
});
const User = 
mongoose.connection.models.User || mongoose.connection.model("User", userSchema);
export default User;



 