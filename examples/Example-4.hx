import minicanvas.MiniCanvas;
import thx.color.*;

class Test {
  static function main() {
    MiniCanvas.create(200, 200)
      .checkboard()
      .box(function(x, y) : Rgbxa
        return Hsla.create(x * 360, 1, y, 0.75))
      .display("rainbowAlpha");
  }
}
