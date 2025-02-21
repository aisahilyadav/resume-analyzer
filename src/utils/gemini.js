const { GoogleGenerativeAI } = require('@google/generative-ai');

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const parseResumeWithGemini = async (text) => {
  const model = genAI.getGenerativeModel({ model: "gemini-pro" });

  const prompt = `
    Parse the following resume text and return a JSON object with the following structure:
    {
      "name": extract full name,
      "email": extract email,
      "education": {
        "degree": highest degree obtained,
        "branch": field of study,
        "institution": university/college name,
        "year": graduation year
      },
      "experience": {
        "job_title": most recent job title,
        "company": most recent company,
        "start_date": start date of most recent job,
        "end_date": end date of most recent job (or "Present")
      },
      "skills": [list of technical and soft skills],
      "summary": write a brief professional summary based on the resume
    }

    Resume text:
    ${text}
  `;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return JSON.parse(response.text());
};

module.exports = { parseResumeWithGemini }; 