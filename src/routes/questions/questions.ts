import express from "express";
import Question from "../../models/Question.js"; // IQuestion dan model ochib qo'yilgan deb olamiz
import { checkAnswers } from "../../services/questions.js";
import User, { IAnswer } from "../../models/User.js";



const router = express.Router();

/**
 * CREATE
 * POST /create
 */
router.post("/create", async (req, res) => {
    try {
        const question = new Question(req.body);
        await question.save();
        res.status(201).json(question);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
});

/**
 * READ ALL
 * POST /list
 */
router.post("/list", async (_req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

/**
 * READ ONE
 * POST /get-one
 * body: { id: string }
 */
router.post("/get-one", async (req, res) => {
    try {
        const { id } = req.body;
        const question = await Question.findById(id);
        if (!question) return res.status(404).json({ error: "Question not found" });
        res.json(question);
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});

/**
 * UPDATE
 * POST /update
 * body: { id: string, ...updates }
 */
router.post("/update", async (req, res) => {
    try {
        const { id, ...updates } = req.body;
        const question = await Question.findByIdAndUpdate(
            id,
            { ...updates, updatedAt: new Date() },
            { new: true }
        );
        if (!question) return res.status(404).json({ error: "Question not found" });
        res.json(question);
    } catch (err) {
        res.status(400).json({ error: (err as Error).message });
    }
});

/**
 * DELETE
 * POST /delete
 * body: { id: string }
 */
router.post("/delete", async (req, res) => {
    try {
        const { id } = req.body;
        const question = await Question.findByIdAndDelete(id);
        if (!question) return res.status(404).json({ error: "Question not found" });
        res.json({ message: "Question deleted successfully" });
    } catch (err) {
        res.status(500).json({ error: (err as Error).message });
    }
});




/**
 * CHECK ANSWERS
 * POST /check-answers
 * body: { questionId:string, answers:string }
 */
router.post("/check-answers", async (req, res) => {
    try {
        const { questionId, answers, email } = req.body;


        if (!questionId || !Array.isArray(answers)) {
            return res.status(400).json({ error: "questionId and answers are required" });
        }
        const user = await User.findOne({ email, active: true })
        const result: IAnswer | { err: string } = await checkAnswers({ questionId, answers });

        if ("err" in result) {
            return res.status(400).json(result);
        }

        user?.answers.push(result);
        await user?.save()

        res.json(result);

    } catch (err) {

        if ((err as Error).message === "Question not found") {
            return res.status(404).json({ error: "Question not found" });
        }

        res.status(500).json({ error: (err as Error).message });

    }
});


export default router;
