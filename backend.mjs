import express from 'express';
import { promises as fs } from 'fs'; // Using destructuring to access `fs.promises`
import path from 'path';
import cors from 'cors';
import { execa } from 'execa';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Your upload directory
  },
  filename: function (req, file, cb) {
    // Get the file extension
    const fileExt = path.extname(file.originalname);
   
    
    // Create filename: timestamp + original extension
    const uniqueFilename = `${file.fieldname}${fileExt}`;
    
 ;
    
    cb(null, uniqueFilename);
  }
});

const fileFilter = (req, file, cb) => {
  // Accept images only
  if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
    req.fileValidationError = 'Only image files are allowed!';
    return cb(new Error('Only image files are allowed!'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB limit
  }
}).fields([
  { name: 'profilePicture', maxCount: 1 },
  { name: 'backgroundImage', maxCount: 1 }
]);



// Convert import.meta.url to a file path
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);





const app = express();
app.use(cors());

// app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

const PORT = process.env.PORT || 3000;
const ABOUT_PATH = path.join(__dirname, 'aboutTemplate.html');
const FOOTER_PATH = path.join(__dirname, 'footerTemplate.html');
const HEADER_PATH = path.join(__dirname, 'headerTemplate.html');
const PUBLICATIONS_PATH = path.join(__dirname, 'publicationsTemplate.html');
const BACKGROUND_PATH = path.join(__dirname, 'backgroundTemplate.html');
const TEACHING_PATH = path.join(__dirname, 'teachingTemplate.html');
const PROJECTS_PATH = path.join(__dirname, 'projectsTemplate.html');
const RESEARCH_PATH = path.join(__dirname, 'researchTemplate.html');

async function createProjectsPage(header, footer, projectData) {
  try {
    // Read the template file
    const projectTemplate = await fs.readFile(PROJECTS_PATH, 'utf-8');
    
    // Generate sidebar navigation HTML
    const sidebarNavigationHtml = Object.keys(projectData).map(sectionName => `
      <div class="nav-item" data-section="${sectionName.toLowerCase()}" onclick="showSection('${sectionName.toLowerCase()}')">
        ${sectionName}
      </div>
    `).join('');

    // Generate project sections HTML
    const projectSectionsHtml = Object.entries(projectData).map(([sectionName, projects]) => {
      // Filter out entries with empty title and description
      const validProjects = projects.filter(project => project.title || project.description);
      
      // Generate HTML for each project in the section
      const projectEntriesHtml = validProjects.map(project => `
        <div class="project-entry">
          <span class="project-title">${project.title}</span>
          ${project.description ? `
            <p class="project-description">
              ${project.description}
            </p>
          ` : ''}
        </div>
      `).join('');

      // Return the complete section HTML
      return `
        <div id="${sectionName.toLowerCase()}" class="section">
          <h2>${sectionName}</h2>
          ${projectEntriesHtml}
        </div>
      `;
    }).join('');

    // Replace placeholders in the template
    const completePage = projectTemplate
      .replace('{header}', header)
      .replace('{footer}', footer)
      .replace('{sidebarNavigation}', sidebarNavigationHtml)
      .replace('{projectSections}', projectSectionsHtml);

    return completePage;
  } catch (error) {
    console.error('Error generating project page:', error);
    throw error;
  }
}

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




