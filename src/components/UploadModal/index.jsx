import ReactModal from 'react-modal';
import { DropZone, UploadButton } from '..';
import { Close } from '../Svg';
import {header_text, wrapper_button, button, file_selected, upload_button} from './UploadModal.module.scss';

const UploadModal = ({isOpen, handleModalWidow, tempoPathUploadPicture, isImageUpload, imageForUpload,
	updateTempoPathImage, saveUploadImage, nameUploadImage, saveNameUploadImage, handleUploadDeleteImages}) => {

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
	}

	const handleUpoloadButton = (isOpen, imageUpload) => {
		handleModalWidow(isOpen);
		handleUploadDeleteImages(imageUpload, true)
	}
	
	return (
		<ReactModal isOpen={isOpen} style={styleForModal} >
			<div className={wrapper_button}>
				<button onClick={() => handleModalWidow(false)} className={button}><Close/></button>
			</div>
			<h4 className={header_text}>Upload a .jpg or .png Dog Image</h4>
			<DropZone {...propsDropzone}/>
			<div className={file_selected}>Image File Name:{nameUploadImage}</div>
			{
				isImageUpload && 
					<div className={upload_button} onClick={() => handleUpoloadButton(false, imageForUpload)}>
						<UploadButton/>
					</div>
			}
		</ReactModal>
	)
}
export default UploadModal;