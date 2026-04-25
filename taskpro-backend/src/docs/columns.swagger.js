/**
 * @swagger
 * tags:
 *   name: Columns
 *   description: Column management
 */

/**
 * @swagger
 * /columns:
 *   post:
 *     summary: Create column
 *     tags: [Columns]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             title: To Do
 *             boardId: BOARD_ID
 *     responses:
 *       201:
 *         description: Column created
 */

/**
 * @swagger
 * /columns/{boardId}:
 *   get:
 *     summary: Get columns by board
 *     tags: [Columns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *     responses:
 *       200:
 *         description: Columns list
 */

/**
 * @swagger
 * /columns/{columnId}:
 *   patch:
 *     summary: Update column
 *     tags: [Columns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: columnId
 *         required: true
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             title: In Progress
 *     responses:
 *       200:
 *         description: Column updated
 */

/**
 * @swagger
 * /columns/{columnId}:
 *   delete:
 *     summary: Delete column
 *     tags: [Columns]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: columnId
 *         required: true
 *     responses:
 *       204:
 *         description: Column deleted
 */