import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from '../header/Header';
import Wallet from '../wallet/Wallet';
import Footer from '../footer/Footer';
import './Leaderboard.css';

const Leaderboard = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const pollId = location.pathname.split("/")[2];
    const [state, setState] = useState({
        web: null,
        contract: null,
        accounts: null
    });
    const [candidates, setCandidates] = useState([]);
    const [sortedCandidates, setSortedCandidates] = useState([]);
    const [sortType, setSortType] = useState('id');

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

    const goToHome = () => {
        navigate('/'); // Navigate to the home page
    };

    useEffect(() => {
        const sortArray = type => {
            const types = {
                id: 'id',
                name: 'name',
                voteCount: 'voteCount',
            };
            const sortProperty = types[type];
            const sorted = [...candidates].sort((a, b) => {
                if (sortProperty === 'voteCount') {
                    return b[sortProperty] - a[sortProperty];
                }
                return a[sortProperty].localeCompare(b[sortProperty]);
            });
            setSortedCandidates(sorted);
        };

        sortArray(sortType);
    }, [sortType, candidates]);

    return (
        <>
            <Header />
            <Wallet saveState={setState} />
            <div className="leaderboard-container">
                <h2>Leaderboard</h2>
                <select onChange={(e) => setSortType(e.target.value)}>
                    <option value="id">Sort by ID</option>
                    <option value="name">Sort by Name</option>
                    <option value="voteCount">Sort by Vote Count</option>
                </select>
                <table>
                    <thead>
                        <tr>
                            <th>Candidate ID</th>
                            <th>Name</th>
                            <th>Vote Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        {sortedCandidates.map(candidate => (
                            <tr key={candidate.id}>
                                <td>{candidate.id}</td>
                                <td>{candidate.name}</td>
                                <td>{candidate.voteCount}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
                <button onClick={goToHome} className="back-home-button">Back to Home</button>
            </div>
            <Footer />
        </>
    );
};

export default Leaderboard;
