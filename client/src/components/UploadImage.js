import React, { Fragment, useState } from 'react';
import Progress from './Progress';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('Choose File');
  const [uploadedFile, setUploadedFile] = useState({});
  const [uploadPercentage, setUploadPercentage] = useState(0);
}

const onChange = e => {
  setFile(e.target.files[0]);
  setFilename(e.target.files[0].name);
}

const onSubmit = async e => {
  e.preventDefault();
  const formData = new FormData();
  formData.append('file', file);

  try {
    const res = await axios.post()
  }
}