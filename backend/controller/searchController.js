import Course from "../model/courseModel.js"
import { GoogleGenerativeAI } from "@google/generative-ai"; 
import dotenv from 'dotenv'
dotenv.config()

export const searchWithAi = async (req, res) => {
    try {
        const { input } = req.body
        if (!input) {
            return res.status(400).json({ message: "Search query is required" })
        }

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash" 
});

        const prompt = `You are an intelligent assistant for an LMS platform. A user will type any query about what they want to learn. Your task is to understand the intent and return one most relevant keywords from the following list of course categories and levels:
- App Development
- AI/ML
- AI Tools
- Data Science
- Data Analytics
- Ethical Hacking
- UI UX Designing
- Web Development
- Others
- Beginner
- Intermediate
- Advanced 
Only reply with one single keyword from the list above that best matches the query. Do not explain anything. No extra text.
Query: ${input}`

        let keyword = input; 

        try {
            const result = await model.generateContent(prompt);
            const response = await result.response;
            keyword = response.text().trim(); 
            console.log("AI Keyword Found:", keyword); 
        } catch (aiError) {
            console.error("Gemini Error:", aiError.message);
        }

        const courses = await Course.find({
            isPublished: true,
            $or: [
                { title: { $regex: input, $options: 'i' } },
                { subTitle: { $regex: input, $options: 'i' } },
                { description: { $regex: input, $options: 'i' } },
                { category: { $regex: input, $options: 'i' } },
                { level: { $regex: input, $options: 'i' } }
            ]
        });

        if (courses.length > 0) {
            return res.status(200).json(courses)
        } else {
            const coursesByKeyword = await Course.find({
                isPublished: true,
                $or: [
                    { title: { $regex: keyword, $options: 'i' } },
                    { subTitle: { $regex: keyword, $options: 'i' } },
                    { description: { $regex: keyword, $options: 'i' } },
                    { category: { $regex: keyword, $options: 'i' } },
                    { level: { $regex: keyword, $options: 'i' } }
                ]
            });
            return res.status(200).json(coursesByKeyword)
        }

    } catch (error) {
        console.error("Full Error:", error); 
        return res.status(500).json({ message: `failed to search` })
    }
}