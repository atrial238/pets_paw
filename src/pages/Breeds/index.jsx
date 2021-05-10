import { breedsAPI } from "../../API/api";
import { BodyContainter, SearchPanel } from "../../components";
import { useLogicHandleMyVoting } from "../../hooks/useLogicHandleMyVoting";
import { BreedsBody, Header } from "../../modules";
import {wrapper} from './Breeds.module.scss';

const Breeds = () => { 

	// const propsBreedsBody =
	return (
		<div className='wrapper_page'>
			<Header/>
			<div className={wrapper}>
				<SearchPanel/>
				<BodyContainter>
					<BreedsBody/>
				</BodyContainter>
			</div>
		</div>
	)
}
export default Breeds;