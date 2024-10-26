import express from 'express';
import { promises as fs } from 'fs'; // Using destructuring to access `fs.promises`
import path from 'path';
import cors from 'cors';
import { execa } from 'execa';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);





const app = express();
app.use(cors());

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const PORT = process.env.PORT || 3000;
const ABOUT_PATH = path.join(__dirname, 'aboutTemplate.html');
const FOOTER_PATH = path.join(__dirname, 'footerTemplate.html');
const HEADER_PATH = path.join(__dirname, 'headerTemplate.html');
const PUBLICATIONS_PATH = path.join(__dirname, 'publicationsTemplate.html');
const BACKGROUND_PATH = path.join(__dirname, 'backgroundTemplate.html');
const TEACHING_PATH = path.join(__dirname, 'teachingTemplate.html');

async function createBackgroundPage(backgroundData, header, footer) {
  const backgroundTemplate = await fs.readFile(BACKGROUND_PATH, 'utf-8');
  
  // Generate education entries HTML
  const educationHtml = backgroundData.educationalBackground.filter(edu => edu.degree || edu.institution).map(edu => `
    <div class="entry">
      <h3>${edu.degree}</h3>
      <p>${edu.department}, ${edu.institution} (${edu.year})</p>
      ${edu.details ? `<p>${edu.details}</p>` : ''}
    </div>
  `).join('') || "";

  // Generate achievements HTML
  const achievementsHtml = backgroundData.achievements.length ? `
    <h2>Achievements & Awards</h2>
    <ul>
      ${backgroundData.achievements.map(achievement => `<li>${achievement}</li>`).join('')}
    </ul>
  ` : '';

  // Generate work experience HTML
  const workHtml = backgroundData.workExperience.filter(work => work.title || work.company).map(work => `
    <div class="entry">
      <h3>${work.title}</h3>
      <p>${work.company}, ${work.location}</p>
      <p>${work.duration}</p>
      ${Array.isArray(work.description) 
        ? `<ul>${work.description.map(desc => `<li>${desc}</li>`).join('')}</ul>`
        : work.description ? `<p>${work.description}</p>` : ''}
    </div>
  `).join('') || '<p>No work experience yet.</p>';

  // Generate internships HTML
  const internshipsHtml = backgroundData.internships.filter(internship => internship.role || internship.company).map(internship => `
    <div class="entry">
      <h3>${internship.role}</h3>
      <p>${internship.company}, ${internship.location}</p>
      <p>${internship.duration}</p>
      ${Array.isArray(internship.description)
        ? `<ul>${internship.description.map(desc => `<li>${desc}</li>`).join('')}</ul>`
        : internship.description ? `<p>${internship.description}</p>` : ''}
    </div>
  `).join('') || '<p>No internships yet.</p>';

  // Generate skills HTML
  const skillsHtml = `
   
      ${backgroundData.researchSkills.length ? `
        <h2>Research Skills</h2>
        ${backgroundData.researchSkills.map(skill => `
          <div class="entry">
            <h3>${skill.skill ? skill.skill+'' : ''}</h3>
            <p>${skill.description ? skill.description+'' : '' }</p>
          </div>
        `).join('')}
      ` : ''}
      ${backgroundData.otherSkills.length ? `
        <h2>Other Skills</h2>
        ${backgroundData.otherSkills.map(skill => `
          <div class="entry">
            <h3>${skill.skill ? skill.skill+'' : '' }  </h3>
            <p>${skill.description ? skill.description+'' : ''}</p>
          </div>
        `).join('')}
      ` : ''}
   
  ` || '<p>No skills listed yet.</p>';
  console.log(skillsHtml)

  // Replace all placeholders in the template
  return backgroundTemplate
    .replace('{header}', header)
    .replace('{footer}', footer)
    .replace('{educationalBackground}', educationHtml)
    .replace('{achievementsAndAwards}', achievementsHtml)
    .replace('{workExperience}', workHtml)
    .replace('{internships}', internshipsHtml)
    .replace('{skills}', skillsHtml);
}



async function createTeachingPage(header , footer , teaching){
  const teachingTemplate = await fs.readFile(TEACHING_PATH, 'utf-8');
  
  // Generate education entries HTML
  const lecturesHtml = teaching.lectures.filter(edu => edu.title || edu.description).map(edu => `
    <div class="entry">
      <h3>${edu.title}</h3>
      <p>${edu.description}</p>
     
    </div>
  `).join('') || "";

  // Generate achievements HTML
  const mentorshipsHtml = teaching.mentorships.filter(edu => edu.title || edu.description).map(edu => `
    <div class="entry">
      <h3>${edu.title}</h3>
      <p>${edu.description}</p>
     
    </div>
  `).join('') || "";

  // Generate work experience HTML
 
  return teachingTemplate
    .replace('{header}', header)
    .replace('{footer}', footer)
    .replace('{lectures}', lecturesHtml)
    .replace('{mentorship}',mentorshipsHtml)
   
}


