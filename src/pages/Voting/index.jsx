import { SearchPanel } from "../../components";
import { Header } from "../../modules";
import {wrapper} from './Voting.module.scss';

const Voting = () => {
	return (
		<div className='wrapper_page'>
			<Header/>
			<div>
				<SearchPanel/>
			</div>
		</div>
	)
}
export default Voting;