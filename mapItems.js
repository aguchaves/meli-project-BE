const mapItems = (response) => {
  const categories = response.filters.reduce((accum, filter) => {
    filter.values.forEach(value => {
      accum.push(value.name);
    });
    return accum;
  }, []);

  const author = {
    name: '',
    lastname: ''
  }

  const items = response.results.map(item => {
    const amount = Math.trunc(item.price);
    
    return {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount,
        decimals: item.price - amount
      },
      picture: item.thumbnail,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      state: item.address.state_name,
    }
  })
  
  return {
    author,
    categories,
    items
  };
}
module.exports = mapItems;