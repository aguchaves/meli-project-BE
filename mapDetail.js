const mapDetail = (responses) => {
  const item = responses[0].data;
  const amount = Math.trunc(item.price);
  const itemData = {
    author: {
      name: '',
      lastname: ''
    },
    item: {
      id: item.id,
      title: item.title,
      price: {
        currency: item.currency_id,
        amount,
        decimals: (item.price - amount)*100
      },
      picture: item.pictures[0].secure_url,
      condition: item.condition,
      free_shipping: item.shipping.free_shipping,
      sold_quantity: item.sold_quantity,
      description: responses[1].data.plain_text
    }
  }

  return itemData
}

module.exports = mapDetail;