import React from "react";

interface Props {
  togglePopup: () => void;
}

const BecomeMember: React.FC<Props> = ({ togglePopup }) => {
  return (
    <div>Become Member</div>
    // <div className='popup-box'>
    //   <div className='box scale-up-ver-bottom'>
    //     <span className='close-icon' onClick={() => togglePopup()}>
    //       X
    //     </span>
    //     {
    //       <div className='sign-in'>
    //         <header className='sign-in__header font-styling'>Sign in</header>
    //         <form>
    //           <div className='sign-in__inputs'>
    //             <span>
    //               <label>Email</label>
    //               <p>*</p>
    //             </span>
    //             <input type='email' required />
    //           </div>
    //           <div className='sign-in__inputs'>
    //             <span>
    //               <label>Password</label>
    //               <p>*</p>
    //             </span>
    //             <input type='email' required />
    //           </div>
    //           <div className='sign-in__option'>
    //             <span>Forgot password?</span>
    //           </div>
    //           <div className='sign-in__buttons'>
    //             <button type='submit' className='sign-in__button font-styling'>
    //               Sign In
    //             </button>
    //           </div>
    //           <div className='sign-in__buttons'>
    //             <button
    //               type='submit'
    //               className='sign-in__become-member font-styling'
    //               onClick={() => togglePopup()}>
    //               Become a member
    //             </button>
    //           </div>
    //         </form>
    //       </div>
    //     }
    //   </div>
    // </div>
  );
};

export default BecomeMember;
