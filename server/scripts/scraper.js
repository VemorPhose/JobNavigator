import puppeteer from "puppeteer";

async function scrapeLinkedIn(jobTitle, location) {
    const searchUrl = `https://www.linkedin.com/jobs-guest/jobs/api/seeMoreJobPostings/search?keywords=${encodeURIComponent(jobTitle)}&location=${encodeURIComponent(location)}`;

    const browser = await puppeteer.launch({ headless: true });
    const page = await browser.newPage();
    
    await page.goto(searchUrl, { waitUntil: "domcontentloaded" });

    // Extract job listings with additional details
    const jobListings = await page.evaluate(() => {
        return Array.from(document.querySelectorAll(".base-search-card")).map(job => ({
            title: job.querySelector(".base-search-card__title")?.innerText.trim() || "N/A",
            company: job.querySelector(".base-search-card__subtitle")?.innerText.trim() || "N/A",
            location: job.querySelector(".job-search-card__location")?.innerText.trim() || "N/A",
            experience: job.querySelector(".job-card-container__experience-level")?.innerText.trim() || "Not specified",
            skills: job.querySelector(".job-card-container__skills")?.innerText.trim() || "Not specified",
            salary: job.querySelector(".salary")?.innerText.trim() || "Not disclosed",
            jobType: job.querySelector(".job-card-container__metadata-item")?.innerText.trim() || "Unknown",
            postedDate: job.querySelector(".job-search-card__listdate")?.innerText.trim() || "Not specified",
            link: job.querySelector("a")?.href || "No link available"
        }));
    });

    await browser.close();

    console.log(jobListings);
}

// Example usage - Fetching job title and location dynamically
const jobTitle = process.argv[2] || "Data Analyst";  // Change dynamically via command-line
const location = process.argv[3] || "India";             // Change dynamically via command-line

scrapeLinkedIn(jobTitle, location);
