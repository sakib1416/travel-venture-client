import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router';
import { UserContext } from '../../App';
import ProcessPayment from '../ProcessPayment/ProcessPayment';

const Shipment = () => {
    const {id} = useParams();
    const [cart, setCart] = useState([]);
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    const [shippingData, setShippingData] = useState(null);
    const { register, handleSubmit, errors } = useForm();
    useEffect(()=>{
        fetch("https://stormy-thicket-62666.herokuapp.com/service/"+id)
        .then(response => response.json())
        .then(data => setCart(data))
    },[])
    const onSubmit = (data) => {
        setShippingData(data);
    }

    const handlePaymentSuccess = (paymentId) => {
        const orderDetails = {
            user: loggedInUser,
            product: cart,
            shipment: shippingData,
            paymentId,
            orderTime: new Date()
        };
        console.log(orderDetails);
        fetch("https://stormy-thicket-62666.herokuapp.com/addOrder", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(orderDetails)
        })
        .then(response => response.json())
        .then(purchased => {
            if(purchased) {
                alert("Your order has been successful")
            }
        })
    }
    return (
        <div>
            <h1>Put your shipment data here</h1>
            <h5>Price: {cart.packagePrice}</h5>
            <div style = {{display: shippingData ? 'none' : 'block'}} className="col-md-6">
                <form className="ship-form" onSubmit={handleSubmit(onSubmit)}>
                <div className="form-group">
                    <input name="name" defaultValue={loggedInUser.name} className="form-control" {...register('name', { required: true })} placeholder="Your Name" />
                    {/* {errors.name && <span className="error">Name is required</span>} */}
                </div>
                
                <div className="form-group">
                    <input name="email" defaultValue={loggedInUser.email} className="form-control" {...register('email', { required: true })}  placeholder="Your Email"/>
                    {/* {errors.email && <span className="error">Email is required</span>} */}
                </div>
                
                
                <div className="form-group">
                    <input name="address" {...register('address', { required: true })} className="form-control"  placeholder="Your Address" />
                    {/* {errors.address && <span className="error">Address is required</span>} */}
                </div>
                
                
                <div className="form-group">
                    <input name="phone" {...register('phone', { required: true })} className="form-control" placeholder="Your Phone Number"/>
                    {/* {errors.phone && <span className="error">Phone Number is required</span>} */}
                </div>
                
                <div className="form-group mt-3 text-right">
                    <button type="submit" className="btn btn-secondary">Proceed to payment</button>
                </div>
                
                {/* <input type="submit" /> */}
                </form>
            </div>
            <div style = {{display: shippingData ? 'block' : 'none'}} className="col-md-6">
                <h1>Pay here bitte!</h1>
                {/* calling the component to make payment and sending the function to get the payment ID */}
                <ProcessPayment handlePayment = {handlePaymentSuccess}></ProcessPayment>
            </div>
        </div>
    );
};

export default Shipment;