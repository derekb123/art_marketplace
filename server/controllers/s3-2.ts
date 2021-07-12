    // const s3 = new AWS.S3();

    // const fileStream = fs.createReadStream(file.buffer);

    // fileStream.on('error', function(err) {
    // console.log('File Error', err);
    // });

    // const path = require('path');

    // const uploadParams = {
    //     Bucket: bucketName,
    //     Key: path.basename(file),
    //     Body: fileStream,
    //   }

    // s3.upload(uploadParams, function(err, data) {
    //   if(err){
    //     console.log('Error', err);
    //   } if (data) {
    //     console.log('upload success', data.Location);
    //   }
    // })