import React, { useState } from 'react';
import Modal from './Modal';
import Header from './Header';
import Footer from './Footer';
import { usePortfolio } from './PortfolioContext';

export default function Background() {
  const { background, setBackground } = usePortfolio();
  const [showModal, setShowModal] = useState(false);
  const [showEducation,setShowEducation] = useState(true);
  const [showSkills,setShowSkills] = useState(false);
  const [showInterns,setShowInterns] = useState(false);
  const [showWorks,setShowWorks] = useState(false);

  const handleShowEdu = () =>{
    setShowEducation(true);
    setShowSkills(false);
    setShowInterns(false);
    setShowWorks(false);
  }
  const handleShowSkills = () =>{
    setShowEducation(false);
    setShowSkills(true);
    setShowInterns(false);
    setShowWorks(false);
  }
  const handleShowInterns = () =>{
    setShowEducation(false);
    setShowSkills(false);
    setShowInterns(true);
    setShowWorks(false);
  }
  const handleShowWorks = () =>{
    setShowEducation(false);
    setShowSkills(false);
    setShowInterns(false);
    setShowWorks(true);
  }

  // Handle changes for education entries
  const handleEducationChange = (index, field, value) => {
    const newEducation = [...background.educationalBackground];
    newEducation[index][field] = value;
    setBackground(prev => ({
      ...prev,
      educationalBackground: newEducation
    }));
  };
  const handleAchievementChange = (index, value)=>{
    const newAchievements = [...background.achievements];
    newAchievements[index] = value;
    setBackground(prev => ({
      ...prev,
      achievements: newAchievements
    }))
  }

  // Handle changes for work experience entries
  const handleWorkChange = (index, field, value) => {
    const newWork = [...background.workExperience];
    newWork[index][field] = value;
    setBackground(prev => ({
      ...prev,
      workExperience: newWork
    }));
  };

  // Handle changes for internship entries
  const handleInternshipChange = (index, field, value) => {
    const newInternships = [...background.internships];
    newInternships[index][field] = value;
    setBackground(prev => ({
      ...prev,
      internships: newInternships
    }));
  };
  const handleResearchSkillsChange = (index, field, value) => {
    const newInternships = [...background.researchSkills];
    newInternships[index][field] = value;
    setBackground(prev => ({
      ...prev,
      researchSkills: newInternships
    }));
  };
  const handleOtherSkillsChange = (index, field, value) => {
    const newInternships = [...background.otherSkills];
    newInternships[index][field] = value;
    setBackground(prev => ({
      ...prev,
      otherSkills: newInternships
    }));
  };

  // Add new entry for each section
  const addEntry = (section) => {
    const newEntries = {
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
  
      researchSkills:[], 
      
      otherSkills:[]
    };
    
    setBackground(prev => ({
      ...prev,
      [section]: [...prev[section], newEntries[section]]
    }));
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  return (
    <>

      <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
        {/* Form Inputs */}
        <div style={{ width: '33%', padding: '1rem', maxHeight: '100vh', overflowY: 'auto', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}>
         
        <div>
    <nav style={{ display: 'flex', flexDirection: 'row' , backgroundColor:'#f4f4f4'}}>
      <button onClick={handleShowEdu}  style={{ width: '100%', padding: '10px', border: '1px solid #ccc',  backgroundColor: '#f4f4f4', cursor: 'pointer', fontSize: '16px' ,  textDecoration: showEducation ? 'underline' : 'none'}} >
        Education
      </button>
      <button onClick={handleShowWorks} style={{ width: '100%', padding: '10px', border: '1px solid #ccc',  backgroundColor: '#f4f4f4', cursor: 'pointer', fontSize: '16px',   textDecoration: showWorks ? 'underline' : 'none'  }}>
        Work Experience
      </button>
      <button onClick={handleShowInterns} style={{ width: '100%', padding: '10px', border: '1px solid #ccc', backgroundColor: '#f4f4f4', cursor: 'pointer', fontSize: '16px',  textDecoration: showInterns ? 'underline' : 'none' }}>
        Internships
      </button>
      <button onClick={handleShowSkills} style={{ width: '100%', padding: '10px', border: '1px solid #ccc',  backgroundColor: '#f4f4f4', cursor: 'pointer', fontSize: '16px' ,   textDecoration: showSkills ? 'underline' : 'none'}}>
        Skills
      </button>
    </nav>
    </div>
  
          
          {/* Education Section */}
          
         {showEducation && <div style={{ marginBottom: '5px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Educational Background</h2>
            {background.educationalBackground.map((edu, index) => (
              <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                <input
                  type="text"
                  placeholder="Degree (e.g., PhD, B.Tech)"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(index, 'degree', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="Department"
                  value={edu.department}
                  onChange={(e) => handleEducationChange(index, 'department', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="Institution"
                  value={edu.institution}
                  onChange={(e) => handleEducationChange(index, 'institution', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="Year (e.g., 2019-Present)"
                  value={edu.year}
                  onChange={(e) => handleEducationChange(index, 'year', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <textarea
                  placeholder="Additional details"
                  value={edu.details}
                  onChange={(e) => handleEducationChange(index, 'details', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', minHeight: '100px' }}
                />
              </div>
            ))}
            <button
              onClick={() => addEntry('educationalBackground')}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginBottom: '1rem',
              }}
            >
              Add Education Entry
            </button>

          

            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Achievements & Awards</h2>
    {background.achievements.map((achievement, index) => (
      <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
        <input
          type="text"
          placeholder="Achievements (e.g., Charpak Scholarship)"
          value={achievement}
          onChange={(e) => handleAchievementChange(index, e.target.value)}
          style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        />
      </div>
   ))}
   <button
     onClick={() => addEntry('achievements')}
     style={{
       width: '100%',
       padding: '0.5rem',
       backgroundColor: '#28a745',
       color: 'white',
       border: 'none',
       borderRadius: '4px',
       cursor: 'pointer',
       marginBottom: '1rem',
     }}
   >
     Add Achievement Entry
   </button>
          </div>
          }

          {/* Work Experience Section */}
          {showWorks && <div style={{ marginBottom: '5px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Work Experience</h2>
            {background.workExperience.map((work, index) => (
              <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                <input
                  type="text"
                  placeholder="Company"
                  value={work.company}
                  onChange={(e) => handleWorkChange(index, 'company', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="Duration (e.g., Jul 2016-Mar 2018)"
                  value={work.duration}
                  onChange={(e) => handleWorkChange(index, 'duration', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={work.location}
                  onChange={(e) => handleWorkChange(index, 'location', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="Job title"
                  value={work.title}
                  onChange={(e) => handleWorkChange(index, 'title', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <textarea
                  placeholder="Job description"
                  value={work.description}
                  onChange={(e) => handleWorkChange(index, 'description', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', minHeight: '100px' }}
                />
              </div>
            ))}
            <button
              onClick={() => addEntry('workExperience')}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginBottom: '1rem',
              }}
            >
              Add Work Experience Entry
            </button>
          </div>
}
          {/* Internships Section - Similar to Work Experience */}
         {showInterns && <div style={{ marginBottom: '5px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Internships</h2>
            {background.internships.map((internship, index) => (
              <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                <input
                  type="text"
                  placeholder="Company"
                  value={internship.company}
                  onChange={(e) => handleInternshipChange(index, 'company', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="Duration (e.g., May 2015-Jul 2015)"
                  value={internship.duration}
                  onChange={(e) => handleInternshipChange(index, 'duration', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="Location"
                  value={internship.location}
                  onChange={(e) => handleInternshipChange(index, 'location', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="Role"
                  value={internship.role}
                  onChange={(e) => handleInternshipChange(index, 'role', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <textarea
                  placeholder="Description"
                  value={internship.description}
                  onChange={(e) => handleInternshipChange(index, 'description', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', minHeight: '100px' }}
                />
              </div>
            ))}
            <button
              onClick={() => addEntry('internships')}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginBottom: '1rem',
              }}
            >
              Add Internship Entry
            </button>
          </div>
}
          

          {showSkills && <div style={{ marginBottom: '5px' }}>
            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}> Research Skills</h2>
            {background.researchSkills.map((edu, index) => (
              <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                <input
                  type="text"
                  placeholder="Skill (e.g., userResearch, Data analyisis)"
                  value={edu.skill}
                  onChange={(e) => handleResearchSkillsChange(index, 'skill', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
                <input
                  type="text"
                  placeholder="skill description"
                  value={edu.description}
                  onChange={(e) => handleResearchSkillsChange(index, 'description', e.target.value)}
                  style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                />
            
              </div>
            ))}
            <button
              onClick={() => addEntry('researchSkills')}
              style={{
                width: '100%',
                padding: '0.5rem',
                backgroundColor: '#28a745',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                marginBottom: '1rem',
              }}
            >
              Add Research Skills
            </button>

          

            <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold', marginBottom: '1rem' }}>Other Skills</h2>
    {background.otherSkills.map((edu, index) => (
      <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
        <input
          type="text"
          placeholder="Skill (e.g.,programming)"
          value={edu.skill}
          onChange={(e) => handleOtherSkillsChange(index,'skill', e.target.value)}
          style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        />
        <input
          type="text"
          placeholder="description "
          value={edu.description}
          onChange={(e) => handleOtherSkillsChange(index,'description', e.target.value)}
          style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
        />
      </div>
   ))}
   <button
     onClick={() => addEntry('otherSkills')}
     style={{
       width: '100%',
       padding: '0.5rem',
       backgroundColor: '#28a745',
       color: 'white',
       border: 'none',
       borderRadius: '4px',
       cursor: 'pointer',
       marginBottom: '1rem',
     }}
   >
     Add other Skills 
   </button>

  </div>
          
          }
           <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            Save Portfolio
          </button>


          

          
        </div>

        {/* Template Preview */}
        <div style={{ width: '67%', padding: '1rem', boxSizing: 'border-box', maxHeight: '100vh', overflowY: 'auto' }}>
          <div style={{ border: '1px solid #ccc', borderRadius: '4px', overflow: 'hidden' }}>
            <Header />
            <div style={{ display: 'flex' }}>
  {/* Sidebar */}
  <div class='sidebar' style={{ width: '20%', padding: '1rem', borderRight: '1px solid #ccc' }}>   
    <div class="nav-item" style={{color: '#FF69B4',cursor: 'pointer',marginBottom: '20px',fontSize: '25px' ,  textDecoration: showEducation ? 'underline' : 'none'}}>Education</div>
    <div class="nav-item" style={{color: '#FF69B4',cursor: 'pointer',marginBottom: '20px',fontSize: '25px',  textDecoration: showWorks ? 'underline' : 'none'}} >Work Experience</div>
    <div class="nav-item"  style={{color: '#FF69B4',cursor: 'pointer',marginBottom: '20px',fontSize: '25px' , textDecoration: showInterns ? 'underline' : 'none'}}>Internships</div>
    <div class="nav-item" style={{color: '#FF69B4',cursor: 'pointer',marginBottom: '20px',fontSize: '25px' , textDecoration: showSkills ? 'underline' : 'none'}} >Skills</div>
  </div>
  
  {/* Main Content */}
  <div style={{ width: '80%',minHeight:"30vh", padding: '2rem' }}>
    {/* Education Preview */}

    {showEducation && <div style={{ marginBottom: '2rem' }}>
      <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Educational Background</h2>
      {background.educationalBackground.map((edu, index) => (
        <div key={index} style={{ marginBottom: '1rem' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{edu.degree}</h3>
          <p>{edu.department} {edu.institution } {edu.year &&  (edu.year)}</p>
          {edu.details && <p style={{ marginTop: '0.5rem' }}>{edu.details}</p>}
        </div>
      ))}
      {background.achievements.length > 0 && (
  <div style={{ marginBottom: '5px' }}>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Achievements & Awards</h2>
    {background.achievements.map((achievement, index) => (
      <div key={index} style={{ marginBottom: '1rem' }}>
        <p style={{  }}>{achievement}</p>
      </div>
    ))}
  </div>
)}
    </div>}

    
   { showWorks && 
  <div style={{ marginBottom: '2rem' }}>
    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Work Experience</h2>
    {background.workExperience.map((work, index) => (
      <div key={index} style={{ marginBottom: '0.5rem' }}>
        
        {/* Company and Duration (Bold) */}
        <span style={{ fontWeight: 'bolder' , fontSize:"1.5rem",marginBottom:"5px" }}>
          {work.company}
        </span>
        {work.duration && <span style={{ fontWeight: 'bolder' , fontSize:"1.5rem",marginBottom:"5px" }}>
          ({work.duration})
        </span>}
        
        {/* Location (Semi-bold) */}
        <p style={{ fontSize: '1.2rem',fontWeight: 'bold' ,marginTop:"5px",marginBottom:"5px" }}>{work.location}</p> 
        
        {/* Job Title */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 'normal' ,marginTop:"10px",marginBottom:"5px"}}>{work.title}</h3> 
        
        {/* Job Description */}
        {work.description && <p style={{  marginTop:"5px",marginBottom:"5px" }}>{work.description}</p>}
      </div>
    ))}
  </div>
}

 {/* skills Preview */}

 {showSkills && <div style={{ marginBottom: '2rem' }}>
 {background.researchSkills.length > 0 && (
  <div>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Research Skills</h2>
    {background.researchSkills.map((edu, index) => (
      <div key={index} style={{ marginBottom: '1rem' }}>
        <span style={{ fontWeight: 'bold' }}>{edu.skill} </span>
        <span>{edu.description}</span>
      </div>
    ))}
  </div>
)}

    
      {background.otherSkills.length > 0 && (
  <div style={{ marginBottom: '5px' }}>
    <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Other Skills</h2>
    {background.otherSkills.map((edu, index) => (
      <div key={index} style={{ marginBottom: '1rem' }}>
       <span style={{fontWeight:'bold'}}>{edu.skill}</span>
       <span >{edu.description}</span>
      </div>
    ))}
  </div>
)}
    </div>}



    

    {/* Internships Preview */}
    { showInterns && 
  <div style={{ marginBottom: '2rem' }}>
    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Internships</h2>
    {background.internships.map((work, index) => (
      <div key={index} style={{ marginBottom: '0.5rem' }}>
        
        {/* Company and Duration (Bold) */}
        <span style={{ fontWeight: 'bolder' , fontSize:"1.5rem",marginBottom:"5px" }}>
          {work.company}
        </span>
        {work.duration && <span style={{ fontWeight: 'bolder' , fontSize:"1.5rem",marginBottom:"5px" }}>
          ({work.duration})
        </span>}
        
        {/* Location (Semi-bold) */}
        <p style={{ fontSize: '1.2rem',fontWeight: 'bold' ,marginTop:"5px",marginBottom:"5px" }}>{work.location}</p> 
        
        {/* Job Title */}
        <h3 style={{ fontSize: '1.1rem', fontWeight: 'normal' ,marginTop:"10px",marginBottom:"5px"}}>{work.role}</h3> 
        
        {/* Job Description */}
        {work.description && <p style={{marginTop:"5px",marginBottom:"5px" }}>{work.description}</p>}
      </div>
    ))}
  </div>
}


  </div>
</div>

         

            <Footer />
          </div>
        </div>

        {showModal && <Modal setShowModal={setShowModal} />}
      </div>
    </>
  );
}