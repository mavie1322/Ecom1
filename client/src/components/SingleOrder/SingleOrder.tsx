import React, { useState } from "react";
import { useParams } from "react-router-dom";
import ProfileAccount from "../../containers/ProfileAccount";
import { useAppSelector } from "../../hooks/hooks";
import { BasketItem } from "../../models";
import "./singleOrder.css";

const SingleOrder = () => {
  const { id } = useParams();
  const items = useAppSelector((state) => state.items.itemsList);
  const orders = useAppSelector((state) => state.orders.purchases);
  const order = orders.find((singleOrder) => singleOrder._id === id);

  const dateArray: string[] = order!.createdAt
    .substring(0, 10)
    .replaceAll("-", "/")
    .split("/")
    .reverse();
  const date = dateArray.join("/");
  console.log("order >>>>", order);
  console.log("items", items);
  return (
    <div className='profile section__margin'>
      <ProfileAccount />
      <div className='profile__summary singleOrder'>
        <section className='singleOrder__header'>
          <h1>ORDER DETAILS</h1>
          <span>
            <div>
              <h4>Order</h4>
              <p>{order?._id}</p>
            </div>
            <div>
              <h4>Order date</h4>
              <p>{date}</p>
            </div>
          </span>
        </section>
        <main className='singleOrder__main'>
          <section>
            <h1>ORDER SUMMARY</h1>
            <div>
              {order?.products.map((product) => {
                const productDetails = items.find(
                  (item) => item._id === product.item
                );
                return (
                  <div className='singleOrder__main-container'>
                    <img
                      src={productDetails?.img_url}
                      alt={productDetails?.item_name}
                    />
                    <div>
                      <span className='singleOrder__main-header'>
                        <p>{productDetails?.item_name}</p>
                        <p>£{(productDetails!.price / 100).toFixed(2)}</p>
                      </span>
                      <span>
                        <span className='singleOrder__main-details'>
                          <p>Category:</p>
                          <p>{productDetails?.category_name}</p>
                        </span>
                        <span className='singleOrder__main-details'>
                          <p className='singleOrder__qty'>Quantity:</p>
                          <p>{product.qty}</p>
                        </span>
                        <span className='singleOrder__main-details'>
                          <p className='singleOrder__total'>Total:</p>
                          <p>
                            £
                            {(
                              (product.qty * productDetails!.price) /
                              100
                            ).toFixed(2)}
                          </p>
                        </span>
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <span>
                <h4>Delivery address</h4>
                <span>
                  <p>{`${order?.shipping.first_name} ${order?.shipping.flat_number}`}</p>
                  <p>{order?.shipping.street_address}</p>
                  <p>{order?.shipping.flat_number}</p>
                  <p>{`${order?.shipping.postcode} ${order?.shipping.city}`}</p>
                  <p>{order?.shipping.country}</p>
                </span>
                <h4>Payment method</h4>
                <p>VISA</p>
                <p>**** **** **** 4242</p>
              </span>
            </div>
          </section>
          <section></section>
        </main>
      </div>
    </div>
  );
};

export default SingleOrder;
