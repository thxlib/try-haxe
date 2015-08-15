import thx.DateTime;
import thx.culture.Culture;
import thx.culture.Embed;
using thx.format.DateFormat;


class Test {
  static var it = Embed.culture('it-it');
  static var us = Embed.culture('en-us');
  static var ru = Embed.culture('ru-ru');
  static var fr = Embed.culture('fr-fr');
  static var jp = Embed.culture('ja-jp');
  static var d  = DateTime.fromString('2009-06-01 13:45:30-06:00');

  static function main() {
    trace(d.format('U', it));
    trace(d.format('U', us));
    trace(d.format('U', ru));
    trace(d.format('U', fr));
    trace(d.format('U', jp));
  }
}
