import React, { useState } from 'react';
import Modal from './Modal';
import Header from './Header';
import Footer from './Footer';
import { usePortfolio } from './PortfolioContext';

export default function Projects() {
  const { projects, setProjects } = usePortfolio();
  const [showModal, setShowModal] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [newSectionName, setNewSectionName] = useState('');
  const [showAddSection, setShowAddSection] = useState(false);

  // Get all section names
  const sectionNames = Object.keys(projects);

  // Handle adding a new section
  const handleAddSection = () => {
    if (newSectionName.trim()) {
      setProjects(prev => ({
        ...prev,
        [newSectionName]: []
      }));
      setCurrentSection(newSectionName);
      setNewSectionName('');
      setShowAddSection(false);
    }
  };

  // Handle project changes within a section
  const handleProjectChange = (sectionName, index, field, value) => {
    const newProjects = { ...projects };
    newProjects[sectionName][index][field] = value;
    setProjects(newProjects);
  };

  // Add new project to a section
  const addProject = (sectionName) => {
    const newProjects = { ...projects };
    newProjects[sectionName] = [
      ...(newProjects[sectionName] || []),
      { title: '', description: '' }
    ];
    setProjects(newProjects);
  };

  // Handle section deletion
  const deleteSection = (sectionName) => {
    const newProjects = { ...projects };
    delete newProjects[sectionName];
    setProjects(newProjects);
    if (currentSection === sectionName) {
      setCurrentSection(Object.keys(newProjects)[0] || '');
    }
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  return (
    <>
      <div style={{ display: 'flex', gap: '1rem', width: '100%' }}>
        {/* Form Inputs */}
        <div style={{ width: '33%', padding: '1rem', maxHeight: '100vh', overflowY: 'auto', boxSizing: 'border-box', border: '1px solid #ccc', borderRadius: '4px' }}>
          
          {/* Section Management */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
              <button
                onClick={() => setShowAddSection(true)}
                style={{
                  padding: '0.5rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  flex: 1
                }}
              >
                Add New Section
              </button>
            </div>

            {showAddSection && (
              <div style={{ marginBottom: '1rem', display: 'flex', gap: '0.5rem' }}>
                <input
                  type="text"
                  placeholder="Section Name"
                  value={newSectionName}
                  onChange={(e) => setNewSectionName(e.target.value)}
                  style={{ flex: 1, padding: '0.5rem' }}
                />
                <button
                  onClick={handleAddSection}
                  style={{
                    padding: '0.5rem',
                    backgroundColor: '#007bff',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Add
                </button>
              </div>
            )}
          </div>

          {/* Section Navigation */}
          <nav style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '1rem', backgroundColor: '#f4f4f4', padding: '0.5rem' }}>
            {sectionNames.map(name => (
              <button
                key={name}
                onClick={() => setCurrentSection(name)}
                style={{
                  padding: '0.5rem',
                  backgroundColor: currentSection === name ? '#007bff' : '#fff',
                  color: currentSection === name ? '#fff' : '#000',
                  border: '1px solid #ccc',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  fontSize: '14px'
                }}
              >
                {name}
              </button>
            ))}
          </nav>

          {/* Projects Form */}
          {currentSection && (
            <div style={{ marginBottom: '2rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                <h2 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>{currentSection}</h2>
                <button
                  onClick={() => deleteSection(currentSection)}
                  style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: '#dc3545',
                    color: 'white',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer'
                  }}
                >
                  Delete Section
                </button>
              </div>

              {projects[currentSection]?.map((project, index) => (
                <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                  <input
                    type="text"
                    placeholder="Project Title"
                    value={project.title}
                    onChange={(e) => handleProjectChange(currentSection, index, 'title', e.target.value)}
                    style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
                  />
                  <textarea
                    placeholder="Project Description"
                    value={project.description}
                    onChange={(e) => handleProjectChange(currentSection, index, 'description', e.target.value)}
                    style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', minHeight: '100px' }}
                  />
                </div>
              ))}

              <button
                onClick={() => addProject(currentSection)}
                style={{
                  width: '100%',
                  padding: '0.5rem',
                  backgroundColor: '#28a745',
                  color: 'white',
                  border: 'none',
                  borderRadius: '4px',
                  cursor: 'pointer',
                  marginBottom: '1rem'
                }}
              >
                Add Project
              </button>
            </div>
          )}

          <button
            onClick={handleSubmit}
            style={{
              width: '100%',
              padding: '0.5rem',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
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
              <div className='sidebar' style={{ width: '20%', padding: '1rem', borderRight: '1px solid #ccc' }}>   
                {sectionNames.map(name => (
                  <div
                    key={name}
                    className="nav-item"
                    onClick={() => setCurrentSection(name)}
                    style={{
                      color: '#FF69B4',
                      cursor: 'pointer',
                      marginBottom: '20px',
                      fontSize: '25px',
                      textDecoration: currentSection === name ? 'underline' : 'none'
                    }}
                  >
                    {name}
                  </div>
                ))}
              </div>

              {/* Main Content */}
              <div style={{ width: '80%', minHeight: "30vh", padding: '2rem' }}>
                {sectionNames.map(sectionName => (
                  <div 
                    key={sectionName} 
                    style={{ 
                      marginBottom: '2rem',
                      display: currentSection === sectionName ? 'block' : 'none'
                    }}
                  >
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem' }}>{sectionName}</h2>
                    {projects[sectionName]?.map((project, index) => (
                      <div key={index} style={{ marginBottom: '1.5rem' }}>
                        <span style={{ fontWeight: 'bolder', fontSize: "1.5rem", marginBottom: "5px" }}>
                          {project.title}
                        </span>
                        {project.description && (
                          <p style={{ marginTop: "10px", marginBottom: "5px" }}>
                            {project.description}
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                ))}
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