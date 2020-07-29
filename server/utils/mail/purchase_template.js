const purchase = (data) => {
    const getItems = () => {
        let template;
        data.product.forEach((item) => {
            template += `<h3>${item.brand} ${item.name}</h3>
    		<p>Price paid: ${item.price}</p>
    		<p>Purchase order: ${item.poder}</p>`;
        });
        return template;
    };
    return `${getItems()}`;
};

module.exports = { purchase };
