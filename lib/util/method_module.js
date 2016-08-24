const KeyStore = require("../stores/key_store");

Number.prototype.formatThousands = function(c, d, t){
  let n = this;
  c = isNaN(c = Math.abs(c)) ? 2 : c;
  d = d === undefined ? "." : d;
  t = t === undefined ? "," : t;
  let s = n < 0 ? "-" : "";
  let i = parseInt(n = Math.abs(+n || 0).toFixed(c)) + "";
  let j = (j = i.length) > 3 ? j % 3 : 0;
  return s + (j ? i.substr(0, j) + t : "") + i.substr(j).replace(/(\d{3})(?=\d)/g, "$1" + t) + (c ? d + Math.abs(n - i).toFixed(c).slice(2) : "");
};

module.exports = {
  parseAmount(amount) {
    if (!amount) return "0";
    return amount.formatThousands(0);
  },

  playKey(id){
    let el = document.getElementById(id);
    if (el && KeyStore.sound()){
      el.pause();
      el.load();
      el.play();
    }
  },

  eqArrays(arr1, arr2){
    if (arr1.length !== arr2.lenth) return false;
    for (let i = 0; i < arr1.length; i++) {
      if (arr1[i] !== arr2[i]){
        return false;
      }
    }
    return true;
  },

  colorKey(id){
    let el = document.getElementById(id+"-key");
    if (el){
      el.classList.add("held");
    }
  },

  revertKey(id){
    let el = document.getElementById(id+"-key");
    if (el){
      el.classList.remove("held");
    }
  },

  hideEl(id){
    let el = document.getElementById(id);
    if (el){
      el.classList.add("hidden");
    }
  },

  revealEl(id){
    let el = document.getElementById(id);
    if (el){
      el.classList.remove("hidden");
    }
  },

  invisibleEl(id){
    let el = document.getElementById(id);
    if (el){
      el.classList.add("invisible");
    }
  },

  visibleEl(id){
    let el = document.getElementById(id);
    if (el){
      el.classList.remove("invisible");
    }
  },

  addClassToId(id, klass){
    let el = document.getElementById(id);
    if (el){
      el.classList.add(klass);
    }
  },

  removeClassFromId(id, klass){
    let el = document.getElementById(id);
    if (el){
      el.classList.remove(klass);
    }
  },


  addClassToClass(klassSelector, klassToAdd){
    let els = Array.from(document.getElementsByClassName(klassSelector));
    els.forEach(el=>{
      el.classList.add(klassToAdd);
    });
  },

  removeClassFromClass(klassSelector, klassToRemove){
    let els = Array.from(document.getElementsByClassName(klassSelector));
    els.forEach(el=>{
      el.classList.remove(klassToRemove);
    });
  }
};
