export const getTrend = (rateCards, productID, price, user) => {
  const productRateCards = rateCards
    .filtered('rates.product.productID == $0 AND senderID == $1 ', productID, user._id)
    .sorted('createdAt', false);
  let trend;
  if (productRateCards.length > 0) {
    const lastRateCard = productRateCards[productRateCards.length - 1];
    console.log('lastRateCard', lastRateCard);
    let previousPrice;
    lastRateCard.rates.map((rate) => {
      if (rate.product.productID === productID) {
        previousPrice = rate.price;
      }
    });
    console.log('price', price);
    console.log('previousPrice', previousPrice);
    // const previousPrice = lastRateCard.rates.product.productID;
    if (price - previousPrice > 0) {
      return (trend = 1);
    } else if (price === previousPrice) {
      return (trend = 0);
    }
    return (trend = -1);
  }
  return (trend = 0);
};
