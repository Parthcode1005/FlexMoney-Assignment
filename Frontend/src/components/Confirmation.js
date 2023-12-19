// src/components/Confirmation.js
import React, { useEffect, useState, useContext } from 'react';
import { UserProvider, useUser, UserContext } from '../contexts/UserContext';
import './Confirmation.css';

const Confirmation = () => {
    const { user } = useContext(UserContext) || {}; // Use an empty object as a fallback
    const [loading, setLoading] = useState(true);

    // You might want to fetch additional user details here
    useEffect(() => {
        // Simulating fetching user details from the backend
        // Replace this with an actual API call
        const fetchUserDetails = async () => {
            try {
                // Assuming you have an API endpoint to fetch user details by user ID
                const response = await fetch(`http://localhost:5000/api/user/${user.id}`);
                const userData = await response.json();

                // Update user context with additional details if needed
                // setUser({ ...user, ...userData });
            } catch (error) {
                console.error('Error fetching user details:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [user && user.id]);

    return (
        <div>
            <h1>Confirmation Page</h1>
            <div className='confirmation-container'>
                <h1>Success!! Welcome to the Yoga Camp!</h1>

                {/* Display user details after fetching from the backend */}
                {!loading && (
                    <div>
                        <p>Name: {user ? user.name : 'N/A'}</p>
                        <p>Age: {user ? user.age + ' years' : 'N/A'}</p>
                        <p>Start Date: {user ? user.date : 'N/A'}</p>
                        <p>Batch: {user ? user.selectedBatch : 'N/A'}</p>
                        <p>Fees Paid: 500 Rs.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Confirmation;
