import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  uploadContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: theme.spacing(2),
    marginTop: theme.spacing(2),
  },
  input: {
    display: 'none',
  },
  button: {
    marginTop: theme.spacing(1),
  },
  fileName: {
    width: '100%',
  },
}));

const ImageUpload = ({ recipeId }) => {
  const classes = useStyles();
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await axios.post(`http://localhost:8080/api/upload/${recipeId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log(response.data);
      window.location.reload(); // Refresh the page after a successful upload
    } catch (error) {
      console.error('Error uploading file:', error);
      window.location.reload();
    }
  };

  return (
    <div>
      <input
        accept="image/*"
        className={classes.input}
        id="upload-button-file"
        type="file"
        onChange={handleFileChange}
      />
      <label htmlFor="upload-button-file">
        <Button variant="contained" color="primary" component="span" style={{ marginTop: '20px', marginRight: '20px' }}>
          Choose File
        </Button>
      </label>
      <TextField
        className={classes.fileName}
        label="File name"
        value={selectedFile ? selectedFile.name : "No files selected"}
        variant="outlined"
        size="small"
        style={{ width: '300px',  marginTop: '20px', marginRight: '20px' }}
        InputProps={{
          readOnly: true,
        }}
      />
      <Button
        className={classes.button}
        variant="contained"
        color="primary"
        onClick={handleUpload}
        disabled={!selectedFile}
        style={{ marginTop: '20px', marginRight: '20px' }}
      >
        Upload Image
      </Button>
    </div>
  );
};

export default ImageUpload;
