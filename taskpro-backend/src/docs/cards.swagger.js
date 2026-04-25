/**
 * @swagger
 * tags:
 *   name: Cards
 *   description: Card management
 */

/**
 * @swagger
 * /cards:
 *   post:
 *     summary: Create card
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             title: Task 1
 *             description: Test task
 *             priority: high
 *             deadline: 2026-05-01
 *             columnId: COLUMN_ID
 *     responses:
 *       201:
 *         description: Card created
 */

/**
 * @swagger
 * /cards/{columnId}:
 *   get:
 *     summary: Get cards by column
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: columnId
 *         required: true
 *     responses:
 *       200:
 *         description: Cards list
 */

/**
 * @swagger
 * /cards/{cardId}:
 *   patch:
 *     summary: Update card
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *     responses:
 *       200:
 *         description: Card updated
 */

/**
 * @swagger
 * /cards/{cardId}:
 *   delete:
 *     summary: Delete card
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *     responses:
 *       204:
 *         description: Card deleted
 */

/**
 * @swagger
 * /cards/{cardId}/move:
 *   patch:
 *     summary: Move card to another column
 *     tags: [Cards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: cardId
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             targetColumnId: COLUMN_ID
 *     responses:
 *       200:
 *         description: Card moved
 */