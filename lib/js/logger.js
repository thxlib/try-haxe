///////////////////////////////////////////////////////////////////////////////
// Logger.js
// =========
// singleton log class (module pattern)
//
// This class creates a drawable tab at the bottom of web browser. You can slide
// up/down by clicking the tab. You can toggle on/off programmatically by
// calling Logger.show() and Logger.hide() respectively. When you need to
// purge all previous messages, use Logger.clear().
//
// Use log() utility function to print a message to the log window.
// e.g.: log("Hello") : print Hello
//     log(123)   : print 123
//     log()    : print a blank line without time stamp
//
// History:
//      1.13: Added the class name along with version.
//      1.12: Removed width and added margin-left for msgDiv.
//      1.11: Added clear() function.
//      1.10: Added enable()/disable() functions.
//      1.09: Added z-index attribute on the logger container.
//      1.08: Use requestAnimationFrame() for animations.
//      1.07: Wrap a message if it is longer than the window width.
//      1.06: Print "undefined" or "null" if msg is undefined or null value.
//      1.05: Added time stamp for log() (with no param).
//      1.04: Modified handling undefined type of msg.
//      1.03: Fixed the error when msg is undefined.
//      1.02: Added sliding animation easy in/out using cosine.
//      1.01: Changed "display:none" to visibility:hidden for logDiv.
//        Supported IE v8 without transparent background.
//      1.00: First public release.
//
//  AUTHOR: Song Ho Ahn (song.ahn@gmail.com)
// CREATED: 2011-02-15
// UPDATED: 2015-07-22
//
// Copyright 2011. Song Ho Ahn
///////////////////////////////////////////////////////////////////////////////

var console = window.console || {};
console.log = function log(msg) {
  if(arguments.length == 0)
    Logger.print(""); // print a blank line
  else
    Logger.print(msg);
};


