export const random = function() {
  return Math.floor(Math.random() * Date.now()).toString(36);
};

export const GUID = function(max) {
  max = max || 40;
  var str = '';
  for (var i = 0; i < max / 3 + 1; i++) str += random();
  return str.substring(0, max);
};

export const restAsyncHandler = (handler) => (req, res) =>
  handler(req, res).catch((e) => res.json({ success: false, msg: e.message }));
