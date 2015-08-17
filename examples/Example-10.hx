import thx.unit.temperature.*;

class Test {
  static function main() {
    var c : Celsius = 27,
        f : Fahrenheit = c,
        k : Kelvin = c;
    trace('Celsius    $c');
    trace('Fahrenheit $f');
    trace('Kelvin     $k');
  }
}
