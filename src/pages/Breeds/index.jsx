import { BodyContainter, SearchPanel } from "../../components";
import { BreedsBody, Header } from "../../modules";
import {wrapper} from './Breeds.module.scss';

const Breeds = () => {
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