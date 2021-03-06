import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from '../../../App';

const ReviewCards = ({reviewer}) => {
    const {user, admin} = useContext(UserContext);
    const [loggedInUser, setLoggedInUser] = user;
    const [isAdmin, setIsAdmin] = admin;
    const deleteReview = (id) => {
        console.log("Delete clicked ", id);
        //fetching with delete method
        fetch("https://floating-coast-84242.herokuapp.com/delete/review/"+id, {
            method: "DELETE"
        })
        .then(response => response.json())
        .then(data => console.log("Review Deleted"))
    }
    return (
        <div className='col-md-4 col-sm-6'>
            <div class="card" style={{width: '18rem'}}>
                <div class="card-body">
                    
                    
                    <h5 class="card-text mb-3 mt-3">"{reviewer.review}"</h5>
                    <h6 class="card-subtitle mb-2 text-muted">Package Name: <span className="important-text">{reviewer.serviceName}</span></h6>
                    <p class="card-title">Reviewed By: <span className="important-text">{reviewer.reviewer}</span></p>
                    {/* {
                        isAdmin.length > 0 ? 
                        <div>
                            <Link to={"/review/update/"+reviewer._id} className="btn btn-success">Update Review</Link>
                            <br />
                            <button onClick={()=>{deleteReview(reviewer._id)}} className="btn btn-danger mt-1">Delete Review</button>
                        </div> :
                        <button>See Details</button>
                    } */}
                </div>
            </div>
        </div>
    );
};

export default ReviewCards;