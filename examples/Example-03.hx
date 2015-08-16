import thx.color.*;

class Test {
  static function main() {
    var rgb : Rgb = "#f00",
        hsl : Hsl = rgb;

    trace(hsl.withHue(60).toRgb());
  }
}
