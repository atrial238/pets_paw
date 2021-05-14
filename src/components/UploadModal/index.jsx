import ReactModal from 'react-modal';
import { DropZone, UploadButton } from '..';
import { Close } from '../Svg';
import {header_text, wrapper_button, button, file_selected, upload_button, wrong_image} from './UploadModal.module.scss';

const UploadModal = ({isOpen, handleModalWidow, tempoPathUploadPicture, 
	isImageUpload, imageForUpload, setIsImageWrong, isUploadingImageWrong,
	updateTempoPathImage, saveUploadImage, nameUploadImage, 
	saveNameUploadImage, handleUploadDeleteImages}) => {

	const styleForModal = {
		content: {
			inset: '0px 0px 0px auto',
			width: '50%',
			margin: '20px',
			borderRadius: '20px',
			background: '#F8F8F7',
		},
		overlay: {
			background: 'rgba(29, 29, 29, 0.6)'
		}
		
	}
//props for DropZone 
	const propsDropzone = {
		tempoPathUploadPicture, 
		updateTempoPathImage, 
		saveUploadImage,
		saveNameUploadImage,
		isImageUpload,
		setIsImageWrong,
		isUploadingImageWrong
	}

	const handleUpoloadButton = (isOpen, imageUpload) => {
		handleModalWidow(isOpen);
		handleUploadDeleteImages(imageUpload, true)
	}
	
	return (
		<ReactModal isOpen={isOpen} style={styleForModal} >

			{/* close modal button */}
			<div className={wrapper_button}>
				<button onClick={() => handleModalWidow(false)} className={button}><Close/></button>
			</div>

			<h4 className={header_text}>Upload a .jpg or .png Dog Image</h4>

			{/* show meassage if uploaded image have wrong extension */}
			{isUploadingImageWrong && <div className={wrong_image}>The uploaded file must have jpg or png extension</div>}

			<DropZone {...propsDropzone}/>
			
			<div className={file_selected}>Image File Name:{nameUploadImage}</div>

			{/* show button if image save in store and have right extensioin */}
			{isImageUpload && !isUploadingImageWrong &&
				<div className={upload_button} onClick={() => handleUpoloadButton(false, imageForUpload)}>
					<UploadButton/>
				</div>}

		</ReactModal>
	)
}
export default UploadModal;