import thx.*;

class Test {
  static function main() {
    var date : DateTime = "2016-08-13 12:12:12-06:00",
        time : Time = "03:30";

    trace('date:   $date');
    trace('utc:    ${date.utc}');
    trace('offset: ${date.offset}');

    trace((date + time).withOffset("-01:00"));
  }
}
