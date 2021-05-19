import { useEffect, useState } from 'react';
import ReactModal from 'react-modal';
import { DropZone, UploadButton } from '..';
import useHeightNavPanel from '../../hooks/useHeightNavPanel';
import { Close } from '../Svg';
import {header_text, wrapper_button, button, file_selected, upload_button, wrong_image} from './UploadModal.module.scss';

const UploadModal = ({isOpen, handleModalWidow, tempoPathUploadPicture, 
	isImageUpload, imageForUpload, setIsImageWrong, isUploadingImageWrong,
	updateTempoPathImage, saveUploadImage, nameUploadImage, 
	saveNameUploadImage, handleUploadOrDeleteImages}) => {

	const [isMobileView, setIsMobileView] = useState(window.matchMedia('(max-width: 992px)').matches);

	const updateWidth = () => setIsMobileView(window.matchMedia('(max-width: 992px)').matches);

	useEffect(() => {
		window.addEventListener('resize', updateWidth);
		return () => window.removeEventListener('resize', updateWidth);
	})
	
	const heightNavPanel = useHeightNavPanel();

	const styleForModal = {
		content: {
			inset: isMobileView ? `${heightNavPanel -10}px 0px 0px auto` : '0px 0px 0px auto',
			width: isMobileView ? '100%' : '50%',
			margin: isMobileView ? '0px' : '20px',
			borderRadius: isMobileView ? '0px' : '20px',
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
		handleUploadOrDeleteImages(imageUpload, true)
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