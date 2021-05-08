import { BackButton, GridItems, ImagePet, Paginator } from '../../components';
import {wrapper, back_button, header_favorites, paginator, body} from './FavouritesBody.module.scss';

const FavouritesBody = ({state, changeLimit}) => {
	const propsPaginator = {
		changeLimit,
		selectValue: state.limit
	}
	const petsImage = state.favouritesPet.map(el=> <ImagePet imageUrl={el.image.url} key={el.user_id}/>)
	return (
		<div className={wrapper}>
			<div className={header_favorites}>
				<div className={back_button}><BackButton name='favourites'/></div>
				<div className={paginator}><Paginator {...propsPaginator}/></div>
			</div>
			
			<GridItems items={petsImage}/>
	</div>
	)
}
export default FavouritesBody;