async function createResearchPage(header, footer, research) {
  const researchTemplate = await fs.readFile(RESEARCH_PATH, 'utf-8');
  
  // Generate navigation items for sidebar
  const sectionNames = Object.keys(research);
  const sidebarNavigationHtml = sectionNames.map((section, index) => `
    <div class="nav-item" 
         data-section="section-${index}" 
         onclick="showSection('section-${index}')">
      ${section}
    </div>
  `).join('');

  // Generate HTML for research sections based on section type
  const researchSectionsHtml = sectionNames.map((sectionName, index) => {
    const items = research[sectionName];
    let itemsHtml = '';

    switch(sectionName) {
      case 'Research Interests':
        itemsHtml = items.filter(item => item.title || item.description)
          .map(item => `
            <div class="interest-entry">
              <div class="interest-title">${item.title}</div>
              <div class="research-description">${item.description}</div>
            </div>
          `).join('');
        break;

      case 'PhD Thesis':
      case 'Undergraduate Thesis':
        itemsHtml = items.filter(item => item.title || item.description)
          .map(item => `
            <div class="thesis-entry">
              <div class="thesis-title">${item.title}</div>
              <div class="research-description">${item.description}</div>
            </div>
          `).join('');
        break;

      case 'Research Projects':
      case 'Term Papers':
        itemsHtml = items.filter(item => item.title || item.description)
          .map(item => `
            <div class="project-entry">
              ${item.timeframe ? 
                `<div class="timeframe-badge">${item.timeframe}</div>` : 
                ''}
              <div class="research-title">${item.title}</div>
              <div class="research-description">${item.description}</div>
            </div>
          `).join('');
        break;

      default:
        // Default format for any custom sections
        itemsHtml = items.filter(item => item.title || item.description)
          .map(item => `
            <div class="research-entry">
              ${item.timeframe ? 
                `<div class="research-timeframe">${item.timeframe}</div>` : 
                ''}
              <div class="research-title">${item.title}</div>
              <div class="research-description">${item.description}</div>
            </div>
          `).join('');
    }

    return `
      <div id="section-${index}" class="section ${index === 0 ? 'active' : ''}">
        <h2>${sectionName}</h2>
        ${itemsHtml}
      </div>
    `;
  }).join('');

  // Replace placeholders in template with generated HTML
  return researchTemplate
    .replace('{header}', header)
    .replace('{footer}', footer)
    .replace('{sidebarNavigation}', sidebarNavigationHtml)
    .replace('{researchSections}', researchSectionsHtml);
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

let backgroundImage;
if(!headerData.backgroundImage){
  backgroundImage='backgroundImage.jpg'
}
else{
  backgroundImage= headerData.backgroundImage;
}

return  headerTemplate
.replace(/{{NAME}}/g, headerData.name || 'Your Name')
.replace('{{BACKGROUNDIMAGE}}',`url(./assets/${backgroundImage})`)
.replace('{{PROFILEPICTURE}}',`./assets/${headerData.profilePicture}`)


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
    //fetch images


  }
  
 
  
  
  class SSHUploader {
    constructor(kerberosId, password) {
      this.kerberosId = kerberosId;
      this.password = password;
      this.sshCommand = `sshpass -p "${password}" ssh ${kerberosId}@ssh1.iitd.ac.in`;
      this.scpBaseCommand = `sshpass -p "${password}" scp`;
      this.remoteBasePath = '~/private_html';
    }
  
    async executeSSHCommand(command, errorMessage = 'SSH command failed') {
      try {
        const { stdout, stderr } = await execa(command, { shell: true });
        if (stderr) {
          console.error(`Error: ${stderr}`);
        }
        return stdout;
      } catch (error) {
        throw new Error(`${errorMessage}: ${error.message}`);
      }
    }
  
    async uploadFile(localPath, remotePath) {
      const scpCommand = `${this.scpBaseCommand} ${localPath} ${this.kerberosId}@ssh1.iitd.ac.in:${this.remoteBasePath}/${remotePath}`;
      return this.executeSSHCommand(scpCommand, `Failed to upload ${remotePath}`);
    }
  
    async writeAndUploadFile(content, filename) {
      const tempFilePath = path.join(__dirname, `temp_${filename}`);
      try {
        await fs.writeFile(tempFilePath, content, 'utf8');
        await this.uploadFile(tempFilePath, filename);
      } finally {
        try {
          await fs.unlink(tempFilePath);
        } catch (error) {
          console.error(`Failed to delete temporary file ${tempFilePath}:`, error);
        }
      }
    }
  
    async uploadAsset(localPath, remoteFilename) {
      await this.uploadFile(localPath, `assets/${remoteFilename}`);
    }
  
    async initializeDirectory() {
      await this.executeSSHCommand(
        `${this.sshCommand} "cd ~ && mkdir -p ${this.remoteBasePath}/assets"`,
        'Failed to initialize directory structure'
      );
    }
  }
  
  async function uploadHtmlToSSH(kerberosId, password, pages, jsonData) {
    const uploader = new SSHUploader(kerberosId, password);
    
    try {
      console.log('Starting upload process...');
  
      // Initialize directory structure
      await uploader.initializeDirectory();
  
      // Define page uploads
      const pageUploads = [
        { content: pages.aboutPage, filename: 'index.html' },
        { content: pages.publicationsPage, filename: 'publications.html' },
        { content: pages.backgroundPage, filename: 'background.html' },
        { content: pages.teachingPage, filename: 'teaching.html' },
        { content: pages.projectsPage, filename: 'projects.html' },
        { content: pages.researchPage, filename: 'research.html' }
      ];
  
      // Upload all pages in parallel
      await Promise.all(
        pageUploads.map(({ content, filename }) =>
          uploader.writeAndUploadFile(content, filename)
        )
      );
  
      // Upload JSON data
      const jsonDataString = JSON.stringify(jsonData);
      await uploader.executeSSHCommand(
        `${uploader.sshCommand} "cd ${uploader.remoteBasePath} && echo '${jsonDataString.replace(/"/g, '\\"')}' > jsonData.json"`,
        'Failed to upload JSON data'
      );
  
      // Clean up existing assets directory
      await uploader.executeSSHCommand(
        `${uploader.sshCommand} "cd ${uploader.remoteBasePath} && rm -rf assets && mkdir -p assets"`,
        'Failed to clean up assets directory'
      );
  
      // Upload images
      const imagesToUpload = [];

      if (jsonData.profilePicture) {
        imagesToUpload.push({ path: `uploads/${jsonData.profilePicture}`, filename: jsonData.profilePicture });
      }
      
      if (jsonData.backgroundImage) {
        imagesToUpload.push({ path: `uploads/${jsonData.backgroundImage}`, filename: jsonData.backgroundImage });
      }
      else{
        imagesToUpload.push({ path: `src/assets/backgroundImage.jpg`, filename: 'backgroundImage.jpg' });
      }
     
      console.log(imagesToUpload)
  
      await Promise.all(
        imagesToUpload.map(({ path: localPath, filename }) =>
          uploader.uploadAsset(localPath, filename)
        )
      );
  
      // Clean up local image files
      await Promise.all(
        imagesToUpload.map(({ path }) => {
          if (path !== "src/assets/backgroundImage.jpg") {
            return fs.unlink(path);
          }
          return Promise.resolve();
        })
      );
  
      console.log('Upload process completed successfully');
      return { ok: true };
  
    } catch (error) {
      console.error('Error during SSH upload:', error.message);
      return { ok: false, error: error.message };
    }
  }
  
 
  


