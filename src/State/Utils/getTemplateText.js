import _ from 'lodash';

export const getTemplateText = (actualParams, negotiationParams) => {
  const changedParamsArr = getChangedParams(actualParams, negotiationParams);
  const formatText = getFormatText(getFormatType(changedParamsArr));
  _.templateSettings.interpolate = /%([\s\S]+?)%/g;
  var compiled = _.template(formatText);
  let filledText = compiled(negotiationParams);
  console.log('checkMe', filledText);
  console.log('compiled', compiled);
  return filledText;
};

export const getChangedParams = (actualParams, negotiationParams) => {
  let changedParams = [];

  Object.entries(negotiationParams).forEach(([key, value]) => {
    if (actualParams[`${key}`] !== value) {
      changedParams.push(key);
    }
  });
  console.log('changedParams', changedParams);
  return changedParams;
};

export const getFormatType = params => {
  let typesSet = new Set();
  let shortTags = {
    price: 'price',
    priceUnit: 'price',
    quantity: 'qty',
    quantityUnit: 'qty',
    payment: 'pay',
    delivery: 'del'
  };
  params.map(t => {
    typesSet.add(shortTags[`${t}`]);
  });
  let formatTypeStr = Array.from(typesSet).join('_');
  console.log('formatType', formatTypeStr);
  return formatTypeStr;
};

export const getFormatText = type => {
  let formatTextList = {
    price: 'negotiated for price Rs %price%',
    qty: 'negotiated qty %quantity% %quantityUnit%',
    pay: 'negotiated payment term of %payment%',
    del: 'negotiated delivery term of %delivery%',
    price_qty: 'negotiated qty %quantity% %quantityUnit% for price Rs %price%',
    price_pay: 'negotiated price Rs %price% and payment term of %payment%',
    price_del: 'negotiated price Rs %price% and delivery term of %delivery%',
    price_qty_pay:
      'negotiated qty %quantity% %quantityUnit% for price Rs %price% and payment term of %payment%',
    price_qty_del:
      'negotiated qty %quantity% %quantityUnit% for price Rs %price% and delivery term of %delivery%',
    price_pay_del:
      'negotiated price Rs %price%, payment term of %payment% and delivery term of %delivery%',
    price_qty_pay_del:
      'negotiated qty %quantity% %quantityUnit% for price Rs %price%, payment term of %payment% and delivery term of %delivery%',
    qty_pay:
      'negotiated qty %quantity% %quantityUnit% and payment term of %payment%',
    qty_del:
      'negotiated qty %quantity% %quantityUnit% and delivery term of %delivery%',
    qty_pay_del:
      'negotiated qty %quantity% %quantityUnit%, payment term of %payment% and delivery term of %delivery%',
    pay_del:
      'negotiated payment term of %payment% and delivery term of %delivery%'
  };

  return formatTextList[`${type}`];
};
