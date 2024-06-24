import { Sequelize } from "sequelize";

export const sequalizeInstance= new Sequelize("bjdsg3ta50hegcqspb0y","u4qtbb0rpykao8iz","0s2xvgwymYIDlnrRcLzB",{
    host:"bjdsg3ta50hegcqspb0y-mysql.services.clever-cloud.com",
    dialect:"mysql"
});

export const testConnection=async()=>{

    try{
      await sequalizeInstance.sync({alter:true});
      console.log("Connection successful");
    }catch(error){
        console.log({message:"connection failed",error:error.message});
    }
    

}