async function createAboutPage(header , footer , portfolio){
  let aboutTemplate = await fs.readFile(ABOUT_PATH,'utf-8');

  const about = aboutTemplate
  .replace('{{ABOUT_ME}}', portfolio.aboutMe)
  .replace("{{HEADER}}",header)
  .replace("{{FOOTER}}",footer)
  ;
  return about
}
const createJournalEntry = (journal) => `
  <p style="margin-bottom: 1rem">
    ${journal.authors} ${journal.year ? `(${journal.year})` : ''}. 
    ${journal.title}. <i>${journal.journal}</i>
    ${journal.volume ? `, ${journal.volume}` : ''}
    ${journal.pages ? `, ${journal.pages}` : ''}.
    ${journal.link ? `<a href="${journal.link}" style="color: #007bff; text-decoration: none"> Link</a>` : ''}
  </p>
`;

const createConferenceEntry = (conference) => `
  <p style="margin-bottom: 1rem">
    ${conference.authors} ${conference.year ? `(${conference.year})` : ''}. 
    ${conference.title}. <i>${conference.conference}</i>
    ${conference.location ? `, ${conference.location}` : ''}.
    ${conference.link ? `<a href="${conference.link}" style="color: #007bff; text-decoration: none"> Link</a>` : ''}
  </p>
`;
async function creatPublicationsPage(header , footer ,publicationsData){
  let publicationsTemplate = await fs.readFile(PUBLICATIONS_PATH,'utf-8');
  const journalEntries = publicationsData.journals
    .map(journal => createJournalEntry(journal))
    .join('');

  const conferenceEntries = publicationsData.conferences
    .map(conference => createConferenceEntry(conference))
    .join('');

  return publicationsTemplate
    .replace('{journal}', journalEntries || '<p>No journal publications yet.</p>')
    .replace('{conference}', conferenceEntries || '<p>No conference publications yet.</p>')
    .replace('{header}',header)
    .replace('{footer}',footer);
};


async function createHeader(headerData){
  let headerTemplate =await fs.readFile(HEADER_PATH , 'utf-8');

 


return  headerTemplate
.replace('{{NAME}}', headerData.name || 'Your Name')
.replace('{{TITLE}}', headerData.title || 'Your Title');

}
async function createFooter(footer){
  let footerTemplate = await fs.readFile(FOOTER_PATH, 'utf-8');


  

return footerTemplate
.replace('{{ADVISOR_NAME}}', footer.researchAdvisor.name || '')
.replace('{{ADVISOR_TITLE}}', footer.researchAdvisor.title || '')
.replace('{{ADVISOR_DEPARTMENT}}', footer.researchAdvisor.department || '')
.replace('{{ADVISOR_INSTITUTION}}', footer.researchAdvisor.institution || '')
.replace('{{LAB_NAME}}', footer.researchLab.name || '')
.replace('{{LAB_DEPARTMENT}}', footer.researchLab.department || '')
.replace('{{LAB_INSTITUTION}}', footer.researchLab.institution || '')
.replace('{{LAB_ADDRESS}}', footer.researchLab.address || '')
.replace('{{GITHUB_URL}}', footer.socialMedia.github || '#')
.replace('{{TWITTER_URL}}', footer.socialMedia.twitter || '#')
.replace('{{LINKEDIN_URL}}', footer.socialMedia.linkedin || '#')
.replace('{{EMAIL}}', footer.email || '');;

}


