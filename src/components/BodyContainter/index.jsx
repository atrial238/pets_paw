import {wrapper} from './BodyContainter.module.scss';

const BodyContainter = ({children}) => <div className={wrapper}>{children}</div>;

export default BodyContainter;