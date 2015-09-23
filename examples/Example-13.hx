import thx.csv.Csv;

class Test {
  static function main() {
    var csv = 'Year,Make,Model,Description,Price
1997,Ford,E350,"ac, abs, moon",3000.00
1999,Chevy,"Venture ""Extended Edition""","",4900.00
1999,Chevy,"Venture ""Extended Edition, Very Large""",,5000.00
1996,Jeep,Grand Cherokee,"MUST SELL!
air, moon roof, loaded",4799.00';

    var decoded = Csv.decode(csv),
        encoded = Csv.encode(decoded);

    trace(decoded);
    trace(encoded);
  }
}
