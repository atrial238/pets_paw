import { BodyContainter, SearchPanel } from "../../components";
import { FavouritesBody, Header } from "../../modules";
import {wrapper} from './Favourites.mosule.scss';

const Favourites = () => {
	return (
		<div className='wrapper_page'>
			<Header/>
			<div className={wrapper}>
				<SearchPanel/>
				<BodyContainter>
					<FavouritesBody/>
				</BodyContainter>
			</div>
		</div>
	)
}
export default Favourites;