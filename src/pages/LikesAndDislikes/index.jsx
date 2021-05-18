import { BodyContainter, NavPanel } from "../../components";
import { MyVotesBody, Header } from "../../modules";
import {votingAPI} from '../../API/api';
import { useBusinessLayerMyVoting } from '../../hooks/useBusinessLayerMyVoting';
import useMobileMenu from "../../hooks/useMobileMenuOpen";

const LikesAndDislikes = () => {

	//return state and all necessary function needed to manage that state 
	const propsFavoritesBody = useBusinessLayerMyVoting(votingAPI.getMyVotes, votingAPI.removeVote, true)
	
	//return isMobileMenuOpen and setMobileMenuOpen
	const propsForMangeMobielMenu = useMobileMenu();

	return (
		<div className='wrapper_page'>
			<Header {...propsForMangeMobielMenu}/>
			<div>
				<NavPanel nameBackButton='Votes' propsForMangeMobielMenu={propsForMangeMobielMenu}/>
				<BodyContainter>
					<MyVotesBody {...propsFavoritesBody} typeVote='Likes and Dislikes'/>
				</BodyContainter>
			</div>
		</div>
	)
}
export default LikesAndDislikes;