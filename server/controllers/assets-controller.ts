import {pool} from "../library/db-pool";
import assetsQueries from "../library/asset-queries";
import aws from 'aws-sdk';
import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { v4 as uuidv4 } from 'uuid';



const assetsController = {
// GET all  assets with limit, order by most recent
getAllAssets : function(limit:number): Promise<any> {
  const queryParams:number[] = [limit];

  return pool
    .query(assetsQueries.getAllAssetsQuery, queryParams)
    .then((res: any) => {
      return res.rows;
    })
    .catch((err: Error) => {
      console.log(err);
    });
},

// GET single asset by Id
getAssetById : function(assetId:number[]): Promise<any> {
  const queryParams:number[] = assetId;
  console.log(queryParams);

  return pool
    .query(assetsQueries.getAssetByIdQuery, queryParams)
    .then((res: any) => {
      return res.rows;
    })
    .catch((err: Error) => {
      console.log(err);
    });
},

// POST new assset with image
createNewAsset : function(req, res) {

  console.log('req.body inside createNewAsset controller', req.file);

  aws.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: 'us-east-2'
  })

  const s3 = new aws.S3();

  let upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: process.env.S3_BUCKET,
      metadata: function (req, file, cb) {
        cb(null, {fieldName: file.fieldname});
      },
      key: function (req, file, cb) {
        cb(null, req.s3key)
      }
    })
  });

  const singleFileUpload = upload.single('image');

    function uploadToS3(req, res) {
      req.s3Key= uuidv4();
      let downloadURL = `https://s3-${aws.config.region}.amazonaws.com/${process.env.S3_BUCKET}/${req.s3Key}`
      return new Promise((resolve, reject) => {
        return singleFileUpload(req,res, err => {
          if (err) return reject(err);
          return resolve(downloadURL);
        })
      })
    };

    return uploadToS3(req,res)
      .then(downloadURL => {
        console.log('downloadURL',downloadURL);
        return res.status(200).send({downloadURL})
    })

}

}

export default assetsController;