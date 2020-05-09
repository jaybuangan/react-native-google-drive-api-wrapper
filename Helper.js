import {
    StaticUtils,
    ArrayStringifier
 } from "simple-common-utils";
 
export const _stringifyQueryParams = (queryParams,
    prefix = "?", separator = "&", quoteIfString) => {
    const array = [];
    
    Object.keys(queryParams).forEach(key => array.push(
       `${key}=${StaticUtils.safeQuoteIfString(queryParams[key], quoteIfString)}`));
    
      // console.log('_stringifyQueryParams.array: ', array)
    return new ArrayStringifier(array)
       .setPrefix(prefix)
       .setSeparator(separator)
       .process();
 }