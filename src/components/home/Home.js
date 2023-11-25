import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../header/Header.js";
import Wallet from "../wallet/Wallet.js";
import Footer from "../footer/Footer.js";
import './Home.css'; // Importing the CSS file

const Home = () => {
    const [state, setState] = useState({ web: null, contract: null, accounts: null });
    const saveState = (state) => {
        setState(state);
    }

    const navigate = useNavigate();
    const [showAddCandidatePopup, setShowAddCandidatePopup] = useState(false);
    const [showAddAdminPopup, setShowAddAdminPopup] = useState(false);
    const [showVotePopup, setShowVotePopup] = useState(false);
    const [pollId, setPollId] = useState(""); // State to store the poll ID input
    const [showLeaderboardPopup, setShowLeaderboardPopup] = useState(false);

    const goToCreatePoll = () => {
        navigate("/create");
    };


    const openLeaderboardPopup = () => {
        setShowLeaderboardPopup(true);
    };

    const closeLeaderboardPopup = () => {
        setShowLeaderboardPopup(false);
    };

    const goToLeaderboard = () => {
        navigate(`/leaderboard/${pollId}`);
        closeLeaderboardPopup();
    };

    const openVotePopup = () => {
        setShowVotePopup(true);
    };

    const closeVotePopup = () => {
        setShowVotePopup(false);
    };

    const goToVote = () => {
        navigate(`/vote/${pollId}`);
        closeVotePopup();
    };

    const openAddCandidatePopup = () => {
        setShowAddCandidatePopup(true);
    };

    const openAddAdminPopup = () => {
        setShowAddAdminPopup(true);
    };

    const closeAddCandidatePopup = () => {
        setShowAddCandidatePopup(false);
    };

    const closeAddAdminPopup = () => {
        setShowAddAdminPopup(false);
        closeAddAdminPopup();
    };

    const handleAddCandidate = () => {
        // Handle adding candidate logic here and pass pollId to the route if needed
        navigate(`/add-candidate/${pollId}`);
        closeAddCandidatePopup();
    };

    const handleAddAdmin = () => {
        // Handle adding admin logic here and pass pollId to the route if needed
        navigate(`/add-admin/${pollId}`);
    };

    return (
        <>
            <div className="main">
                <h1 class="head">Etherium Based Voting Application</h1>
                <Wallet saveState={saveState}></Wallet>
                <Header />
                <div className="home-buttons">
                    <button onClick={goToCreatePoll} className="home-button">Create Poll</button>
                    <button onClick={openVotePopup} className="home-button">Vote</button>
                    <button onClick={openAddCandidatePopup} className="home-button">Add Candidate</button>
                    <button onClick={openAddAdminPopup} className="home-button">Add Admin</button>
                    <button onClick={openLeaderboardPopup} className="home-button">Leaderboard</button>
                </div>
                <Footer />
            </div>

            {showLeaderboardPopup && (
                <div className="backdrop">
                    <div className="popup">
                        <div className="popup-inner">
                            <h2>View Leaderboard</h2>
                            <input
                                type="text"
                                placeholder="Enter Poll ID"
                                value={pollId}
                                onChange={(e) => setPollId(e.target.value)}
                            />
                            <button onClick={goToLeaderboard}>View Leaderboard</button>
                            <button onClick={closeLeaderboardPopup}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {showVotePopup && (
                <div className="backdrop">
                    <div className="popup">
                        <div className="popup-inner">
                            <h2>Vote in a Poll</h2>
                            <input
                                type="text"
                                placeholder="Enter Poll ID"
                                value={pollId}
                                onChange={(e) => setPollId(e.target.value)}
                            />
                            <button onClick={goToVote}>Vote</button>
                            <button onClick={closeVotePopup}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Candidate Popup */}
            {showAddCandidatePopup && (
                <div className="backdrop">
                    <div className="popup">
                        <div className="popup-inner">
                            <h2>Add Candidate</h2>
                            <input
                                type="text"
                                placeholder="Enter Poll ID"
                                value={pollId}
                                onChange={(e) => setPollId(e.target.value)}
                            />
                            <button onClick={handleAddCandidate}>Add Candidate</button>
                            <button onClick={closeAddCandidatePopup}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}

            {/* Add Admin Popup */}
            {showAddAdminPopup && (
                <div className="backdrop">
                    <div className="popup">
                        <div className="popup-inner">
                            <h2>Add Admin</h2>
                            <input
                                type="text"
                                placeholder="Enter Poll ID"
                                value={pollId}
                                onChange={(e) => setPollId(e.target.value)}
                            />
                            <button onClick={handleAddAdmin}>Add Admin</button>
                            <button onClick={closeAddAdminPopup}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default Home;
