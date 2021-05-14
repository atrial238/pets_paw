import { BodyContainter, NavPanel } from "../../components";
import { MyVotesBody, Header } from "../../modules";
import {wrapper} from './Favourites.mosule.scss';
import {favouritesAPI} from '../../API/api';
import { useBusinessLayerMyVoting } from '../../hooks/useBusinessLayerMyVoting';


const Favourites = () => {
	
	const propsFavoritesBody = useBusinessLayerMyVoting(favouritesAPI.getMyFavourites, favouritesAPI.removeFavourite)
	
	return (
		<div className='wrapper_page'>
			<Header/>
			<div className={wrapper}>
				<NavPanel nameBackButton='favourite'/>
				<BodyContainter>
					<MyVotesBody {...propsFavoritesBody}/>
				</BodyContainter>
			</div>
		</div>
	)
}
export default Favourites;