### **JobYatra - AI-Powered Job Recommendation Platform**  

**Description:**  
JobYatra is an AI-powered web application designed to simplify the job search process by providing personalized job recommendations. Users can upload their resumes, and the platform intelligently analyzes their skills, experiences, and proficiencies. Leveraging web scraping and advanced NLP models, JobYatra searches popular job posting websites and delivers curated job openings that align with the user's profile.  

**Key Features:**  
- 📄 **Resume Analysis:** Extracts skills, experiences, and qualifications from uploaded resumes.  
- 🤖 **AI-Based Matching:** Matches user profiles with relevant job postings using advanced machine learning and NLP models.  
- 🌐 **Real-Time Job Scraping:** Gathers job listings from top platforms like LinkedIn, Indeed, and Naukri.  
- 📊 **Personalized Recommendations:** Provides role-specific job suggestions tailored to user skills.  
- 🔍 **Skill Gap Insights:** Highlights missing skills and suggests learning resources for career growth.  
- 🚀 **User-Friendly Interface:** Clean and responsive web design for a seamless user experience.  

**Tech Stack:**  
- **Frontend:** React.js, Tailwind CSS  
- **Backend:** Node, Express, Python, BeautifulSoup/Scrapy  
- **Machine Learning:** SpaCy, Scikit-learn, Transformers (Hugging Face)  
- **Database:** PostgreSQL  
- **Deployment:** Docker, Heroku/Vercel  

**Future Enhancements:**  
- Integration with learning platforms for skill improvement.  
- Email notifications for new job matches.  
- Advanced filtering by location, company, and salary range.  

Empower your career search with **JobYatra**—where your skills meet opportunity.

### **Getting Started**

Follow these steps to set up JobYatra on your local machine:

**Note:** Make sure you have Node.js, npm and PostgreSQL installed on your machine before starting the setup process.

**1. Clone the Repository:**
```bash
git clone https://github.com/yourusername/JobYatra.git
cd JobYatra
```

**2. Set Up Client:**
```bash
cd client
npm install
```

**3. Set Up Server:**
```bash
cd ../server
npm install
```

**4. Environment Configuration:**
Create a `.env` file in the server directory with the following format:
```bash
OPENAI_API_KEY={insert your api key here}
OPENAI_BASE_URL={https://models.inference.ai.azure.com}
DB_USER={your_db_username)
DB_HOST={your_db_host/localhost}
DB_NAME={your_db_name}
DB_PASSWORD={your_db_password}
DB_PORT={your_db_port/5432}
```

**5. Run the Application:**

Start the server:
```bash
cd server
npm run dev
```

In a new terminal, start the client:
```bash
cd client
npm run dev
```

The application should now be running on:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`
