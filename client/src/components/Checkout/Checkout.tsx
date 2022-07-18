import { useContext, useState } from "react";
import { useAppSelector } from "../../hooks/hooks";
import "./checkout.css";
import { RiEdit2Line } from "react-icons/ri";
import { AiOutlineClose } from "react-icons/ai";
import BillingAddress from "./Address/BillingAddress";
import BasketCost from "../../containers/BasketCost";
import DeliveryAddress from "./Address/DeliveryAddress";
import AddressContainer from "../../containers/AddressContainer";
import { BasketContext } from "../../context/basket";
import { BasketContextType } from "../../models";

const Checkout = () => {
  const user = useAppSelector((state) => state.user.result);
  const [isEditingBillingAddress, setIsEditingBillingAddress] =
    useState<boolean>(false);
  const [isEditingDeliveryAddress, setIsEditingDeliveryAddress] =
    useState<boolean>(false);

  const handleEditBillingAddress = () => {
    setIsEditingBillingAddress(!isEditingBillingAddress);
  };

  const handleEditDeliveryAddress = () => {
    setIsEditingDeliveryAddress(!isEditingDeliveryAddress);
  };

  return (
    <div className='basket'>
      <div className='basket__title' id='checkout__title'>
        Checkout
      </div>
      <div className='basket__container'>
        <div className='checkout'>
          <div className='checkout__container primary__information'>
            <h3>My information</h3>
            <span className='primary__information-details'>
              <p>{`${user.first_name} ${user.last_name}`}</p>
              <p>{user.email}</p>
            </span>
          </div>
          {/* Billing Address */}
          <div className='checkout__container'>
            <span className='checkout__container__title'>
              <h3>Billing address</h3>
              {isEditingBillingAddress ? (
                <AiOutlineClose
                  onClick={() => handleEditBillingAddress()}
                  className='checkout__icons'
                />
              ) : (
                <RiEdit2Line
                  onClick={() => handleEditBillingAddress()}
                  className='checkout__icons'
                />
              )}
            </span>
            {isEditingBillingAddress || user.address.street_address === "" ? (
              <section className='checkout__container-billing'>
                {" "}
                <h4>Enter your billing address</h4>
                <span>
                  <p>Name</p>
                  <p>{`${user.first_name} ${user.last_name}`}</p>
                </span>
                <BillingAddress
                  isEditing={isEditingBillingAddress}
                  setIsEditing={setIsEditingBillingAddress}
                />
              </section>
            ) : (
              <section className='checkout__container-address'>
                <p>{`${user.first_name} ${user.last_name}`}</p>
                <AddressContainer user={user.address} />
              </section>
            )}
          </div>
          {/* Delivery */}
          <div className='checkout__container'>
            <span className='checkout__container__title'>
              <h3>Delivery address</h3>
              {isEditingDeliveryAddress ? (
                <AiOutlineClose
                  onClick={() => handleEditDeliveryAddress()}
                  className='checkout__icons'
                />
              ) : (
                <RiEdit2Line
                  onClick={() => handleEditDeliveryAddress()}
                  className='checkout__icons'
                />
              )}
            </span>
            {isEditingDeliveryAddress ||
            user.delivery_address.street_address === undefined ? (
              <DeliveryAddress
                isEditing={isEditingDeliveryAddress}
                setIsEditing={setIsEditingDeliveryAddress}
              />
            ) : (
              <section className='checkout__container-address'>
                <p>{`${user.delivery_address.first_name} ${user.delivery_address.last_name}`}</p>
                <AddressContainer user={user.delivery_address} />
              </section>
            )}
          </div>
        </div>
        <BasketCost />
      </div>
    </div>
  );
};

export default Checkout;
