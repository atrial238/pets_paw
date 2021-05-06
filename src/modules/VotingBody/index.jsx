import { BackButton } from "../../components"
import {img_voting_dog, wrapper, voting, likes, favourites, dislikes} from './VotinBody.module.scss';
import dog from '../../assets/images/temporary/1.jpg';

const VotingBody = () => {
	return (
		<div className={wrapper}>
			<BackButton name='voting'/>
			<div className={img_voting_dog}>
				<img src={dog} alt='voting dog'/>
				<div className={voting}>
					<button className={likes}></button>
					<button className={favourites}></button>
					<button className={dislikes}></button>
				</div>
			</div>
		</div>
	)
}
export default VotingBody;