import PropTypes from 'prop-types';
import React from 'react';
import {  BackButton, GridItems, ImagePet, Paginator, Select} from "../../components";
import { wrapper, back_button, header_breeds, } from './Breeds.module.scss';

const BreedsBody = ({setSearchBreeds, setNextPage, setPreviousPage, changeLimit, state}) => {
	
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

	const getImagePet = (imagePet, id, handleImageEvent, nameBreed) => {
		return (
			<ImagePet 
				imageUrl={imagePet} 
				id={id} 
				handleImageEvent={handleImageEvent} 
				value={2}
				nameBreed={nameBreed}
			/>
		)
	}
	const petsImage = state.petImages.map(pet => (
		<React.Fragment key={pet.id}>{
				state.isSearchByBreed && pet.breeds 
					? getImagePet(pet.url, pet.breeds[0].id, null, pet.breeds[0].name) 
					: !state.isSearchByBreed && pet.image && getImagePet(pet.image.url, pet.id, setSearchBreeds, pet.name)
		}</React.Fragment>
	));

//props for Select 
	const propsSelect = {
		background:'dark',
		items: state.breedsName.map(el => el.name) ,
		selectValue: state.currentBreed ,
		handleChange: setSearchBreeds
	}

	return (
		<div className={wrapper}>
			<div className={header_breeds}>
				<div className={back_button}><BackButton name='breeds'/></div>
				<div><Select {...propsSelect} ></Select></div>
				<div><Paginator {...propsPaginator}/></div>
			</div> 
			<GridItems items={petsImage}/>
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