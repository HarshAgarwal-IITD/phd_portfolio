import React, { useState } from 'react';
import Modal from './Modal';
import { usePortfolio } from './PortfolioContext';


function Login() {
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const {setPublications , setPortfolio,setBackground , setTeaching,setProjects ,setResearch}=usePortfolio();

  async function handleLogin(kerberos, password) {
    
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST', // POST method for sending data in the body
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          kerberos: kerberos,  // Your Kerberos ID
          password: password,  // Your password
        }),
      });

      const jsonData = await response.json();
  
    

      if (response.ok) {
        setPortfolio(jsonData.data.portfolioData); // Set portfolio data in parent component
        setPublications(jsonData.data.publicationsData)
        setBackground(jsonData.data.backgroundData)
        setTeaching(jsonData.data.teachingData)
        setProjects(jsonData.data.projectsData)
        setResearch(jsonData.data.researchData)
        
        return 'Portfolio fetched successfully!';
      } else {
        return data.error || 'Failed to fetch portfolio';
      }
    } catch (error) {
      return 'An error occurred. Please try again.';
    }
  }

  return (
    <>
      <button onClick={() => setShowModal(true)}>Login</button>
      
      {showModal && (
        <Modal
          setShowModal={setShowModal} // Pass setShowModal to control modal visibility
          handleFunction={handleLogin} // Pass handleLogin to the modal
        />
      )}
    </>
  );
}

export default Login;
