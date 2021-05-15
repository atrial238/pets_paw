import PropTypes from 'prop-types';
import React from 'react';
import { GridItems, ImagePet, Paginator, Placeholder, Select} from "../../components";
import { wrapper, header_breeds,preloader, no_items, error} from './Breeds.module.scss';

const BreedsBody = ({setSearchBreeds, setNextPage, setPreviousPage, changeLimit, state}) => {
	
	
	//helper function to avoid duplicate code when creating petsImage
	const getImagePet = (imagePet, id, handleImageEvent, nameBreed, imageId, value) => {
		return (
			<ImagePet 
				imageUrl={imagePet} 
				id={id} 
				handleImageEvent={handleImageEvent} 
				value={value}
				nameBreed={nameBreed}
				isImageOpenInNewPage={state.isImageOpenInNewPage}
				imageId={imageId}
			/>
		)
	}

	//create an array with components needed for displaying every image
	const petsImage = state.petImages.map((pet, index) => (
		<React.Fragment key={index}>{
			state.isSearchByBreed && pet.breeds 
				? getImagePet(pet.url, pet.breeds[0].id, null, pet.breeds[0].name, pet.id, 3)
				: pet.image && getImagePet(pet.image.url, pet.id, setSearchBreeds, pet.name, null, 2)
		}</React.Fragment>
	));

	//props for Select limit items per page
	const propsSelect = {
		background:'dark',
		items: state.breedsName.map(el => el.name) ,
		selectValue: state.currentBreed ,
		handleChange: setSearchBreeds
	}

	//props for Paginator
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

	return (
		<div className={wrapper}>

			{/* header */}
			<div className={header_breeds}>
				<div><Select {...propsSelect} ></Select></div>
				<div><Paginator {...propsPaginator}/></div>
			</div> 

			{/* displaying images or error message or preloader*/}
			{(state.isLoading && <div className={preloader}><Placeholder/></div> ) 
				|| (state.isError && <div className={error}>Ooops! Something went wrong</div>) 
				|| (state.isLastPage && <div className={no_items}>No items found</div>)
				|| <GridItems items={petsImage} />
			}
		</div>
	)
}
export default BreedsBody;

BreedsBody.propsTypes = {
	setSearchBreeds: PropTypes.func,
	setNextPage: PropTypes.func,
	setPreviousPage: PropTypes.func,
	changeLimit: PropTypes.func,
	state: {
		page: PropTypes.string,
		petImages: PropTypes.array,
		limit: PropTypes.string,
		isLastPage: PropTypes.bool,
		isLoading: PropTypes.bool,
		isError: PropTypes.bool,
		isSearchByBreed: PropTypes.bool,
		breedsName: PropTypes.array,
		currentBreed: PropTypes.string,
		items: PropTypes.array,
	}
}