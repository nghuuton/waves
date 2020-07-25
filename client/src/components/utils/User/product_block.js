import React from "react";

const UserProductBlock = ({ products, removeItem }) => {
    const renderCartImg = (images) => {
        if (images.length > 0) {
            return images[0].url;
        } else {
            return "/images/image_not_availble.png";
        }
    };

    const renderItems = () =>
        products.cartDetail
            ? products.cartDetail.map((item) => (
                  <div className="user_product_block" key={item._id}>
                      <div className="item">
                          <div
                              className="image"
                              style={{
                                  background: `url(${renderCartImg(
                                      item.images
                                  )}) no-repeat`,
                              }}
                          ></div>
                      </div>
                      <div className="item">
                          <h4>Product name</h4>
                          <div>
                              {item.brand.name} {item.name}
                          </div>
                      </div>
                      <div className="item">
                          <h4>Quantity</h4>
                          <div>{item.quantity}</div>
                      </div>
                      <div className="item">
                          <h4>Price</h4>
                          <div>${item.price}</div>
                      </div>
                      <div className="item btn">
                          <div
                              className="cart_remove_btn"
                              onClick={() => removeItem(item._id)}
                          >
                              Remove
                          </div>
                      </div>
                  </div>
              ))
            : null;

    return <div>{renderItems()}</div>;
};

export default UserProductBlock;
