const multer = require("multer");
const path = require('path');

const storage = multer.diskStorage({
    destination:(req,file,cb)=>{
       cb(null,'uploads/')
    },
    filename:(req,file,cb)=>{
      let ext = path.extname(file.originalname)
      cb(null, 'products' + ext)
    }
})

const upload = multer({
    storage,
    fileFilter:(req,file,cb)=>{
        const allowedTypes =["application/vnd.ms-excel"]
       if(!allowedTypes.includes(file.mimetype)){
        const error = new Error('Wrong File Type');
        error.code ="LIMIT_FILE_TYPES";
        return cb(error,false)
       }else{
           cb(null,true)
       }
    },
    limits:{
        fileSize: 1024 * 1024 *2
    }
})

module.exports = upload