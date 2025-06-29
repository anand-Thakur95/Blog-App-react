import multer from "multer"

const storage = multer.diskStorage({
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })

  function fileFilter (req, file, cb) {

    const allowedFileTypes = ['image/jpeg', 'image/png', 'image/gif']
    if (!allowedFileTypes.includes(file.mimetype)) {
    cb(new Error('only image are allowed.'), false)
    }else{
        cb(null, true)
    }
  
  
  }
  
  
  const upload = multer({ storage: storage, fileFilter: fileFilter })

  export default upload;