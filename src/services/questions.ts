import Question from "../models/Question.js";
import { IAnswer } from "../models/User.js";

export async function checkAnswers({
    questionId,
    answers,
}: {
    questionId: string;
    answers: string[];
}): Promise<IAnswer | { err: string }> {
    const question = await Question.findById(questionId);
    if (!question) throw new Error("Question not found");

    const choices = question.choices;
    if (choices === undefined) {
        return { err: "message" }
    }
    // kelgan javoblarni index bo‘yicha tekshirish
    const results = answers.map((ans, idx) => {
        return choices[idx] === ans;
    });

    const score = results.filter(Boolean).length;

    return {
        examId: questionId,
        results,        // [true, false, ...]
        score,
        total: results.length,
        answers,
        submittedAt: new Date()
    };
}
