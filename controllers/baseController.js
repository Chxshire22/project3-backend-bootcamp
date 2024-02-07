class BaseController {
  constructor(model) {
    this.model = model;
  }

  /* All controllers that extend this BASE controller will have access to the below function **/

  async getAll(req, res) {
    try {
      const output = await this.model.findAll();
      console.log("HELLO WORLD")
      return res.send("HELLO WORLD");
    } catch (err) {
      return res.status(400).json({ error: true, msg: err });
    }
  }
}

module.exports = BaseController;
