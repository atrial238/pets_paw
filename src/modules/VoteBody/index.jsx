import PropTypes from 'prop-types';

import { ActionLog, BackButton, GridItems,
	 ImagePet, Paginator, Placeholder } from '../../components';
import {wrapper, back_button, header_favorites, 
	paginator, preloader, error, remove, active_remove} from './VoteBody.module.scss';

const VoteBody = ({state, changeLimit, setNextPage, setPreviousPage, removeFavourite, getTime, typeVote}) => {

	const propsPaginator = {
		changeLimit,
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
			removeFavourite={removeFavourite} 
			typeVote={typeVote}
		/>
	));

	return (
		<div className={wrapper}>
			<div className={header_favorites}>
				<div className={back_button}><BackButton name={typeVote}/></div>
				<div className={paginator}><Paginator {...propsPaginator}/></div>
			</div>
			{(state.isLoading && <div className={preloader}><Placeholder/></div> ) 
				|| (state.isError && <div className={error}>Ooops! Something went wrong</div>) 
				|| <GridItems items={petsImage} />}
			<div className={remove + ' ' + (state.removeSuccess && active_remove)}>
				{state.removeSuccess && <ActionLog time={getTime()} content='was removed from Favourites' id={state.removedFavId}/>}
			</div>
	</div>
	)
}
export default VoteBody;

VoteBody.propTypes = {
	changeLimit: PropTypes.func,
	setNextPage: PropTypes.func,
	setPreviousPage: PropTypes.func,
	removeFavourite: PropTypes.func,
	getTime: PropTypes.func,
	typeVote: PropTypes.string,
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