import React, { useState } from 'react';
import Modal from './Modal';
import Header from './Header';
import Footer from './Footer';
import { usePortfolio } from './PortfolioContext';

export default function Research() {
  const { research, setResearch } = usePortfolio();
  const [showModal, setShowModal] = useState(false);
  const [currentSection, setCurrentSection] = useState('');
  const [newSectionName, setNewSectionName] = useState('');
  const [showAddSection, setShowAddSection] = useState(false);

  // Get all section names
  const sectionNames = Object.keys(research);

  // Default field configurations for different section types
  const sectionFields = {
    'Research Interests': ['title', 'description'],
    'PhD Thesis': ['title', 'description'],
    'Undergraduate Thesis': ['title', 'description'],
    'Research Projects': ['timeframe', 'title', 'description'],
    'Term Papers': ['timeframe', 'title', 'description']
  };

  // Get fields for current section
  const getFieldsForSection = (sectionName) => {
    return sectionFields[sectionName] || ['title', 'description'];
  };

  // Handle adding a new section
  const handleAddSection = () => {
    if (newSectionName.trim()) {
      setResearch(prev => ({
        ...prev,
        [newSectionName]: []
      }));
      setCurrentSection(newSectionName);
      setNewSectionName('');
      setShowAddSection(false);
    }
  };

  // Handle field changes within a section
  const handleFieldChange = (sectionName, index, field, value) => {
    const newResearch = { ...research };
    newResearch[sectionName][index][field] = value;
    setResearch(newResearch);
  };

  // Add new item to a section
  const addItem = (sectionName) => {
    const newResearch = { ...research };
    const fields = getFieldsForSection(sectionName);
    const newItem = {};
    fields.forEach(field => newItem[field] = '');
    
    newResearch[sectionName] = [
      ...(newResearch[sectionName] || []),
      newItem
    ];
    setResearch(newResearch);
  };

  // Handle section deletion
  const deleteSection = (sectionName) => {
    const newResearch = { ...research };
    delete newResearch[sectionName];
    setResearch(newResearch);
    if (currentSection === sectionName) {
      setCurrentSection(Object.keys(newResearch)[0] || '');
    }
  };

  const handleSubmit = () => {
    setShowModal(true);
  };

  // Render input field based on type
  const renderField = (item, index, sectionName, field) => {
    if (field === 'description') {
      return (
        <textarea
          placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}`}
          value={item[field]}
          onChange={(e) => handleFieldChange(sectionName, index, field, e.target.value)}
          style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem', minHeight: '100px' }}
        />
      );
    }
    return (
      <input
        type="text"
        placeholder={`${field.charAt(0).toUpperCase() + field.slice(1)}`}
        value={item[field]}
        onChange={(e) => handleFieldChange(sectionName, index, field, e.target.value)}
        style={{ width: '100%', marginBottom: '0.5rem', padding: '0.5rem' }}
      />
    );
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

          {/* Research Items Form */}
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

              {research[currentSection]?.map((item, index) => (
                <div key={index} style={{ marginBottom: '1rem', padding: '1rem', border: '1px solid #ccc', borderRadius: '4px' }}>
                  {getFieldsForSection(currentSection).map(field => renderField(item, index, currentSection, field))}
                </div>
              ))}

              <button
                onClick={() => addItem(currentSection)}
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
                Add Item
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

        {/* Preview */}
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
                    {research[sectionName]?.map((item, index) => (
                      <div key={index} style={{ marginBottom: '1.5rem' }}>
                        {item.timeframe && (
                          <div style={{ fontWeight:'bolder',fontSize: "1.5rem", marginBottom: '0.5rem' }}>
                            {item.timeframe}
                          </div>
                        )}
                        <span style={{ fontWeight: 'bold', fontSize: "1.2rem", marginBottom: "5px" }}>
                          {item.title}
                        </span>
                        {item.description && (
                          <p style={{ marginTop: "10px", marginBottom: "5px" }}>
                            {item.description}
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