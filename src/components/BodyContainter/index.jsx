import useHeightNavPanel from '../../hooks/useHeightNavPanel';
import {wrapper} from './BodyContainter.module.scss';

const BodyContainter = ({children}) => {

	//needed to add margin-top only on mobile resolution 
	const heightNavPanel = useHeightNavPanel();

	return <div className={wrapper} style={{marginTop: `${heightNavPanel}px`}}>{children}</div>
};

export default BodyContainter;