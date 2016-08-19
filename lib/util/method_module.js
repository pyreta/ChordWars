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
    if (el){
      el.pause();
      el.load();
      el.play();
    }
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

};
