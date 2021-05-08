import { BackButton, GridItems, UploadButton } from "../../components"
import { wrapper, back_button} from './GalleryBody.module.scss';
import HeaderGallery from "./HeaderGallery/HeaderGallery";

const GalleryBody = () => {
	return (
		<div className={wrapper}>
			<div className={back_button}>
				<BackButton name='gallery'/> 
				<UploadButton/>
			 </div>
			 <HeaderGallery/>
			 <GridItems/>
		</div>
	)
}
export default GalleryBody;
