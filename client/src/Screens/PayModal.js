import React, {useState, useReducer, useContext} from 'react'
import styles from "./paymodal.css";
import { RiCloseLine } from "react-icons/ri";
import {Button, Form} from 'react-bootstrap';
import { toast } from 'react-toastify';
import { getError } from '../utils';
import GlobalVariables from '../GlobalVariables';
import axios from 'axios';
import { Store } from '../Store';


const reducer = (state, action) => {
    switch (action.type) {
      case 'FETCH_REQUEST':
        return { ...state, loading: true };
      case 'FETCH_SUCCESS':
        return { ...state, orders: action.payload, loading: false };
      case 'FETCH_FAIL':
        return { ...state, loading: false, error: action.payload };
      default:
        return state;
    }
  };

function PayModal({ setIsOpen, orderid,  totalPrice}) {

    const { state } = useContext(Store);
    const { userInfo } = state;
    
    const [{ loading, error, orders }, dispatch] = useReducer(reducer, {
        loading: true,
        error: '',
      });

    const [phone, setPhone] = useState('')

    const handlePay = async (event) => {
        event.preventDefault();
        console.log(phone)

        dispatch({ type: 'FETCH_REQUEST' });
        try {
            const { data } = await axios.post(`${GlobalVariables.serverUrl}stk`, {
                phone,
                orderid,
                totalPrice

            }, { headers: { Authorization: `Bearer ${userInfo.token}` } }
            );
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
        } catch (error) {
            dispatch({
                type: 'FETCH_FAIL',
                payload: getError(error),
              });
        }
    }
    
  return (
    <>
    <div className={styles.darkBG} onClick={() => setIsOpen(false)} />
    <div className={styles.centered}>
      <div className={styles.modal}>
        <div className={styles.modalHeader}>
          <h5 className={styles.heading}>Dialog</h5>
        </div>
        <button className={styles.closeBtn} onClick={() => setIsOpen(false)}>
          <RiCloseLine style={{ marginBottom: "-3px" }} />
        </button>
        <Form onSubmit={handlePay}>
        <Form.Group className={styles.modalContent}>
          <Form.Label>Enter your mpesa number.</Form.Label>
        </Form.Group>
        
            <Form.Control type='number' required onChange={(e) => {setPhone(e.target.value)}}
             placeholder='+254 700 000 000'></Form.Control>
        
        <div className={styles.modalActions}>
          <div className={styles.actionsContainer}>
            <Button className='button-3' variant='success' type='submit'>
              Pay
            </Button>
            <Button
              className='button-3'
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </div>
          
        </div>
        </Form>
      </div>
    </div>
  </>
  )
}

export default PayModal