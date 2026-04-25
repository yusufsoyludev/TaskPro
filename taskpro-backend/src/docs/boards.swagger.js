/**
 * @swagger
 * tags:
 *   name: Boards
 *   description: Board management
 */

/**
 * @swagger
 * /boards:
 *   post:
 *     summary: Create board
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           example:
 *             title: Project Office
 *             icon: default
 *             background: ""
 *     responses:
 *       201:
 *         description: Board created
 */

/**
 * @swagger
 * /boards:
 *   get:
 *     summary: Get all boards
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of boards
 */

/**
 * @swagger
 * /boards/{boardId}:
 *   get:
 *     summary: Get board by ID
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Board found
 */

/**
 * @swagger
 * /boards/{boardId}:
 *   patch:
 *     summary: Update board
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       content:
 *         application/json:
 *           example:
 *             title: Updated Board
 *     responses:
 *       200:
 *         description: Board updated
 */

/**
 * @swagger
 * /boards/{boardId}:
 *   delete:
 *     summary: Delete board
 *     tags: [Boards]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: boardId
 *         required: true
 *     responses:
 *       204:
 *         description: Board deleted
 */