import { BodyContainter, SearchPanel } from "../../components";
import { Header, VotingBody } from "../../modules";
import {wrapper} from './Voting.module.scss';

const Voting = () => {
	return (
		<div className='wrapper_page'>
			<Header/>
			<div className={wrapper}>
				<SearchPanel/>
				<BodyContainter>
					<VotingBody/>
				</BodyContainter>
			</div>
		</div>
	)
}
export default Voting;