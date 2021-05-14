import PropTypes from 'prop-types';

import { ActionLog, BackButton, GridItems,
	 ImagePet, Paginator, Placeholder } from '../../components';
import {wrapper, back_button, header_favorites, no_items, 
	paginator, preloader, error, remove, active_remove} from './VoteBody.module.scss';

const MyVotesBody = ({state, changeLimit, setNextPage, setPreviousPage, handleImageEvent, getTime}) => {

	const propsPaginator = {
		handleChange: changeLimit,
		selectValue: state.limit,
		setNextPage,
		setPreviousPage,
		page: state.page,
		isLastPage: state.isLastPage,
		isLoading: state.isLoading,
		items: state.items
	};

	const petsImage = state.favouritesPet.map(pet => (
		<ImagePet 
			imageUrl={pet.image.url} 
			key={pet.image.id} 
			id={pet.id} 
			handleImageEvent={handleImageEvent} 
			value={pet.value}
		/>
	));

	return (
		<div className={wrapper}>

			{/* header */}
			<div className={header_favorites}>
				<div className={paginator}><Paginator {...propsPaginator}/></div>
			</div>

			{/* main content */}
			{(state.isLoading && <div className={preloader}><Placeholder/></div> ) 
				|| (state.isError && <div className={error}>Ooops! Something went wrong</div>) 
				|| (state.isLastPage && <div className={no_items}>No item found</div>)
				|| <GridItems items={petsImage} />}
			
			{/* show message when image was removed from famourites, likes, dislikes */}
			<div className={remove + ' ' + (state.removeSuccess && active_remove)}>
				{state.removeSuccess && <ActionLog time={getTime()} content='was removed from Favourites' id={state.removedFavId}/>}
			</div>
	</div>
	)
}
export default MyVotesBody;

MyVotesBody.propTypes = {
	changeLimit: PropTypes.func,
	setNextPage: PropTypes.func,
	setPreviousPage: PropTypes.func,
	handleImageEvent: PropTypes.func,
	getTime: PropTypes.func,
	state: {
		page: PropTypes.number,
		favouritesPet: PropTypes.array,
		limit: PropTypes.string,
		isLastPage: PropTypes.bool,
		isLoading: PropTypes.bool,
		isError: PropTypes.bool,
		removeSuccess: PropTypes.bool,
		removedFavId: PropTypes.string,
		items: PropTypes.array
	}
}