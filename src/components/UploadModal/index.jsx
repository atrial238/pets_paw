import ReactModal from 'react-modal';
import { Close } from '../Svg';
import {header_text, wrapper_button, button} from './UploadModal.module.scss';

const UploadModal = ({isOpen, handleModalWidow}) => {

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
	return (
		<ReactModal isOpen={isOpen} style={styleForModal} >
			<div className={wrapper_button}>
				<button onClick={() => handleModalWidow(false)} className={button}><Close/></button>
			</div>
			<h4 className={header_text}>Upload a .jpg or .png Dog Image</h4>
			
		</ReactModal>
	)
}
export default UploadModal;