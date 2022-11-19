var bowl = function (game) {
  this.game = game;
  this.x = 0;
  this.y = 350;
  var self = this;

  move = function (event) {
    self.proccessMouseMove(event);
  };

  this.proccessMouseMove = function (event) {
    var rect = self.game.canvas.getBoundingClientRect();
    this.x = event.clientX - rect.left - this.game.resource.bowl.img.width / 2;
  };

  this.init = function () {
    this.game.canvas.addEventListener("mousemove", move);
  };
  //cant move the bowl when game was stopped 
  this.stop = function () {
    this.game.canvas.removeEventListener("mousemove", move);
  };

  this.update = function () {};

  this.draw = function () {
    this.game.context.drawImage(this.game.resource.bowl.img, this.x, this.y);
  };
};
