import thx.Decimal;

class Test {
  static function main() {
		var f1 = 0.1,
        f2 = 0.2,
        d1 : Decimal = f1,
        d2 : Decimal = f2;

    trace("Float precision issue");
    trace("float....: " + (f1 + f2));
    trace("decimal..: " + (d1 + d2));

    var ftot = 0.0,
        dtot : Decimal = 0.0;
    for(i in 0...10) {
      ftot += 0.1;
      dtot += 0.1;
    }

    trace("float....: " + ftot);
    trace("decimal..: " + dtot);

    var big = "12345678901234567890.1234567890123456789";

    trace("Float resolution");
    trace("float....: " + Std.parseFloat(big));
    trace("decimal..: " + (big : Decimal));
  }
}
