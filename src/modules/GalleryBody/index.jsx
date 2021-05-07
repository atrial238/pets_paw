import { BackButton, UploadButton } from "../../components"
import { wrapper, back_button} from './GalleryBody.module.scss';

const GalleryBody = () => {
	return (
		<div className={wrapper}>
			<div className={back_button}>
				<BackButton name='voting'/> 
				<UploadButton/>
			 </div>
		</div>
	)
}
export default GalleryBody;
