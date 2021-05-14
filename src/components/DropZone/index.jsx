import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import {wrapper, img_wrapper} from './DropZone.module.scss';

const  DropZone = ({tempoPathUploadPicture, updateTempoPathImage, saveUploadImage, saveNameUploadImage, isImageUpload}) => {

	
  const onDrop = useCallback(acceptedFiles => {

	//get temporary path of image which will be uploading
	const tempoPathImage = URL.createObjectURL(acceptedFiles[0]);

	//update path of image which will be uploadig
	updateTempoPathImage(tempoPathImage);

	//save uploading image in store
	saveUploadImage(acceptedFiles[0]);

	// cut off name uploading file if this too long
	const nameUploadFile = acceptedFiles[0].name.slice(0, 15).legnth === acceptedFiles[0].name.length
		? acceptedFiles[0].name
		: acceptedFiles[0].name.slice(0, 15) + '...';
	//save name uploading image in store 
	saveNameUploadImage(nameUploadFile)
  }, [])
  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

	return (
		<div {...getRootProps()} className={wrapper}>
		<div className={img_wrapper}><img src={tempoPathUploadPicture} alt='upload pic'/></div>
		<input {...getInputProps()} />
		{isDragActive
			? !isImageUpload && <p> <span>Drop</span> the files here ...</p> 
			: !isImageUpload && <p> <span>Drag here</span> your file, or <span>Click here</span> to upload</p>}
		</div>
	)
}
export default DropZone;