async function getCurrentJson(kerberosId , password){

    try {
      // Prepare the SSH command to read jsonData.json file from the remote server
      const sshCommand = `sshpass -p "${password}" ssh ${kerberosId}@ssh1.iitd.ac.in "cat private_html/jsonData.json"`;
  
      // Execute the SSH command to fetch the file content directly
      const { stdout: fileContent, stderr: sshError } = await execa(sshCommand, { shell: true });
     
      // Check for any error during SSH execution
      if (sshError) {
        console.error('Error fetching the file:', sshError);
        return { ok: false, error: sshError };
      }
  
      // Parse the output (fileContent) as JSON
      const jsonData = JSON.parse(fileContent);
  
      // Return the parsed JSON data
      return { ok: true, data: jsonData };
    } catch (error) {
      console.error('Error during SSH fetch:', error.message);
      return { ok: false, error: error.message };
    }
  }
  
  async function uploadHtmlToSSH(kerberosId, password, pages, jsonData) {
    try {
      // Prepare SSH connection details
      const sshCommand = `sshpass -p "${password}" ssh ${kerberosId}@ssh1.iitd.ac.in`;
  
      console.log('Processing...');
  
      // Create directory and upload HTML files
      const { stdout: sshOutput, stderr: sshError } = await execa(
        `${sshCommand} "cd ~ && mkdir -p private_html && cd private_html && touch index.html && echo '${pages.aboutPage}' > index.html && touch publications.html && echo '${pages.publicationsPage}' > publications.html
       " ` ,
        { shell: true }
      );
      console.log(sshOutput); // For debugging
  
      if (sshError) {
        console.error(sshError);
      }
      const { stdout: sshOutput1, stderr: sshError1 } = await execa(
        `${sshCommand} "cd ~ && mkdir -p private_html && touch publications.html && echo '${pages.publicationsPage}' > publications.html
       " ` ,
        { shell: true }
      );
  
     
      console.log(sshOutput1); // For debugging
  
      if (sshError1) {
        console.error(sshError1);
      }

      let tempFilePath = path.join(__dirname, 'backgroundOutput.html');
      await fs.writeFile(tempFilePath, pages.backgroundPage, 'utf8');
  
      // Use scp to transfer the file to the remote server
      let scpCommand = `sshpass -p "${password}" scp ${tempFilePath} ${kerberosId}@ssh1.iitd.ac.in:~/private_html/background.html`;
      const { stdout: sshOutput2, stderr: sshError2 }= await execa(scpCommand, { shell: true });
      
  
     
      console.log(sshOutput2); // For debugging
  
      if (sshError2) {
        console.error(sshError2);
      }

      //upload teaching page
  
       tempFilePath = path.join(__dirname, 'teachingOutput.html');
      await fs.writeFile(tempFilePath, pages.teachingPage, 'utf8');
  
      // Use scp to transfer the file to the remote server
       scpCommand = `sshpass -p "${password}" scp ${tempFilePath} ${kerberosId}@ssh1.iitd.ac.in:~/private_html/teaching.html`;
      const { stdout: sshOutput3, stderr: sshError3 }= await execa(scpCommand, { shell: true });
      
  
     
      console.log(sshOutput3); // For debugging
  
      if (sshError3) {
        console.error(sshError3);
      }
      console.log('HTML files uploaded successfully to the SSH server.');
  
      // 2. Convert jsonData to a JSON string format
      const jsonDataString = JSON.stringify(jsonData).replace(/"/g, '\\"').replace(/\n/g, '\\n');
  
      // Prepare the command to upload JSON data

  
      // Execute the command to upload JSON file
      const { stdout: jsonStdout, stderr: jsonStderr } = await execa(
         `${sshCommand} "cd ~/private_html && 
        echo '${jsonDataString}' > jsonData.json "`,
        { shell: true }
      );
      console.log(jsonStdout); // For debugging
  
      if (jsonStderr) {
        console.error(jsonStderr);
      }
  
      console.log('jsonData.json file uploaded successfully to the SSH server.');
      return { ok: true };
    } catch (error) {
      console.error('Error during SSH upload:', error.message);
      return { ok: false, error: error.message };
    }
  }
 
  


app.post('/login', async (req ,res)=>{
 
  const {kerberos , password} = req.body;

  const response =await getCurrentJson(kerberos, password);
 
  if(response.ok){
    res.status(200).json({msg:"ok",data:response.data})
    
  }
  else{
    res.json({msg:'error'});
  }

})

app.post('/updatePortfolio', async (req, res) => {
  try {
    const { portfolio: portfolioData, publications: publicationsData,background :backgroundData ,teaching:teachingData, kerberos, password } = req.body;

    // Ensure all these functions return promises
    const [header, footer] = await Promise.all([
      createHeader({name: portfolioData.header.name, title: portfolioData.header.title}),
      createFooter({
        researchAdvisor: portfolioData.researchAdvisor,
        researchLab: portfolioData.researchLab,
        socialMedia: portfolioData.socialMedia,
        email: portfolioData.email
      })
    ]);

    const [aboutPage, publicationsPage , backgroundPage,teachingPage] = await Promise.all([
      createAboutPage(header, footer, portfolioData),
      creatPublicationsPage(header, footer, publicationsData),
      createBackgroundPage(backgroundData ,header , footer),
      createTeachingPage(header,footer , teachingData)
    ]);
    

    const pages = {aboutPage, publicationsPage , backgroundPage, teachingPage};
    
    // Send a preliminary response to prevent timeout
    

    // Upload HTML and images to SSH server
    const response = await uploadHtmlToSSH(kerberos, password, pages,{publicationsData , portfolioData ,backgroundData ,teachingData});
    
    if (response.ok) {
     res.json('portfolio update success')
    } else {
      throw new Error(response.error || 'Failed to update portfolio');
    }
  } catch (error) {
    console.error('Error updating portfolio:', error);
    res.status(500).json({ error: error.message || 'Failed to update portfolio' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
