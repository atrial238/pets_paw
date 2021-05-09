import { BodyContainter, SearchPanel } from "../../components";
import { VoteBody, Header } from "../../modules";
import {wrapper} from './Favourites.mosule.scss';
import {favouritesAPI} from '../../API/api';
import { useLogicHandleMyVoting } from '../../hooks/useLogicHandleMyVoting';


const Favourites = () => {
	
	const propsFavoritesBody = useLogicHandleMyVoting(favouritesAPI.getMyFavourites, favouritesAPI.removeFavourite)
	
	return (
		<div className='wrapper_page'>
			<Header/>
			<div className={wrapper}>
				<SearchPanel/>
				<BodyContainter>
					<VoteBody {...propsFavoritesBody} typeVote='Favourite'/>
				</BodyContainter>
			</div>
		</div>
	)
}
export default Favourites;