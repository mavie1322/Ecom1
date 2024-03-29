import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { deleteDeliveryAddress, deleteUser } from "../../actions/user-actions";
import { useAppDispatch, useAppSelector } from "../../hooks/hooks";
import "./confirmationPopup.css";

interface Props {
  toggleConfirmation: () => void;
  title: string;
  msg: string;
}
const ConfirmationPopup: React.FC<Props> = ({
  toggleConfirmation,
  title,
  msg,
}) => {
  const dispatch = useAppDispatch();
  const user = useAppSelector((state) => state.user.result);
  const navigate = useNavigate();

  const handleClick = () => {
    if (title === "Remove Address") {
      dispatch(deleteDeliveryAddress(user._id));
    } else {
      dispatch(deleteUser(user._id, navigate));
    }
    toggleConfirmation();
  };

  return (
    <div className='popup-box1'>
      <div className='box1 scale-up-ver-bottom'>
        {
          <div className='confirmationPopup'>
            <header>{title}</header>
            <main>{msg}</main>
            <div>
              <button type='button' onClick={() => handleClick()}>
                OK
              </button>
              <button type='button' onClick={() => toggleConfirmation()}>
                Cancel
              </button>
            </div>
          </div>
        }
      </div>
    </div>
  );
};

export default ConfirmationPopup;
