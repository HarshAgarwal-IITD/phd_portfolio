import React, { createContext, useContext, useState } from 'react';

const PortfolioContext = createContext();

export const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState({
    header: {
      name: '',
      title: '',
      profilePicture: null,
      backgroundImage: null,
    },
    navigation: ['About', 'Research', 'Publications', 'Teaching', 'Projects'],
    aboutMe: '',
    researchAdvisor: {
      name: '',
      title: '',
      department: '',
      institution: '',
    },
    researchLab: {
      name: '',
      department: '',
      institution: '',
      address: '',
    },
    socialMedia: {
      github: '',
      twitter: '',
      linkedin: '',
    },
    email: '',
  });

  const [publications, setPublications] = useState({
    journals: [
      {
        authors: '',
        year: '',
        title: '',
        journal: '',
        volume: '',
        pages: '',
        link: ''
      }
    ],
    conferences: [
      {
        authors: '',
        year: '',
        title: '',
        conference: '',
        location: '',
        link: ''
      }
    ]
  });
  
  const [background, setBackground] = useState({
    education: [
      { degree: '', department: '', institution: '', year: '', details: '' }
    ],
    workExperience: [
      { title: '', company: '', duration: '', location: '', description: '' }
    ],
    internships: [
      { role: '', company: '', duration: '', location: '', description: '' }
    ]
  });
  



  return (
    <PortfolioContext.Provider 
      value={{ 
        portfolio, 
        setPortfolio,
        publications,
        setPublications,
        background,
        setBackground
      }}
    >
      {children}
    </PortfolioContext.Provider>
  );
};

export const usePortfolio = () => {
  const context = useContext(PortfolioContext);
  if (!context) {
    throw new Error('usePortfolio must be used within a PortfolioProvider');
  }
  return context;
};

// Optional: Create separate hooks for each state if you want more granular access
export const usePortfolioData = () => {
  const { portfolio, setPortfolio } = usePortfolio();
  return { portfolio, setPortfolio };
};

export const usePublicationsData = () => {
  const { publications, setPublications } = usePortfolio();
  return { publications, setPublications };
};