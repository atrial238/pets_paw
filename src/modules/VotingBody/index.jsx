import { BackButton } from "../../components"
import {img_voting_dog, wrapper, voting, likes, favourites, dislikes, active} from './VotinBody.module.scss';
import dog from '../../assets/images/temporary/1.jpg';
import { Dislikes, Favourites, Likes } from "../../components/Svg";

const VotingBody = () => {
	return (
		<div className={wrapper}>
			<BackButton name='voting'/>
			<div className={img_voting_dog}>
				<img src={dog} alt='voting dog'/>
				<div className={voting}> 
					<button className={likes}><Likes/></button>
					<button className={favourites }><Favourites/></button>
					<button className={dislikes}><Dislikes/></button>
				</div>
			</div>
		</div>
	)
}
export default VotingBody;