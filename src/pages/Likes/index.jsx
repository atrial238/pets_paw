import { BodyContainter, SearchPanel } from "../../components";
import { VoteBody, Header } from "../../modules";
import {votingAPI} from '../../API/api';
import { useLogicHandleMyVoting } from '../../hooks/useLogicHandleMyVoting';

const Likes = () => {
	
	const propsFavoritesBody = useLogicHandleMyVoting(votingAPI.getMyVotes, votingAPI.removeVote, true)
	
	return (
		<div className='wrapper_page'>
			<Header/>
			<div>
				<SearchPanel/>
				<BodyContainter>
					<VoteBody {...propsFavoritesBody}/>
				</BodyContainter>
			</div>
		</div>
	)
}
export default Likes;