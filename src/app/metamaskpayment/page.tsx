'use client'
import React, { useEffect } from 'react';
import Web3 from 'web3';
import { TransactionConfig } from 'web3-core';

const PaymentComponent: React.FC = () => {
  useEffect(() => {
    const initWeb3 = async () => {
      // Check if MetaMask is installed
      if (typeof window.ethereum !== 'undefined') {
        const web3 = new Web3(window.ethereum as any);

        try {
          // Request account access if needed
          await window.ethereum.request({ method: 'eth_requestAccounts' });
        } catch (error) {
          console.error('MetaMask account access denied:', error);
        }

        // Function to handle the payment
        const handlePayment = async () => {
          try {
            // Get the current Ethereum account
            const accounts = await web3.eth.getAccounts();
            const senderAddress = accounts[0]; // Assuming the first account

            // Replace 'your-receiving-address' with your Ethereum address
            const receivingAddress = '0x45a2b69C21b11a7e00a26eD19A1582342911EfE6';

            // Replace 'amount-in-ether' with the amount in Ether
            const amountInEther = '0.1';

            // Convert Ether to Wei (1 Ether = 1e18 Wei)
            const amountInWei = web3.utils.toWei(amountInEther, 'ether');

            const transaction: TransactionConfig = {
              from: senderAddress,
              to: receivingAddress,
              value: amountInWei,
            };

            // Send the transaction
            const txHash = await web3.eth.sendTransaction(transaction);

            // Redirect to a success page after payment
            window.location.href = `https://example.com/success?tx=${txHash}`;
          } catch (error) {
            console.error('Payment error:', error);
          }
        };

        // Attach the click event to the payment button
        const payButton = document.getElementById('payButton');
        if (payButton) {
          payButton.addEventListener('click', handlePayment);
        }
      } else {
        alert('MetaMask is not installed. Please install it to make payments.');
      }
    };

    initWeb3();
  }, []);

  return (
    <div className='flex flex-col gap-12 justify-center items-center align-middle'>
      <h1>Payment with MetaMask</h1>
      <button id="payButton" className='border border-white bg-[#242424] p-4 rounded-xl'>Pay with MetaMask</button>
    </div>
  );
};

export default PaymentComponent;
