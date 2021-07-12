


// // const s3 = new AWS.S3({ /* ... */ })
    
// //     const upload = multer({
// //       storage: multerS3({
// //         s3: s3,
// //         bucket: bucketName,
// //         metadata: function (req, file, cb) {
// //           cb(null, {fieldName: file.fieldname});
// //         },
// //         key: function (req, file, cb) {
// //           cb(null, Date.now().toString())
// //         }
// //       })
// //     })

// //     const singleFileUpload = upload.single('file');
    
//     function uploadToS3(req, res) {
//       req.s3Key= uuidv4();
//       let downloadURL = `https://s3-${region}.amazonaws.com/${bucketName}/${req.s3Key}`
//       return new Promise((resolve, reject) => {
//         return singleFileUpload(req, res, err => {
//           if (err) return reject(err);
//           return resolve(downloadURL)
//         })
//       })
//     }

// //     uploadToS3(req,res)
// //       .then(downloadURL => {
// //         console.log('uploadTos3 downloadURL', downloadURL)
// //         return res.status(200).send({downloadURL})
// //       })
// //       .catch(e => {
// //         console.log(e);
// //       })
