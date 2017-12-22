import React from 'react';
import {ReactPageClick} from 'react-page-click';
import'../Modal.css';
const Modal = ({onClose, notifyOnTouchEnd, ...rest}) => (
  <div>
    <div className="shade" />
    <ReactPageClick notify={onClose} notifyOnTouchEnd={notifyOnTouchEnd}>
      <div className="popup">
        <h3>Add FRIENDScOOMPONENT</h3>
        <div className="content" {...rest} />
      </div>
    </ReactPageClick>
  </div>
);
Modal.defaultProps = {
  notifyOnTouchEnd: undefined
};
export default Modal;