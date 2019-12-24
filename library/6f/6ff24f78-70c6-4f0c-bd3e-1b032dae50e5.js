"use strict";

System.register(["cc"], function (_export, _context) {
  "use strict";

  var _decorator, Component, Node, AudioClip, Prefab, instantiate, math, _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3, _temp, ccclass, property, itemmgr;

  _export({
    _dec: void 0,
    _dec2: void 0,
    _dec3: void 0,
    _dec4: void 0,
    _class: void 0,
    _class2: void 0,
    _descriptor: void 0,
    _descriptor2: void 0,
    _descriptor3: void 0,
    _temp: void 0
  });

  return {
    setters: [function (_cc) {
      _decorator = _cc._decorator;
      Component = _cc.Component;
      Node = _cc.Node;
      AudioClip = _cc.AudioClip;
      Prefab = _cc.Prefab;
      instantiate = _cc.instantiate;
      math = _cc.math;
    }],
    execute: function () {
      cc._RF.push(window.module || {}, "6ff2494cMZPDL0+GwMtrlDl", "item-mgr"); // begin item-mgr


      ccclass = _decorator.ccclass;
      property = _decorator.property;

      _export("itemmgr", itemmgr = (_dec = ccclass("itemmgr"), _dec2 = property(AudioClip), _dec3 = property(Prefab), _dec4 = property(Node), _dec(_class = (_class2 = (_temp =
      /*#__PURE__*/
      function (_Component) {
        babelHelpers.inherits(itemmgr, _Component);

        function itemmgr() {
          var _babelHelpers$getProt;

          var _this;

          babelHelpers.classCallCheck(this, itemmgr);

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = babelHelpers.possibleConstructorReturn(this, (_babelHelpers$getProt = babelHelpers.getPrototypeOf(itemmgr)).call.apply(_babelHelpers$getProt, [this].concat(args)));
          babelHelpers.initializerDefineProperty(_this, "music", _descriptor, babelHelpers.assertThisInitialized(_this));
          babelHelpers.initializerDefineProperty(_this, "item", _descriptor2, babelHelpers.assertThisInitialized(_this));
          babelHelpers.initializerDefineProperty(_this, "midSphere", _descriptor3, babelHelpers.assertThisInitialized(_this));
          return _this;
        }

        babelHelpers.createClass(itemmgr, [{
          key: "onLoad",
          value: function onLoad() {
            console.log(this.music);
            var PI = 3.1415926;
            var R = 5; // 实例化 item

            for (var i = 0; i < 40; i++) {
              var item = instantiate(this.item);
              this.node.addChild(item);
              item.setPosition(R * Math.sin(i / 40 * 2 * PI), 0, R * Math.cos(i / 40 * 2 * PI));
            } // 处理不同平台


            window.AudioContext = window.AudioContext || window.webkitAudioContext || window.mozAudioContext || window.msAudioContext;
          }
        }, {
          key: "onClick",
          value: function onClick() {
            var AudioContext = window.AudioContext; // audioContext 只相当于一个容器。

            var audioContext = new AudioContext(); // 要让 audioContext 真正丰富起来需要将实际的音乐信息传递给它的。
            // 也就是将 AudioBuffer 数据传递进去。
            // 以下就是创建音频资源节点管理者。

            this.audioBufferSourceNode = audioContext.createBufferSource(); // 将 AudioBuffer 传递进去。

            this.audioBufferSourceNode.buffer = this.music._audio; // 创建分析器。

            this.analyser = audioContext.createAnalyser(); // 精度设置

            this.analyser.fftSize = 256; // 在传到扬声器之前，连接到分析器。

            this.audioBufferSourceNode.connect(this.analyser); // 连接到扬声器。

            this.analyser.connect(audioContext.destination); // 开始播放

            this.audioBufferSourceNode.start(0);
          }
        }, {
          key: "onStop",
          value: function onStop() {
            // 停止方法
            this.audioBufferSourceNode.stop();
          }
        }, {
          key: "update",
          value: function update(dt) {
            // 等待准备好
            if (!this.analyser) return; // 建立数据准备接受数据

            this.dataArray = new Uint8Array(this.analyser.frequencyBinCount); // 分析结果存入数组。

            this.analyser.getByteFrequencyData(this.dataArray);
            this.draw(this.dataArray);
          }
        }, {
          key: "draw",
          value: function draw(dataArray) {
            // console.log(dataArray);
            for (var i = 0; i < 40; i++) {
              var h = dataArray[i * 3] * 0.03;
              var pos = this.node.children[i].getPosition();
              h = math.lerp(h, pos.y, 0.4);
              this.node.children[i].setPosition(pos.x, h, pos.z);
            }

            var s = dataArray[4] * 0.03; // console.log(s);

            if (s < 5) s = 5;
            this.midSphere.setScale(s, s, s);
          }
        }]);
        return itemmgr;
      }(Component), _temp), (_descriptor = babelHelpers.applyDecoratedDescriptor(_class2.prototype, "music", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = babelHelpers.applyDecoratedDescriptor(_class2.prototype, "item", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = babelHelpers.applyDecoratedDescriptor(_class2.prototype, "midSphere", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cc._RF.pop(); // end item-mgr

    }
  };
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInByb2plY3Q6Ly8vYXNzZXRzL3NjcmlwdC9pdGVtLW1nci5qcyJdLCJuYW1lcyI6WyJfZGVjb3JhdG9yIiwiQ29tcG9uZW50IiwiTm9kZSIsIkF1ZGlvQ2xpcCIsIlByZWZhYiIsImluc3RhbnRpYXRlIiwibWF0aCIsImNjY2xhc3MiLCJwcm9wZXJ0eSIsIml0ZW1tZ3IiLCJjb25zb2xlIiwibG9nIiwibXVzaWMiLCJQSSIsIlIiLCJpIiwiaXRlbSIsIm5vZGUiLCJhZGRDaGlsZCIsInNldFBvc2l0aW9uIiwiTWF0aCIsInNpbiIsImNvcyIsIndpbmRvdyIsIkF1ZGlvQ29udGV4dCIsIndlYmtpdEF1ZGlvQ29udGV4dCIsIm1vekF1ZGlvQ29udGV4dCIsIm1zQXVkaW9Db250ZXh0IiwiYXVkaW9Db250ZXh0IiwiYXVkaW9CdWZmZXJTb3VyY2VOb2RlIiwiY3JlYXRlQnVmZmVyU291cmNlIiwiYnVmZmVyIiwiX2F1ZGlvIiwiYW5hbHlzZXIiLCJjcmVhdGVBbmFseXNlciIsImZmdFNpemUiLCJjb25uZWN0IiwiZGVzdGluYXRpb24iLCJzdGFydCIsInN0b3AiLCJkdCIsImRhdGFBcnJheSIsIlVpbnQ4QXJyYXkiLCJmcmVxdWVuY3lCaW5Db3VudCIsImdldEJ5dGVGcmVxdWVuY3lEYXRhIiwiZHJhdyIsImgiLCJwb3MiLCJjaGlsZHJlbiIsImdldFBvc2l0aW9uIiwibGVycCIsInkiLCJ4IiwieiIsInMiLCJtaWRTcGhlcmUiLCJzZXRTY2FsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFTQSxNQUFBQSxVLE9BQUFBLFU7QUFBWUMsTUFBQUEsUyxPQUFBQSxTO0FBQVdDLE1BQUFBLEksT0FBQUEsSTtBQUFNQyxNQUFBQSxTLE9BQUFBLFM7QUFBV0MsTUFBQUEsTSxPQUFBQSxNO0FBQVFDLE1BQUFBLFcsT0FBQUEsVztBQUFhQyxNQUFBQSxJLE9BQUFBLEk7OzsrRUFFRzs7O0FBRGpFQyxNQUFBQSxPLEdBQXNCUCxVLENBQXRCTyxP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QUFHLEtBQUs5QixJQUFMLENBQVUrQixRQUFWLENBQW1CakMsQ0FBbkIsRUFBc0JrQyxXQUF0QixFQUFWO0FBQ0FILGNBQUFBLENBQUMsR0FBR3hDLElBQUksQ0FBQzRDLElBQUwsQ0FBVUosQ0FBVixFQUFhQyxHQUFHLENBQUNJLENBQWpCLEVBQW9CLEdBQXBCLENBQUo7QUFDQSxtQkFBS2xDLElBQUwsQ0FBVStCLFFBQVYsQ0FBbUJqQyxDQUFuQixFQUFzQkksV0FBdEIsQ0FBa0M0QixHQUFHLENBQUNLLENBQXRDLEVBQXlDTixDQUF6QyxFQUE0Q0MsR0FBRyxDQUFDTSxDQUFoRDtBQUNIOztBQUNELGdCQUFJQyxDQUFDLEdBQUdiLFNBQVMsQ0FBQyxDQUFELENBQVQsR0FBZSxJQUF2QixDQVJhLENBU2I7O0FBQ0EsZ0JBQUlhLENBQUMsR0FBRyxDQUFSLEVBQVdBLENBQUMsR0FBRyxDQUFKO0FBQ1gsaUJBQUtDLFNBQUwsQ0FBZUMsUUFBZixDQUF3QkYsQ0FBeEIsRUFBMkJBLENBQTNCLEVBQThCQSxDQUE5QjtBQUNIOzs7UUExRXdCckQsUzs7Ozs7aUJBR2pCLEk7Ozs7Ozs7aUJBR0QsSTs7Ozs7OztpQkFHSyxJOzs7O29CQVhFIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgX2RlY29yYXRvciwgQ29tcG9uZW50LCBOb2RlICxBdWRpb0NsaXAsIFByZWZhYiwgaW5zdGFudGlhdGUsIG1hdGggfSBmcm9tIFwiY2NcIjtcbmNvbnN0IHsgY2NjbGFzcywgcHJvcGVydHkgfSA9IF9kZWNvcmF0b3I7XG5cbkBjY2NsYXNzKFwiaXRlbW1nclwiKVxuZXhwb3J0IGNsYXNzIGl0ZW1tZ3IgZXh0ZW5kcyBDb21wb25lbnQge1xuXG4gICAgQHByb3BlcnR5KEF1ZGlvQ2xpcCkgXG4gICAgbXVzaWMgPSBudWxsO1xuXG4gICAgQHByb3BlcnR5KFByZWZhYilcbiAgICBpdGVtID0gbnVsbDtcblxuICAgIEBwcm9wZXJ0eShOb2RlKVxuICAgIG1pZFNwaGVyZSA9IG51bGw7XG5cbiAgICBvbkxvYWQgKCkge1xuICAgICAgICBjb25zb2xlLmxvZyh0aGlzLm11c2ljKTtcbiAgICAgICAgY29uc3QgUEkgPSAzLjE0MTU5MjY7XG4gICAgICAgIGNvbnN0IFIgPSA1O1xuICAgICAgICAvLyDlrp7kvovljJYgaXRlbVxuICAgICAgICBmb3IgKGxldCBpID0gMDsgaSA8IDQwOyBpKyspIHtcbiAgICAgICAgICAgIGxldCBpdGVtID0gaW5zdGFudGlhdGUodGhpcy5pdGVtKTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5hZGRDaGlsZChpdGVtKTtcbiAgICAgICAgICAgIGl0ZW0uc2V0UG9zaXRpb24oUiAqIE1hdGguc2luKGkvNDAgKiAyKlBJKSwgMCwgUiAqIE1hdGguY29zKGkvNDAgKiAyKlBJKSk7XG4gICAgICAgIH1cbiAgICAgICAgLy8g5aSE55CG5LiN5ZCM5bmz5Y+wXG4gICAgICAgIHdpbmRvdy5BdWRpb0NvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0IHx8IHdpbmRvdy53ZWJraXRBdWRpb0NvbnRleHQgfHwgd2luZG93Lm1vekF1ZGlvQ29udGV4dCB8fCB3aW5kb3cubXNBdWRpb0NvbnRleHQ7XG4gICAgfVxuXG4gICAgb25DbGljayAoKSB7XG4gICAgICAgIGxldCBBdWRpb0NvbnRleHQgPSB3aW5kb3cuQXVkaW9Db250ZXh0O1xuICAgICAgICAvLyBhdWRpb0NvbnRleHQg5Y+q55u45b2T5LqO5LiA5Liq5a655Zmo44CCXG4gICAgICAgIGxldCBhdWRpb0NvbnRleHQgPSBuZXcgQXVkaW9Db250ZXh0KCk7XG4gICAgICAgIC8vIOimgeiuqSBhdWRpb0NvbnRleHQg55yf5q2j5Liw5a+M6LW35p2l6ZyA6KaB5bCG5a6e6ZmF55qE6Z+z5LmQ5L+h5oGv5Lyg6YCS57uZ5a6D55qE44CCXG4gICAgICAgIC8vIOS5n+WwseaYr+WwhiBBdWRpb0J1ZmZlciDmlbDmja7kvKDpgJLov5vljrvjgIJcbiAgICAgICAgLy8g5Lul5LiL5bCx5piv5Yib5bu66Z+z6aKR6LWE5rqQ6IqC54K5566h55CG6ICF44CCXG4gICAgICAgIHRoaXMuYXVkaW9CdWZmZXJTb3VyY2VOb2RlID0gYXVkaW9Db250ZXh0LmNyZWF0ZUJ1ZmZlclNvdXJjZSgpO1xuICAgICAgICAvLyDlsIYgQXVkaW9CdWZmZXIg5Lyg6YCS6L+b5Y6744CCXG4gICAgICAgIHRoaXMuYXVkaW9CdWZmZXJTb3VyY2VOb2RlLmJ1ZmZlciA9IHRoaXMubXVzaWMuX2F1ZGlvO1xuICAgICAgICAvLyDliJvlu7rliIbmnpDlmajjgIJcbiAgICAgICAgdGhpcy5hbmFseXNlciA9IGF1ZGlvQ29udGV4dC5jcmVhdGVBbmFseXNlcigpO1xuICAgICAgICAvLyDnsr7luqborr7nva5cbiAgICAgICAgdGhpcy5hbmFseXNlci5mZnRTaXplID0gMjU2O1xuICAgICAgICAvLyDlnKjkvKDliLDmiazlo7DlmajkuYvliY3vvIzov57mjqXliLDliIbmnpDlmajjgIJcbiAgICAgICAgdGhpcy5hdWRpb0J1ZmZlclNvdXJjZU5vZGUuY29ubmVjdCh0aGlzLmFuYWx5c2VyKTtcbiAgICAgICAgLy8g6L+e5o6l5Yiw5oms5aOw5Zmo44CCXG4gICAgICAgIHRoaXMuYW5hbHlzZXIuY29ubmVjdChhdWRpb0NvbnRleHQuZGVzdGluYXRpb24pO1xuICAgICAgICAvLyDlvIDlp4vmkq3mlL5cbiAgICAgICAgdGhpcy5hdWRpb0J1ZmZlclNvdXJjZU5vZGUuc3RhcnQoMCk7XG4gICAgfVxuXG4gICAgb25TdG9wICgpIHtcbiAgICAgICAgLy8g5YGc5q2i5pa55rOVXG4gICAgICAgIHRoaXMuYXVkaW9CdWZmZXJTb3VyY2VOb2RlLnN0b3AoKTtcbiAgICB9XG5cbiAgICB1cGRhdGUgKGR0KSB7XG4gICAgICAgIC8vIOetieW+heWHhuWkh+WlvVxuICAgICAgICBpZiAoIXRoaXMuYW5hbHlzZXIpIHJldHVybjtcbiAgICAgICAgLy8g5bu656uL5pWw5o2u5YeG5aSH5o6l5Y+X5pWw5o2uXG4gICAgICAgIHRoaXMuZGF0YUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkodGhpcy5hbmFseXNlci5mcmVxdWVuY3lCaW5Db3VudCk7XG4gICAgICAgIC8vIOWIhuaekOe7k+aenOWtmOWFpeaVsOe7hOOAglxuICAgICAgICB0aGlzLmFuYWx5c2VyLmdldEJ5dGVGcmVxdWVuY3lEYXRhKHRoaXMuZGF0YUFycmF5KTtcbiAgICAgICAgdGhpcy5kcmF3KHRoaXMuZGF0YUFycmF5KTtcbiAgICB9XG5cbiAgICBkcmF3IChkYXRhQXJyYXkpIHtcbiAgICAgICAgLy8gY29uc29sZS5sb2coZGF0YUFycmF5KTtcbiAgICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCA0MDsgaSsrKSB7XG4gICAgICAgICAgICBsZXQgaCA9IGRhdGFBcnJheVtpICogM10gKiAwLjAzO1xuICAgICAgICAgICAgbGV0IHBvcyA9IHRoaXMubm9kZS5jaGlsZHJlbltpXS5nZXRQb3NpdGlvbigpO1xuICAgICAgICAgICAgaCA9IG1hdGgubGVycChoLCBwb3MueSwgMC40KTtcbiAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbltpXS5zZXRQb3NpdGlvbihwb3MueCwgaCwgcG9zLnopO1xuICAgICAgICB9XG4gICAgICAgIGxldCBzID0gZGF0YUFycmF5WzRdICogMC4wMzsgXG4gICAgICAgIC8vIGNvbnNvbGUubG9nKHMpO1xuICAgICAgICBpZiAocyA8IDUpIHMgPSA1O1xuICAgICAgICB0aGlzLm1pZFNwaGVyZS5zZXRTY2FsZShzLCBzLCBzKTtcbiAgICB9XG59XG4iXX0=