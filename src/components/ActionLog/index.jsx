import PropTypes from 'prop-types';

import { Dislikes, Favourites, Likes } from '../Svg';
import {wrapper, time_style, text, icon_style_favourites, 
	icon_style_likes, icon_style_dislikes, wrapper_text} from './ActionLog.module.scss';

const ActionLog = ({time, id, typeEvent, content='was added to'}) => {
	let Icon;
	let icon_style;

	switch(typeEvent){
		case 'Favourite':
			Icon = <Favourites/>;
			icon_style = icon_style_favourites;
			break;
		case 'Likes':
			Icon = <Likes/>
			icon_style = icon_style_likes;
			break;
		case 'Dislikes':
			Icon = <Dislikes/>
			icon_style = icon_style_dislikes;
			break;
		default:
			Icon = '';
	}

	return (
		<div className={wrapper}>
			<div className={wrapper_text}>
				<div className={time_style}>{time}</div>
				<div className={text}>Image ID: <span>{id}</span> {content} {typeEvent}</div>
			</div>
			<div className={icon_style}>{Icon}</div>
		</div>
	)
}
export default ActionLog;

ActionLog.propTypes = {
	id: PropTypes.string,
	typeEvent: PropTypes.string,
	time: PropTypes.string,
	content: PropTypes.string,
}