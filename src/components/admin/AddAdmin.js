import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Header from '../header/Header';
import Wallet from '../wallet/Wallet';
import Footer from '../footer/Footer';
import './AddAdmin.css';

const AddAdmin = () => {
    const [state, setState] = useState({
        web: null,
        contract: null,
        accounts: null
    });
    const { pollId } = useParams(); // Fetching pollId from URL
    const [adminAddress, setAdminAddress] = useState('');
    const [adminAdded, setAdminAdded] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const saveState = (newState) => {
        setState(newState);
    };

    const addAdmin = async () => {
        if (!adminAddress || !pollId) {
            alert("Please enter an admin address and make sure you have a valid poll ID.");
            return;
        }

        try {
            await state.contract.methods.assignAdmin(pollId, adminAddress).send({ from: state.accounts[0] });
            setAdminAdded(true);
        } catch (error) {
            console.error('Error adding admin:', error);
            setError('Failed to add admin. Make sure you are the poll creator and the address is correct.');
        }
    };

    const navigateToHome = () => {
        navigate('/');
    };

    return (
        <>
            <Wallet saveState={saveState} />
            <Header />
            <div className="add-admin-container">
                <h2>Add Admin to Poll</h2>
                <p>Poll ID: {pollId}</p>
                <input
                    type="text"
                    placeholder="Enter new admin's wallet address"
                    value={adminAddress}
                    onChange={(e) => setAdminAddress(e.target.value)}
                    disabled={adminAdded}
                />
                {!adminAdded ? (
                    <button onClick={addAdmin} className="home-button">Add Admin</button>
                ) : (
                    <>
                        <p>Admin added successfully.</p>
                        <button onClick={navigateToHome} className="home-button">Back to Home</button>
                    </>
                )}
                {error && <p className="error-message">{error}</p>}
            </div>
            <Footer />
        </>
    );
};

export default AddAdmin;
