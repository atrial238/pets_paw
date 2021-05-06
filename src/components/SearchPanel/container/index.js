import { withFormik } from 'formik';
import SearchPanel from '../components/SearchPanel';

 export default SearchPanel;

//  withFormik({

//    validate: values => {
//      const errors = {};
//  console.log(values)
//      if (!values.name) {
//        errors.name = 'Required';
//      }
 
//      return errors;
//    },
 
//    handleSubmit: (values, { setSubmitting }) => {
// 		console.log(1)
//      setTimeout(() => {
//        alert(JSON.stringify(values, null, 2));
//        setSubmitting(false);
//      }, 1000);
//    },
 
//    displayName: 'SearchForm',
//  })(SearchPanel);