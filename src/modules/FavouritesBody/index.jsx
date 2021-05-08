import { BackButton, GridItems, Paginator } from '../../components';
import {wrapper, back_button, header_favorites, paginator, body} from './FavouritesBody.module.scss';

const FavouritesBody = () => {
	return (
		<div className={wrapper}>
			<div className={header_favorites}>
				<div className={back_button}><BackButton name='favourites'/></div>
				<div className={paginator}><Paginator/></div>
			</div>
			
			<GridItems/>
	</div>
	)
}
export default FavouritesBody;