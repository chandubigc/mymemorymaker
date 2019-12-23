/* eslint-disable arrow-parens */
import NavigationService from './NavigationService';
import queryString from 'query-string';

import Api from '../Middlewares/Api';

export const navigateLinkToScreen = async url => {

    NavigationService.navigate('Home');
  
};
