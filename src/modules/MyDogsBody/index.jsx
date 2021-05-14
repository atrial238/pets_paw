import PropTypes from 'prop-types';
import { ActionLog, BackButton, GridItems,
	 ImagePet, Paginator, Placeholder, UploadButton, UploadModal } from '../../components';
import {wrapper, back_button, header_my_dogs, no_items, 
	paginator, preloader, error, remove, active_remove, upload_button} from './MyDogsBody.module.scss';

const MyDogsBody = ({handleUploadDeleteImages, state, changeLimit, setNextPage,saveNameUploadImage,
	 setPreviousPage, handleModalWidow, updateTempoPathImage, saveUploadImage, getTime}) => {
	
	
//create array with components which will be displeid every image
	const petsImage = state.myPetsImages.map(pet => (
		<ImagePet
			imageUrl={pet.url} 
			key={pet.id} 
			id={pet.id} 
			handleImageEvent={handleUploadDeleteImages} 
			value={4}
		/>
	));

//props for paginator
	const propsPaginator = {
		handleChange: changeLimit,
		selectValue: state.limit,
		setNextPage,
		setPreviousPage,
		page: state.page,
		isLastPage: state.isLastPage,
		isLoading: state.isLoading,
		items: state.items
	}

//props for Modal Window
	const propsModalWindow = {
		saveNameUploadImage,
		isOpen: state.isUploadModalOpen,
		handleModalWidow,
		saveUploadImage,
		tempoPathUploadPicture: state.tempoPathUploadPicture,
		updateTempoPathImage,
		nameUploadImage: state.nameUploadImage,
		isImageUpload: state.imageForUpload,
		handleUploadDeleteImages,
		imageForUpload: state.imageForUpload
	}

	return (
		<div className={wrapper}>

			{/* Header */}
			<div className={header_my_dogs}>
				<div className={back_button}><BackButton name='My pets'/></div>
				<div className={paginator}><Paginator {...propsPaginator}/></div>
				<div className={upload_button} onClick={() => {handleModalWidow(true)}}> <UploadButton/></div>
			</div>

			{/* Main content */}
			{(state.isLoading && <div className={preloader}><Placeholder/></div> ) 
				|| (state.isError && <div className={error}>Ooops! Something went wrong</div>) 
				|| (state.isLastPage && <div className={no_items}>No item found</div>)
				|| <GridItems items={petsImage} />}

			{/* show info message when image was deleted*/}
			<div className={remove + ' ' + (state.isDeleteSuccess && active_remove)}>
				{state.isDeleteSuccess && <ActionLog time={getTime()} content='was successfully deleted' id={'some id'}/>}
			</div>

			{/* show info message when image was uploaded*/}
			<div className={remove + ' ' + (state.isUploadingSuccess && active_remove)}>
				{state.isUploadingSuccess && <ActionLog time={getTime()} content='was successfully uploaded' id={state.nameUploadImage}/>}
			</div>

			{/* Modal window for uploading image */}
			<UploadModal {...propsModalWindow}/>
	</div>
	)
}
export default MyDogsBody;

MyDogsBody.propTypes= {
	handleUploadDeleteImages: PropTypes.func,
	state: {
		page: PropTypes.number,
		myPetsImages: PropTypes.array,
		limit: PropTypes.string,
		isLastPage: PropTypes.bool,
		isLoading: PropTypes.bool,
		isError: PropTypes.bool,
		items: PropTypes.array,
		isUploadModalOpen: PropTypes.bool,
		tempoPathUploadPicture: PropTypes.string,
		imageForUpload: PropTypes.file,
		nameUploadImage: PropTypes.string,
		isUploadingSuccess: PropTypes.bol,
		isDeleteSuccess: PropTypes.bol,
		isUpdateMyPetsImage: PropTypes.bol,
		idDeletedImage: PropTypes.string
	},
	changeLimit: PropTypes.func,
	setNextPag: PropTypes.func,
	saveNameUploadImag: PropTypes.func,
	setPreviousPage: PropTypes.func,
	handleModalWidow: PropTypes.func,
	updateTempoPathImage: PropTypes.func,
	saveUploadImage: PropTypes.func,
	getTime: PropTypes.func
}