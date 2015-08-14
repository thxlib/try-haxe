import thx.color.*;

class Test {
  static function main() {
    var rgb : Rgb = "#f00",
        hsl : Hsl = rgb;

    var other = hsl.withHue(60);
    trace(other.toRgb());
  }
}
