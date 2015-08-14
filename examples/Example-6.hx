import sui.Sui;

class Test {
  static function main() {
    var library = new Test("thx", 7),
      	sui = new Sui();

    sui.bind(library);
    sui.attach();
  }

  public var name : String;
  public var age : Int;
  public var versions : Array<String>;

  public function new(name : String, age : Int) {
    this.name = name;
    this.age = age;
    this.versions = ["0.29", "0.30", "0.31"];
  }
}
