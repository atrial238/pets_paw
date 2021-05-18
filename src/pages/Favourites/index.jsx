import { BodyContainter, NavPanel } from "../../components";
import { MyVotesBody, Header } from "../../modules";
import {wrapper} from './Favourites.mosule.scss';
import {favouritesAPI} from '../../API/api';
import { useBusinessLayerMyVoting } from '../../hooks/useBusinessLayerMyVoting';
import useMobileMenu from "../../hooks/useMobileMenuOpen";


const Favourites = () => {
	
	//return state and all necessary function needed to manage that state 
	const propsFavoritesBody = useBusinessLayerMyVoting(favouritesAPI.getMyFavourites, favouritesAPI.removeFavourite)
	
	//return isMobileMenuOpen and setMobileMenuOpen
	const propsForMangeMobielMenu = useMobileMenu();

	return (
		<div className='wrapper_page'>
			<Header {...propsForMangeMobielMenu}/>
			<div className={wrapper}>
				<NavPanel nameBackButton='favourite' propsForMangeMobielMenu={propsForMangeMobielMenu}/>
				<BodyContainter>
					<MyVotesBody {...propsFavoritesBody}/>
				</BodyContainter>
			</div>
		</div>
	)
}
export default Favourites;