export const getTestController = async (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Test route works!",
    data: {
      name: "TaskPro API",
    },
  });
};
