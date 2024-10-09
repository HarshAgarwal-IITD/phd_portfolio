import React from "react";

import { usePortfolio } from "./PortfolioContext";
export default function Footer(){
    const {portfolio}= usePortfolio();


    return(
        <footer style={{
            backgroundColor: '#333',
            color: 'white',
            padding: '2rem'
          }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
              gap: '2rem'
            }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Research Advisor</h3>
                <p>{portfolio.researchAdvisor.name || 'Advisor Name'}</p>
                <p>{portfolio.researchAdvisor.title || 'Advisor Title'}</p>
                <p>{portfolio.researchAdvisor.department || 'Department'}</p>
                <p>{portfolio.researchAdvisor.institution || 'Institution'}</p>
              </div>
              
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Research Lab</h3>
                <p>{portfolio.researchLab.name || 'Lab Name'}</p>
                <p>{portfolio.researchLab.department || 'Department'}</p>
                <p>{portfolio.researchLab.institution || 'Institution'}</p>
                <p>{portfolio.researchLab.address || 'Address'}</p>
              </div>
              
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Follow Me</h3>
                <a href={portfolio.socialMedia.github} style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>GitHub</a>
                <a href={portfolio.socialMedia.twitter} style={{ color: 'white', display: 'block', marginBottom: '0.5rem' }}>Twitter</a>
                <a href={portfolio.socialMedia.linkedin} style={{ color: 'white', display: 'block' }}>LinkedIn</a>
              </div>
              
              <div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Contact</h3>
                <p>{portfolio.email || 'your.email@example.com'}</p>
              </div>
            </div>
          </footer>

    );

};
