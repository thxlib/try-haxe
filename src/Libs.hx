import api.Program;

typedef SWFInfo = {
  src:String,
}

typedef LibConf = {
  name : String,
  ?args : Array<String>,
  ?head:Array<String>,
  ?body:Array<String>,
  ?swf:SWFInfo,
  ?help:String
}


class Libs
{
  static var libraries = [
              {name:"thx.color"},
              {name:"thx.core"},
              {name:"thx.culture"},
              {name:"thx.format"},
              {name:"thx.promise"},
              {name:"thx.semver"},
              {name:"thx.stream"},
              //{name:"thx.text"},
              {name:"thx.unit"},
              {name:"rdg"},
              {name:"utest"},
              {name:"actuate"},
              {name:"format" },
              {name:"lime"},
              {name:"openfl"},
              {name:"nape"},
              {name:"hscript"},
              {name:"haxeui"},
              {name:"yaml"},
            ];
  static var available : Map<String, Array<LibConf>> = [
    "JS"  => libraries.concat([
        {name:"sui"},
        {name:"minicanvas"},
      ]),
    "SWF" => libraries
  ];

  static var defaultSelected = ["thx.color", "thx.core", "thx.culture", "thx.format", "thx.promise", "thx.semver", "thx.stream", "thx.unit", "utest"];
  static var defaultChecked : Map < String, Array<String> > = [
    "JS" => defaultSelected.concat(["minicanvas", "rdg", "yaml", "sui"]),
    "SWF" => defaultSelected
  ]; // array of lib names

  static public function getLibsConfig(?target:Target, ?targetName:String):Array<LibConf>
  {
    var name = targetName != null ? targetName : Type.enumConstructor(target);
    return if (available.exists(name)) return available.get(name) else [];
  }

  static public function getDefaultLibs(?target:Target, ?targetName:String):Array<String>
  {
    var name = targetName != null ? targetName : Type.enumConstructor(target);
    return if (defaultChecked.exists(name)) return defaultChecked.get(name) else [];
  }
}
