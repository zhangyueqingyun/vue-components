const r = (n, t) => {
  const o = n.__vccOpts || n;
  for (const [e, c] of t)
    o[e] = c;
  return o;
}, s = {};
function _(n, t) {
  return " \u6D4B\u8BD5\u7EC4\u4EF61 ";
}
const a = /* @__PURE__ */ r(s, [["render", _]]), f = (n) => {
  n.component("DemoComponent", a);
}, m = { install: f };
export {
  a as DemoComponent,
  m as default
};
