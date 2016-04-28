import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import createReducer from './createReducer';
import * as successReducers from './successReducers';
import * as categoriesAction from 'actions/faq/categories';
import * as questionsAction from 'actions/faq/questions';
import * as profileAction from 'actions/user/profile';
import * as loginAction from 'actions/user/login';
import * as passwordAction from 'actions/user/password';
import * as portalAction from 'actions/home/portal';
import * as productAction from 'actions/home/product';


const rootReducer = combineReducers({
  form: formReducer,
  categories: createReducer(categoriesAction.name),
  questions: createReducer(questionsAction.name),
  profile: createReducer(profileAction.name),
  login: createReducer(loginAction.name),
  password: createReducer(passwordAction.name),
  portal: createReducer(portalAction.name),
  product: createReducer(productAction.name, successReducers.productSuccessReducer),
});

export default rootReducer;
