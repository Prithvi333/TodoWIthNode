const todoCache = (client) => async (req, res, next) => {
  try {
    const todoData = await client.get("todos");
    if (todoData != "") {
      res.status(200).json({ Todos: JSON.parse(todoData) });
    } else next();
  } catch (error) {
    res.status(401).json({ error: error });
  }
};
module.exports = todoCache;
