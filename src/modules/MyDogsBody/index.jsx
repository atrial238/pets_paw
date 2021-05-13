import PropTypes from 'prop-types';
import { ActionLog, BackButton, GridItems,
	 ImagePet, Paginator, Placeholder, UploadButton, UploadModal } from '../../components';
import {wrapper, back_button, header_my_dogs, no_items, 
	paginator, preloader, error, remove, active_remove, upload_button} from './MyDogsBody.module.scss';

const MyDogsBody = ({handleUploadImages, state, changeLimit, setNextPage, setPreviousPage, handleModalWidow}) => {
	
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

	const petsImage = state.myPetsImages.map(pet => (
		<ImagePet
			imageUrl={pet.url} 
			key={pet.id} 
			id={pet.id} 
			// handleImageEvent={handleImageEvent} 
			value={4}
		/>
	));

	return (
		<div className={wrapper}>
			<div className={header_my_dogs}>
				<div className={back_button}><BackButton name='My pets'/></div>
				<div className={paginator}><Paginator {...propsPaginator}/></div>
				<div className={upload_button} onClick={() => {handleModalWidow(true)}}> <UploadButton/></div>
			</div>
			{(state.isLoading && <div className={preloader}><Placeholder/></div> ) 
				|| (state.isError && <div className={error}>Ooops! Something went wrong</div>) 
				|| (state.isLastPage && <div className={no_items}>No item found</div>)
				|| <GridItems items={petsImage} />}
			{/* <div className={remove + ' ' + (state.removeSuccess && active_remove)}>
				{state.removeSuccess && <ActionLog time={getTime()} content='was removed from Favourites' id={state.removedFavId}/>}
			</div> */}
			

			<input
				style={{background: 'black', color: 'white'}}
				type="file"
				onChange={(e) => handleUploadImages(e.target.files[0])}
			/>
		
			<UploadModal isOpen={state.isUploadModalOpen} handleModalWidow={handleModalWidow}/>
	</div>
	)
}
export default MyDogsBody;
