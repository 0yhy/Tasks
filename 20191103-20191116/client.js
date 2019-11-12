let client = function () {
  let engine = {
    ie: 0,
    gecko: 0,
    webkit: 0,
    khtml: 0,
    opera: 0,
    ver: null    //版本号
  };

  let browser = {
    ie: 0,
    firefox: 0,
    safari: 0,
    kongq: 0,
    opera: 0,
    chrome: 0,
    ver: null
  }

  let system = {
    win: false,
    mac: false,
    x11: false
  }

  /* ---------------------detect engine and browser--------------------- */
  let ua = navigator.userAgent;
  console.log(ua);
  //第一步：检测Opera
  if (window.opera) {
    engine.ver = browser.ver = window.opera.version();
    engine.opera = browser.ver = parseFloat(engine.ver);
  }
  //第二步：检测WebKit
  //浏览器：Chrome或Safari
  else if (/AppleWebKit\/(\S+)/.test(ua)) {
    console.log("WebKit");
    engine.ver = RegExp["$1"];
    engine.webkit = parseFloat(engine.ver);
    //Chrome or Safari
    if (/Chrome\/(\S+)/.test(ua)) {
      browser.ver = RegExp["$1"];
      browser.chrome = parseFloat(browser.ver);
    }
    else if (/Version\/(\S+)/.test(ua)) {
      browser.ver = RegExp["$1"];
      browser.safari = parseFloat(browser.ver);
    }
    else {
      let safariVersion = 1;
      if (engine.webkit < 100) {
        safariVersion = 1;
      }
      else if (engine.webkit < 312) {
        safariVersion = 1.2;
      }
      else if (engine.webkit < 412) {
        safariVersion = 1.3;
      }
      else {
        safariVersion = 2;
      }
      browser.safari = browser.ver = safariVersion;
    }
  }
  //第三步：检测KHTML
  //        KHTML                      Konqueror后跟一个/，再后跟不包含分号的所有字符
  else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
    engine.ver = browser.ver = RegExp["$1"];
    engine.khtml = browser.kongq = parseFloat(engine.ver);
  }
  //第四步：检测Gecko
  //版本号：“rv:”与闭括号之间  Gecko/后的8个数字
  else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
    engine.ver = RegExp["$1"];
    engine.gecko = parseFloat(engine.ver);
    //Firefox
    if (/Firefox\/(\S+)/.test(ua)) {
      browser.ver = RegExp["$1"];
      browser.firefox = parseFloat(browser.ver);
    }
  }
  //第五步：检测IE
  //        MSIE后，一个分号前
  else if (/MSIE ([^;]+)/.test(ua)) {
    engine.ver = browser.ver = RegExp["$1"];
    engine.ie = browser.ie = parseFloat(engine.ver);
  }


  /* ---------------------detect platform--------------------- */
  let p = navigator.platform;
  system.win = p.indexOf("Win") === 0;
  system.mac = p.indexOf("Mac") === 0;
  system.x11 = (p.indexOf("X11") === 0) || (p.indexOf("Linux") === 0);


  return {
    engine: engine,
    browser: browser,
    system: system
  };
}();

console.log(client);
console.log(window.opera);

