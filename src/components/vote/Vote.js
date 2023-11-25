import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from '../header/Header';
import Wallet from '../wallet/Wallet';
import Footer from '../footer/Footer';
import confetti from 'canvas-confetti';
import './Vote.css';

const Vote = () => {
    const navigate = useNavigate();
    const [state, setState] = useState({
        web: null,
        contract: null,
        accounts: null
    })
    const saveState = (newState) => {
        setState(newState);
    }
    const location = useLocation();
    const pollId = location.pathname.split("/")[2]; // Assuming URL is like /vote/id
    const [candidates, setCandidates] = useState([]);
    const [selectedCandidate, setSelectedCandidate] = useState('');
    const [voted, setVoted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const fetchCandidates = useCallback(async (pollId) => {
        if (!state.contract) return;

        try {
            const candidatesArray = await state.contract.methods.getPollCandidates(pollId).call();
            setCandidates(candidatesArray.map(candidate => ({ id: candidate.id.toString(), name: candidate.name, voteCount: candidate.voteCount.toString() })));
        } catch (error) {
            console.error("Error fetching candidates for poll ID:", pollId, error);
        }
    }, [state.contract]);

    useEffect(() => {
        if (pollId) {
            fetchCandidates(pollId);
        }
    }, [pollId, fetchCandidates]);

    const handleVote = async () => {
        if (!selectedCandidate) {
            alert("Please select a candidate.");
            return;
        }

        try {
            setLoading(true);
            const transaction = await state.contract.methods.vote(pollId, selectedCandidate).send({ from: state.accounts[0] });
            console.log("Vote transaction:", transaction);
            setVoted(true);
            confetti({
                zIndex: 1000,
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
            });
        } catch (error) {
            console.error("Error during voting:", error);
            setError('You have already voted or an error occurred.');
        } finally {
            setLoading(false);
        }
    };

    const goToLeaderboard = () => {
        navigate(`/leaderboard/${pollId}`); // Update the path as per your routing
    };

    return (
        <>
            <Header />
            <Wallet saveState={saveState} />
            <div className="vote-container">
                <h2>Vote for a Candidate</h2>
                {loading ? <p>Processing your vote...</p> : voted ? (
                    <>
                        <p>Thank you for voting!</p>
                        <button onClick={goToLeaderboard}>Show Leaderboard</button>
                    </>
                ) : error ? <p className="error-message">{error}</p> : (
                    <table>
                        <thead>
                            <tr>
                                <th>Candidate ID</th>
                                <th>Name</th>
                                <th>Vote Count</th>
                                <th>Vote</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map(candidate => (
                                <tr key={candidate.id}>
                                    <td>{candidate.id}</td>
                                    <td>{candidate.name}</td>
                                    <td>{candidate.voteCount}</td>
                                    <td>
                                        <label className="radio-container">
                                            <input
                                                type="radio"
                                                name="candidate"
                                                value={candidate.id}
                                                onChange={() => setSelectedCandidate(candidate.id)}
                                                className="actual-radio" // Hidden radio button
                                            />
                                            <span className="radio-label">
                                                Vote
                                                <span className="custom-radio"></span>
                                            </span>
                                        </label>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {!voted && <button onClick={handleVote} disabled={!selectedCandidate}>Submit Vote</button>}
            </div>
            <Footer />
        </>
    );
};

export default Vote;