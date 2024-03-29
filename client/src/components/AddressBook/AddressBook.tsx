import { useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import ProfileAccount from "../../containers/ProfileAccount";
import { useAppSelector } from "../../hooks/hooks";
import BillingAddress from "../Checkout/Address/BillingAddress";
import DeliveryAddress from "../Checkout/Address/DeliveryAddress";
import ConfirmationPopup from "../../containers/ConfirmationPopup/ConfirmationPopup";
import "./addressBook.css";

const AddressBook = () => {
  const user = useAppSelector((state) => state.user.result);
  const [editBilling, setEditBilling] = useState<boolean>(false);
  const [editDelivery, setEditDelivery] = useState<boolean>(false);
  const [openPopup, setOpenPopup] = useState<boolean>(false);

  const toggleConfirmation = () => {
    setOpenPopup(!openPopup);
  };

  // useEffect(() => {}, [user.delivery_address]);

  return (
    <div className='profile section__margin'>
      <ProfileAccount />
      <div className='profile__summary addressBook__container'>
        <h1>Address Book</h1>
        <section>
          <span className='addressBook__container-span'>
            <h4>Billing Address</h4>
            <p onClick={() => setEditBilling(!editBilling)}>
              {editBilling ? <AiOutlineClose /> : "Edit"}
            </p>
          </span>
          {editBilling ? (
            <div className='settings__container-form'>
              <BillingAddress
                isEditing={editBilling}
                setIsEditing={setEditBilling}
              />{" "}
            </div>
          ) : user.address.street_address === "" ? (
            <div>
              <p>No home address saved</p>
            </div>
          ) : (
            <div className='addressBook__container-info'>
              <p>{user.address.flat_number}</p>
              <p>{user.address.street_address}</p>
              <p>{`${user.address.postcode} ${user.address.city}`}</p>
              <p>{user.address.country}</p>
            </div>
          )}
        </section>
        <section>
          <span className='addressBook__container-span'>
            <h4>Delivery Address</h4>
            <p onClick={() => setEditDelivery(!editDelivery)}>
              {editDelivery ? <AiOutlineClose /> : "Edit"}
            </p>
          </span>
          {editDelivery ? (
            <div className='settings__container-form'>
              <DeliveryAddress
                isEditing={editDelivery}
                setIsEditing={setEditDelivery}
              />
            </div>
          ) : user.delivery_address.street_address === "" ? (
            <div>
              <p>No delivery address saved</p>
            </div>
          ) : (
            <div className='addressBook__container-delivery'>
              <div className='addressBook__container-info'>
                <p>{user.delivery_address.flat_number}</p>
                <p>{user.delivery_address.street_address}</p>
                <p>{`${user.delivery_address.postcode} ${user.delivery_address.city}`}</p>
                <p>{user.delivery_address.country}</p>
              </div>
              <p onClick={() => toggleConfirmation()}>Delete</p>
              {openPopup && (
                <ConfirmationPopup
                  toggleConfirmation={toggleConfirmation}
                  title='Remove Address'
                  msg='Are you sure you want to remove this delivery address?'
                />
              )}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default AddressBook;