///////////////////////////////////////////////////////////////////////////////
var Logger = (function()
{
  "use strict";

  ///////////////////////////////////////////////////////////////////////////
  // private members
  ///////////////////////////////////////////////////////////////////////////
  var version = "1.13";
  var containerDiv = null;
  var tabDiv = null;
  var logDiv = null;
  var visible = false;  // tab is still visible even if it is false
  var enabled = true;   // does not accept log messages any more if it is false
  var logHeight = 160;  // 204 + 2*padding + border-top
  var tabHeight = 20;   // 20 + padding-top + border-top
  // for animation
  var animTime = 0;
  var animDuration = 200; // ms
  var animFrameTime= 16;  // ms

  ///////////////////////////////////////////////////////////////////////////
  // get time and date as string with a trailing space
  var getTime = function()
  {
    var now = new Date();
    var hour = "0" + now.getHours();
    hour = hour.substring(hour.length-2);
    var minute = "0" + now.getMinutes();
    minute = minute.substring(minute.length-2);
    var second = "0" + now.getSeconds();
    second = second.substring(second.length-2);
    return hour + ":" + minute + ":" + second;
  };
  var getDate = function()
  {
    var now = new Date();
    var year = "" + now.getFullYear();
    var month = "0" + (now.getMonth()+1);
    month = month.substring(month.length-2);
    var date = "0" + now.getDate();
    date = date.substring(date.length-2);
    return year + "-" + month + "-" + date;
  };
  ///////////////////////////////////////////////////////////////////////////
  // return available requestAnimationFrame(), otherwise, fallback to setTimeOut
  var getRequestAnimationFrameFunction = function()
  {
    var requestAnimationFrame = window.requestAnimationFrame ||
                  window.mozRequestAnimationFrame ||
                  window.msRequestAnimationFrame ||
                  window.oRequestAnimationFrame ||
                  window.webkitRequestAnimationFrame;
    if(requestAnimationFrame)
      return function(callback){ return requestAnimationFrame(callback); };
    else
      return function(callback){ return setTimeout(callback, 16); };
  };



  ///////////////////////////////////////////////////////////////////////////
  // public members
  ///////////////////////////////////////////////////////////////////////////
  var self =
  {
    ///////////////////////////////////////////////////////////////////////
    // create a div for log and attach it to document
    init: function()
    {
      // avoid redundant call
      if(containerDiv)
        return true;

      // check if DOM is ready
      if(!document || !document.createElement || !document.body || !document.body.appendChild)
        return false;

      // constants
      var CONTAINER_DIV = "loggerContainer";
      var TAB_DIV = "loggerTab";
      var LOG_DIV = "logger";
      var Z_INDEX = 9999;

      // create logger DOM element
      containerDiv = document.getElementById(CONTAINER_DIV);
      if(!containerDiv)
      {
        // container
        containerDiv = document.createElement("div");
        containerDiv.id = CONTAINER_DIV;
        containerDiv.setAttribute("style", "width:100%; " +
                           "height: " + logHeight + "px; " +
                           "margin:0; " +
                           "padding:0; " +
                           "position:fixed; " +
                           "left:0; " +
                           "z-index:" + Z_INDEX + ";");
        containerDiv.style.bottom = "" + (-logHeight) + "px";   // hide it initially

        // tab
        tabDiv = document.createElement("div");
        tabDiv.id = TAB_DIV;
        tabDiv.appendChild(document.createTextNode("log"));
        cssHeight = "height:" + (tabHeight - 6) + "px; ";     // subtract padding-top and border-top
        tabDiv.setAttribute("style", "width:30px; " +
                       cssHeight +
                       "overflow:hidden; " +
                       "font:11px helvetica,sans-serif;" +
                       "color:#333; " +
                       "position:absolute; " +
                       "left:2px; " +
                       "top:-16px; " +
                       "margin:0; padding:2px 0 0 0; " +
                       "text-align:center; " +
                       "border:1px solid #ccc; " +
                       "border-bottom:none; " +
                       "background:#ccc; " +
                       "background:rgba(230,230,230,0.8); " +
                       "-webkit-border-top-right-radius:10px; " +
                       "-webkit-border-top-left-radius:10px; " +
                       "-khtml-border-radius-topright:10px; " +
                       "-khtml-border-radius-topleft:10px; " +
                       "-moz-border-radius-topright:10px; " +
                       "-moz-border-radius-topleft:10px; " +
                       "border-top-right-radius:3px; " +
                       "border-top-left-radius:3px; ");
        // add mouse event handlers
        tabDiv.onmouseover = function()
        {
          this.style.cursor = "pointer";
          this.style.textShadow = "0 0 1px #fff, 0 0 2px #0f0, 0 0 6px #0f0";
        };
        tabDiv.onmouseout = function()
        {
          this.style.cursor = "auto";
          this.style.textShadow = "none";
        };
        tabDiv.onclick = function()
        {
          if(visible)
            Logger.hide();
          else
            Logger.show();
        };

        // log message
        logDiv = document.createElement("div");
        logDiv.id = LOG_DIV;
        var cssHeight = "height:" + (logHeight - 1) + "px; ";  // subtract paddings and border-top
        logDiv.setAttribute("style", "font:12px monospace; " +
                       cssHeight +
                       "color:#000; " +
                       "overflow-x:hidden; " +
                       "overflow-y:scroll; " +
                       "visibility:hidden; " +
                       "position:relative; " +
                       "bottom:0px; " +
                       "margin:0px; " +
                       "padding:0px; " +
                       "background:#ccc; " +
                       "background:rgba(230,230,230,0.8); " +
                       "border-top:1px solid #ccc; " +
                       "white-space:pre; ");

        // add divs to document
        containerDiv.appendChild(tabDiv);
        containerDiv.appendChild(logDiv);
        document.body.appendChild(containerDiv);
      }

      return true;
    },
    ///////////////////////////////////////////////////////////////////////
    // print log message to logDiv
    print: function(msg)
    {
      // ignore message if it is disabled
      if(!enabled)
        return;

      // check if this object is initialized
      if(!containerDiv)
      {
        var ready = this.init();
        if(!ready)
          return;
        Logger.show();
      }

      var msgDefined = true;

      // convert non-string type to string
      if(typeof msg == "undefined")   // print "undefined" if param is not defined
      {
        msg = "undefined";
        msgDefined = false;
      }
      else if(msg === null)       // print "null" if param has null value
      {
        msg = "null";
        msgDefined = false;
      }
      else
      {
        msg += ""; // for "object", "function", "boolean", "number" types
      }

      // create message span
      var msgDiv = document.createElement("div");
      msgDiv.setAttribute("style", "white-space:no-wrap;border-bottom:1px dotted #ccc;padding: 2px 8px;");
      if(!msgDefined)
        msgDiv.style.color = "#afa"; // override color if msg is not defined

      // put message into a text node
      var line = msg.replace(/ /g, "\u00a0");
      var msgNode = document.createTextNode(line);
      msgDiv.appendChild(msgNode);
      msgDiv.setAttribute("title", getTime());

      logDiv.appendChild(msgDiv);       // add message

      logDiv.scrollTop = logDiv.scrollHeight; // scroll to last line
    },
    ///////////////////////////////////////////////////////////////////////
    // slide log container up and down
    show: function()
    {
      if(!this.init())
        return;

      if(visible)
        return;

      logDiv.style.visibility = "visible";

      animTime = Date.now();
      var requestAnimationFrame = getRequestAnimationFrameFunction();
      requestAnimationFrame(slideUp);
      function slideUp()
      {
        var duration = Date.now() - animTime;
        if(duration >= animDuration)
        {
          containerDiv.style.bottom = 0;
          visible = true;
          return;
        }
        var y = Math.round(-logHeight * (1 - 0.5 * (1 - Math.cos(Math.PI * duration / animDuration))));
        containerDiv.style.bottom = "" + y + "px";
        requestAnimationFrame(slideUp);
      }
    },
    hide: function()
    {
      if(!this.init())
        return;

      if(!visible)
        return;

      animTime = Date.now();
      var requestAnimationFrame = getRequestAnimationFrameFunction();
      requestAnimationFrame(slideDown);
      function slideDown()
      {
        var duration = Date.now() - animTime;
        if(duration >= animDuration)
        {
          containerDiv.style.bottom = "" + -logHeight + "px";
          logDiv.style.visibility = "hidden";
          visible = false;
          return;
        }
        var y = Math.round(-logHeight * 0.5 * (1 - Math.cos(Math.PI * duration / animDuration)));
        containerDiv.style.bottom = "" + y + "px";
        requestAnimationFrame(slideDown);
      }
    },
    ///////////////////////////////////////////////////////////////////////
    // when Logger is enabled (default), log() method will write its message
    // to the console ("logDiv")
    enable: function()
    {
      if(!this.init())
        return;

      enabled = true;
      tabDiv.style.color = "#fff";
      logDiv.style.color = "#fff";
    },
    ///////////////////////////////////////////////////////////////////////
    // when it is diabled, subsequent log() calls will be ignored and
    // the message won't be written on "logDiv".
    // The "LOG" tab and log text aregrayed out to indicates it is disabled.
    disable: function()
    {
      if(!this.init())
        return;

      enabled = false;
      tabDiv.style.color = "#444";
      logDiv.style.color = "#444";
    },
    ///////////////////////////////////////////////////////////////////////
    // clear all messages from logDiv
    clear: function()
    {
      if(!this.init())
        return;

      logDiv.innerHTML = "";
    }
  };
  return self;
})();
