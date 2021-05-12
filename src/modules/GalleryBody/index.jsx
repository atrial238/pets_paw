import React from "react";
import PropTypes from 'prop-types';

import { BackButton, GridItems, ImagePet, Paginator, Placeholder } from "../../components"
import { wrapper, back_button, preloader, error, no_items} from './GalleryBody.module.scss';
import HeaderGallery from "./HeaderGallery/HeaderGallery";

const GalleryBody = ({setSearchBreeds, setNextPage, setPreviousPage, changeLimit, state, handleImageInfo}) => {
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
	const petsImage = state.petImages.map((pet, index) => console.log(pet) || (
		<React.Fragment key={index}>{
			

				// state.isSearchByBreed && pet.breeds 
				// 	? getImagePet(pet.url, pet.breeds[0].id, handleImageInfo, pet.breeds[0].name, pet.id, 3)
				// 	: !state.isSearchByBreed && pet.image && getImagePet(pet.image.url, pet.id, setSearchBreeds, pet.name, null, 2)
				pet.breeds && getImagePet(pet.url, pet.breeds[0].id, handleImageInfo, pet.breeds[0].name, pet.id, 3)

		}</React.Fragment>
	));

//props for Select 
	const propsSelectBeeds = {
		background:'light',
		items: state.breedsName.map(el => el.name) ,
		selectValue: state.currentBreed ,
		handleChange: setSearchBreeds
	}
	return (
		<div className={wrapper}>
			<div className={back_button}>
				<BackButton name='gallery'/> 
				<Paginator {...propsPaginator}/>
			 </div>
			 <HeaderGallery propsSelectBeeds={propsSelectBeeds}/>
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