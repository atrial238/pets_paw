import {grid} from './GridItems.module.scss';

const GridItems = ({items}) => {
	return (
		<div className={grid}>
				{items}
			</div>
	)
}
export default GridItems;