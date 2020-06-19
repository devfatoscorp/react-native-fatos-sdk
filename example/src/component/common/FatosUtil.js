import { Image } from "react-native";
import FatosLanguageManager from "../Manager/FatosLanguageManager";

const FatosUtil = {
  checkData(value) {
    if (value == null || value == "undefined") {
      return false;
    }

    return true;
  },

  leadingZeros(n, digits) {
    var zero = "";
    n = n.toString();

    if (n.length < digits) {
      for (var i = 0; i < digits - n.length; i++) {
        zero += "0";
      }
    }
    return zero + n;
  },

  numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  },

  getTimeStringSeconds(seconds) {
    var hour = 0;
    var min = 0;
    var sec = 0;
    var str = "";

    var strHour = FatosLanguageManager.GetInstance().getCodeName("hour");
    var strMin = FatosLanguageManager.GetInstance().getCodeName("min");

    hour = parseInt(seconds / 3600);
    min = parseInt((seconds % 3600) / 60);
    sec = seconds % 60;

    if (hour.toString().length == 1) {
      hour = "0" + hour;
    }

    if (min.toString().length == 1) {
      min = "0" + min;
    }

    if (hour > 0) {
      str += hour + " " + strHour + " ";
    }

    if (min > 0) {
      str += min + " " + strMin;
    }

    // if (sec.toString().length == 1) {
    //
    //     sec = '0' + sec;
    // }

    return str;
  },

  isStringEmpty(str) {
    if (str == "" || str == null || str == undefined || str == 0 || str == NaN) {
      return true;
    }

    return false;
  },

  loadImages(images) {
    return Promise.all(
      Object.keys(images).map((i) => {
        let img = {
          ...Image.resolveAssetSource(images[i]),
          cache: "force-cache",
        };
        return Image.prefetch(img);
      })
    );
  },

  parseBool(str) {
    if (str == null) {
      return false;
    }

    if (typeof str === "boolean") {
      if (str === true) {
        return true;
      }

      return false;
    }

    if (typeof str === "string") {
      if (str == "") {
        return false;
      }

      str = str.replace(/^\s+|\s+$/g, "");
      if (str.toLowerCase() == "true" || str.toLowerCase() == "yes") {
        return true;
      }

      str = str.replace(/,/g, ".");
      str = str.replace(/^\s*\-\s*/g, "-");
    }

    // var isNum = string.match(/^[0-9]+$/) != null;
    // var isNum = /^\d+$/.test(str);
    if (!isNaN(str)) {
      return parseFloat(str) != 0;
    }

    return false;
  },

  sprintf() {
    var args = arguments,
      string = args[0],
      i = 1;
    return string.replace(/%((%)|s|d)/g, function(m) {
      // m is the matched format, e.g. %s, %d
      var val = null;
      if (m[2]) {
        val = m[2];
      } else {
        val = args[i];
        // A switch statement so that the formatter can be extended. Default is %s
        switch (m) {
          case "%d":
            val = parseFloat(val);
            if (isNaN(val)) {
              val = 0;
            }
            break;
        }
        i++;
      }
      return val;
    });
  },
};

export default FatosUtil;
