import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import ProfileAccount from "../../containers/ProfileAccount";
import { useAppSelector } from "../../hooks/hooks";
import { BasketItem } from "../../models";
import "./singleOrder.css";

const SingleOrder = () => {
  const { id } = useParams();
  const items = useAppSelector((state) => state.items.itemsList);
  const user = useAppSelector((state) => state.user.result);
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
                    <Link to={`/products/${productDetails?._id}`}>
                      <img
                        src={productDetails?.img_url}
                        alt={productDetails?.item_name}
                      />
                    </Link>
                    <div className='flex-start'>
                      <span className='singleOrder__main-header flex-start'>
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
            <div className='singleOrder__details flex-start'>
              <h4>Delivery address</h4>
              <div className='flex-start'>
                <p>{`${order?.shipping.first_name} ${order?.shipping.flat_number}`}</p>
                <p>{order?.shipping.street_address}</p>
                <p>{order?.shipping.flat_number}</p>
                <p>{`${order?.shipping.postcode} ${order?.shipping.city}`}</p>
                <p>{order?.shipping.country}</p>
              </div>
              <h4>Payment method</h4>
              <div>
                <p>VISA</p>
                <p>**** **** **** 4242</p>
              </div>
            </div>
          </section>
          <section className='singleOrder__cost'>
            <span>
              <p>Total:</p>
              <p>£{(order!.subtotal / 100).toFixed(2)}</p>
            </span>
            <span>
              <p>Delivery:</p>
              <p>£3.99</p>
            </span>
            <span>
              <p>Total:</p>
              <p>£{(order!.total / 100).toFixed(2)}</p>
            </span>
          </section>
          <section className='singleOrder__userDetails flex-start'>
            <span className='flex-start'>
              <h4>My Details</h4>
              <div className='flex-start'>
                <p>{`${user.first_name} ${user.last_name}`}</p>
                <p>{user.email}</p>
              </div>
            </span>
            <span className='flex-start'>
              <h4>Billing Address</h4>
              <div className='flex-start'>
                <p>{user.address.street_address}</p>
                <p>{user.address.flat_number}</p>
                <p>{`${user.address.postcode} ${user.address.city}`}</p>
                <p>{user.address.country}</p>
              </div>
            </span>
          </section>
        </main>
      </div>
    </div>
  );
};

export default SingleOrder;
