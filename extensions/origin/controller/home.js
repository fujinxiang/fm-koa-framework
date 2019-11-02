const Controller = require('../../../Controller');

class HomeController extends Controller {
  async index() {
    await this.ctx.render('hello');
  }
}

module.exports = HomeController;