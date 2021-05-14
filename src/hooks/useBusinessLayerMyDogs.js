import {useReducer, useEffect} from 'react';
import { imageAPI } from '../API/api';
import placeholder from '../assets/images/uploadImagas/placeholder.png';

export const useBusinessLayerMyDogs = () => {

	const initState = {
		page: 0,
		myPetsImages: [],
		limit: 'Limit: 5',
		isLastPage: false,
		isLoading: false,
		isError: false,
		items: ['Limit: 5', 'Limit: 10', 'Limit: 15', 'Limit: 20'],
		removedPetId: '',
		removeSuccess: false,
		isUploadModalOpen: false,
		tempoPathUploadPicture: placeholder,
		imageForUpload: '',
		nameUploadImage: 'no file selected',
		isUploadingSuccess: false
	}

	const reducer = (state = initState, {type, body}) =>  {
		switch(type){
			case 'NEXT_PAGE':
				return {...state, page: ++state.page};
			case 'PREVIOUS_PAGE':
				return {...state, page: --state.page};
			case 'SET_PAGE_ZERO':
				return {...state, page: 0};
			case 'SET_LIMIT':
				return {...state, limit: body};
			case 'SET_MY_PETS_IMAGES':
				return {...state, myPetsImages: body};
			case 'SET_LAST_PAGE':
				return {...state, isLastPage: body};
			case 'SET_IS_LOADING':
				return {...state, isLoading: body};
			case 'SET_IS_ERROR':
				return {...state, isError: body};
			case 'SET_REMOVE_SUCCESS':
				return {...state, removeSuccess: body};
			case 'SET_REMOVED_PET_ID':
				return {...state, removedPetId: body};
			case 'SET_IS_UPLOAD_MODAL_OPEN':
				return {...state, isUploadModalOpen: body};
			case 'SET_TEMPO_PATH_UPLOAD_PICTURE':
				return {...state, tempoPathUploadPicture: body};
			case 'RESET_TEMPO_PATH_UPLOAD_PICTURE':
				return {...state, tempoPathUploadPicture: placeholder};
			case 'SET_IMAGE_FOR_UPLOAD':
				return {...state, imageForUpload: body};
			case 'SET_NAME_UPLOAD_IMAGE':
				return {...state, nameUploadImage: body};
			case 'SET_IS_UPLOADING_SUCCESS':
				return {...state, isUploadingSuccess: body};
			default:
				return state;
		}
	}

	const [state, dispatch] = useReducer(reducer, initState)

	
//initialize my favourites, likes or dislikes pet, handle error, set preloader
	useEffect(() => {

		const limit = +state.limit.match(/.{1,2}$/g)[0];
		dispatch({type: 'SET_IS_LOADING', body: true});
		dispatch({type: 'SET_IS_ERROR', body: false})
		imageAPI.getMyImages(limit, state.page)
			.then(res => {
				if(res.length === 0){
					dispatch({type: 'SET_LAST_PAGE', body: true});
					dispatch({type: 'SET_IS_LOADING', body: false});
				}else if(res === 'error'){
					dispatch({type: 'SET_IS_LOADING', body: false});
					dispatch({type: 'SET_IS_ERROR', body: true});
				}else{
					dispatch({type: 'SET_MY_PETS_IMAGES', body: res});
					dispatch({type: 'SET_LAST_PAGE', body: false});
					dispatch({type: 'SET_IS_LOADING', body: false});
					dispatch({type: 'SET_IS_ERROR', body: false});
				}
			})
			console.log(state)
	}, [state.page, state.limit, state.isUploadingSuccess]);

//functions for manage pagination
	const setNextPage = () => dispatch({type: 'NEXT_PAGE'});
	const setPreviousPage = () => dispatch({type: 'PREVIOUS_PAGE'});
	const changeLimit = (event) => {
		dispatch({type: 'SET_PAGE_ZERO'})
		dispatch({type: 'SET_LIMIT', body: event.target.value})
	};
	
//upload images
	const handleUploadImages = (file) => {
		dispatch({type: 'SET_IS_LOADING', body: true});
		dispatch({type: 'SET_IS_ERROR', body: false});
		dispatch({type: 'SET_IS_UPLOADING_SUCCESS', body: false});
		imageAPI.uploadImages(file)
			.then(res =>{
				if(res === 'error') {
					console.log('error')
					dispatch({type: 'SET_IS_LOADING', body: false});
					dispatch({type: 'SET_IS_ERROR', body: true})
					dispatch({type: 'SET_UPLOAD_SUCCESS', body: false})
				}else{
					console.log(res)
					dispatch({type: 'SET_UPLOAD_SUCCESS', body: true})
					dispatch({type: 'SET_IS_LOADING', body: false});
					dispatch({type: 'SET_IS_ERROR', body: false});
					dispatch({type: 'SET_IMAGE_FOR_UPLOAD', body: ''});
					dispatch({type: 'SET_IS_UPLOADING_SUCCESS', body: true})
				}
			})
	}
//delete images

//update path image which user select by drag and drop interface
	const updateTempoPathImage = (path) => dispatch({type: 'SET_TEMPO_PATH_UPLOAD_PICTURE', body: path});

//save image which user select in store
	const saveUploadImage = (file) => dispatch({type: 'SET_IMAGE_FOR_UPLOAD', body: file});

//save name of image which will be upload in store
	const saveNameUploadImage = (name) => dispatch({type: 'SET_NAME_UPLOAD_IMAGE', body: name});

//open and close modal window
	const handleModalWidow = (isOpen) => dispatch({type: 'SET_IS_UPLOAD_MODAL_OPEN', body: isOpen});
	return {
		changeLimit,
		state,
		setNextPage,
		setPreviousPage,
		handleUploadImages,
		handleModalWidow,
		updateTempoPathImage,
		saveUploadImage,
		saveNameUploadImage
	
	}
}
export default useBusinessLayerMyDogs;