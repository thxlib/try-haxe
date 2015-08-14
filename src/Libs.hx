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

  static var available : Map<String, Array<LibConf>> = [
    "JS" => [
      //{name:"nme", args : ["--remap","flash:browser"], head : ["<link rel='stylesheet' href='../swf.css' type='text/css'/>"], body:["<div id='haxe:jeash'></div>"]},
      {name:"thx.color"},
      {name:"thx.core"},
      {name:"thx.culture"},
      {name:"thx.format"},
      {name:"thx.promise"},
      {name:"thx.semver"},
      {name:"thx.stream"},
      //{name:"thx.text"},
      {name:"thx.unit"},
      {name:"sui"},
      {name:"minicanvas"},
      {name:"utest"},
      {name:"actuate"},
      //{name:"selecthx"},
      //{name:"modernizr"},
      //{name:"browserhx"},
      {name:"format" },
      {name:"nape"},
      {name:"hscript"},
      {name:"haxeui"},
      (name:"yaml"},
      //{name:"three.js", head: ["<script src='../../../lib/js/stats-min.js'></script>", "<script src='../../../lib/js/three-min.js'></script>"]}
    ],
    "SWF" => new Array<LibConf>().concat([
      {name:"thx.color"},
      {name:"thx.core"},
      {name:"thx.culture"},
      {name:"thx.format"},
      {name:"thx.promise"},
      {name:"thx.semver"},
      {name:"thx.stream"},
      //{name:"thx.text"},
      {name:"thx.unit"},
      {name:"sui"},
      {name:"minicanvas"},
      {name:"utest"},
      {name:"actuate" , args : []},
      {name:"format"},
      {name:"nape"},
      {name:"hscript"},
      {name:"haxeui"},
      (name:"yaml"},
      {name:"away3d", swf:{src:"away3d4.swf"}, help:"http://away3d.com/livedocs/away3d/4.0/"},
      //{name:"starling" },
    ])
  ];

  static var defaultChecked : Map < String, Array<String> > = [
    "JS" => ["thx.color", "thx.core", "thx.culture", "thx.format", "thx.promise", "thx.semver", "thx.stream", "thx.unit", "sui", "minicanvas"],
    "SWF" => ["thx.color", "thx.core", "thx.culture", "thx.format", "thx.promise", "thx.semver", "thx.stream", "thx.unit", "sui", "minicanvas"]
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
