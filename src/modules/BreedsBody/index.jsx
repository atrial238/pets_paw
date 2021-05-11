import React from 'react';
import {  BackButton, GridItems, ImagePet, Paginator} from "../../components";
import { wrapper, back_button, header_breeds, } from './Breeds.module.scss';

const BreedsBody = ({setSearchBreeds, setNextPage, setPreviousPage, changeLimit, state}) => {
	
	const propsPaginator = {
			changeLimit,
			selectValue: state.limit,
			setNextPage,
			setPreviousPage,
			page: state.page,
			isLastPage: state.isLastPage,
			isLoading: state.isLoading,
			items: state.items
	}
	
	const petsImage = state.petImages.map(pet => (
		<React.Fragment key={pet.id}>
			<ImagePet 
				imageUrl={pet.image.url} 
				id={pet.id} 
				handleImageEvent={setSearchBreeds} 
				value={2}
				nameBreed={pet.name}
			/>
		</React.Fragment>
	));

	return (
		<div className={wrapper}>
			<div className={header_breeds}>
				<div className={back_button}><BackButton name='breeds'/></div>
				<div><Paginator {...propsPaginator}/></div>
			</div> 
			<GridItems items={petsImage}/>
		</div>
	)
}
export default BreedsBody;

