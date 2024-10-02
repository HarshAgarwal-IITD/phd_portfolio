
import express from 'express';
import { promises as fs } from 'fs'; // Using destructuring to access `fs.promises`
import path from 'path';
import cors from 'cors';
import { execa } from 'execa';

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3000;
const TEMPLATE_PATH = path.join("/home/jdppc01/Desktop/phd_portfolio/mvp/", 'template.html');
const OUTPUT_PATH = path.join("/home/jdppc01/Desktop/phd_portfolio/mvp/", 'output.html');

async function uploadHtmlAndImagesToSSH(kerberosId, password, htmlContent, images) {
  try {
    // Prepare SSH connection details
    const sshCommand = `sshpass -p "${password}" ssh ${kerberosId}@ssh1.iitd.ac.in`;

    // 1. Upload the HTML file to the server
    const { stdout: sshOutput, stderr: sshError } = await execa(
      `${sshCommand} "cd ~ && mkdir -p private_html && cd private_html && touch index.html && echo '${htmlContent}' > index.html"`,
      { shell: true }
    );

    console.log(sshOutput); // For debugging
    if (sshError) {
      console.error(sshError);
    }

    console.log('HTML file uploaded successfully to the SSH server.');

    // 2. Upload images using scp
    for (const image of images) {
      if (image.localPath) {
        const scpCommand = `sshpass -p "${password}" scp ${image.localPath} ${kerberosId}@ssh1.iitd.ac.in:~/private_html/${image.serverFileName}`;
        console.log(`Executing: ${scpCommand}`);

        const { stdout: scpOutput, stderr: scpError } = await execa(scpCommand, { shell: true });
        console.log(scpOutput); // For debugging

        if (scpError) {
          console.error(`Failed to upload image ${image.localPath}:`, scpError);
        } else {
          console.log(`Image uploaded successfully: ${image.serverFileName}`);
        }
      }
    }
  } catch (error) {
    console.error('Error during SSH upload:', error.message);
  }
}

app.post('/api/updatePortfolio', async (req, res) => {
  try {
    const portfolioData = req.body;

    // Read the template file
    let template = await fs.readFile(TEMPLATE_PATH, 'utf-8');

    // Replace placeholders with actual data
    template = template.replace('{{NAME}}', portfolioData.header.name);
    template = template.replace('{{TITLE}}', portfolioData.header.title);
    template = template.replace('{{PROFILE_PICTURE}}', portfolioData.header.profilePicture);
    template = template.replace('{{BACKGROUND_IMAGE}}', portfolioData.header.backgroundImage);

    // Navigation
    let navHtml = portfolioData.navigation.map(item => `<a href="#${item.toLowerCase()}">${item}</a>`).join('\n');
    template = template.replace('{{NAVIGATION}}', navHtml);

    // About Me
    template = template.replace('{{ABOUT_ME}}', portfolioData.aboutMe);

    // Research Advisor
    template = template.replace('{{ADVISOR_NAME}}', portfolioData.researchAdvisor.name);
    template = template.replace('{{ADVISOR_TITLE}}', portfolioData.researchAdvisor.title);
    template = template.replace('{{ADVISOR_DEPARTMENT}}', portfolioData.researchAdvisor.department);
    template = template.replace('{{ADVISOR_INSTITUTION}}', portfolioData.researchAdvisor.institution);

    // Research Lab
    template = template.replace('{{LAB_NAME}}', portfolioData.researchLab.name);
    template = template.replace('{{LAB_DEPARTMENT}}', portfolioData.researchLab.department);
    template = template.replace('{{LAB_INSTITUTION}}', portfolioData.researchLab.institution);
    template = template.replace('{{LAB_ADDRESS}}', portfolioData.researchLab.address);

    // Social Media
    template = template.replace('{{GITHUB_URL}}', portfolioData.socialMedia.github);
    template = template.replace('{{TWITTER_URL}}', portfolioData.socialMedia.twitter);
    template = template.replace('{{LINKEDIN_URL}}', portfolioData.socialMedia.linkedin);

    // Email
    template = template.replace('{{EMAIL}}', portfolioData.email);

    // Write the updated content to the output file
    await fs.writeFile(OUTPUT_PATH, template);

    // List of images to upload
    const images = [
      { localPath: portfolioData.header.profilePicture, serverFileName: 'profile0.jpeg' },
      { localPath: portfolioData.header.backgroundImage, serverFileName: 'background.jpeg' }
    ];

    // Upload HTML and images to SSH server
    await uploadHtmlAndImagesToSSH(req.body.kerberos, req.body.password, template, images);

    res.json({ message: 'Portfolio updated successfully' });
  } catch (error) {
    console.error('Error updating portfolio:', error);
    res.status(500).json({ error: 'Failed to update portfolio' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
