
export const random = function() {
  return Math.floor(Math.random() * Date.now()).toString(36);
};

export const GUID = function(max) {
  max = max || 40;
  var str = '';
  for (var i = 0; i < max / 3 + 1; i++) str += random();
  return str.substring(0, max);
};
