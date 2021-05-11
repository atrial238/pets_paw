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
	console.log(state)
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
		<React.Fragment key={pet.id}>
			{state.isSearchByBreed && pet.breeds 
			? getImagePet(pet.url, pet.breeds[0].id, null, pet.breeds[0].name) 
			: !state.isSearchByBreed && pet.image && getImagePet(pet.image.url, pet.id, setSearchBreeds, pet.name)}
		</React.Fragment>
	));

	return (
		<div className={wrapper}>
			<div className={header_breeds}>
				<div className={back_button}><BackButton name='breeds'/></div>
				<div><Select background='dark' items={state.breedsName.map(el => el.name)} selectValue={state.currentBreed} handleChange={setSearchBreeds}></Select></div>
				<div><Paginator {...propsPaginator}/></div>
			</div> 
			<GridItems items={petsImage}/>
		</div>
	)
}
export default BreedsBody;

