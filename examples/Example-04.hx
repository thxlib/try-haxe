import minicanvas.MiniCanvas;
import thx.color.*;

class Test {
  static function main() {
    MiniCanvas.create(250, 250)
      .checkboard()
      .box(function(x, y) : Rgbxa
        return Hsla.create(x * 360, 1, y, 0.75))
      .display();
  }
}
