import {pool} from "../library/db-pool";
import assetsQueries from "../library/asset-queries";
import AWS from 'aws-sdk';
import express from 'express';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import fs from 'fs';
import chalk from 'chalk';
require('dotenv').config();

const bucketName = process.env.S3_BUCKET
const region = process.env.AWS_REGION
const accessKeyId = process.env.AWS_DEV_ACCESS_KEY_ID
const secretAccessKey = process.env.AWS_DEV_ACCESS_SECRET_KEY

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey
});

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

    getAllAssetsByQuery : function(limit:number): Promise<any> {
    const queryParams:number[] = [limit];
    const getUserByUsername =   `SELECT id
    FROM users
    WHERE username=$1;`

    



    return pool
      .query(assetsQueries.getAllAssetsQueryBySearch, queryParams)
      .then((res: any) => {
        return res.rows;
      })
      .catch((err: Error) => {
        console.log(err);
      });
  },

  // GET single asset by Id
  getAssetById : async function(assetId) {
    const queryParams = [assetId];
    // console.log('queryparams in getassetbyid',queryParams);

    return pool
      .query(assetsQueries.getAssetByIdQuery, queryParams)
      .then((res) => {
        const resObj = res.rows[0];
        // console.log('resObj in assets-controller getassetbyID', resObj);
        return resObj;
      })
      .catch((err: Error) => {
        console.log('Error in getAssetById in assets-controllers', err);
      })
  },

  // GET single asset by Id
  getAssetsByOwnerId : async function(userId, limit) {
    const queryParams = [userId, limit];
    // console.log('queryparams in getassetbyid',queryParams);

    return pool
      .query(assetsQueries.getAssetsByOwnerIdQuery, queryParams)
      .then((res) => {
        // console.log('reponse in gesAssetByOwnerId', res);
        const resObj = res.rows;
        // console.log('resObj in assets-controller getassetbyID', resObj);
        return resObj;
      })
      .catch((err: Error) => {
        console.log('Error in getAssetsByOwnerId in assets-controllers', err);
      })
  },
  // getFileStream : async function(fileKey) {

  //     const downloadParams = {
  //     Key: fileKey,
  //     Bucket: bucketName
  //     }

  //     const s3Object = await s3.getObject(downloadParams)
  //     console.log('s3Object', s3Object);
  //     const readstream = s3Object.createReadStream();
  //     return readstream;
  //   },

  getAssetMediaUrl: async function(fileKey) {
    const credentials = {
      accessKeyId,
	    secretAccessKey
    }

    AWS.config.update({
	  credentials,
	  region
    });

    try {
      let bucektParams = {
        Bucket: bucketName, // your bucket name,
        Key: fileKey // path to the object you're looking for
      }
      const s3 = new AWS.S3();
      let presignedGETURL = await s3.getSignedUrl('getObject', bucektParams);
      // console.log("presigned url obtained from s3: ", presignedGETURL);
      return presignedGETURL;
    } catch (err) {
      console.log("error call during call s3 ".concat(err))
      throw err;
    }
    },

  downloadAssetMedia: async function (presignedGETURL) {
	const url = presignedGETURL
		try {
			const response = await axios({
					url,
					method: 'GET',
					responseType: 'arraybuffer',
					headers: {
						'Content-Type': 'application/json',
						// 'Accept': 'application/pdf' // <-- declare the file format in s3
					}
				})

				// console.log("response.data from s3 object...>", response.data)
				return response.data;
		} catch (err) {
			console.log("error in axios call", err)
			throw err;
		}

},

  // Upload Media File to S3
  uploadAssetMedia: function(file) {
    return new Promise((resolve, reject)=> {
          // console.log('file inside createNewAsset controller', file);
      const filePath = file.stream;

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
          // console.log('data response inside uploadAssetsMedia', data);
          return resolve(data.key);
        }
      })
    })
  },

//Creates a new Asset in the Database
  createNewAsset: function(title, description,  media_file, creatorId, price): Promise<any> {
    // console.log('creatorID in createNewAsset',creatorId);
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
        // console.log('res from createNewAsset', res);
        return res.rows;
      })
      .catch((err: Error) => {
        console.log(chalk.blue('ERROR FROM CREATENEWASSET IN CONTROLLER'), err);
      });
  },

  transferAsset: function(ownerId, id) {
    const queryParams = [ownerId, id];

    return pool
      .query(assetsQueries.transferAssetQuery, queryParams)
      .then((res) => {
        return res.rows;
      })
      .catch((err: Error) => {
        console.log(chalk.blue('ERROR FROM TRANSFERASSET IN CONTROLLER'), err);
      });
  },

  editAssetPrice: function(salePrice, assetId) {
    const queryParams = [salePrice, assetId];

    return pool
      .query(assetsQueries.editAssetPriceQuery, queryParams)
      .then((res) => {
        return res.rows;
      })
      .catch((err: Error) => {
        console.log(chalk.blue('ERROR FROM EDITASSETPRICE IN CONTROLLER'), err);
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