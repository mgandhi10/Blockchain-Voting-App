import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import Header from '../header/Header';
import Wallet from '../wallet/Wallet';
import Footer from '../footer/Footer';
import './AddCandidate.css';

const AddCandidate = () => {
    const [state, setState] = useState({
        web: null,
        contract: null,
        accounts: null
    });
    const { pollId } = useParams(); // Fetching pollId from URL
    const [candidateName, setCandidateName] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const saveState = (newState) => {
        setState(newState);
    };

    // Fetch candidates from the smart contract
    const fetchCandidates = useCallback(async () => {
        if (!state.contract || !pollId) return;

        try {
            const candidatesArray = await state.contract.methods.getPollCandidates(pollId).call();
            const formattedCandidates = candidatesArray.map(candidate => ({
                id: candidate.id.toString(),
                name: candidate.name,
                voteCount: parseInt(candidate.voteCount)
            }));
            setCandidates(formattedCandidates);
        } catch (error) {
            console.error("Error fetching candidates:", error);
        }
    }, [state.contract, pollId]);

    useEffect(() => {
        fetchCandidates();
    }, [fetchCandidates]);

    const addCandidate = async () => {
        if (!candidateName || !pollId) {
            alert("Please enter a candidate name and ensure you have a valid poll ID.");
            return;
        }

        try {
            await state.contract.methods.addCandidate(pollId, candidateName).send({ from: state.accounts[0] });
            setError('');
            setCandidateName('');
            fetchCandidates();  // Refresh candidate list after adding a new candidate
        } catch (error) {
            console.error('Error adding candidate:', error);
            setError('Only poll admins can add new candidates.');
        }
    };

    const navigateToHome = () => {
        navigate('/');
    };

    return (
        <>
            <Wallet saveState={saveState} />
            <Header />
            <div className="add-candidate-container">
                <h2>Add Candidate to Poll</h2>
                <p>Poll ID: {pollId}</p>
                {error && <p className="error-message">{error}</p>}
                <div>
                    <input
                        type="text"
                        placeholder="Enter candidate name"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                    />
                    <button onClick={addCandidate} className="button-container">Add Candidate</button>
                </div>
                {candidates.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Votes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map((candidate, index) => (
                                <tr key={index}>
                                    <td>{candidate.id}</td>
                                    <td>{candidate.name}</td>
                                    <td>{candidate.voteCount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                <button onClick={navigateToHome} className="home-button">Back to Home</button>
            </div>
            <Footer />
        </>
    );
};

export default AddCandidate;