app.post('/login',express.json(), async (req ,res)=>{
 
  const {kerberos , password} = req.body;
  console.log(kerberos , password)

  const response =await getCurrentJson(kerberos, password);
 
  if(response.ok){
    res.status(200).json({msg:"ok",data:response.data})
    
  }
  else{
    res.json({msg:'error'});
  }

})

app.post('/updatePortfolio',upload, async (req, res) => {

  try {
    const images = req.files;
    console.log(images);
   
    
    const portfolioData = JSON.parse(req.body.portfolio || '{}');
    const publicationsData = JSON.parse(req.body.publications || '{}');
    const backgroundData  = JSON.parse(req.body.background || '{}');
    const teachingData  = JSON.parse(req.body.teaching || '{}');
    const projectsData  = JSON.parse(req.body.projects || '{}');
    const researchData  = JSON.parse(req.body.research || '{}');
    const kerberos  = req.body.kerberos;
    const password  = req.body.password;
    let background, profile;
    if(images.backgroundImage){
      background=images.backgroundImage[0].filename;

    }
    
 
    if(images.profilePicture){
      profile = images.profilePicture[0].filename;
    }
    // Ensure all these functions return promises
    const [header, footer] = await Promise.all([
      createHeader({name: portfolioData.header.name ,profilePicture:profile , backgroundImage:background}),
      createFooter({
        researchAdvisor: portfolioData.researchAdvisor,
        researchLab: portfolioData.researchLab,
        socialMedia: portfolioData.socialMedia,
        email: portfolioData.email
      })
    ]);

    const [aboutPage, publicationsPage , backgroundPage,teachingPage , projectsPage ,researchPage] = await Promise.all([
      createAboutPage(header, footer, portfolioData),
      creatPublicationsPage(header, footer, publicationsData),
      createBackgroundPage(backgroundData ,header , footer),
      createTeachingPage(header,footer , teachingData) ,
      createProjectsPage(header,footer , projectsData),
      createResearchPage(header,footer , researchData),
    ]);
    

    const pages = {aboutPage, publicationsPage , backgroundPage, teachingPage , projectsPage ,researchPage};
    
    // Send a preliminary response to prevent timeout
    

    // Upload HTML and images to SSH server
  
    const response = await uploadHtmlToSSH(kerberos, password, pages,{publicationsData , portfolioData ,
      backgroundData ,teachingData ,projectsData ,researchData ,profilePicture: profile , backgroundImage: background});
    
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
