import { BodyContainter, NavPanel } from "../../components";
import { MyVotesBody, Header } from "../../modules";
import {votingAPI} from '../../API/api';
import { useBusinessLayerMyVoting } from '../../hooks/useBusinessLayerMyVoting';

const LikesAndDislikes = () => {
	
	const propsFavoritesBody = useBusinessLayerMyVoting(votingAPI.getMyVotes, votingAPI.removeVote, true)
	
	return (
		<div className='wrapper_page'>
			<Header/>
			<div>
				<NavPanel nameBackButton='likes and dislikes'/>
				<BodyContainter>
					<MyVotesBody {...propsFavoritesBody} typeVote='Likes and Dislikes'/>
				</BodyContainter>
			</div>
		</div>
	)
}
export default LikesAndDislikes;