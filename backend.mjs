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
     console.log(fileContent);
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
        console.error(sshError);
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
    const { portfolio: portfolioData, publications: publicationsData, kerberos, password } = req.body;

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

    const [aboutPage, publicationsPage] = await Promise.all([
      createAboutPage(header, footer, portfolioData),
      creatPublicationsPage(header, footer, publicationsData)
    ]);
    

    const pages = {aboutPage, publicationsPage};
    
    // Send a preliminary response to prevent timeout
    

    // Upload HTML and images to SSH server
    const response = await uploadHtmlToSSH(kerberos, password, pages,{publicationsData , portfolioData});
    
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
