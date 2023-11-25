import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../header/Header';
import Wallet from '../wallet/Wallet';
import Footer from '../footer/Footer';
import './Create.css'; // Ensure you have corresponding CSS for styling

const Create = () => {
    const [state, setState] = useState({
        web: null,
        contract: null,
        accounts: null
    })
    const saveState = (newState) => {
        setState(newState);
    }
    const [pollId, setPollId] = useState('');
    const [candidateName, setCandidateName] = useState('');
    const [candidates, setCandidates] = useState([]);
    const [pollCreated, setPollCreated] = useState(false);

    useEffect(() => {
        const createPoll = async () => {
            if (pollCreated) {
                return;
            }
            if (state.contract && state.accounts && state.accounts.length > 0) {
                try {
                    const response = await state.contract.methods.createPoll("New Poll").send({ from: state.accounts[0] });
                    const newPollId = response.events.PollCreated.returnValues.pollId;
                    setPollId(newPollId.toString());
                    setPollCreated(true);
                } catch (error) {
                    console.log('Error creating poll:', error);
                }
            }
        };

        createPoll();
    }, [state.contract, state.accounts, pollCreated]);

    const [copySuccess, setCopySuccess] = useState('');
    const navigate = useNavigate();
    const navigateToHome = () => {
        navigate('/');
    }
    const copyToClipboard = () => {
        const domainName = window.location.origin;
        navigator.clipboard.writeText(`${domainName}/vote/${pollId}`).then(() => {
            setCopySuccess('Link copied!');
        }, (err) => {
            setCopySuccess('Failed to copy!');
        });
    };

    const addCandidate = async () => {
        if (candidateName && pollId && state.contract && state.accounts && state.accounts.length > 0) {
            try {
                console.log(pollId);
                await state.contract.methods.addCandidate(pollId, candidateName).send({ from: state.accounts[0], gas: 20533955 });
                setCandidates([...candidates, { name: candidateName, className: "new-candidate" }]);
                setCandidateName('');
            } catch (error) {
                console.error('Error adding candidate:', error);
            }
        }
    };

    return (
        <>
            <Wallet saveState={saveState} />
            <Header />
            <div className="create-container">
                <h2>Create Poll</h2>
                <p>Poll ID: {pollId ? pollId : 'Loading...'}</p>
                <div>
                    <input
                        type="text"
                        placeholder="Enter candidate name"
                        value={candidateName}
                        onChange={(e) => setCandidateName(e.target.value)}
                    />
                    <div className="button-container">
                        <button onClick={addCandidate} className="home-button">Add Candidate</button>
                        <button onClick={copyToClipboard} className="home-button">Copy Voting Link</button>
                        <button onClick={navigateToHome} className="home-button">Exit</button>
                    </div>
                </div>
                {candidates.length > 0 && (
                    <table>
                        <thead>
                            <tr>
                                <th>Candidate Name</th>
                            </tr>
                        </thead>
                        <tbody>
                            {candidates.map((candidate, index) => (
                                <tr key={index} className={candidate.className || ''}>
                                    <td>{candidate.name}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
                {copySuccess && <p className="copy-message">{copySuccess}</p>}
            </div>
            <Footer />
        </>
    );
};

export default Create;
