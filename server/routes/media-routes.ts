import express from 'express';
const router = express.Router();
import multer from 'multer';

const mediaRoutes = function(router: any) {
const upload = multer({ dest: 'media'})
  
router.post('/assets', upload.single('asset'), (req, res) => {

  })

  // router.post('/media', (request, response) => {
  //     const form = new multiparty.Form();
  // form.parse(request, async (error, fields, files) => {
  //   if (error) {
  //     return response.status(500).send(error);
  //   };
  //   try {
  //     const path = files.file[0].path;
  //     const buffer = fs.readFileSync(path);
  //     const type = await FileType.fromBuffer(buffer);
  //     const fileName = `bucketFolder/${Date.now().toString()}`;
  //     const data = await uploadFile(buffer, fileName, type);
  //     return response.status(200).send(data);
  //   } catch (err) {
  //     return response.status(500).send(err);
  //   }
  // });
// });

//   return router;
}

export default mediaRoutes;