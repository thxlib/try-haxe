import thx.BigInt;

class Test {
  static function main() {
    trace("1000th number in fibonacci", fibonacci(1000));
    trace("3.pow(1000)", (3 : BigInt).pow(1000));
  }

  public static function fibonacci(n : Int) {
    var number : BigInt = 1,
        last : BigInt = 1;
    for (_ in 2...n) {
      number = number + last;
      last = number - last;
    }
    return number;
  }
}
