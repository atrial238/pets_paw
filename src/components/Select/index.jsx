import PropTypes from 'prop-types';

import {select_light, select_dark} from './Select.module.scss';

const Select = ({background, items, selectValue, handleChange}) => {

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
	const option = items.map((el, index)=> <option key={index} value={el}>{el}</option>)

	return <select value={selectValue} className={select} onChange={handleChange}>{option}</select>
}
export default Select;

Select.propTypes = {
	background: PropTypes.string,
	items: PropTypes.array,
	selectValue: PropTypes.string,
	changeLimit: PropTypes.func
}