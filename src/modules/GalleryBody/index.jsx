import React, { useEffect, useRef, useState } from "react";
import PropTypes from 'prop-types';

import { GridItems, ImagePet, Paginator, Placeholder } from "../../components"
import { wrapper, back_button, preloader, error, no_items} from './GalleryBody.module.scss';
import HeaderGallery from "./HeaderGallery/HeaderGallery";

const GalleryBody = ({setNextPage, setPreviousPage, handleTypeBreedForSearch, updateSearch, 
	changeLimit, state, handleCurrentBreedForGallery, handleOrderBreedForSearch}) => {
	
	
	
	//helper function to avoid duplicate code when creating petsImage
	const getImagePet = (imagePet, id, nameBreed, imageId, value, isGalleryPage) => {
		return (
			<ImagePet 
				imageUrl={imagePet} 
				id={id}
				value={value}
				nameBreed={nameBreed}
				isImageOpenInNewPage={state.isImageOpenInNewPage}
				imageId={imageId}
				isGalleryPage={isGalleryPage}
			/>
		)
	}

	//create an array with components needed for displaying every image
	const petsImage = state.petImages.map((pet, index) => (
		<React.Fragment key={index}>{
			pet.breeds.length 
				? pet.breeds && getImagePet(pet.url, pet.breeds[0].id, pet.breeds[0].name, pet.id, 3, true)
				: pet.breeds && getImagePet(pet.url, 'unknown', 'unknown', pet.id, 3, true)
		}</React.Fragment>
	));

	//props for Select breeds
	const propsSelectBeeds = {
		items: state.breedsName.map(el => el.name),
		selectValueBreeds: state.currentBreedForGallery,
		selectValueOrder: state.orderBreedSearch,
		selectValueType: state.typeBreedSearch,
		handleCurrentBreedForGallery: handleCurrentBreedForGallery,
		handleOrderBreedForSearch: handleOrderBreedForSearch,
		handleTypeBreedForSearch: handleTypeBreedForSearch,
		updateSearch:updateSearch
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

			{/* paginator */}
			<div className={back_button}><Paginator {...propsPaginator}/></div>

			{/* Control Panel */}
			<HeaderGallery propsSelectBeeds={propsSelectBeeds}/>

			{/* displaying images or error message or preloader*/}
			{(state.isLoading && <div className={preloader}><Placeholder/></div> ) 
				|| (state.isError && <div className={error}>Ooops! Something went wrong</div>) 
				|| (state.isLastPage && <div className={no_items}>No items found</div>)
				|| <GridItems items={petsImage} />
			}

		</div>
	)
}
export default GalleryBody;

GalleryBody.propsTypes = {
	setSearchBreeds: PropTypes.func,
	setNextPage: PropTypes.func,
	setPreviousPage: PropTypes.func,
	changeLimit: PropTypes.func,
	state: PropTypes.shape({
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
	})
}