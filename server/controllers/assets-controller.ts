import {pool} from "../library/db-pool";
import assetsQueries from "../library/asset-queries";
import AWS from 'aws-sdk';
import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import chalk from 'chalk';
require('dotenv').config();



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

  // Upload Media File to S3
  uploadAssetMedia: function(file) {
    return new Promise((resolve, reject)=> {
          // console.log('file inside createNewAsset controller', file);

      const bucketName = process.env.S3_BUCKET
      const region = process.env.AWS_REGION
      const accessKeyId = process.env.AWS_DEV_ACCESS_KEY_ID
      const secretAccessKey = process.env.AWS_DEV_ACCESS_SECRET_KEY
      const filePath = file.stream;

      const s3 = new AWS.S3({
        region,
        accessKeyId,
        secretAccessKey
      });

      const path = require('path');

      const uploadParams = {
          Bucket: bucketName,
          Body: filePath,
          Key: uuidv4()
        }

      return s3.upload(uploadParams, function(err, data) {
        if(err){
          console.log('Error', err);
          return reject(err);
        } if (data) {
          return resolve(data.Location);
        }
      })
    })
  },

//Creates a new Asset in the Database
  createNewAsset: function(title, description,  media_file, creatorId, price): Promise<any> {
    console.log('creatorID in createNewAsset',creatorId);
    const queryParams = [
    title,
    description,
    media_file,
    creatorId,
    creatorId,
    price,
    ];

    return pool
      .query(assetsQueries.createNewAssetQuery, queryParams)
      .then((res: any) => {
        console.log('res from createNewAsset', res);
        return res.rows;
      })
      .catch((err: Error) => {
        console.log(chalk.blue('ERROR FROM CREATENEWASSET'), err);
      });
  }
}

export default assetsController;



  // function uploadFile(file) {
  //   const fileStream = fs.createReadStream(file);

  //   const uploadParams = {
  //     Bucket: bucketName,
  //     Body: fileStream,
  //     Key: file.name
  //   }

  //   return s3.upload(uploadParams).promise()
  // }


  // const result = await uploadFile(file)
  // console.log('uploadFile', result)
  // let upload = multer({
  //   storage: multerS3({
  //     s3: s3,
  //     bucket: process.env.S3_BUCKET,
  //     metadata: function (req, file, cb) {
  //       cb(null, {fieldName: file.fieldname});
  //     },
  //     key: function (req, file, cb) {
  //       cb(null, req.s3key)
  //     }
  //   })
  // });

  // const singleFileUpload = upload.single('image');

  //   function uploadToS3(req, res) {
  //     req.s3Key= uuidv4();
  //     let downloadURL = `https://s3-${aws.config.region}.amazonaws.com/${process.env.S3_BUCKET}/${req.s3Key}`
  //     return new Promise((resolve, reject) => {
  //       return singleFileUpload(req,res, err => {
  //         if (err) return reject(err);
  //         return resolve(downloadURL);
  //       })
  //     })
  //   };

  //   return uploadToS3(req,res)
  //     .then(downloadURL => {
  //       console.log('downloadURL inside uploadToS3',downloadURL);
  //       return res.status(200).send({downloadURL})
  //   })