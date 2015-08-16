import utest.Assert;
import utest.Runner;
import utest.ui.Report;

/*
When you run a utest example remember to put DCE to `std` (or `no`)
or to mark the methods as `@:keep`.
*/
class Test {
  static function main() {
    var runner = new Runner();
    runner.addCase(new Test());
    Report.create(runner);
    runner.run();
  }

  public function new() {}

  @:keep public function testBasic() {
    Assert.equals(2, 1+1);
  }
}
