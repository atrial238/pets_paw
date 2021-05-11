import { BodyContainter, SearchPanel } from "../../components";
import { MyVotesBody, Header } from "../../modules";
import {votingAPI} from '../../API/api';
import { useLogicHandleMyVoting } from '../../hooks/useLogicHandleMyVoting';

const LikesAndDislikes = () => {
	
	const propsFavoritesBody = useLogicHandleMyVoting(votingAPI.getMyVotes, votingAPI.removeVote, true)
	
	return (
		<div className='wrapper_page'>
			<Header/>
			<div>
				<SearchPanel/>
				<BodyContainter>
					<MyVotesBody {...propsFavoritesBody} typeVote='Likes and Dislikes'/>
				</BodyContainter>
			</div>
		</div>
	)
}
export default LikesAndDislikes;