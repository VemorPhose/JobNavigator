import fs from 'fs';
import pkg from 'pg';
const { Client } = pkg;
import OpenAI from 'openai';
import { useNavigate } from "react-router-dom";

const token = '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';  
const client = new OpenAI({
  baseURL: "https://models.inference.ai.azure.com",
  apiKey: token
});

async function getJobRecommendations(resumeText) {
  try {
    const response = await client.chat.completions.create({
      messages: [
        { role: "system", content: "You are a job recommendation assistant." },
        { role: "user", content: `Here is the resume: ${resumeText}. Suggest possible jobs or internships. Only give 5 job/internship names, only generic job/internship title nothing else, like a csv file not a list` }
      ],
      model: "gpt-4o",  
      temperature: 1,
      max_tokens: 4096,
      top_p: 1
    });

    const outputText = response.choices[0].message.content;

    fs.writeFileSync("C:\\Users\\shour\\Desktop\\JobNavigator\\client\\scripts\\job_suggestions.txt", outputText);
    console.log('Response saved to job_suggestions.txt');

    return outputText;
  } catch (error) {
    console.error('Error interacting with the model:', error);
    throw error;
  }
}

// Function to read the output file and query the database
async function queryDatabaseForJobs() {

  const outputText = fs.readFileSync('job_suggestions.txt', 'utf-8');
  console.log('Model Response:', outputText);

  const jobSuggestions = extractJobSuggestions(outputText);

  const dbClient = new Client({
    user: 'yourUsername',
    host: 'localhost',
    database: 'jobsDB',
    password: 'yourPassword',
    port: 5432,
  });

  await dbClient.connect();

  try {
    const query = `
      SELECT * FROM jobs
      WHERE title = ANY($1)
    `;
    const res = await dbClient.query(query, [jobSuggestions]);
    console.log('Matching Jobs:', res.rows);
  } catch (err) {
    console.error('Error querying the database:', err);
  } finally {
    await dbClient.end();
  }
}

function extractJobSuggestions(responseText) {
  // For example, extracting job titles from a simple comma-separated string
  const jobTitles = responseText
    .split('\n')
    .filter(line => line.trim().length > 0)  // Clean empty lines
    .map(line => line.replace(/[^\w\s]/gi, '').trim())  // Remove non-alphanumeric characters
    .filter(line => line.length > 3);  // Ignore very short lines (not likely to be job titles)

  return jobTitles;
}

async function main() {
  const resumeText = location.state?.text;

  try {
    
    await getJobRecommendations(resumeText);

    
    //await queryDatabaseForJobs();
  } catch (err) {
    console.error('Error during the process:', err);
  }
}

main();
