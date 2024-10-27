import React, { createContext, useContext, useState } from 'react';
import backgroundImage from './assets/backgroundImage.jpg'


const PortfolioContext = createContext();


export  const PortfolioProvider = ({ children }) => {
  const [portfolio, setPortfolio] = useState({
    header: {
      name: '',
 
      profilePicture: null,
      backgroundImage: null,
    },
    navigation: ['About', 'Research', 'Publications', 'Background','Teaching', 'Projects'],
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
    educationalBackground:[
      { degree: '', department: '', institution: '', year: '', details: '' }
    ],

    achievements:[],

    workExperience: [
      { title: '', company: '', duration: '', location: '', description: '' }
    ],

    internships: [
      { role: '', company: '', duration: '', location: '', description: '' }
    ],

    researchSkills:[{skill:'', description:''}], 
    
    otherSkills:[{skill:'', description:''}]
  })
  ;
  const [teaching ,setTeaching]=useState ({
    lectures: [],
    mentorships: []
  })
  const [projects ,setProjects]=useState ([]);
  const [research, setResearch] = useState({
    'Research Interests': [],
    'PhD Thesis': [],
    'Undergraduate Thesis': [],
    'Research Projects': [],
    'Term Papers': []
  });
 
 
  //  // Append the default background image to FormData
  const [images, setImages] = useState(new FormData());

  const setDefaultBackground= async()=>{
    const response = await fetch(backgroundImage);
        const blob = await response.blob();
        const file = new File([blob], 'backgroundImage.jpg', { type: blob.type });
  
        const newFormData = new FormData();
        newFormData.append('background', file); // Append the default background image to FormData
        setImages(newFormData);
  }

  const [imageUrls, setImageUrls] = useState({'backgroundImage' :backgroundImage});
 
  



  return (
    <PortfolioContext.Provider 
      value={{ 
        portfolio, 
        setPortfolio,
        publications,
        setPublications,
        background,
        setBackground,
        teaching,
        setTeaching,
        projects ,
        setProjects,
        research ,
        setResearch , 
        images , 
        setImages ,
        imageUrls ,
        setImageUrls
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