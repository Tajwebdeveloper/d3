
if (window.NodeList && !NodeList.prototype.forEach) {
  NodeList.prototype.forEach = function (callback, thisArg) {
      thisArg = thisArg || window;
      for (var i = 0; i < this.length; i++) {
          callback.call(thisArg, this[i], i, this);
      }
  };
}
// var rangeEl = document.querySelectorAll('.range-completed')
// var rangeElLen = rangeEl.length
// for(i=0;i<rangeElLen;i++){
//   rangeEl[i].style.width = rangeEl[i].dataset.completed+"%";
//   rangeEl[i].style.backgroundColor = rangeEl[i].dataset.color
// }

document.querySelectorAll('.range-completed').forEach(function(e){
  e.style.width = e.dataset.completed+"%";
  e.style.backgroundColor = e.dataset.color;
})
document.querySelectorAll('.pie-data-dot').forEach(function(e){
   e.style.backgroundColor = e.dataset.color;
})