import PropTypes from 'prop-types';
import {select_light, select_dark} from './Select.module.scss';


const Select = ({name, background, items}) => {
	let select;
	switch(background){
		case 'light':
			select = select_light;
			break;
		case 'dark':
			select = select_dark;
			break;
		default:
			select = '';
	}
	const option = [<option value="">{name}</option>, ...items.map(el => <option value={el}>{el}</option>)]

	return <select name="pets" id="pet-select" className={select} >{option}</select>
}
export default Select;

Select.propTypes = {
	name: PropTypes.string,
	background: PropTypes.string,
	items: PropTypes.array
}