import rdg.*;

class Test {
  static function main() {
    var obj = new GObject();
    obj.field("gender").gen(function() {
      var v = Math.random();
      return v < 0.4 ? "M" : (v < 0.8 ? "F" : null);
    });
    obj.field("name").mapField("gender", function(value) {
      if(value == "M")
        return Name.weightedMale();
      else if(value == "F")
        return Name.weightedFemale();
      else
        return Name.generator();
    });
    obj.field("surname").gen(Surname.generator());
    obj.field("email").mapFields(["name", "surname"], function(names) {
      return Email.generator(
        null,
        function() return names[0],
        function() return names[1]);
    });

    var list = [for(i in 0...20) obj.generate()];

    trace(yaml.Yaml.render(list));
  }
}
