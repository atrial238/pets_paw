import { Upload } from "../Svg";
import {wrapper} from './UploadButton.module.scss';

const UploadButton = () => {
	return (
		<button className={wrapper}>
			<span><Upload /></span>
			<span>Upload</span>
		</button>
	)
}
export default UploadButton;