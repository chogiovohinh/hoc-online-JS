var game = function () {
  this.canvas = null;
  this.context = null;
  this.resource = null;
  this.chickens = [];
  this.eggs = [];
  this.bar = null;
  this.bowl = null;
  this.resourceLoaded = false; // cái này kiểm tra tất cả ảnh đã tải xong chưa
  this.score = 0;
  this.arr = [];
  this.timeOutLoop = null;
  this.intervalEggs = null;
  var self = this;
  this.isStop = false;
  this.init = function () {
    this.canvas = document.getElementById("primary");
    // this.canvas        = document.createElement('canvas');
    // this.canvas.width  = 600; // chiều rộng game
    // this.canvas.height = 400; // chiều cao game
    this.context = this.canvas.getContext("2d");

    document.body.appendChild(this.canvas);

    // tạo tất cả các object
    this.resource = new resource(this);
    this.bar = new bar(this);
    this.resource.load();
    this.chickens = [
      new chicken(this, 50, 25),
      new chicken(this, 150, 25),
      new chicken(this, 250, 25),
      new chicken(this, 350, 25),
    ];

    this.bowl = new bowl(this);
    this.bowl.init();

    this.intervalEggs = setInterval(self.createNewEgg, 1000);
  };

  this.start = function () {
    this.loop();
    localStorage.setItem("currentPosition", 5);
    localStorage.setItem("currentScore", 0);
  };

  this.loop = function () {
    self.update();
    self.draw();
    this.timeOutLoop = setTimeout(self.loop, 10); // 50 hình trên giây
  };

  /**
   * STOP GAME
   * Stop create eggs
   * Bowl cant move
   */
  this.stop = function () {
    clearTimeout(this.timeOutLoop);
    clearTimeout(this.intervalEggs);
    this.isStop = true
    this.bowl.stop();
  };

  this.update = function () {
    this.updateAllEggs();
  };

  this.updateAllEggs = function () {
    for (var i = 0; i < this.eggs.length; i++) {
      this.eggs[i].update(this.isStop);
    }
  };

  this.draw = function () {
    // vẽ cái hình nền trời xanh
    self.context.fillStyle = "#66b3ff"; // cái màu lấy từ photoshop đấy
    self.context.fillRect(0, 0, this.canvas.width, this.canvas.height);

    if (self.resourceLoaded == false) {
      self.drawLoading();
    } else {
      self.drawTheWorld(); // vẽ thế giới =))
    }
  };

  // tạo quả trứng mới
  this.createNewEgg = function () {
    if (self.resourceLoaded) {
      var newEgg = new egg(self);
      newEgg.init();
      self.eggs.push(newEgg); // cho vào mảng các quả trứng, đây này
    }
  };

  this.drawTheWorld = function () {
    self.drawCurrentScore();
    self.drawLine();
    self.bar.draw();
    self.bowl.draw();
    self.drawAllEggs();
    self.drawAllChickens();
  };

  this.drawAllEggs = function () {
    // lặp qua từng quả trứng rồi vẽ nó
    for (var i = 0; i < this.eggs.length; i++) {
      this.eggs[i].draw();
    }
  };

  // vẽ tất cả các con gà lên
  this.drawAllChickens = function () {
    for (var i = 0; i < this.chickens.length; i++) {
      this.chickens[i].draw();
    }
  };

  // vẽ cái chữ loading
  this.drawLoading = function () {
    self.context.fillStyle = "#ffffff";
    self.context.font = "30px Arial";
    self.context.fillText("Loading...", 100, 100);
  };

  this.drawCurrentScore = function () {
    // self.context.fillStyle = "#ffffff";
    // self.context.font = "20px Arial";
    // self.context.fillText("Score: " + this.score, 500, 50);
  };

  this.drawLine = function () {
    self.context.fillStyle = "#ffffff";
    self.context.beginPath();
    // Staring point (450,0)
    self.context.moveTo(480, 0);
    // End point (450,400)
    self.context.lineTo(480, 400);
    // Make the line visible
    self.context.stroke();
  };
};
