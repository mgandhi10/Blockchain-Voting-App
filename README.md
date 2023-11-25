# Blockchain-Voting-App

The Blockchain Voting App is a decentralized application (dApp) that utilizes blockchain technology to facilitate secure and transparent voting processes. This repository contains both the smart contract and the frontend application necessary for the voting system.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Introduction](#introduction)
- [Smart Contract](#smart-contract)
- [Frontend Application](#frontend-application)
- [Getting Started](#getting-started)
- [Usage](#usage)
- [License](#license)
- [Contact](#contact)

## Prerequisites

Before you proceed, ensure that you have the following prerequisites:

- **Node.js**: Node must be installed on your PC. You can download the latest version of Node.js from [here](https://nodejs.org/en/download).

- **Metamask**: Metamask is required for interacting with the Ethereum blockchain. You can add the Metamask extension to your Chrome or Firefox browser.

## Introduction

The Blockchain Voting App is a secure and transparent solution for conducting voting processes using blockchain technology. It consists of two main components: the Ethereum smart contract, which manages polls and votes on the blockchain, and the frontend application, which allows users to create and participate in polls.

## Smart Contract

The smart contract is written in Solidity and handles the core logic of the voting system. Key features of the smart contract include:

- **Poll Creation**: Users can create new polls with unique descriptions.

- **Candidate Addition**: Admins (poll creators) can add candidates to polls.

- **Admin Management**: Poll creators can assign admin privileges to other addresses.

- **Voting**: Users can cast their votes for candidates in a poll.

- **Events**: The smart contract emits events for poll creation, candidate addition, and voting.

The smart contract is already deployed on the Ethereum network using Alchemy, so you can interact with it without the need for deployment.

## Frontend Application

The frontend application is built using React.js and provides a user-friendly interface for interacting with the voting system. It includes the following key components:

- **Home**: The landing page with an overview of available polls.

- **Create**: Allows users to create new polls.

- **Vote**: Enables users to cast their votes in existing polls.

- **AddCandidate**: Admins can add candidates to their polls using this feature.

- **AddAdmin**: Poll creators can assign admin privileges to other addresses.

- **Leaderboard**: Displays the vote count for each candidate in a poll.

## Getting Started

To run the Blockchain Voting App locally on your machine, follow these steps:

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/mgandhi10/Blockchain-Voting-App.git

2. Navigate to the project folder:

   ```bash
   cd Blockchain-Voting-App

3. Install the required dependencies:

   ```bash
   npm install

4. Start the application on your localhost:

   ```bash
   npm start

## Usage

Once the application is running locally, you can access it in your web browser. Follow the on-screen instructions to create polls, vote for candidates, and explore the voting system's features.

## License

This project is licensed under the MIT License.

## Contact

If you have any questions or suggestions, feel free to open an issue in this repository.
