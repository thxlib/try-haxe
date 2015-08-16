import sui.Sui;

class Test {
  static function main() {
    var ui = new sui.Sui();
    ui.bool("boolean", function(v) trace('bool: $v'));
    ui.color("color", {
        list : [
          { value : "#FF0000", label : "red" },
          { value : "#00FF00", label : "blue" },
          { value : "#0000FF", label : "green" }]
      }, function(v) trace('color: $v'));
    ui.int("int range", 20, {
        min : 10,
        max : 30
      }, function(v) trace('int range: $v'));
    ui.trigger("trigger", function() trace("triggered"));
    ui.attach();
  }
}
