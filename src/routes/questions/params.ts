/**
 * @swagger
 * tags:
 *   name: Questions
 *   description: Question management
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     Question:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *         title:
 *           type: string
 *         slug:
 *           type: string
 *         type:
 *           type: string
 *           enum: [multiple_choice, essay, fill_blank, listening, speaking, matching]
 *         bodyMarkdown:
 *           type: string
 *         choices:
 *           type: array
 *           items:
 *             type: string   # ✅ endi string[]
 *         metadata:
 *           type: object
 *           additionalProperties: true
 *         attachments:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               url:
 *                 type: string
 *               type:
 *                 type: string
 *         createdBy:
 *           type: string
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         tags:
 *           type: array
 *           items:
 *             type: string
 *         published:
 *           type: boolean
 */

/**
 * @swagger
 * /questions/create:
 *   post:
 *     summary: Create a new question
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Question'
 *     responses:
 *       201:
 *         description: Question created successfully
 *       400:
 *         description: Invalid data
 */

/**
 * @swagger
 * /questions/list:
 *   post:
 *     summary: Get all questions
 *     tags: [Questions]
 *     requestBody:
 *       required: false
 *     responses:
 *       200:
 *         description: List of questions
 */

/**
 * @swagger
 * /questions/get-one:
 *   post:
 *     summary: Get a question by ID
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Question ID
 *     responses:
 *       200:
 *         description: A question object
 *       404:
 *         description: Question not found
 */

/**
 * @swagger
 * /questions/update:
 *   post:
 *     summary: Update a question by ID
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             allOf:
 *               - type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Question ID
 *               - $ref: '#/components/schemas/Question'
 *     responses:
 *       200:
 *         description: Question updated
 *       404:
 *         description: Question not found
 */

/**
 * @swagger
 * /questions/delete:
 *   post:
 *     summary: Delete a question by ID
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: string
 *                 description: Question ID
 *     responses:
 *       200:
 *         description: Question deleted
 *       404:
 *         description: Question not found
 */

/**
 * @swagger
 * /questions/check-answers:
 *   post:
 *     summary: Check answers for a question
 *     tags: [Questions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               questionId:
 *                 type: string
 *                 example: "66ed1b7c8a9f4d6c1a123456"
 *               answers:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["Single", "Double", "Triple"]
 *     responses:
 *       200:
 *         description: Answer check results
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 questionId:
 *                   type: string
 *                   example: "66ed1b7c8a9f4d6c1a123456"
 *                 results:
 *                   type: array
 *                   items:
 *                     type: boolean
 *                   example: [true, false, true]
 *                 score:
 *                   type: integer
 *                   example: 2
 *                 total:
 *                   type: integer
 *                   example: 3
 *                 answers:
 *                   type: array
 *                   items:
 *                     type: string
 *                   example: ["Single", "Double", "Triple"]
 *       400:
 *         description: Invalid request
 *       404:
 *         description: Question not found
 */
