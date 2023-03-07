import { openBlock as $A, createElementBlock as qA, createElementVNode as UA, toDisplayString as zr, createCommentVNode as gt, Fragment as uo, renderList as wo, pushScopeId as fo, popScopeId as Mo } from "vue";
function Gt(A, e) {
  return A == null || e == null ? NaN : A < e ? -1 : A > e ? 1 : A >= e ? 0 : NaN;
}
function Co(A, e) {
  return A == null || e == null ? NaN : e < A ? -1 : e > A ? 1 : e >= A ? 0 : NaN;
}
function ps(A) {
  let e, t, r;
  A.length !== 2 ? (e = Gt, t = (o, a) => Gt(A(o), a), r = (o, a) => A(o) - a) : (e = A === Gt || A === Co ? A : Qo, t = A, r = A);
  function n(o, a, B = 0, g = o.length) {
    if (B < g) {
      if (e(a, a) !== 0)
        return g;
      do {
        const c = B + g >>> 1;
        t(o[c], a) < 0 ? B = c + 1 : g = c;
      } while (B < g);
    }
    return B;
  }
  function i(o, a, B = 0, g = o.length) {
    if (B < g) {
      if (e(a, a) !== 0)
        return g;
      do {
        const c = B + g >>> 1;
        t(o[c], a) <= 0 ? B = c + 1 : g = c;
      } while (B < g);
    }
    return B;
  }
  function s(o, a, B = 0, g = o.length) {
    const c = n(o, a, B, g - 1);
    return c > B && r(o[c - 1], a) > -r(o[c], a) ? c - 1 : c;
  }
  return { left: n, center: s, right: i };
}
function Qo() {
  return 0;
}
function ho(A) {
  return A === null ? NaN : +A;
}
const Io = ps(Gt), No = Io.right;
ps(ho).center;
const Uo = No, Fo = Math.sqrt(50), Do = Math.sqrt(10), yo = Math.sqrt(2);
function Jt(A, e, t) {
  const r = (e - A) / Math.max(0, t), n = Math.floor(Math.log10(r)), i = r / Math.pow(10, n), s = i >= Fo ? 10 : i >= Do ? 5 : i >= yo ? 2 : 1;
  let o, a, B;
  return n < 0 ? (B = Math.pow(10, -n) / s, o = Math.round(A * B), a = Math.round(e * B), o / B < A && ++o, a / B > e && --a, B = -B) : (B = Math.pow(10, n) * s, o = Math.round(A / B), a = Math.round(e / B), o * B < A && ++o, a * B > e && --a), a < o && 0.5 <= t && t < 2 ? Jt(A, e, t * 2) : [o, a, B];
}
function Eo(A, e, t) {
  if (e = +e, A = +A, t = +t, !(t > 0))
    return [];
  if (A === e)
    return [A];
  const r = e < A, [n, i, s] = r ? Jt(e, A, t) : Jt(A, e, t);
  if (!(i >= n))
    return [];
  const o = i - n + 1, a = new Array(o);
  if (r)
    if (s < 0)
      for (let B = 0; B < o; ++B)
        a[B] = (i - B) / -s;
    else
      for (let B = 0; B < o; ++B)
        a[B] = (i - B) * s;
  else if (s < 0)
    for (let B = 0; B < o; ++B)
      a[B] = (n + B) / -s;
  else
    for (let B = 0; B < o; ++B)
      a[B] = (n + B) * s;
  return a;
}
function en(A, e, t) {
  return e = +e, A = +A, t = +t, Jt(A, e, t)[2];
}
function po(A, e, t) {
  e = +e, A = +A, t = +t;
  const r = e < A, n = r ? en(e, A, t) : en(A, e, t);
  return (r ? -1 : 1) * (n < 0 ? 1 / -n : n);
}
var To = { value: () => {
} };
function Ts() {
  for (var A = 0, e = arguments.length, t = {}, r; A < e; ++A) {
    if (!(r = arguments[A] + "") || r in t || /[\s.]/.test(r))
      throw new Error("illegal type: " + r);
    t[r] = [];
  }
  return new Kt(t);
}
function Kt(A) {
  this._ = A;
}
function zo(A, e) {
  return A.trim().split(/^|\s+/).map(function(t) {
    var r = "", n = t.indexOf(".");
    if (n >= 0 && (r = t.slice(n + 1), t = t.slice(0, n)), t && !e.hasOwnProperty(t))
      throw new Error("unknown type: " + t);
    return { type: t, name: r };
  });
}
Kt.prototype = Ts.prototype = {
  constructor: Kt,
  on: function(A, e) {
    var t = this._, r = zo(A + "", t), n, i = -1, s = r.length;
    if (arguments.length < 2) {
      for (; ++i < s; )
        if ((n = (A = r[i]).type) && (n = Lo(t[n], A.name)))
          return n;
      return;
    }
    if (e != null && typeof e != "function")
      throw new Error("invalid callback: " + e);
    for (; ++i < s; )
      if (n = (A = r[i]).type)
        t[n] = Ai(t[n], A.name, e);
      else if (e == null)
        for (n in t)
          t[n] = Ai(t[n], A.name, null);
    return this;
  },
  copy: function() {
    var A = {}, e = this._;
    for (var t in e)
      A[t] = e[t].slice();
    return new Kt(A);
  },
  call: function(A, e) {
    if ((n = arguments.length - 2) > 0)
      for (var t = new Array(n), r = 0, n, i; r < n; ++r)
        t[r] = arguments[r + 2];
    if (!this._.hasOwnProperty(A))
      throw new Error("unknown type: " + A);
    for (i = this._[A], r = 0, n = i.length; r < n; ++r)
      i[r].value.apply(e, t);
  },
  apply: function(A, e, t) {
    if (!this._.hasOwnProperty(A))
      throw new Error("unknown type: " + A);
    for (var r = this._[A], n = 0, i = r.length; n < i; ++n)
      r[n].value.apply(e, t);
  }
};
function Lo(A, e) {
  for (var t = 0, r = A.length, n; t < r; ++t)
    if ((n = A[t]).name === e)
      return n.value;
}
function Ai(A, e, t) {
  for (var r = 0, n = A.length; r < n; ++r)
    if (A[r].name === e) {
      A[r] = To, A = A.slice(0, r).concat(A.slice(r + 1));
      break;
    }
  return t != null && A.push({ name: e, value: t }), A;
}
var tn = "http://www.w3.org/1999/xhtml";
const ei = {
  svg: "http://www.w3.org/2000/svg",
  xhtml: tn,
  xlink: "http://www.w3.org/1999/xlink",
  xml: "http://www.w3.org/XML/1998/namespace",
  xmlns: "http://www.w3.org/2000/xmlns/"
};
function Mr(A) {
  var e = A += "", t = e.indexOf(":");
  return t >= 0 && (e = A.slice(0, t)) !== "xmlns" && (A = A.slice(t + 1)), ei.hasOwnProperty(e) ? { space: ei[e], local: A } : A;
}
function mo(A) {
  return function() {
    var e = this.ownerDocument, t = this.namespaceURI;
    return t === tn && e.documentElement.namespaceURI === tn ? e.createElement(A) : e.createElementNS(t, A);
  };
}
function vo(A) {
  return function() {
    return this.ownerDocument.createElementNS(A.space, A.local);
  };
}
function zs(A) {
  var e = Mr(A);
  return (e.local ? vo : mo)(e);
}
function Ho() {
}
function Yn(A) {
  return A == null ? Ho : function() {
    return this.querySelector(A);
  };
}
function jo(A) {
  typeof A != "function" && (A = Yn(A));
  for (var e = this._groups, t = e.length, r = new Array(t), n = 0; n < t; ++n)
    for (var i = e[n], s = i.length, o = r[n] = new Array(s), a, B, g = 0; g < s; ++g)
      (a = i[g]) && (B = A.call(a, a.__data__, g, i)) && ("__data__" in a && (B.__data__ = a.__data__), o[g] = B);
  return new lA(r, this._parents);
}
function xo(A) {
  return A == null ? [] : Array.isArray(A) ? A : Array.from(A);
}
function Yo() {
  return [];
}
function Ls(A) {
  return A == null ? Yo : function() {
    return this.querySelectorAll(A);
  };
}
function So(A) {
  return function() {
    return xo(A.apply(this, arguments));
  };
}
function bo(A) {
  typeof A == "function" ? A = So(A) : A = Ls(A);
  for (var e = this._groups, t = e.length, r = [], n = [], i = 0; i < t; ++i)
    for (var s = e[i], o = s.length, a, B = 0; B < o; ++B)
      (a = s[B]) && (r.push(A.call(a, a.__data__, B, s)), n.push(a));
  return new lA(r, n);
}
function ms(A) {
  return function() {
    return this.matches(A);
  };
}
function vs(A) {
  return function(e) {
    return e.matches(A);
  };
}
var Go = Array.prototype.find;
function Ko(A) {
  return function() {
    return Go.call(this.children, A);
  };
}
function Oo() {
  return this.firstElementChild;
}
function Ro(A) {
  return this.select(A == null ? Oo : Ko(typeof A == "function" ? A : vs(A)));
}
var ko = Array.prototype.filter;
function Po() {
  return Array.from(this.children);
}
function _o(A) {
  return function() {
    return ko.call(this.children, A);
  };
}
function Zo(A) {
  return this.selectAll(A == null ? Po : _o(typeof A == "function" ? A : vs(A)));
}
function Wo(A) {
  typeof A != "function" && (A = ms(A));
  for (var e = this._groups, t = e.length, r = new Array(t), n = 0; n < t; ++n)
    for (var i = e[n], s = i.length, o = r[n] = [], a, B = 0; B < s; ++B)
      (a = i[B]) && A.call(a, a.__data__, B, i) && o.push(a);
  return new lA(r, this._parents);
}
function Hs(A) {
  return new Array(A.length);
}
function Vo() {
  return new lA(this._enter || this._groups.map(Hs), this._parents);
}
function Xt(A, e) {
  this.ownerDocument = A.ownerDocument, this.namespaceURI = A.namespaceURI, this._next = null, this._parent = A, this.__data__ = e;
}
Xt.prototype = {
  constructor: Xt,
  appendChild: function(A) {
    return this._parent.insertBefore(A, this._next);
  },
  insertBefore: function(A, e) {
    return this._parent.insertBefore(A, e);
  },
  querySelector: function(A) {
    return this._parent.querySelector(A);
  },
  querySelectorAll: function(A) {
    return this._parent.querySelectorAll(A);
  }
};
function Jo(A) {
  return function() {
    return A;
  };
}
function Xo(A, e, t, r, n, i) {
  for (var s = 0, o, a = e.length, B = i.length; s < B; ++s)
    (o = e[s]) ? (o.__data__ = i[s], r[s] = o) : t[s] = new Xt(A, i[s]);
  for (; s < a; ++s)
    (o = e[s]) && (n[s] = o);
}
function $o(A, e, t, r, n, i, s) {
  var o, a, B = /* @__PURE__ */ new Map(), g = e.length, c = i.length, l = new Array(g), M;
  for (o = 0; o < g; ++o)
    (a = e[o]) && (l[o] = M = s.call(a, a.__data__, o, e) + "", B.has(M) ? n[o] = a : B.set(M, a));
  for (o = 0; o < c; ++o)
    M = s.call(A, i[o], o, i) + "", (a = B.get(M)) ? (r[o] = a, a.__data__ = i[o], B.delete(M)) : t[o] = new Xt(A, i[o]);
  for (o = 0; o < g; ++o)
    (a = e[o]) && B.get(l[o]) === a && (n[o] = a);
}
function qo(A) {
  return A.__data__;
}
function AB(A, e) {
  if (!arguments.length)
    return Array.from(this, qo);
  var t = e ? $o : Xo, r = this._parents, n = this._groups;
  typeof A != "function" && (A = Jo(A));
  for (var i = n.length, s = new Array(i), o = new Array(i), a = new Array(i), B = 0; B < i; ++B) {
    var g = r[B], c = n[B], l = c.length, M = eB(A.call(g, g && g.__data__, B, r)), w = M.length, f = o[B] = new Array(w), u = s[B] = new Array(w), C = a[B] = new Array(l);
    t(g, c, f, u, C, M, e);
    for (var h = 0, I = 0, d, N; h < w; ++h)
      if (d = f[h]) {
        for (h >= I && (I = h + 1); !(N = u[I]) && ++I < w; )
          ;
        d._next = N || null;
      }
  }
  return s = new lA(s, r), s._enter = o, s._exit = a, s;
}
function eB(A) {
  return typeof A == "object" && "length" in A ? A : Array.from(A);
}
function tB() {
  return new lA(this._exit || this._groups.map(Hs), this._parents);
}
function rB(A, e, t) {
  var r = this.enter(), n = this, i = this.exit();
  return typeof A == "function" ? (r = A(r), r && (r = r.selection())) : r = r.append(A + ""), e != null && (n = e(n), n && (n = n.selection())), t == null ? i.remove() : t(i), r && n ? r.merge(n).order() : n;
}
function nB(A) {
  for (var e = A.selection ? A.selection() : A, t = this._groups, r = e._groups, n = t.length, i = r.length, s = Math.min(n, i), o = new Array(n), a = 0; a < s; ++a)
    for (var B = t[a], g = r[a], c = B.length, l = o[a] = new Array(c), M, w = 0; w < c; ++w)
      (M = B[w] || g[w]) && (l[w] = M);
  for (; a < n; ++a)
    o[a] = t[a];
  return new lA(o, this._parents);
}
function iB() {
  for (var A = this._groups, e = -1, t = A.length; ++e < t; )
    for (var r = A[e], n = r.length - 1, i = r[n], s; --n >= 0; )
      (s = r[n]) && (i && s.compareDocumentPosition(i) ^ 4 && i.parentNode.insertBefore(s, i), i = s);
  return this;
}
function sB(A) {
  A || (A = aB);
  function e(c, l) {
    return c && l ? A(c.__data__, l.__data__) : !c - !l;
  }
  for (var t = this._groups, r = t.length, n = new Array(r), i = 0; i < r; ++i) {
    for (var s = t[i], o = s.length, a = n[i] = new Array(o), B, g = 0; g < o; ++g)
      (B = s[g]) && (a[g] = B);
    a.sort(e);
  }
  return new lA(n, this._parents).order();
}
function aB(A, e) {
  return A < e ? -1 : A > e ? 1 : A >= e ? 0 : NaN;
}
function oB() {
  var A = arguments[0];
  return arguments[0] = this, A.apply(null, arguments), this;
}
function BB() {
  return Array.from(this);
}
function gB() {
  for (var A = this._groups, e = 0, t = A.length; e < t; ++e)
    for (var r = A[e], n = 0, i = r.length; n < i; ++n) {
      var s = r[n];
      if (s)
        return s;
    }
  return null;
}
function cB() {
  let A = 0;
  for (const e of this)
    ++A;
  return A;
}
function lB() {
  return !this.node();
}
function uB(A) {
  for (var e = this._groups, t = 0, r = e.length; t < r; ++t)
    for (var n = e[t], i = 0, s = n.length, o; i < s; ++i)
      (o = n[i]) && A.call(o, o.__data__, i, n);
  return this;
}
function wB(A) {
  return function() {
    this.removeAttribute(A);
  };
}
function fB(A) {
  return function() {
    this.removeAttributeNS(A.space, A.local);
  };
}
function MB(A, e) {
  return function() {
    this.setAttribute(A, e);
  };
}
function CB(A, e) {
  return function() {
    this.setAttributeNS(A.space, A.local, e);
  };
}
function QB(A, e) {
  return function() {
    var t = e.apply(this, arguments);
    t == null ? this.removeAttribute(A) : this.setAttribute(A, t);
  };
}
function hB(A, e) {
  return function() {
    var t = e.apply(this, arguments);
    t == null ? this.removeAttributeNS(A.space, A.local) : this.setAttributeNS(A.space, A.local, t);
  };
}
function IB(A, e) {
  var t = Mr(A);
  if (arguments.length < 2) {
    var r = this.node();
    return t.local ? r.getAttributeNS(t.space, t.local) : r.getAttribute(t);
  }
  return this.each((e == null ? t.local ? fB : wB : typeof e == "function" ? t.local ? hB : QB : t.local ? CB : MB)(t, e));
}
function js(A) {
  return A.ownerDocument && A.ownerDocument.defaultView || A.document && A || A.defaultView;
}
function dB(A) {
  return function() {
    this.style.removeProperty(A);
  };
}
function NB(A, e, t) {
  return function() {
    this.style.setProperty(A, e, t);
  };
}
function UB(A, e, t) {
  return function() {
    var r = e.apply(this, arguments);
    r == null ? this.style.removeProperty(A) : this.style.setProperty(A, r, t);
  };
}
function FB(A, e, t) {
  return arguments.length > 1 ? this.each((e == null ? dB : typeof e == "function" ? UB : NB)(A, e, t == null ? "" : t)) : ye(this.node(), A);
}
function ye(A, e) {
  return A.style.getPropertyValue(e) || js(A).getComputedStyle(A, null).getPropertyValue(e);
}
function DB(A) {
  return function() {
    delete this[A];
  };
}
function yB(A, e) {
  return function() {
    this[A] = e;
  };
}
function EB(A, e) {
  return function() {
    var t = e.apply(this, arguments);
    t == null ? delete this[A] : this[A] = t;
  };
}
function pB(A, e) {
  return arguments.length > 1 ? this.each((e == null ? DB : typeof e == "function" ? EB : yB)(A, e)) : this.node()[A];
}
function xs(A) {
  return A.trim().split(/^|\s+/);
}
function Sn(A) {
  return A.classList || new Ys(A);
}
function Ys(A) {
  this._node = A, this._names = xs(A.getAttribute("class") || "");
}
Ys.prototype = {
  add: function(A) {
    var e = this._names.indexOf(A);
    e < 0 && (this._names.push(A), this._node.setAttribute("class", this._names.join(" ")));
  },
  remove: function(A) {
    var e = this._names.indexOf(A);
    e >= 0 && (this._names.splice(e, 1), this._node.setAttribute("class", this._names.join(" ")));
  },
  contains: function(A) {
    return this._names.indexOf(A) >= 0;
  }
};
function Ss(A, e) {
  for (var t = Sn(A), r = -1, n = e.length; ++r < n; )
    t.add(e[r]);
}
function bs(A, e) {
  for (var t = Sn(A), r = -1, n = e.length; ++r < n; )
    t.remove(e[r]);
}
function TB(A) {
  return function() {
    Ss(this, A);
  };
}
function zB(A) {
  return function() {
    bs(this, A);
  };
}
function LB(A, e) {
  return function() {
    (e.apply(this, arguments) ? Ss : bs)(this, A);
  };
}
function mB(A, e) {
  var t = xs(A + "");
  if (arguments.length < 2) {
    for (var r = Sn(this.node()), n = -1, i = t.length; ++n < i; )
      if (!r.contains(t[n]))
        return !1;
    return !0;
  }
  return this.each((typeof e == "function" ? LB : e ? TB : zB)(t, e));
}
function vB() {
  this.textContent = "";
}
function HB(A) {
  return function() {
    this.textContent = A;
  };
}
function jB(A) {
  return function() {
    var e = A.apply(this, arguments);
    this.textContent = e == null ? "" : e;
  };
}
function xB(A) {
  return arguments.length ? this.each(A == null ? vB : (typeof A == "function" ? jB : HB)(A)) : this.node().textContent;
}
function YB() {
  this.innerHTML = "";
}
function SB(A) {
  return function() {
    this.innerHTML = A;
  };
}
function bB(A) {
  return function() {
    var e = A.apply(this, arguments);
    this.innerHTML = e == null ? "" : e;
  };
}
function GB(A) {
  return arguments.length ? this.each(A == null ? YB : (typeof A == "function" ? bB : SB)(A)) : this.node().innerHTML;
}
function KB() {
  this.nextSibling && this.parentNode.appendChild(this);
}
function OB() {
  return this.each(KB);
}
function RB() {
  this.previousSibling && this.parentNode.insertBefore(this, this.parentNode.firstChild);
}
function kB() {
  return this.each(RB);
}
function PB(A) {
  var e = typeof A == "function" ? A : zs(A);
  return this.select(function() {
    return this.appendChild(e.apply(this, arguments));
  });
}
function _B() {
  return null;
}
function ZB(A, e) {
  var t = typeof A == "function" ? A : zs(A), r = e == null ? _B : typeof e == "function" ? e : Yn(e);
  return this.select(function() {
    return this.insertBefore(t.apply(this, arguments), r.apply(this, arguments) || null);
  });
}
function WB() {
  var A = this.parentNode;
  A && A.removeChild(this);
}
function VB() {
  return this.each(WB);
}
function JB() {
  var A = this.cloneNode(!1), e = this.parentNode;
  return e ? e.insertBefore(A, this.nextSibling) : A;
}
function XB() {
  var A = this.cloneNode(!0), e = this.parentNode;
  return e ? e.insertBefore(A, this.nextSibling) : A;
}
function $B(A) {
  return this.select(A ? XB : JB);
}
function qB(A) {
  return arguments.length ? this.property("__data__", A) : this.node().__data__;
}
function Ag(A) {
  return function(e) {
    A.call(this, e, this.__data__);
  };
}
function eg(A) {
  return A.trim().split(/^|\s+/).map(function(e) {
    var t = "", r = e.indexOf(".");
    return r >= 0 && (t = e.slice(r + 1), e = e.slice(0, r)), { type: e, name: t };
  });
}
function tg(A) {
  return function() {
    var e = this.__on;
    if (!!e) {
      for (var t = 0, r = -1, n = e.length, i; t < n; ++t)
        i = e[t], (!A.type || i.type === A.type) && i.name === A.name ? this.removeEventListener(i.type, i.listener, i.options) : e[++r] = i;
      ++r ? e.length = r : delete this.__on;
    }
  };
}
function rg(A, e, t) {
  return function() {
    var r = this.__on, n, i = Ag(e);
    if (r) {
      for (var s = 0, o = r.length; s < o; ++s)
        if ((n = r[s]).type === A.type && n.name === A.name) {
          this.removeEventListener(n.type, n.listener, n.options), this.addEventListener(n.type, n.listener = i, n.options = t), n.value = e;
          return;
        }
    }
    this.addEventListener(A.type, i, t), n = { type: A.type, name: A.name, value: e, listener: i, options: t }, r ? r.push(n) : this.__on = [n];
  };
}
function ng(A, e, t) {
  var r = eg(A + ""), n, i = r.length, s;
  if (arguments.length < 2) {
    var o = this.node().__on;
    if (o) {
      for (var a = 0, B = o.length, g; a < B; ++a)
        for (n = 0, g = o[a]; n < i; ++n)
          if ((s = r[n]).type === g.type && s.name === g.name)
            return g.value;
    }
    return;
  }
  for (o = e ? rg : tg, n = 0; n < i; ++n)
    this.each(o(r[n], e, t));
  return this;
}
function Gs(A, e, t) {
  var r = js(A), n = r.CustomEvent;
  typeof n == "function" ? n = new n(e, t) : (n = r.document.createEvent("Event"), t ? (n.initEvent(e, t.bubbles, t.cancelable), n.detail = t.detail) : n.initEvent(e, !1, !1)), A.dispatchEvent(n);
}
function ig(A, e) {
  return function() {
    return Gs(this, A, e);
  };
}
function sg(A, e) {
  return function() {
    return Gs(this, A, e.apply(this, arguments));
  };
}
function ag(A, e) {
  return this.each((typeof e == "function" ? sg : ig)(A, e));
}
function* og() {
  for (var A = this._groups, e = 0, t = A.length; e < t; ++e)
    for (var r = A[e], n = 0, i = r.length, s; n < i; ++n)
      (s = r[n]) && (yield s);
}
var Ks = [null];
function lA(A, e) {
  this._groups = A, this._parents = e;
}
function st() {
  return new lA([[document.documentElement]], Ks);
}
function Bg() {
  return this;
}
lA.prototype = st.prototype = {
  constructor: lA,
  select: jo,
  selectAll: bo,
  selectChild: Ro,
  selectChildren: Zo,
  filter: Wo,
  data: AB,
  enter: Vo,
  exit: tB,
  join: rB,
  merge: nB,
  selection: Bg,
  order: iB,
  sort: sB,
  call: oB,
  nodes: BB,
  node: gB,
  size: cB,
  empty: lB,
  each: uB,
  attr: IB,
  style: FB,
  property: pB,
  classed: mB,
  text: xB,
  html: GB,
  raise: OB,
  lower: kB,
  append: PB,
  insert: ZB,
  remove: VB,
  clone: $B,
  datum: qB,
  on: ng,
  dispatch: ag,
  [Symbol.iterator]: og
};
function sA(A) {
  return typeof A == "string" ? new lA([[document.querySelector(A)]], [document.documentElement]) : new lA([[A]], Ks);
}
function bn(A, e, t) {
  A.prototype = e.prototype = t, t.constructor = A;
}
function Os(A, e) {
  var t = Object.create(A.prototype);
  for (var r in e)
    t[r] = e[r];
  return t;
}
function at() {
}
var qe = 0.7, $t = 1 / qe, Fe = "\\s*([+-]?\\d+)\\s*", At = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)\\s*", DA = "\\s*([+-]?(?:\\d*\\.)?\\d+(?:[eE][+-]?\\d+)?)%\\s*", gg = /^#([0-9a-f]{3,8})$/, cg = new RegExp(`^rgb\\(${Fe},${Fe},${Fe}\\)$`), lg = new RegExp(`^rgb\\(${DA},${DA},${DA}\\)$`), ug = new RegExp(`^rgba\\(${Fe},${Fe},${Fe},${At}\\)$`), wg = new RegExp(`^rgba\\(${DA},${DA},${DA},${At}\\)$`), fg = new RegExp(`^hsl\\(${At},${DA},${DA}\\)$`), Mg = new RegExp(`^hsla\\(${At},${DA},${DA},${At}\\)$`), ti = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
bn(at, oe, {
  copy(A) {
    return Object.assign(new this.constructor(), this, A);
  },
  displayable() {
    return this.rgb().displayable();
  },
  hex: ri,
  formatHex: ri,
  formatHex8: Cg,
  formatHsl: Qg,
  formatRgb: ni,
  toString: ni
});
function ri() {
  return this.rgb().formatHex();
}
function Cg() {
  return this.rgb().formatHex8();
}
function Qg() {
  return Rs(this).formatHsl();
}
function ni() {
  return this.rgb().formatRgb();
}
function oe(A) {
  var e, t;
  return A = (A + "").trim().toLowerCase(), (e = gg.exec(A)) ? (t = e[1].length, e = parseInt(e[1], 16), t === 6 ? ii(e) : t === 3 ? new gA(e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, (e & 15) << 4 | e & 15, 1) : t === 8 ? ct(e >> 24 & 255, e >> 16 & 255, e >> 8 & 255, (e & 255) / 255) : t === 4 ? ct(e >> 12 & 15 | e >> 8 & 240, e >> 8 & 15 | e >> 4 & 240, e >> 4 & 15 | e & 240, ((e & 15) << 4 | e & 15) / 255) : null) : (e = cg.exec(A)) ? new gA(e[1], e[2], e[3], 1) : (e = lg.exec(A)) ? new gA(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, 1) : (e = ug.exec(A)) ? ct(e[1], e[2], e[3], e[4]) : (e = wg.exec(A)) ? ct(e[1] * 255 / 100, e[2] * 255 / 100, e[3] * 255 / 100, e[4]) : (e = fg.exec(A)) ? oi(e[1], e[2] / 100, e[3] / 100, 1) : (e = Mg.exec(A)) ? oi(e[1], e[2] / 100, e[3] / 100, e[4]) : ti.hasOwnProperty(A) ? ii(ti[A]) : A === "transparent" ? new gA(NaN, NaN, NaN, 0) : null;
}
function ii(A) {
  return new gA(A >> 16 & 255, A >> 8 & 255, A & 255, 1);
}
function ct(A, e, t, r) {
  return r <= 0 && (A = e = t = NaN), new gA(A, e, t, r);
}
function hg(A) {
  return A instanceof at || (A = oe(A)), A ? (A = A.rgb(), new gA(A.r, A.g, A.b, A.opacity)) : new gA();
}
function rn(A, e, t, r) {
  return arguments.length === 1 ? hg(A) : new gA(A, e, t, r == null ? 1 : r);
}
function gA(A, e, t, r) {
  this.r = +A, this.g = +e, this.b = +t, this.opacity = +r;
}
bn(gA, rn, Os(at, {
  brighter(A) {
    return A = A == null ? $t : Math.pow($t, A), new gA(this.r * A, this.g * A, this.b * A, this.opacity);
  },
  darker(A) {
    return A = A == null ? qe : Math.pow(qe, A), new gA(this.r * A, this.g * A, this.b * A, this.opacity);
  },
  rgb() {
    return this;
  },
  clamp() {
    return new gA(ie(this.r), ie(this.g), ie(this.b), qt(this.opacity));
  },
  displayable() {
    return -0.5 <= this.r && this.r < 255.5 && -0.5 <= this.g && this.g < 255.5 && -0.5 <= this.b && this.b < 255.5 && 0 <= this.opacity && this.opacity <= 1;
  },
  hex: si,
  formatHex: si,
  formatHex8: Ig,
  formatRgb: ai,
  toString: ai
}));
function si() {
  return `#${re(this.r)}${re(this.g)}${re(this.b)}`;
}
function Ig() {
  return `#${re(this.r)}${re(this.g)}${re(this.b)}${re((isNaN(this.opacity) ? 1 : this.opacity) * 255)}`;
}
function ai() {
  const A = qt(this.opacity);
  return `${A === 1 ? "rgb(" : "rgba("}${ie(this.r)}, ${ie(this.g)}, ${ie(this.b)}${A === 1 ? ")" : `, ${A})`}`;
}
function qt(A) {
  return isNaN(A) ? 1 : Math.max(0, Math.min(1, A));
}
function ie(A) {
  return Math.max(0, Math.min(255, Math.round(A) || 0));
}
function re(A) {
  return A = ie(A), (A < 16 ? "0" : "") + A.toString(16);
}
function oi(A, e, t, r) {
  return r <= 0 ? A = e = t = NaN : t <= 0 || t >= 1 ? A = e = NaN : e <= 0 && (A = NaN), new hA(A, e, t, r);
}
function Rs(A) {
  if (A instanceof hA)
    return new hA(A.h, A.s, A.l, A.opacity);
  if (A instanceof at || (A = oe(A)), !A)
    return new hA();
  if (A instanceof hA)
    return A;
  A = A.rgb();
  var e = A.r / 255, t = A.g / 255, r = A.b / 255, n = Math.min(e, t, r), i = Math.max(e, t, r), s = NaN, o = i - n, a = (i + n) / 2;
  return o ? (e === i ? s = (t - r) / o + (t < r) * 6 : t === i ? s = (r - e) / o + 2 : s = (e - t) / o + 4, o /= a < 0.5 ? i + n : 2 - i - n, s *= 60) : o = a > 0 && a < 1 ? 0 : s, new hA(s, o, a, A.opacity);
}
function dg(A, e, t, r) {
  return arguments.length === 1 ? Rs(A) : new hA(A, e, t, r == null ? 1 : r);
}
function hA(A, e, t, r) {
  this.h = +A, this.s = +e, this.l = +t, this.opacity = +r;
}
bn(hA, dg, Os(at, {
  brighter(A) {
    return A = A == null ? $t : Math.pow($t, A), new hA(this.h, this.s, this.l * A, this.opacity);
  },
  darker(A) {
    return A = A == null ? qe : Math.pow(qe, A), new hA(this.h, this.s, this.l * A, this.opacity);
  },
  rgb() {
    var A = this.h % 360 + (this.h < 0) * 360, e = isNaN(A) || isNaN(this.s) ? 0 : this.s, t = this.l, r = t + (t < 0.5 ? t : 1 - t) * e, n = 2 * t - r;
    return new gA(
      Lr(A >= 240 ? A - 240 : A + 120, n, r),
      Lr(A, n, r),
      Lr(A < 120 ? A + 240 : A - 120, n, r),
      this.opacity
    );
  },
  clamp() {
    return new hA(Bi(this.h), lt(this.s), lt(this.l), qt(this.opacity));
  },
  displayable() {
    return (0 <= this.s && this.s <= 1 || isNaN(this.s)) && 0 <= this.l && this.l <= 1 && 0 <= this.opacity && this.opacity <= 1;
  },
  formatHsl() {
    const A = qt(this.opacity);
    return `${A === 1 ? "hsl(" : "hsla("}${Bi(this.h)}, ${lt(this.s) * 100}%, ${lt(this.l) * 100}%${A === 1 ? ")" : `, ${A})`}`;
  }
}));
function Bi(A) {
  return A = (A || 0) % 360, A < 0 ? A + 360 : A;
}
function lt(A) {
  return Math.max(0, Math.min(1, A || 0));
}
function Lr(A, e, t) {
  return (A < 60 ? e + (t - e) * A / 60 : A < 180 ? t : A < 240 ? e + (t - e) * (240 - A) / 60 : e) * 255;
}
const Gn = (A) => () => A;
function Ng(A, e) {
  return function(t) {
    return A + t * e;
  };
}
function Ug(A, e, t) {
  return A = Math.pow(A, t), e = Math.pow(e, t) - A, t = 1 / t, function(r) {
    return Math.pow(A + r * e, t);
  };
}
function Fg(A) {
  return (A = +A) == 1 ? ks : function(e, t) {
    return t - e ? Ug(e, t, A) : Gn(isNaN(e) ? t : e);
  };
}
function ks(A, e) {
  var t = e - A;
  return t ? Ng(A, t) : Gn(isNaN(A) ? e : A);
}
const Ar = function A(e) {
  var t = Fg(e);
  function r(n, i) {
    var s = t((n = rn(n)).r, (i = rn(i)).r), o = t(n.g, i.g), a = t(n.b, i.b), B = ks(n.opacity, i.opacity);
    return function(g) {
      return n.r = s(g), n.g = o(g), n.b = a(g), n.opacity = B(g), n + "";
    };
  }
  return r.gamma = A, r;
}(1);
function Dg(A, e) {
  e || (e = []);
  var t = A ? Math.min(e.length, A.length) : 0, r = e.slice(), n;
  return function(i) {
    for (n = 0; n < t; ++n)
      r[n] = A[n] * (1 - i) + e[n] * i;
    return r;
  };
}
function yg(A) {
  return ArrayBuffer.isView(A) && !(A instanceof DataView);
}
function Eg(A, e) {
  var t = e ? e.length : 0, r = A ? Math.min(t, A.length) : 0, n = new Array(r), i = new Array(t), s;
  for (s = 0; s < r; ++s)
    n[s] = Kn(A[s], e[s]);
  for (; s < t; ++s)
    i[s] = e[s];
  return function(o) {
    for (s = 0; s < r; ++s)
      i[s] = n[s](o);
    return i;
  };
}
function pg(A, e) {
  var t = new Date();
  return A = +A, e = +e, function(r) {
    return t.setTime(A * (1 - r) + e * r), t;
  };
}
function QA(A, e) {
  return A = +A, e = +e, function(t) {
    return A * (1 - t) + e * t;
  };
}
function Tg(A, e) {
  var t = {}, r = {}, n;
  (A === null || typeof A != "object") && (A = {}), (e === null || typeof e != "object") && (e = {});
  for (n in e)
    n in A ? t[n] = Kn(A[n], e[n]) : r[n] = e[n];
  return function(i) {
    for (n in t)
      r[n] = t[n](i);
    return r;
  };
}
var nn = /[-+]?(?:\d+\.?\d*|\.?\d+)(?:[eE][-+]?\d+)?/g, mr = new RegExp(nn.source, "g");
function zg(A) {
  return function() {
    return A;
  };
}
function Lg(A) {
  return function(e) {
    return A(e) + "";
  };
}
function Ps(A, e) {
  var t = nn.lastIndex = mr.lastIndex = 0, r, n, i, s = -1, o = [], a = [];
  for (A = A + "", e = e + ""; (r = nn.exec(A)) && (n = mr.exec(e)); )
    (i = n.index) > t && (i = e.slice(t, i), o[s] ? o[s] += i : o[++s] = i), (r = r[0]) === (n = n[0]) ? o[s] ? o[s] += n : o[++s] = n : (o[++s] = null, a.push({ i: s, x: QA(r, n) })), t = mr.lastIndex;
  return t < e.length && (i = e.slice(t), o[s] ? o[s] += i : o[++s] = i), o.length < 2 ? a[0] ? Lg(a[0].x) : zg(e) : (e = a.length, function(B) {
    for (var g = 0, c; g < e; ++g)
      o[(c = a[g]).i] = c.x(B);
    return o.join("");
  });
}
function Kn(A, e) {
  var t = typeof e, r;
  return e == null || t === "boolean" ? Gn(e) : (t === "number" ? QA : t === "string" ? (r = oe(e)) ? (e = r, Ar) : Ps : e instanceof oe ? Ar : e instanceof Date ? pg : yg(e) ? Dg : Array.isArray(e) ? Eg : typeof e.valueOf != "function" && typeof e.toString != "function" || isNaN(e) ? Tg : QA)(A, e);
}
function mg(A, e) {
  return A = +A, e = +e, function(t) {
    return Math.round(A * (1 - t) + e * t);
  };
}
var gi = 180 / Math.PI, sn = {
  translateX: 0,
  translateY: 0,
  rotate: 0,
  skewX: 0,
  scaleX: 1,
  scaleY: 1
};
function _s(A, e, t, r, n, i) {
  var s, o, a;
  return (s = Math.sqrt(A * A + e * e)) && (A /= s, e /= s), (a = A * t + e * r) && (t -= A * a, r -= e * a), (o = Math.sqrt(t * t + r * r)) && (t /= o, r /= o, a /= o), A * r < e * t && (A = -A, e = -e, a = -a, s = -s), {
    translateX: n,
    translateY: i,
    rotate: Math.atan2(e, A) * gi,
    skewX: Math.atan(a) * gi,
    scaleX: s,
    scaleY: o
  };
}
var ut;
function vg(A) {
  const e = new (typeof DOMMatrix == "function" ? DOMMatrix : WebKitCSSMatrix)(A + "");
  return e.isIdentity ? sn : _s(e.a, e.b, e.c, e.d, e.e, e.f);
}
function Hg(A) {
  return A == null || (ut || (ut = document.createElementNS("http://www.w3.org/2000/svg", "g")), ut.setAttribute("transform", A), !(A = ut.transform.baseVal.consolidate())) ? sn : (A = A.matrix, _s(A.a, A.b, A.c, A.d, A.e, A.f));
}
function Zs(A, e, t, r) {
  function n(B) {
    return B.length ? B.pop() + " " : "";
  }
  function i(B, g, c, l, M, w) {
    if (B !== c || g !== l) {
      var f = M.push("translate(", null, e, null, t);
      w.push({ i: f - 4, x: QA(B, c) }, { i: f - 2, x: QA(g, l) });
    } else
      (c || l) && M.push("translate(" + c + e + l + t);
  }
  function s(B, g, c, l) {
    B !== g ? (B - g > 180 ? g += 360 : g - B > 180 && (B += 360), l.push({ i: c.push(n(c) + "rotate(", null, r) - 2, x: QA(B, g) })) : g && c.push(n(c) + "rotate(" + g + r);
  }
  function o(B, g, c, l) {
    B !== g ? l.push({ i: c.push(n(c) + "skewX(", null, r) - 2, x: QA(B, g) }) : g && c.push(n(c) + "skewX(" + g + r);
  }
  function a(B, g, c, l, M, w) {
    if (B !== c || g !== l) {
      var f = M.push(n(M) + "scale(", null, ",", null, ")");
      w.push({ i: f - 4, x: QA(B, c) }, { i: f - 2, x: QA(g, l) });
    } else
      (c !== 1 || l !== 1) && M.push(n(M) + "scale(" + c + "," + l + ")");
  }
  return function(B, g) {
    var c = [], l = [];
    return B = A(B), g = A(g), i(B.translateX, B.translateY, g.translateX, g.translateY, c, l), s(B.rotate, g.rotate, c, l), o(B.skewX, g.skewX, c, l), a(B.scaleX, B.scaleY, g.scaleX, g.scaleY, c, l), B = g = null, function(M) {
      for (var w = -1, f = l.length, u; ++w < f; )
        c[(u = l[w]).i] = u.x(M);
      return c.join("");
    };
  };
}
var jg = Zs(vg, "px, ", "px)", "deg)"), xg = Zs(Hg, ", ", ")", ")"), Ee = 0, Se = 0, ve = 0, Ws = 1e3, er, be, tr = 0, Be = 0, Cr = 0, et = typeof performance == "object" && performance.now ? performance : Date, Vs = typeof window == "object" && window.requestAnimationFrame ? window.requestAnimationFrame.bind(window) : function(A) {
  setTimeout(A, 17);
};
function On() {
  return Be || (Vs(Yg), Be = et.now() + Cr);
}
function Yg() {
  Be = 0;
}
function rr() {
  this._call = this._time = this._next = null;
}
rr.prototype = Js.prototype = {
  constructor: rr,
  restart: function(A, e, t) {
    if (typeof A != "function")
      throw new TypeError("callback is not a function");
    t = (t == null ? On() : +t) + (e == null ? 0 : +e), !this._next && be !== this && (be ? be._next = this : er = this, be = this), this._call = A, this._time = t, an();
  },
  stop: function() {
    this._call && (this._call = null, this._time = 1 / 0, an());
  }
};
function Js(A, e, t) {
  var r = new rr();
  return r.restart(A, e, t), r;
}
function Sg() {
  On(), ++Ee;
  for (var A = er, e; A; )
    (e = Be - A._time) >= 0 && A._call.call(void 0, e), A = A._next;
  --Ee;
}
function ci() {
  Be = (tr = et.now()) + Cr, Ee = Se = 0;
  try {
    Sg();
  } finally {
    Ee = 0, Gg(), Be = 0;
  }
}
function bg() {
  var A = et.now(), e = A - tr;
  e > Ws && (Cr -= e, tr = A);
}
function Gg() {
  for (var A, e = er, t, r = 1 / 0; e; )
    e._call ? (r > e._time && (r = e._time), A = e, e = e._next) : (t = e._next, e._next = null, e = A ? A._next = t : er = t);
  be = A, an(r);
}
function an(A) {
  if (!Ee) {
    Se && (Se = clearTimeout(Se));
    var e = A - Be;
    e > 24 ? (A < 1 / 0 && (Se = setTimeout(ci, A - et.now() - Cr)), ve && (ve = clearInterval(ve))) : (ve || (tr = et.now(), ve = setInterval(bg, Ws)), Ee = 1, Vs(ci));
  }
}
function li(A, e, t) {
  var r = new rr();
  return e = e == null ? 0 : +e, r.restart((n) => {
    r.stop(), A(n + e);
  }, e, t), r;
}
var Kg = Ts("start", "end", "cancel", "interrupt"), Og = [], Xs = 0, ui = 1, on = 2, Ot = 3, wi = 4, Bn = 5, Rt = 6;
function Qr(A, e, t, r, n, i) {
  var s = A.__transition;
  if (!s)
    A.__transition = {};
  else if (t in s)
    return;
  Rg(A, t, {
    name: e,
    index: r,
    group: n,
    on: Kg,
    tween: Og,
    time: i.time,
    delay: i.delay,
    duration: i.duration,
    ease: i.ease,
    timer: null,
    state: Xs
  });
}
function Rn(A, e) {
  var t = IA(A, e);
  if (t.state > Xs)
    throw new Error("too late; already scheduled");
  return t;
}
function yA(A, e) {
  var t = IA(A, e);
  if (t.state > Ot)
    throw new Error("too late; already running");
  return t;
}
function IA(A, e) {
  var t = A.__transition;
  if (!t || !(t = t[e]))
    throw new Error("transition not found");
  return t;
}
function Rg(A, e, t) {
  var r = A.__transition, n;
  r[e] = t, t.timer = Js(i, 0, t.time);
  function i(B) {
    t.state = ui, t.timer.restart(s, t.delay, t.time), t.delay <= B && s(B - t.delay);
  }
  function s(B) {
    var g, c, l, M;
    if (t.state !== ui)
      return a();
    for (g in r)
      if (M = r[g], M.name === t.name) {
        if (M.state === Ot)
          return li(s);
        M.state === wi ? (M.state = Rt, M.timer.stop(), M.on.call("interrupt", A, A.__data__, M.index, M.group), delete r[g]) : +g < e && (M.state = Rt, M.timer.stop(), M.on.call("cancel", A, A.__data__, M.index, M.group), delete r[g]);
      }
    if (li(function() {
      t.state === Ot && (t.state = wi, t.timer.restart(o, t.delay, t.time), o(B));
    }), t.state = on, t.on.call("start", A, A.__data__, t.index, t.group), t.state === on) {
      for (t.state = Ot, n = new Array(l = t.tween.length), g = 0, c = -1; g < l; ++g)
        (M = t.tween[g].value.call(A, A.__data__, t.index, t.group)) && (n[++c] = M);
      n.length = c + 1;
    }
  }
  function o(B) {
    for (var g = B < t.duration ? t.ease.call(null, B / t.duration) : (t.timer.restart(a), t.state = Bn, 1), c = -1, l = n.length; ++c < l; )
      n[c].call(A, g);
    t.state === Bn && (t.on.call("end", A, A.__data__, t.index, t.group), a());
  }
  function a() {
    t.state = Rt, t.timer.stop(), delete r[e];
    for (var B in r)
      return;
    delete A.__transition;
  }
}
function kg(A, e) {
  var t = A.__transition, r, n, i = !0, s;
  if (!!t) {
    e = e == null ? null : e + "";
    for (s in t) {
      if ((r = t[s]).name !== e) {
        i = !1;
        continue;
      }
      n = r.state > on && r.state < Bn, r.state = Rt, r.timer.stop(), r.on.call(n ? "interrupt" : "cancel", A, A.__data__, r.index, r.group), delete t[s];
    }
    i && delete A.__transition;
  }
}
function Pg(A) {
  return this.each(function() {
    kg(this, A);
  });
}
function _g(A, e) {
  var t, r;
  return function() {
    var n = yA(this, A), i = n.tween;
    if (i !== t) {
      r = t = i;
      for (var s = 0, o = r.length; s < o; ++s)
        if (r[s].name === e) {
          r = r.slice(), r.splice(s, 1);
          break;
        }
    }
    n.tween = r;
  };
}
function Zg(A, e, t) {
  var r, n;
  if (typeof t != "function")
    throw new Error();
  return function() {
    var i = yA(this, A), s = i.tween;
    if (s !== r) {
      n = (r = s).slice();
      for (var o = { name: e, value: t }, a = 0, B = n.length; a < B; ++a)
        if (n[a].name === e) {
          n[a] = o;
          break;
        }
      a === B && n.push(o);
    }
    i.tween = n;
  };
}
function Wg(A, e) {
  var t = this._id;
  if (A += "", arguments.length < 2) {
    for (var r = IA(this.node(), t).tween, n = 0, i = r.length, s; n < i; ++n)
      if ((s = r[n]).name === A)
        return s.value;
    return null;
  }
  return this.each((e == null ? _g : Zg)(t, A, e));
}
function kn(A, e, t) {
  var r = A._id;
  return A.each(function() {
    var n = yA(this, r);
    (n.value || (n.value = {}))[e] = t.apply(this, arguments);
  }), function(n) {
    return IA(n, r).value[e];
  };
}
function $s(A, e) {
  var t;
  return (typeof e == "number" ? QA : e instanceof oe ? Ar : (t = oe(e)) ? (e = t, Ar) : Ps)(A, e);
}
function Vg(A) {
  return function() {
    this.removeAttribute(A);
  };
}
function Jg(A) {
  return function() {
    this.removeAttributeNS(A.space, A.local);
  };
}
function Xg(A, e, t) {
  var r, n = t + "", i;
  return function() {
    var s = this.getAttribute(A);
    return s === n ? null : s === r ? i : i = e(r = s, t);
  };
}
function $g(A, e, t) {
  var r, n = t + "", i;
  return function() {
    var s = this.getAttributeNS(A.space, A.local);
    return s === n ? null : s === r ? i : i = e(r = s, t);
  };
}
function qg(A, e, t) {
  var r, n, i;
  return function() {
    var s, o = t(this), a;
    return o == null ? void this.removeAttribute(A) : (s = this.getAttribute(A), a = o + "", s === a ? null : s === r && a === n ? i : (n = a, i = e(r = s, o)));
  };
}
function Ac(A, e, t) {
  var r, n, i;
  return function() {
    var s, o = t(this), a;
    return o == null ? void this.removeAttributeNS(A.space, A.local) : (s = this.getAttributeNS(A.space, A.local), a = o + "", s === a ? null : s === r && a === n ? i : (n = a, i = e(r = s, o)));
  };
}
function ec(A, e) {
  var t = Mr(A), r = t === "transform" ? xg : $s;
  return this.attrTween(A, typeof e == "function" ? (t.local ? Ac : qg)(t, r, kn(this, "attr." + A, e)) : e == null ? (t.local ? Jg : Vg)(t) : (t.local ? $g : Xg)(t, r, e));
}
function tc(A, e) {
  return function(t) {
    this.setAttribute(A, e.call(this, t));
  };
}
function rc(A, e) {
  return function(t) {
    this.setAttributeNS(A.space, A.local, e.call(this, t));
  };
}
function nc(A, e) {
  var t, r;
  function n() {
    var i = e.apply(this, arguments);
    return i !== r && (t = (r = i) && rc(A, i)), t;
  }
  return n._value = e, n;
}
function ic(A, e) {
  var t, r;
  function n() {
    var i = e.apply(this, arguments);
    return i !== r && (t = (r = i) && tc(A, i)), t;
  }
  return n._value = e, n;
}
function sc(A, e) {
  var t = "attr." + A;
  if (arguments.length < 2)
    return (t = this.tween(t)) && t._value;
  if (e == null)
    return this.tween(t, null);
  if (typeof e != "function")
    throw new Error();
  var r = Mr(A);
  return this.tween(t, (r.local ? nc : ic)(r, e));
}
function ac(A, e) {
  return function() {
    Rn(this, A).delay = +e.apply(this, arguments);
  };
}
function oc(A, e) {
  return e = +e, function() {
    Rn(this, A).delay = e;
  };
}
function Bc(A) {
  var e = this._id;
  return arguments.length ? this.each((typeof A == "function" ? ac : oc)(e, A)) : IA(this.node(), e).delay;
}
function gc(A, e) {
  return function() {
    yA(this, A).duration = +e.apply(this, arguments);
  };
}
function cc(A, e) {
  return e = +e, function() {
    yA(this, A).duration = e;
  };
}
function lc(A) {
  var e = this._id;
  return arguments.length ? this.each((typeof A == "function" ? gc : cc)(e, A)) : IA(this.node(), e).duration;
}
function uc(A, e) {
  if (typeof e != "function")
    throw new Error();
  return function() {
    yA(this, A).ease = e;
  };
}
function wc(A) {
  var e = this._id;
  return arguments.length ? this.each(uc(e, A)) : IA(this.node(), e).ease;
}
function fc(A, e) {
  return function() {
    var t = e.apply(this, arguments);
    if (typeof t != "function")
      throw new Error();
    yA(this, A).ease = t;
  };
}
function Mc(A) {
  if (typeof A != "function")
    throw new Error();
  return this.each(fc(this._id, A));
}
function Cc(A) {
  typeof A != "function" && (A = ms(A));
  for (var e = this._groups, t = e.length, r = new Array(t), n = 0; n < t; ++n)
    for (var i = e[n], s = i.length, o = r[n] = [], a, B = 0; B < s; ++B)
      (a = i[B]) && A.call(a, a.__data__, B, i) && o.push(a);
  return new jA(r, this._parents, this._name, this._id);
}
function Qc(A) {
  if (A._id !== this._id)
    throw new Error();
  for (var e = this._groups, t = A._groups, r = e.length, n = t.length, i = Math.min(r, n), s = new Array(r), o = 0; o < i; ++o)
    for (var a = e[o], B = t[o], g = a.length, c = s[o] = new Array(g), l, M = 0; M < g; ++M)
      (l = a[M] || B[M]) && (c[M] = l);
  for (; o < r; ++o)
    s[o] = e[o];
  return new jA(s, this._parents, this._name, this._id);
}
function hc(A) {
  return (A + "").trim().split(/^|\s+/).every(function(e) {
    var t = e.indexOf(".");
    return t >= 0 && (e = e.slice(0, t)), !e || e === "start";
  });
}
function Ic(A, e, t) {
  var r, n, i = hc(e) ? Rn : yA;
  return function() {
    var s = i(this, A), o = s.on;
    o !== r && (n = (r = o).copy()).on(e, t), s.on = n;
  };
}
function dc(A, e) {
  var t = this._id;
  return arguments.length < 2 ? IA(this.node(), t).on.on(A) : this.each(Ic(t, A, e));
}
function Nc(A) {
  return function() {
    var e = this.parentNode;
    for (var t in this.__transition)
      if (+t !== A)
        return;
    e && e.removeChild(this);
  };
}
function Uc() {
  return this.on("end.remove", Nc(this._id));
}
function Fc(A) {
  var e = this._name, t = this._id;
  typeof A != "function" && (A = Yn(A));
  for (var r = this._groups, n = r.length, i = new Array(n), s = 0; s < n; ++s)
    for (var o = r[s], a = o.length, B = i[s] = new Array(a), g, c, l = 0; l < a; ++l)
      (g = o[l]) && (c = A.call(g, g.__data__, l, o)) && ("__data__" in g && (c.__data__ = g.__data__), B[l] = c, Qr(B[l], e, t, l, B, IA(g, t)));
  return new jA(i, this._parents, e, t);
}
function Dc(A) {
  var e = this._name, t = this._id;
  typeof A != "function" && (A = Ls(A));
  for (var r = this._groups, n = r.length, i = [], s = [], o = 0; o < n; ++o)
    for (var a = r[o], B = a.length, g, c = 0; c < B; ++c)
      if (g = a[c]) {
        for (var l = A.call(g, g.__data__, c, a), M, w = IA(g, t), f = 0, u = l.length; f < u; ++f)
          (M = l[f]) && Qr(M, e, t, f, l, w);
        i.push(l), s.push(g);
      }
  return new jA(i, s, e, t);
}
var yc = st.prototype.constructor;
function Ec() {
  return new yc(this._groups, this._parents);
}
function pc(A, e) {
  var t, r, n;
  return function() {
    var i = ye(this, A), s = (this.style.removeProperty(A), ye(this, A));
    return i === s ? null : i === t && s === r ? n : n = e(t = i, r = s);
  };
}
function qs(A) {
  return function() {
    this.style.removeProperty(A);
  };
}
function Tc(A, e, t) {
  var r, n = t + "", i;
  return function() {
    var s = ye(this, A);
    return s === n ? null : s === r ? i : i = e(r = s, t);
  };
}
function zc(A, e, t) {
  var r, n, i;
  return function() {
    var s = ye(this, A), o = t(this), a = o + "";
    return o == null && (a = o = (this.style.removeProperty(A), ye(this, A))), s === a ? null : s === r && a === n ? i : (n = a, i = e(r = s, o));
  };
}
function Lc(A, e) {
  var t, r, n, i = "style." + e, s = "end." + i, o;
  return function() {
    var a = yA(this, A), B = a.on, g = a.value[i] == null ? o || (o = qs(e)) : void 0;
    (B !== t || n !== g) && (r = (t = B).copy()).on(s, n = g), a.on = r;
  };
}
function mc(A, e, t) {
  var r = (A += "") == "transform" ? jg : $s;
  return e == null ? this.styleTween(A, pc(A, r)).on("end.style." + A, qs(A)) : typeof e == "function" ? this.styleTween(A, zc(A, r, kn(this, "style." + A, e))).each(Lc(this._id, A)) : this.styleTween(A, Tc(A, r, e), t).on("end.style." + A, null);
}
function vc(A, e, t) {
  return function(r) {
    this.style.setProperty(A, e.call(this, r), t);
  };
}
function Hc(A, e, t) {
  var r, n;
  function i() {
    var s = e.apply(this, arguments);
    return s !== n && (r = (n = s) && vc(A, s, t)), r;
  }
  return i._value = e, i;
}
function jc(A, e, t) {
  var r = "style." + (A += "");
  if (arguments.length < 2)
    return (r = this.tween(r)) && r._value;
  if (e == null)
    return this.tween(r, null);
  if (typeof e != "function")
    throw new Error();
  return this.tween(r, Hc(A, e, t == null ? "" : t));
}
function xc(A) {
  return function() {
    this.textContent = A;
  };
}
function Yc(A) {
  return function() {
    var e = A(this);
    this.textContent = e == null ? "" : e;
  };
}
function Sc(A) {
  return this.tween("text", typeof A == "function" ? Yc(kn(this, "text", A)) : xc(A == null ? "" : A + ""));
}
function bc(A) {
  return function(e) {
    this.textContent = A.call(this, e);
  };
}
function Gc(A) {
  var e, t;
  function r() {
    var n = A.apply(this, arguments);
    return n !== t && (e = (t = n) && bc(n)), e;
  }
  return r._value = A, r;
}
function Kc(A) {
  var e = "text";
  if (arguments.length < 1)
    return (e = this.tween(e)) && e._value;
  if (A == null)
    return this.tween(e, null);
  if (typeof A != "function")
    throw new Error();
  return this.tween(e, Gc(A));
}
function Oc() {
  for (var A = this._name, e = this._id, t = Aa(), r = this._groups, n = r.length, i = 0; i < n; ++i)
    for (var s = r[i], o = s.length, a, B = 0; B < o; ++B)
      if (a = s[B]) {
        var g = IA(a, e);
        Qr(a, A, t, B, s, {
          time: g.time + g.delay + g.duration,
          delay: 0,
          duration: g.duration,
          ease: g.ease
        });
      }
  return new jA(r, this._parents, A, t);
}
function Rc() {
  var A, e, t = this, r = t._id, n = t.size();
  return new Promise(function(i, s) {
    var o = { value: s }, a = { value: function() {
      --n === 0 && i();
    } };
    t.each(function() {
      var B = yA(this, r), g = B.on;
      g !== A && (e = (A = g).copy(), e._.cancel.push(o), e._.interrupt.push(o), e._.end.push(a)), B.on = e;
    }), n === 0 && i();
  });
}
var kc = 0;
function jA(A, e, t, r) {
  this._groups = A, this._parents = e, this._name = t, this._id = r;
}
function Aa() {
  return ++kc;
}
var LA = st.prototype;
jA.prototype = {
  constructor: jA,
  select: Fc,
  selectAll: Dc,
  selectChild: LA.selectChild,
  selectChildren: LA.selectChildren,
  filter: Cc,
  merge: Qc,
  selection: Ec,
  transition: Oc,
  call: LA.call,
  nodes: LA.nodes,
  node: LA.node,
  size: LA.size,
  empty: LA.empty,
  each: LA.each,
  on: dc,
  attr: ec,
  attrTween: sc,
  style: mc,
  styleTween: jc,
  text: Sc,
  textTween: Kc,
  remove: Uc,
  tween: Wg,
  delay: Bc,
  duration: lc,
  ease: wc,
  easeVarying: Mc,
  end: Rc,
  [Symbol.iterator]: LA[Symbol.iterator]
};
function Pc(A) {
  return ((A *= 2) <= 1 ? A * A * A : (A -= 2) * A * A + 2) / 2;
}
var _c = {
  time: null,
  delay: 0,
  duration: 250,
  ease: Pc
};
function Zc(A, e) {
  for (var t; !(t = A.__transition) || !(t = t[e]); )
    if (!(A = A.parentNode))
      throw new Error(`transition ${e} not found`);
  return t;
}
function Wc(A) {
  var e, t;
  A instanceof jA ? (e = A._id, A = A._name) : (e = Aa(), (t = _c).time = On(), A = A == null ? null : A + "");
  for (var r = this._groups, n = r.length, i = 0; i < n; ++i)
    for (var s = r[i], o = s.length, a, B = 0; B < o; ++B)
      (a = s[B]) && Qr(a, A, e, B, s, t || Zc(a, e));
  return new jA(r, this._parents, A, e);
}
st.prototype.interrupt = Pg;
st.prototype.transition = Wc;
const gn = Math.PI, cn = 2 * gn, ee = 1e-6, Vc = cn - ee;
function ea(A) {
  this._ += A[0];
  for (let e = 1, t = A.length; e < t; ++e)
    this._ += arguments[e] + A[e];
}
function Jc(A) {
  let e = Math.floor(A);
  if (!(e >= 0))
    throw new Error(`invalid digits: ${A}`);
  if (e > 15)
    return ea;
  const t = 10 ** e;
  return function(r) {
    this._ += r[0];
    for (let n = 1, i = r.length; n < i; ++n)
      this._ += Math.round(arguments[n] * t) / t + r[n];
  };
}
class Pn {
  constructor(e) {
    this._x0 = this._y0 = this._x1 = this._y1 = null, this._ = "", this._append = e == null ? ea : Jc(e);
  }
  moveTo(e, t) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +t}`;
  }
  closePath() {
    this._x1 !== null && (this._x1 = this._x0, this._y1 = this._y0, this._append`Z`);
  }
  lineTo(e, t) {
    this._append`L${this._x1 = +e},${this._y1 = +t}`;
  }
  quadraticCurveTo(e, t, r, n) {
    this._append`Q${+e},${+t},${this._x1 = +r},${this._y1 = +n}`;
  }
  bezierCurveTo(e, t, r, n, i, s) {
    this._append`C${+e},${+t},${+r},${+n},${this._x1 = +i},${this._y1 = +s}`;
  }
  arcTo(e, t, r, n, i) {
    if (e = +e, t = +t, r = +r, n = +n, i = +i, i < 0)
      throw new Error(`negative radius: ${i}`);
    let s = this._x1, o = this._y1, a = r - e, B = n - t, g = s - e, c = o - t, l = g * g + c * c;
    if (this._x1 === null)
      this._append`M${this._x1 = e},${this._y1 = t}`;
    else if (l > ee)
      if (!(Math.abs(c * a - B * g) > ee) || !i)
        this._append`L${this._x1 = e},${this._y1 = t}`;
      else {
        let M = r - s, w = n - o, f = a * a + B * B, u = M * M + w * w, C = Math.sqrt(f), h = Math.sqrt(l), I = i * Math.tan((gn - Math.acos((f + l - u) / (2 * C * h))) / 2), d = I / h, N = I / C;
        Math.abs(d - 1) > ee && this._append`L${e + d * g},${t + d * c}`, this._append`A${i},${i},0,0,${+(c * M > g * w)},${this._x1 = e + N * a},${this._y1 = t + N * B}`;
      }
  }
  arc(e, t, r, n, i, s) {
    if (e = +e, t = +t, r = +r, s = !!s, r < 0)
      throw new Error(`negative radius: ${r}`);
    let o = r * Math.cos(n), a = r * Math.sin(n), B = e + o, g = t + a, c = 1 ^ s, l = s ? n - i : i - n;
    this._x1 === null ? this._append`M${B},${g}` : (Math.abs(this._x1 - B) > ee || Math.abs(this._y1 - g) > ee) && this._append`L${B},${g}`, r && (l < 0 && (l = l % cn + cn), l > Vc ? this._append`A${r},${r},0,1,${c},${e - o},${t - a}A${r},${r},0,1,${c},${this._x1 = B},${this._y1 = g}` : l > ee && this._append`A${r},${r},0,${+(l >= gn)},${c},${this._x1 = e + r * Math.cos(i)},${this._y1 = t + r * Math.sin(i)}`);
  }
  rect(e, t, r, n) {
    this._append`M${this._x0 = this._x1 = +e},${this._y0 = this._y1 = +t}h${r = +r}v${+n}h${-r}Z`;
  }
  toString() {
    return this._;
  }
}
function tt() {
  return new Pn();
}
tt.prototype = Pn.prototype;
function Xc(A) {
  return Math.abs(A = Math.round(A)) >= 1e21 ? A.toLocaleString("en").replace(/,/g, "") : A.toString(10);
}
function nr(A, e) {
  if ((t = (A = e ? A.toExponential(e - 1) : A.toExponential()).indexOf("e")) < 0)
    return null;
  var t, r = A.slice(0, t);
  return [
    r.length > 1 ? r[0] + r.slice(2) : r,
    +A.slice(t + 1)
  ];
}
function pe(A) {
  return A = nr(Math.abs(A)), A ? A[1] : NaN;
}
function $c(A, e) {
  return function(t, r) {
    for (var n = t.length, i = [], s = 0, o = A[0], a = 0; n > 0 && o > 0 && (a + o + 1 > r && (o = Math.max(1, r - a)), i.push(t.substring(n -= o, n + o)), !((a += o + 1) > r)); )
      o = A[s = (s + 1) % A.length];
    return i.reverse().join(e);
  };
}
function qc(A) {
  return function(e) {
    return e.replace(/[0-9]/g, function(t) {
      return A[+t];
    });
  };
}
var Al = /^(?:(.)?([<>=^]))?([+\-( ])?([$#])?(0)?(\d+)?(,)?(\.\d+)?(~)?([a-z%])?$/i;
function ir(A) {
  if (!(e = Al.exec(A)))
    throw new Error("invalid format: " + A);
  var e;
  return new _n({
    fill: e[1],
    align: e[2],
    sign: e[3],
    symbol: e[4],
    zero: e[5],
    width: e[6],
    comma: e[7],
    precision: e[8] && e[8].slice(1),
    trim: e[9],
    type: e[10]
  });
}
ir.prototype = _n.prototype;
function _n(A) {
  this.fill = A.fill === void 0 ? " " : A.fill + "", this.align = A.align === void 0 ? ">" : A.align + "", this.sign = A.sign === void 0 ? "-" : A.sign + "", this.symbol = A.symbol === void 0 ? "" : A.symbol + "", this.zero = !!A.zero, this.width = A.width === void 0 ? void 0 : +A.width, this.comma = !!A.comma, this.precision = A.precision === void 0 ? void 0 : +A.precision, this.trim = !!A.trim, this.type = A.type === void 0 ? "" : A.type + "";
}
_n.prototype.toString = function() {
  return this.fill + this.align + this.sign + this.symbol + (this.zero ? "0" : "") + (this.width === void 0 ? "" : Math.max(1, this.width | 0)) + (this.comma ? "," : "") + (this.precision === void 0 ? "" : "." + Math.max(0, this.precision | 0)) + (this.trim ? "~" : "") + this.type;
};
function el(A) {
  A:
    for (var e = A.length, t = 1, r = -1, n; t < e; ++t)
      switch (A[t]) {
        case ".":
          r = n = t;
          break;
        case "0":
          r === 0 && (r = t), n = t;
          break;
        default:
          if (!+A[t])
            break A;
          r > 0 && (r = 0);
          break;
      }
  return r > 0 ? A.slice(0, r) + A.slice(n + 1) : A;
}
var ta;
function tl(A, e) {
  var t = nr(A, e);
  if (!t)
    return A + "";
  var r = t[0], n = t[1], i = n - (ta = Math.max(-8, Math.min(8, Math.floor(n / 3))) * 3) + 1, s = r.length;
  return i === s ? r : i > s ? r + new Array(i - s + 1).join("0") : i > 0 ? r.slice(0, i) + "." + r.slice(i) : "0." + new Array(1 - i).join("0") + nr(A, Math.max(0, e + i - 1))[0];
}
function fi(A, e) {
  var t = nr(A, e);
  if (!t)
    return A + "";
  var r = t[0], n = t[1];
  return n < 0 ? "0." + new Array(-n).join("0") + r : r.length > n + 1 ? r.slice(0, n + 1) + "." + r.slice(n + 1) : r + new Array(n - r.length + 2).join("0");
}
const Mi = {
  "%": (A, e) => (A * 100).toFixed(e),
  b: (A) => Math.round(A).toString(2),
  c: (A) => A + "",
  d: Xc,
  e: (A, e) => A.toExponential(e),
  f: (A, e) => A.toFixed(e),
  g: (A, e) => A.toPrecision(e),
  o: (A) => Math.round(A).toString(8),
  p: (A, e) => fi(A * 100, e),
  r: fi,
  s: tl,
  X: (A) => Math.round(A).toString(16).toUpperCase(),
  x: (A) => Math.round(A).toString(16)
};
function Ci(A) {
  return A;
}
var Qi = Array.prototype.map, hi = ["y", "z", "a", "f", "p", "n", "\xB5", "m", "", "k", "M", "G", "T", "P", "E", "Z", "Y"];
function rl(A) {
  var e = A.grouping === void 0 || A.thousands === void 0 ? Ci : $c(Qi.call(A.grouping, Number), A.thousands + ""), t = A.currency === void 0 ? "" : A.currency[0] + "", r = A.currency === void 0 ? "" : A.currency[1] + "", n = A.decimal === void 0 ? "." : A.decimal + "", i = A.numerals === void 0 ? Ci : qc(Qi.call(A.numerals, String)), s = A.percent === void 0 ? "%" : A.percent + "", o = A.minus === void 0 ? "\u2212" : A.minus + "", a = A.nan === void 0 ? "NaN" : A.nan + "";
  function B(c) {
    c = ir(c);
    var l = c.fill, M = c.align, w = c.sign, f = c.symbol, u = c.zero, C = c.width, h = c.comma, I = c.precision, d = c.trim, N = c.type;
    N === "n" ? (h = !0, N = "g") : Mi[N] || (I === void 0 && (I = 12), d = !0, N = "g"), (u || l === "0" && M === "=") && (u = !0, l = "0", M = "=");
    var U = f === "$" ? t : f === "#" && /[boxX]/.test(N) ? "0" + N.toLowerCase() : "", D = f === "$" ? r : /[%p]/.test(N) ? s : "", L = Mi[N], y = /[defgprs%]/.test(N);
    I = I === void 0 ? 6 : /[gprs]/.test(N) ? Math.max(1, Math.min(21, I)) : Math.max(0, Math.min(20, I));
    function K(z) {
      var x = U, v = D, O, $, T;
      if (N === "c")
        v = L(z) + v, z = "";
      else {
        z = +z;
        var S = z < 0 || 1 / z < 0;
        if (z = isNaN(z) ? a : L(Math.abs(z), I), d && (z = el(z)), S && +z == 0 && w !== "+" && (S = !1), x = (S ? w === "(" ? w : o : w === "-" || w === "(" ? "" : w) + x, v = (N === "s" ? hi[8 + ta / 3] : "") + v + (S && w === "(" ? ")" : ""), y) {
          for (O = -1, $ = z.length; ++O < $; )
            if (T = z.charCodeAt(O), 48 > T || T > 57) {
              v = (T === 46 ? n + z.slice(O + 1) : z.slice(O)) + v, z = z.slice(0, O);
              break;
            }
        }
      }
      h && !u && (z = e(z, 1 / 0));
      var aA = x.length + z.length + v.length, P = aA < C ? new Array(C - aA + 1).join(l) : "";
      switch (h && u && (z = e(P + z, P.length ? C - v.length : 1 / 0), P = ""), M) {
        case "<":
          z = x + z + v + P;
          break;
        case "=":
          z = x + P + z + v;
          break;
        case "^":
          z = P.slice(0, aA = P.length >> 1) + x + z + v + P.slice(aA);
          break;
        default:
          z = P + x + z + v;
          break;
      }
      return i(z);
    }
    return K.toString = function() {
      return c + "";
    }, K;
  }
  function g(c, l) {
    var M = B((c = ir(c), c.type = "f", c)), w = Math.max(-8, Math.min(8, Math.floor(pe(l) / 3))) * 3, f = Math.pow(10, -w), u = hi[8 + w / 3];
    return function(C) {
      return M(f * C) + u;
    };
  }
  return {
    format: B,
    formatPrefix: g
  };
}
var wt, ra, na;
nl({
  thousands: ",",
  grouping: [3],
  currency: ["$", ""]
});
function nl(A) {
  return wt = rl(A), ra = wt.format, na = wt.formatPrefix, wt;
}
function il(A) {
  return Math.max(0, -pe(Math.abs(A)));
}
function sl(A, e) {
  return Math.max(0, Math.max(-8, Math.min(8, Math.floor(pe(e) / 3))) * 3 - pe(Math.abs(A)));
}
function al(A, e) {
  return A = Math.abs(A), e = Math.abs(e) - A, Math.max(0, pe(e) - pe(A)) + 1;
}
function ol(A, e) {
  switch (arguments.length) {
    case 0:
      break;
    case 1:
      this.range(A);
      break;
    default:
      this.range(e).domain(A);
      break;
  }
  return this;
}
function Bl(A) {
  return function() {
    return A;
  };
}
function gl(A) {
  return +A;
}
var Ii = [0, 1];
function Ie(A) {
  return A;
}
function ln(A, e) {
  return (e -= A = +A) ? function(t) {
    return (t - A) / e;
  } : Bl(isNaN(e) ? NaN : 0.5);
}
function cl(A, e) {
  var t;
  return A > e && (t = A, A = e, e = t), function(r) {
    return Math.max(A, Math.min(e, r));
  };
}
function ll(A, e, t) {
  var r = A[0], n = A[1], i = e[0], s = e[1];
  return n < r ? (r = ln(n, r), i = t(s, i)) : (r = ln(r, n), i = t(i, s)), function(o) {
    return i(r(o));
  };
}
function ul(A, e, t) {
  var r = Math.min(A.length, e.length) - 1, n = new Array(r), i = new Array(r), s = -1;
  for (A[r] < A[0] && (A = A.slice().reverse(), e = e.slice().reverse()); ++s < r; )
    n[s] = ln(A[s], A[s + 1]), i[s] = t(e[s], e[s + 1]);
  return function(o) {
    var a = Uo(A, o, 1, r) - 1;
    return i[a](n[a](o));
  };
}
function wl(A, e) {
  return e.domain(A.domain()).range(A.range()).interpolate(A.interpolate()).clamp(A.clamp()).unknown(A.unknown());
}
function fl() {
  var A = Ii, e = Ii, t = Kn, r, n, i, s = Ie, o, a, B;
  function g() {
    var l = Math.min(A.length, e.length);
    return s !== Ie && (s = cl(A[0], A[l - 1])), o = l > 2 ? ul : ll, a = B = null, c;
  }
  function c(l) {
    return l == null || isNaN(l = +l) ? i : (a || (a = o(A.map(r), e, t)))(r(s(l)));
  }
  return c.invert = function(l) {
    return s(n((B || (B = o(e, A.map(r), QA)))(l)));
  }, c.domain = function(l) {
    return arguments.length ? (A = Array.from(l, gl), g()) : A.slice();
  }, c.range = function(l) {
    return arguments.length ? (e = Array.from(l), g()) : e.slice();
  }, c.rangeRound = function(l) {
    return e = Array.from(l), t = mg, g();
  }, c.clamp = function(l) {
    return arguments.length ? (s = l ? !0 : Ie, g()) : s !== Ie;
  }, c.interpolate = function(l) {
    return arguments.length ? (t = l, g()) : t;
  }, c.unknown = function(l) {
    return arguments.length ? (i = l, c) : i;
  }, function(l, M) {
    return r = l, n = M, g();
  };
}
function Ml() {
  return fl()(Ie, Ie);
}
function Cl(A, e, t, r) {
  var n = po(A, e, t), i;
  switch (r = ir(r == null ? ",f" : r), r.type) {
    case "s": {
      var s = Math.max(Math.abs(A), Math.abs(e));
      return r.precision == null && !isNaN(i = sl(n, s)) && (r.precision = i), na(r, s);
    }
    case "":
    case "e":
    case "g":
    case "p":
    case "r": {
      r.precision == null && !isNaN(i = al(n, Math.max(Math.abs(A), Math.abs(e)))) && (r.precision = i - (r.type === "e"));
      break;
    }
    case "f":
    case "%": {
      r.precision == null && !isNaN(i = il(n)) && (r.precision = i - (r.type === "%") * 2);
      break;
    }
  }
  return ra(r);
}
function Ql(A) {
  var e = A.domain;
  return A.ticks = function(t) {
    var r = e();
    return Eo(r[0], r[r.length - 1], t == null ? 10 : t);
  }, A.tickFormat = function(t, r) {
    var n = e();
    return Cl(n[0], n[n.length - 1], t == null ? 10 : t, r);
  }, A.nice = function(t) {
    t == null && (t = 10);
    var r = e(), n = 0, i = r.length - 1, s = r[n], o = r[i], a, B, g = 10;
    for (o < s && (B = s, s = o, o = B, B = n, n = i, i = B); g-- > 0; ) {
      if (B = en(s, o, t), B === a)
        return r[n] = s, r[i] = o, e(r);
      if (B > 0)
        s = Math.floor(s / B) * B, o = Math.ceil(o / B) * B;
      else if (B < 0)
        s = Math.ceil(s * B) / B, o = Math.floor(o * B) / B;
      else
        break;
      a = B;
    }
    return A;
  }, A;
}
function ia() {
  var A = Ml();
  return A.copy = function() {
    return wl(A, ia());
  }, ol.apply(A, arguments), Ql(A);
}
function ce(A) {
  return function() {
    return A;
  };
}
function hl(A) {
  let e = 3;
  return A.digits = function(t) {
    if (!arguments.length)
      return e;
    if (t == null)
      e = null;
    else {
      const r = Math.floor(t);
      if (!(r >= 0))
        throw new RangeError(`invalid digits: ${t}`);
      e = r;
    }
    return A;
  }, () => new Pn(e);
}
function Il(A) {
  return typeof A == "object" && "length" in A ? A : Array.from(A);
}
function sa(A) {
  this._context = A;
}
sa.prototype = {
  areaStart: function() {
    this._line = 0;
  },
  areaEnd: function() {
    this._line = NaN;
  },
  lineStart: function() {
    this._point = 0;
  },
  lineEnd: function() {
    (this._line || this._line !== 0 && this._point === 1) && this._context.closePath(), this._line = 1 - this._line;
  },
  point: function(A, e) {
    switch (A = +A, e = +e, this._point) {
      case 0:
        this._point = 1, this._line ? this._context.lineTo(A, e) : this._context.moveTo(A, e);
        break;
      case 1:
        this._point = 2;
      default:
        this._context.lineTo(A, e);
        break;
    }
  }
};
function dl(A) {
  return new sa(A);
}
function Nl(A) {
  return A[0];
}
function Ul(A) {
  return A[1];
}
function aa(A, e) {
  var t = ce(!0), r = null, n = dl, i = null, s = hl(o);
  A = typeof A == "function" ? A : A === void 0 ? Nl : ce(A), e = typeof e == "function" ? e : e === void 0 ? Ul : ce(e);
  function o(a) {
    var B, g = (a = Il(a)).length, c, l = !1, M;
    for (r == null && (i = n(M = s())), B = 0; B <= g; ++B)
      !(B < g && t(c = a[B], B, a)) === l && ((l = !l) ? i.lineStart() : i.lineEnd()), l && i.point(+A(c, B, a), +e(c, B, a));
    if (M)
      return i = null, M + "" || null;
  }
  return o.x = function(a) {
    return arguments.length ? (A = typeof a == "function" ? a : ce(+a), o) : A;
  }, o.y = function(a) {
    return arguments.length ? (e = typeof a == "function" ? a : ce(+a), o) : e;
  }, o.defined = function(a) {
    return arguments.length ? (t = typeof a == "function" ? a : ce(!!a), o) : t;
  }, o.curve = function(a) {
    return arguments.length ? (n = a, r != null && (i = n(r)), o) : n;
  }, o.context = function(a) {
    return arguments.length ? (a == null ? r = i = null : i = n(r = a), o) : r;
  }, o;
}
function de(A, e, t) {
  this.k = A, this.x = e, this.y = t;
}
de.prototype = {
  constructor: de,
  scale: function(A) {
    return A === 1 ? this : new de(this.k * A, this.x, this.y);
  },
  translate: function(A, e) {
    return A === 0 & e === 0 ? this : new de(this.k, this.x + this.k * A, this.y + this.k * e);
  },
  apply: function(A) {
    return [A[0] * this.k + this.x, A[1] * this.k + this.y];
  },
  applyX: function(A) {
    return A * this.k + this.x;
  },
  applyY: function(A) {
    return A * this.k + this.y;
  },
  invert: function(A) {
    return [(A[0] - this.x) / this.k, (A[1] - this.y) / this.k];
  },
  invertX: function(A) {
    return (A - this.x) / this.k;
  },
  invertY: function(A) {
    return (A - this.y) / this.k;
  },
  rescaleX: function(A) {
    return A.copy().domain(A.range().map(this.invertX, this).map(A.invert, A));
  },
  rescaleY: function(A) {
    return A.copy().domain(A.range().map(this.invertY, this).map(A.invert, A));
  },
  toString: function() {
    return "translate(" + this.x + "," + this.y + ") scale(" + this.k + ")";
  }
};
new de(1, 0, 0);
de.prototype;
/*!
 * html2canvas 1.4.1 <https://html2canvas.hertzen.com>
 * Copyright (c) 2022 Niklas von Hertzen <https://hertzen.com>
 * Released under MIT License
 */
/*! *****************************************************************************
Copyright (c) Microsoft Corporation.

Permission to use, copy, modify, and/or distribute this software for any
purpose with or without fee is hereby granted.

THE SOFTWARE IS PROVIDED "AS IS" AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH
REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY
AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT,
INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM
LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR
OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR
PERFORMANCE OF THIS SOFTWARE.
***************************************************************************** */
var un = function(A, e) {
  return un = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t, r) {
    t.__proto__ = r;
  } || function(t, r) {
    for (var n in r)
      Object.prototype.hasOwnProperty.call(r, n) && (t[n] = r[n]);
  }, un(A, e);
};
function dA(A, e) {
  if (typeof e != "function" && e !== null)
    throw new TypeError("Class extends value " + String(e) + " is not a constructor or null");
  un(A, e);
  function t() {
    this.constructor = A;
  }
  A.prototype = e === null ? Object.create(e) : (t.prototype = e.prototype, new t());
}
var wn = function() {
  return wn = Object.assign || function(e) {
    for (var t, r = 1, n = arguments.length; r < n; r++) {
      t = arguments[r];
      for (var i in t)
        Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
    }
    return e;
  }, wn.apply(this, arguments);
};
function oA(A, e, t, r) {
  function n(i) {
    return i instanceof t ? i : new t(function(s) {
      s(i);
    });
  }
  return new (t || (t = Promise))(function(i, s) {
    function o(g) {
      try {
        B(r.next(g));
      } catch (c) {
        s(c);
      }
    }
    function a(g) {
      try {
        B(r.throw(g));
      } catch (c) {
        s(c);
      }
    }
    function B(g) {
      g.done ? i(g.value) : n(g.value).then(o, a);
    }
    B((r = r.apply(A, e || [])).next());
  });
}
function nA(A, e) {
  var t = { label: 0, sent: function() {
    if (i[0] & 1)
      throw i[1];
    return i[1];
  }, trys: [], ops: [] }, r, n, i, s;
  return s = { next: o(0), throw: o(1), return: o(2) }, typeof Symbol == "function" && (s[Symbol.iterator] = function() {
    return this;
  }), s;
  function o(B) {
    return function(g) {
      return a([B, g]);
    };
  }
  function a(B) {
    if (r)
      throw new TypeError("Generator is already executing.");
    for (; t; )
      try {
        if (r = 1, n && (i = B[0] & 2 ? n.return : B[0] ? n.throw || ((i = n.return) && i.call(n), 0) : n.next) && !(i = i.call(n, B[1])).done)
          return i;
        switch (n = 0, i && (B = [B[0] & 2, i.value]), B[0]) {
          case 0:
          case 1:
            i = B;
            break;
          case 4:
            return t.label++, { value: B[1], done: !1 };
          case 5:
            t.label++, n = B[1], B = [0];
            continue;
          case 7:
            B = t.ops.pop(), t.trys.pop();
            continue;
          default:
            if (i = t.trys, !(i = i.length > 0 && i[i.length - 1]) && (B[0] === 6 || B[0] === 2)) {
              t = 0;
              continue;
            }
            if (B[0] === 3 && (!i || B[1] > i[0] && B[1] < i[3])) {
              t.label = B[1];
              break;
            }
            if (B[0] === 6 && t.label < i[1]) {
              t.label = i[1], i = B;
              break;
            }
            if (i && t.label < i[2]) {
              t.label = i[2], t.ops.push(B);
              break;
            }
            i[2] && t.ops.pop(), t.trys.pop();
            continue;
        }
        B = e.call(A, t);
      } catch (g) {
        B = [6, g], n = 0;
      } finally {
        r = i = 0;
      }
    if (B[0] & 5)
      throw B[1];
    return { value: B[0] ? B[1] : void 0, done: !0 };
  }
}
function ft(A, e, t) {
  if (t || arguments.length === 2)
    for (var r = 0, n = e.length, i; r < n; r++)
      (i || !(r in e)) && (i || (i = Array.prototype.slice.call(e, 0, r)), i[r] = e[r]);
  return A.concat(i || e);
}
var xA = function() {
  function A(e, t, r, n) {
    this.left = e, this.top = t, this.width = r, this.height = n;
  }
  return A.prototype.add = function(e, t, r, n) {
    return new A(this.left + e, this.top + t, this.width + r, this.height + n);
  }, A.fromClientRect = function(e, t) {
    return new A(t.left + e.windowBounds.left, t.top + e.windowBounds.top, t.width, t.height);
  }, A.fromDOMRectList = function(e, t) {
    var r = Array.from(t).find(function(n) {
      return n.width !== 0;
    });
    return r ? new A(r.left + e.windowBounds.left, r.top + e.windowBounds.top, r.width, r.height) : A.EMPTY;
  }, A.EMPTY = new A(0, 0, 0, 0), A;
}(), hr = function(A, e) {
  return xA.fromClientRect(A, e.getBoundingClientRect());
}, Fl = function(A) {
  var e = A.body, t = A.documentElement;
  if (!e || !t)
    throw new Error("Unable to get document size");
  var r = Math.max(Math.max(e.scrollWidth, t.scrollWidth), Math.max(e.offsetWidth, t.offsetWidth), Math.max(e.clientWidth, t.clientWidth)), n = Math.max(Math.max(e.scrollHeight, t.scrollHeight), Math.max(e.offsetHeight, t.offsetHeight), Math.max(e.clientHeight, t.clientHeight));
  return new xA(0, 0, r, n);
}, Ir = function(A) {
  for (var e = [], t = 0, r = A.length; t < r; ) {
    var n = A.charCodeAt(t++);
    if (n >= 55296 && n <= 56319 && t < r) {
      var i = A.charCodeAt(t++);
      (i & 64512) === 56320 ? e.push(((n & 1023) << 10) + (i & 1023) + 65536) : (e.push(n), t--);
    } else
      e.push(n);
  }
  return e;
}, X = function() {
  for (var A = [], e = 0; e < arguments.length; e++)
    A[e] = arguments[e];
  if (String.fromCodePoint)
    return String.fromCodePoint.apply(String, A);
  var t = A.length;
  if (!t)
    return "";
  for (var r = [], n = -1, i = ""; ++n < t; ) {
    var s = A[n];
    s <= 65535 ? r.push(s) : (s -= 65536, r.push((s >> 10) + 55296, s % 1024 + 56320)), (n + 1 === t || r.length > 16384) && (i += String.fromCharCode.apply(String, r), r.length = 0);
  }
  return i;
}, di = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Dl = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var Mt = 0; Mt < di.length; Mt++)
  Dl[di.charCodeAt(Mt)] = Mt;
var Ni = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Ge = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var Ct = 0; Ct < Ni.length; Ct++)
  Ge[Ni.charCodeAt(Ct)] = Ct;
var yl = function(A) {
  var e = A.length * 0.75, t = A.length, r, n = 0, i, s, o, a;
  A[A.length - 1] === "=" && (e--, A[A.length - 2] === "=" && e--);
  var B = typeof ArrayBuffer < "u" && typeof Uint8Array < "u" && typeof Uint8Array.prototype.slice < "u" ? new ArrayBuffer(e) : new Array(e), g = Array.isArray(B) ? B : new Uint8Array(B);
  for (r = 0; r < t; r += 4)
    i = Ge[A.charCodeAt(r)], s = Ge[A.charCodeAt(r + 1)], o = Ge[A.charCodeAt(r + 2)], a = Ge[A.charCodeAt(r + 3)], g[n++] = i << 2 | s >> 4, g[n++] = (s & 15) << 4 | o >> 2, g[n++] = (o & 3) << 6 | a & 63;
  return B;
}, El = function(A) {
  for (var e = A.length, t = [], r = 0; r < e; r += 2)
    t.push(A[r + 1] << 8 | A[r]);
  return t;
}, pl = function(A) {
  for (var e = A.length, t = [], r = 0; r < e; r += 4)
    t.push(A[r + 3] << 24 | A[r + 2] << 16 | A[r + 1] << 8 | A[r]);
  return t;
}, se = 5, Zn = 6 + 5, vr = 2, Tl = Zn - se, oa = 65536 >> se, zl = 1 << se, Hr = zl - 1, Ll = 1024 >> se, ml = oa + Ll, vl = ml, Hl = 32, jl = vl + Hl, xl = 65536 >> Zn, Yl = 1 << Tl, Sl = Yl - 1, Ui = function(A, e, t) {
  return A.slice ? A.slice(e, t) : new Uint16Array(Array.prototype.slice.call(A, e, t));
}, bl = function(A, e, t) {
  return A.slice ? A.slice(e, t) : new Uint32Array(Array.prototype.slice.call(A, e, t));
}, Gl = function(A, e) {
  var t = yl(A), r = Array.isArray(t) ? pl(t) : new Uint32Array(t), n = Array.isArray(t) ? El(t) : new Uint16Array(t), i = 24, s = Ui(n, i / 2, r[4] / 2), o = r[5] === 2 ? Ui(n, (i + r[4]) / 2) : bl(r, Math.ceil((i + r[4]) / 4));
  return new Kl(r[0], r[1], r[2], r[3], s, o);
}, Kl = function() {
  function A(e, t, r, n, i, s) {
    this.initialValue = e, this.errorValue = t, this.highStart = r, this.highValueIndex = n, this.index = i, this.data = s;
  }
  return A.prototype.get = function(e) {
    var t;
    if (e >= 0) {
      if (e < 55296 || e > 56319 && e <= 65535)
        return t = this.index[e >> se], t = (t << vr) + (e & Hr), this.data[t];
      if (e <= 65535)
        return t = this.index[oa + (e - 55296 >> se)], t = (t << vr) + (e & Hr), this.data[t];
      if (e < this.highStart)
        return t = jl - xl + (e >> Zn), t = this.index[t], t += e >> se & Sl, t = this.index[t], t = (t << vr) + (e & Hr), this.data[t];
      if (e <= 1114111)
        return this.data[this.highValueIndex];
    }
    return this.errorValue;
  }, A;
}(), Fi = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Ol = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var Qt = 0; Qt < Fi.length; Qt++)
  Ol[Fi.charCodeAt(Qt)] = Qt;
var Rl = "KwAAAAAAAAAACA4AUD0AADAgAAACAAAAAAAIABAAGABAAEgAUABYAGAAaABgAGgAYgBqAF8AZwBgAGgAcQB5AHUAfQCFAI0AlQCdAKIAqgCyALoAYABoAGAAaABgAGgAwgDKAGAAaADGAM4A0wDbAOEA6QDxAPkAAQEJAQ8BFwF1AH0AHAEkASwBNAE6AUIBQQFJAVEBWQFhAWgBcAF4ATAAgAGGAY4BlQGXAZ8BpwGvAbUBvQHFAc0B0wHbAeMB6wHxAfkBAQIJAvEBEQIZAiECKQIxAjgCQAJGAk4CVgJeAmQCbAJ0AnwCgQKJApECmQKgAqgCsAK4ArwCxAIwAMwC0wLbAjAA4wLrAvMC+AIAAwcDDwMwABcDHQMlAy0DNQN1AD0DQQNJA0kDSQNRA1EDVwNZA1kDdQB1AGEDdQBpA20DdQN1AHsDdQCBA4kDkQN1AHUAmQOhA3UAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AKYDrgN1AHUAtgO+A8YDzgPWAxcD3gPjA+sD8wN1AHUA+wMDBAkEdQANBBUEHQQlBCoEFwMyBDgEYABABBcDSARQBFgEYARoBDAAcAQzAXgEgASIBJAEdQCXBHUAnwSnBK4EtgS6BMIEyAR1AHUAdQB1AHUAdQCVANAEYABgAGAAYABgAGAAYABgANgEYADcBOQEYADsBPQE/AQEBQwFFAUcBSQFLAU0BWQEPAVEBUsFUwVbBWAAYgVgAGoFcgV6BYIFigWRBWAAmQWfBaYFYABgAGAAYABgAKoFYACxBbAFuQW6BcEFwQXHBcEFwQXPBdMF2wXjBeoF8gX6BQIGCgYSBhoGIgYqBjIGOgZgAD4GRgZMBmAAUwZaBmAAYABgAGAAYABgAGAAYABgAGAAYABgAGIGYABpBnAGYABgAGAAYABgAGAAYABgAGAAYAB4Bn8GhQZgAGAAYAB1AHcDFQSLBmAAYABgAJMGdQA9A3UAmwajBqsGqwaVALMGuwbDBjAAywbSBtIG1QbSBtIG0gbSBtIG0gbdBuMG6wbzBvsGAwcLBxMHAwcbByMHJwcsBywHMQcsB9IGOAdAB0gHTgfSBkgHVgfSBtIG0gbSBtIG0gbSBtIG0gbSBiwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdgAGAALAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAdbB2MHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB2kH0gZwB64EdQB1AHUAdQB1AHUAdQB1AHUHfQdgAIUHjQd1AHUAlQedB2AAYAClB6sHYACzB7YHvgfGB3UAzgfWBzMB3gfmB1EB7gf1B/0HlQENAQUIDQh1ABUIHQglCBcDLQg1CD0IRQhNCEEDUwh1AHUAdQBbCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIaQhjCGQIZQhmCGcIaAhpCGMIZAhlCGYIZwhoCGkIYwhkCGUIZghnCGgIcAh3CHoIMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIgggwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAALAcsBywHLAcsBywHLAcsBywHLAcsB4oILAcsB44I0gaWCJ4Ipgh1AHUAqgiyCHUAdQB1AHUAdQB1AHUAdQB1AHUAtwh8AXUAvwh1AMUIyQjRCNkI4AjoCHUAdQB1AO4I9gj+CAYJDgkTCS0HGwkjCYIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiCCIIIggiAAIAAAAFAAYABgAGIAXwBgAHEAdQBFAJUAogCyAKAAYABgAEIA4ABGANMA4QDxAMEBDwE1AFwBLAE6AQEBUQF4QkhCmEKoQrhCgAHIQsAB0MLAAcABwAHAAeDC6ABoAHDCwMMAAcABwAHAAdDDGMMAAcAB6MM4wwjDWMNow3jDaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAGgAaABoAEjDqABWw6bDqABpg6gAaABoAHcDvwOPA+gAaABfA/8DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DvwO/A78DpcPAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcAB9cPKwkyCToJMAB1AHUAdQBCCUoJTQl1AFUJXAljCWcJawkwADAAMAAwAHMJdQB2CX4JdQCECYoJjgmWCXUAngkwAGAAYABxAHUApgn3A64JtAl1ALkJdQDACTAAMAAwADAAdQB1AHUAdQB1AHUAdQB1AHUAowYNBMUIMAAwADAAMADICcsJ0wnZCRUE4QkwAOkJ8An4CTAAMAB1AAAKvwh1AAgKDwoXCh8KdQAwACcKLgp1ADYKqAmICT4KRgowADAAdQB1AE4KMAB1AFYKdQBeCnUAZQowADAAMAAwADAAMAAwADAAMAAVBHUAbQowADAAdQC5CXUKMAAwAHwBxAijBogEMgF9CoQKiASMCpQKmgqIBKIKqgquCogEDQG2Cr4KxgrLCjAAMADTCtsKCgHjCusK8Qr5CgELMAAwADAAMAB1AIsECQsRC3UANAEZCzAAMAAwADAAMAB1ACELKQswAHUANAExCzkLdQBBC0kLMABRC1kLMAAwADAAMAAwADAAdQBhCzAAMAAwAGAAYABpC3ELdwt/CzAAMACHC4sLkwubC58Lpwt1AK4Ltgt1APsDMAAwADAAMAAwADAAMAAwAL4LwwvLC9IL1wvdCzAAMADlC+kL8Qv5C/8LSQswADAAMAAwADAAMAAwADAAMAAHDDAAMAAwADAAMAAODBYMHgx1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1ACYMMAAwADAAdQB1AHUALgx1AHUAdQB1AHUAdQA2DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AD4MdQBGDHUAdQB1AHUAdQB1AEkMdQB1AHUAdQB1AFAMMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQBYDHUAdQB1AF8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUA+wMVBGcMMAAwAHwBbwx1AHcMfwyHDI8MMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAYABgAJcMMAAwADAAdQB1AJ8MlQClDDAAMACtDCwHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsB7UMLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHdQB1AHUAdQB1AHUAdQB1AHUAdQB1AHUAdQB1AA0EMAC9DDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAsBywHLAcsBywHLAcsBywHLQcwAMEMyAwsBywHLAcsBywHLAcsBywHLAcsBywHzAwwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwAHUAdQB1ANQM2QzhDDAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMABgAGAAYABgAGAAYABgAOkMYADxDGAA+AwADQYNYABhCWAAYAAODTAAMAAwADAAFg1gAGAAHg37AzAAMAAwADAAYABgACYNYAAsDTQNPA1gAEMNPg1LDWAAYABgAGAAYABgAGAAYABgAGAAUg1aDYsGVglhDV0NcQBnDW0NdQ15DWAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAlQCBDZUAiA2PDZcNMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAnw2nDTAAMAAwADAAMAAwAHUArw23DTAAMAAwADAAMAAwADAAMAAwADAAMAB1AL8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAB1AHUAdQB1AHUAdQDHDTAAYABgAM8NMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA1w11ANwNMAAwAD0B5A0wADAAMAAwADAAMADsDfQN/A0EDgwOFA4wABsOMAAwADAAMAAwADAAMAAwANIG0gbSBtIG0gbSBtIG0gYjDigOwQUuDsEFMw7SBjoO0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGQg5KDlIOVg7SBtIGXg5lDm0OdQ7SBtIGfQ6EDooOjQ6UDtIGmg6hDtIG0gaoDqwO0ga0DrwO0gZgAGAAYADEDmAAYAAkBtIGzA5gANIOYADaDokO0gbSBt8O5w7SBu8O0gb1DvwO0gZgAGAAxA7SBtIG0gbSBtIGYABgAGAAYAAED2AAsAUMD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHJA8sBywHLAcsBywHLAccDywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywPLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAc0D9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAccD9IG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIGFA8sBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHLAcsBywHPA/SBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gbSBtIG0gYUD0QPlQCVAJUAMAAwADAAMACVAJUAlQCVAJUAlQCVAEwPMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAA//8EAAQABAAEAAQABAAEAAQABAANAAMAAQABAAIABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQACgATABcAHgAbABoAHgAXABYAEgAeABsAGAAPABgAHABLAEsASwBLAEsASwBLAEsASwBLABgAGAAeAB4AHgATAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABYAGwASAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWAA0AEQAeAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAFAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJABYAGgAbABsAGwAeAB0AHQAeAE8AFwAeAA0AHgAeABoAGwBPAE8ADgBQAB0AHQAdAE8ATwAXAE8ATwBPABYAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AHgAeAFAATwBAAE8ATwBPAEAATwBQAFAATwBQAB4AHgAeAB4AHgAeAB0AHQAdAB0AHgAdAB4ADgBQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgBQAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAJAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAkACQAJAAkACQAJAAkABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAFAAHgAeAB4AKwArAFAAUABQAFAAGABQACsAKwArACsAHgAeAFAAHgBQAFAAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUAAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAYAA0AKwArAB4AHgAbACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAB4ABAAEAB4ABAAEABMABAArACsAKwArACsAKwArACsAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAKwArACsAKwBWAFYAVgBWAB4AHgArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AGgAaABoAGAAYAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQAEwAEACsAEwATAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABLAEsASwBLAEsASwBLAEsASwBLABoAGQAZAB4AUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQABMAUAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABABQAFAABAAEAB4ABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUAAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAFAABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQAUABQAB4AHgAYABMAUAArACsABAAbABsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAFAABAAEAAQABAAEAFAABAAEAAQAUAAEAAQABAAEAAQAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArACsAHgArAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAUAAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEAA0ADQBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUAArACsAKwBQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABABQACsAKwArACsAKwArACsAKwAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUAAaABoAUABQAFAAUABQAEwAHgAbAFAAHgAEACsAKwAEAAQABAArAFAAUABQAFAAUABQACsAKwArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQACsAUABQACsAKwAEACsABAAEAAQABAAEACsAKwArACsABAAEACsAKwAEAAQABAArACsAKwAEACsAKwArACsAKwArACsAUABQAFAAUAArAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLAAQABABQAFAAUAAEAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsAKwAEAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAArACsAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AGwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAKwArACsAKwArAAQABAAEACsAKwArACsAUABQACsAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAAQAUAArAFAAUABQAFAAUABQACsAKwArAFAAUABQACsAUABQAFAAUAArACsAKwBQAFAAKwBQACsAUABQACsAKwArAFAAUAArACsAKwBQAFAAUAArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArAAQABAAEAAQABAArACsAKwAEAAQABAArAAQABAAEAAQAKwArAFAAKwArACsAKwArACsABAArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAHgAeAB4AHgAeAB4AGwAeACsAKwArACsAKwAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAUABQAFAAKwArACsAKwArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwAOAFAAUABQAFAAUABQAFAAHgBQAAQABAAEAA4AUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAKwArAAQAUAAEAAQABAAEAAQABAAEACsABAAEAAQAKwAEAAQABAAEACsAKwArACsAKwArACsABAAEACsAKwArACsAKwArACsAUAArAFAAUAAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAFAABAAEAAQABAAEAAQABAArAAQABAAEACsABAAEAAQABABQAB4AKwArACsAKwBQAFAAUAAEAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQABoAUABQAFAAUABQAFAAKwAEAAQABAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQACsAUAArACsAUABQAFAAUABQAFAAUAArACsAKwAEACsAKwArACsABAAEAAQABAAEAAQAKwAEACsABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArAAQABAAeACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAXAAqACoAKgAqACoAKgAqACsAKwArACsAGwBcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAeAEsASwBLAEsASwBLAEsASwBLAEsADQANACsAKwArACsAKwBcAFwAKwBcACsAXABcAFwAXABcACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAXAArAFwAXABcAFwAXABcAFwAXABcAFwAKgBcAFwAKgAqACoAKgAqACoAKgAqACoAXAArACsAXABcAFwAXABcACsAXAArACoAKgAqACoAKgAqACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwBcAFwAXABcAFAADgAOAA4ADgAeAA4ADgAJAA4ADgANAAkAEwATABMAEwATAAkAHgATAB4AHgAeAAQABAAeAB4AHgAeAB4AHgBLAEsASwBLAEsASwBLAEsASwBLAFAAUABQAFAAUABQAFAAUABQAFAADQAEAB4ABAAeAAQAFgARABYAEQAEAAQAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQADQAEAAQABAAEAAQADQAEAAQAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAA0ADQAeAB4AHgAeAB4AHgAEAB4AHgAeAB4AHgAeACsAHgAeAA4ADgANAA4AHgAeAB4AHgAeAAkACQArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgBcAEsASwBLAEsASwBLAEsASwBLAEsADQANAB4AHgAeAB4AXABcAFwAXABcAFwAKgAqACoAKgBcAFwAXABcACoAKgAqAFwAKgAqACoAXABcACoAKgAqACoAKgAqACoAXABcAFwAKgAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKgAqAFwAKgBLAEsASwBLAEsASwBLAEsASwBLACoAKgAqACoAKgAqAFAAUABQAFAAUABQACsAUAArACsAKwArACsAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAKwBQACsAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsABAAEAAQAHgANAB4AHgAeAB4AHgAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUAArACsADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAWABEAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQANAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAANAA0AKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUAArAAQABAArACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqAA0ADQAVAFwADQAeAA0AGwBcACoAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwAeAB4AEwATAA0ADQAOAB4AEwATAB4ABAAEAAQACQArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAHgArACsAKwATABMASwBLAEsASwBLAEsASwBLAEsASwBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAXABcAFwAXABcACsAKwArACsAKwArACsAKwArACsAKwBcAFwAXABcAFwAXABcAFwAXABcAFwAXAArACsAKwArAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAXAArACsAKwAqACoAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAArACsAHgAeAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcACoAKgAqACoAKgAqACoAKgAqACoAKwAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKwArAAQASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACoAKgAqACoAKgAqACoAXAAqACoAKgAqACoAKgArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABABQAFAAUABQAFAAUABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwANAA0AHgANAA0ADQANAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAEAAQABAAEAAQAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwAeAB4AHgAeAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArAA0ADQANAA0ADQBLAEsASwBLAEsASwBLAEsASwBLACsAKwArAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAA0ADQBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUAAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArAAQABAAEAB4ABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAAQAUABQAFAAUABQAFAABABQAFAABAAEAAQAUAArACsAKwArACsABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQACsAUAArAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAFAAUABQACsAHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQACsAKwAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQACsAHgAeAB4AHgAeAB4AHgAOAB4AKwANAA0ADQANAA0ADQANAAkADQANAA0ACAAEAAsABAAEAA0ACQANAA0ADAAdAB0AHgAXABcAFgAXABcAFwAWABcAHQAdAB4AHgAUABQAFAANAAEAAQAEAAQABAAEAAQACQAaABoAGgAaABoAGgAaABoAHgAXABcAHQAVABUAHgAeAB4AHgAeAB4AGAAWABEAFQAVABUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ADQAeAA0ADQANAA0AHgANAA0ADQAHAB4AHgAeAB4AKwAEAAQABAAEAAQABAAEAAQABAAEAFAAUAArACsATwBQAFAAUABQAFAAHgAeAB4AFgARAE8AUABPAE8ATwBPAFAAUABQAFAAUAAeAB4AHgAWABEAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArABsAGwAbABsAGwAbABsAGgAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGgAbABsAGwAbABoAGwAbABoAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbABsAGwAbAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAHgAeAFAAGgAeAB0AHgBQAB4AGgAeAB4AHgAeAB4AHgAeAB4AHgBPAB4AUAAbAB4AHgBQAFAAUABQAFAAHgAeAB4AHQAdAB4AUAAeAFAAHgBQAB4AUABPAFAAUAAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAHgBQAFAAUABQAE8ATwBQAFAAUABQAFAATwBQAFAATwBQAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAUABQAFAATwBPAE8ATwBPAE8ATwBPAE8ATwBQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABPAB4AHgArACsAKwArAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHQAdAB4AHgAeAB0AHQAeAB4AHQAeAB4AHgAdAB4AHQAbABsAHgAdAB4AHgAeAB4AHQAeAB4AHQAdAB0AHQAeAB4AHQAeAB0AHgAdAB0AHQAdAB0AHQAeAB0AHgAeAB4AHgAeAB0AHQAdAB0AHgAeAB4AHgAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB4AHgAeAB0AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAeAB0AHQAdAB0AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAdAB4AHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAWABEAHgAeAB4AHgAeAB4AHQAeAB4AHgAeAB4AHgAeACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAWABEAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAFAAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAeAB4AHQAdAB0AHQAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB0AHQAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB0AHQAeAB4AHQAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AHQAdAB0AHgAeAB0AHgAeAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlAB4AHQAdAB4AHgAdAB4AHgAeAB4AHQAdAB4AHgAeAB4AJQAlAB0AHQAlAB4AJQAlACUAIAAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAeAB4AHgAeAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHgAdAB0AHQAeAB0AJQAdAB0AHgAdAB0AHgAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHQAdAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAdAB0AHQAdACUAHgAlACUAJQAdACUAJQAdAB0AHQAlACUAHQAdACUAHQAdACUAJQAlAB4AHQAeAB4AHgAeAB0AHQAlAB0AHQAdAB0AHQAdACUAJQAlACUAJQAdACUAJQAgACUAHQAdACUAJQAlACUAJQAlACUAJQAeAB4AHgAlACUAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB0AHgAeAB4AFwAXABcAFwAXABcAHgATABMAJQAeAB4AHgAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARABYAEQAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAWABEAFgARABYAEQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAWABEAFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AFgARAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAdAB0AHQAdAB0AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAFAAUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAEAAQABAAeAB4AKwArACsAKwArABMADQANAA0AUAATAA0AUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUAANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAA0ADQANAA0ADQANAA0ADQAeAA0AFgANAB4AHgAXABcAHgAeABcAFwAWABEAFgARABYAEQAWABEADQANAA0ADQATAFAADQANAB4ADQANAB4AHgAeAB4AHgAMAAwADQANAA0AHgANAA0AFgANAA0ADQANAA0ADQANAA0AHgANAB4ADQANAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArACsAKwArACsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArAA0AEQARACUAJQBHAFcAVwAWABEAFgARABYAEQAWABEAFgARACUAJQAWABEAFgARABYAEQAWABEAFQAWABEAEQAlAFcAVwBXAFcAVwBXAFcAVwBXAAQABAAEAAQABAAEACUAVwBXAFcAVwA2ACUAJQBXAFcAVwBHAEcAJQAlACUAKwBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBRAFcAUQBXAFEAVwBXAFcAVwBXAFcAUQBXAFcAVwBXAFcAVwBRAFEAKwArAAQABAAVABUARwBHAFcAFQBRAFcAUQBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFEAVwBRAFcAUQBXAFcAVwBXAFcAVwBRAFcAVwBXAFcAVwBXAFEAUQBXAFcAVwBXABUAUQBHAEcAVwArACsAKwArACsAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwAlACUAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACsAKwArACsAKwArACsAKwArACsAKwArAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAUQBRAFEAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBPAE8ATwBPAE8ATwBPAE8AJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADQATAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABLAEsASwBLAEsASwBLAEsASwBLAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAABAAEAAQABAAeAAQABAAEAAQABAAEAAQABAAEAAQAHgBQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUABQAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAeAA0ADQANAA0ADQArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AUAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAB4AHgAeAB4AHgAeAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AUABQAFAAUABQAFAAUABQAFAAUABQAAQAUABQAFAABABQAFAAUABQAAQAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAeAB4AHgAeAAQAKwArACsAUABQAFAAUABQAFAAHgAeABoAHgArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAADgAOABMAEwArACsAKwArACsAKwArACsABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwANAA0ASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUAAeAB4AHgBQAA4AUABQAAQAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArAB4AWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYAFgAWABYACsAKwArAAQAHgAeAB4AHgAeAB4ADQANAA0AHgAeAB4AHgArAFAASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArAB4AHgBcAFwAXABcAFwAKgBcAFwAXABcAFwAXABcAFwAXABcAEsASwBLAEsASwBLAEsASwBLAEsAXABcAFwAXABcACsAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAFAAUABQAAQAUABQAFAAUABQAFAAUABQAAQABAArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAHgANAA0ADQBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKgAqACoAXAAqACoAKgBcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXAAqAFwAKgAqACoAXABcACoAKgBcAFwAXABcAFwAKgAqAFwAKgBcACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFwAXABcACoAKgBQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAA0ADQBQAFAAUAAEAAQAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQADQAEAAQAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAVABVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBUAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVAFUAVQBVACsAKwArACsAKwArACsAKwArACsAKwArAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAWQBZAFkAKwArACsAKwBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAWgBaAFoAKwArACsAKwAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYABgAGAAYAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAKwArACsAKwArAFYABABWAFYAVgBWAFYAVgBWAFYAVgBWAB4AVgBWAFYAVgBWAFYAVgBWAFYAVgBWAFYAVgArAFYAVgBWAFYAVgArAFYAKwBWAFYAKwBWAFYAKwBWAFYAVgBWAFYAVgBWAFYAVgBWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAEQAWAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAaAB4AKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAGAARABEAGAAYABMAEwAWABEAFAArACsAKwArACsAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACUAJQAlACUAJQAWABEAFgARABYAEQAWABEAFgARABYAEQAlACUAFgARACUAJQAlACUAJQAlACUAEQAlABEAKwAVABUAEwATACUAFgARABYAEQAWABEAJQAlACUAJQAlACUAJQAlACsAJQAbABoAJQArACsAKwArAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAcAKwATACUAJQAbABoAJQAlABYAEQAlACUAEQAlABEAJQBXAFcAVwBXAFcAVwBXAFcAVwBXABUAFQAlACUAJQATACUAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXABYAJQARACUAJQAlAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAWACUAEQAlABYAEQARABYAEQARABUAVwBRAFEAUQBRAFEAUQBRAFEAUQBRAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAEcARwArACsAVwBXAFcAVwBXAFcAKwArAFcAVwBXAFcAVwBXACsAKwBXAFcAVwBXAFcAVwArACsAVwBXAFcAKwArACsAGgAbACUAJQAlABsAGwArAB4AHgAeAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwAEAAQABAAQAB0AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsADQANAA0AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAA0AUABQAFAAUAArACsAKwArAFAAUABQAFAAUABQAFAAUAANAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwArAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwBQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwANAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAB4AUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAUABQAFAAUABQAAQABAAEACsABAAEACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAKwBQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAA0ADQANAA0ADQANAA0ADQAeACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAArACsAKwArAFAAUABQAFAAUAANAA0ADQANAA0ADQAUACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsADQANAA0ADQANAA0ADQBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAB4AHgAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArAAQABAANACsAKwBQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAB4AHgAeAB4AHgArACsAKwArACsAKwAEAAQABAAEAAQABAAEAA0ADQAeAB4AHgAeAB4AKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwAeACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEACsASwBLAEsASwBLAEsASwBLAEsASwANAA0ADQANAFAABAAEAFAAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAeAA4AUAArACsAKwArACsAKwArACsAKwAEAFAAUABQAFAADQANAB4ADQAEAAQABAAEAB4ABAAEAEsASwBLAEsASwBLAEsASwBLAEsAUAAOAFAADQANAA0AKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAANAA0AHgANAA0AHgAEACsAUABQAFAAUABQAFAAUAArAFAAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAA0AKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsABAAEAAQABAArAFAAUABQAFAAUABQAFAAUAArACsAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQACsABAAEAFAABAAEAAQABAAEAAQABAArACsABAAEACsAKwAEAAQABAArACsAUAArACsAKwArACsAKwAEACsAKwArACsAKwBQAFAAUABQAFAABAAEACsAKwAEAAQABAAEAAQABAAEACsAKwArAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsABAAEAAQABAAEAAQABABQAFAAUABQAA0ADQANAA0AHgBLAEsASwBLAEsASwBLAEsASwBLAA0ADQArAB4ABABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAFAAUAAeAFAAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABAAEAAQADgANAA0AEwATAB4AHgAeAA0ADQANAA0ADQANAA0ADQANAA0ADQANAA0ADQANAFAAUABQAFAABAAEACsAKwAEAA0ADQAeAFAAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAFAAKwArACsAKwArACsAKwBLAEsASwBLAEsASwBLAEsASwBLACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAXABcAFwAKwArACoAKgAqACoAKgAqACoAKgAqACoAKgAqACoAKgAqACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBcAFwADQANAA0AKgBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAKwArAFAAKwArAFAAUABQAFAAUABQAFAAUAArAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQAKwAEAAQAKwArAAQABAAEAAQAUAAEAFAABAAEAA0ADQANACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAArACsABAAEAAQABAAEAAQABABQAA4AUAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAABAAEAAQABAAEAAQABAAEAAQABABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAFAABAAEAAQABAAOAB4ADQANAA0ADQAOAB4ABAArACsAKwArACsAKwArACsAUAAEAAQABAAEAAQABAAEAAQABAAEAAQAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAA0ADQANAFAADgAOAA4ADQANACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAEAAQABAAEACsABAAEAAQABAAEAAQABAAEAFAADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAOABMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQACsAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAArACsAKwAEACsABAAEACsABAAEAAQABAAEAAQABABQAAQAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAUABQAFAAUABQAFAAKwBQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAUAArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAABAAEAAQABAAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAaABoAGgAaAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArAA0AUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsADQANAA0ADQANACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABIAEgAQwBDAEMAUABQAFAAUABDAFAAUABQAEgAQwBIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAASABDAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwAJAAkACQAJAAkACQAJABYAEQArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABIAEMAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwANAA0AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArAAQABAAEAAQABAANACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEAA0ADQANAB4AHgAeAB4AHgAeAFAAUABQAFAADQAeACsAKwArACsAKwArACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAANAA0AHgAeACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwAEAFAABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwAEAAQABAAEAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAARwBHABUARwAJACsAKwArACsAKwArACsAKwArACsAKwAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUQBRAFEAKwArACsAKwArACsAKwArACsAKwArACsAKwBRAFEAUQBRACsAKwArACsAKwArACsAKwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUAArACsAHgAEAAQADQAEAAQABAAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAAQABAAEAAQABAAeAB4AHgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAB4AHgAEAAQABAAEAAQABAAEAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4ABAAEAAQAHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwArACsAKwArACsAKwArACsAKwArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAKwArAFAAKwArAFAAUAArACsAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACsAUAArAFAAUABQAFAAUABQAFAAKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwBQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAHgAeAFAAUABQAFAAUAArAFAAKwArACsAUABQAFAAUABQAFAAUAArAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAB4AHgAeAB4AHgAeAB4AHgAeACsAKwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAEsASwBLAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAeAB4AHgAeAB4AHgAeAB4ABAAeAB4AHgAeAB4AHgAeAB4AHgAeAAQAHgAeAA0ADQANAA0AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQAKwAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArAAQABAAEAAQABAAEAAQAKwAEAAQAKwAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwAEAAQABAAEAAQABAAEAFAAUABQAFAAUABQAFAAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwBQAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArABsAUABQAFAAUABQACsAKwBQAFAAUABQAFAAUABQAFAAUAAEAAQABAAEAAQABAAEACsAKwArACsAKwArACsAKwArAB4AHgAeAB4ABAAEAAQABAAEAAQABABQACsAKwArACsASwBLAEsASwBLAEsASwBLAEsASwArACsAKwArABYAFgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAGgBQAFAAUAAaAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAeAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQACsAKwBQAFAAUABQACsAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUAArACsAKwArACsAKwBQACsAKwArACsAUAArAFAAKwBQACsAUABQAFAAKwBQAFAAKwBQACsAKwBQACsAUAArAFAAKwBQACsAUAArAFAAUAArAFAAKwArAFAAUABQAFAAKwBQAFAAUABQAFAAUABQACsAUABQAFAAUAArAFAAUABQAFAAKwBQACsAUABQAFAAUABQAFAAUABQAFAAUAArAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAArACsAKwArACsAUABQAFAAKwBQAFAAUABQAFAAKwBQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwAeAB4AKwArACsAKwArACsAKwArACsAKwArACsAKwArAE8ATwBPAE8ATwBPAE8ATwBPAE8ATwBPAE8AJQAlACUAHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHgAeAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB4AHgAeACUAJQAlAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAdAB0AHQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAKQApACkAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAlACUAJQAlACUAHgAlACUAJQAlACUAIAAgACAAJQAlACAAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACEAIQAhACEAIQAlACUAIAAgACUAJQAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlACUAIAAlACUAJQAlACAAIAAgACUAIAAgACAAJQAlACUAJQAlACUAJQAgACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAlAB4AJQAeACUAJQAlACUAJQAgACUAJQAlACUAHgAlAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAgACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACAAIAAgACAAIAAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeABcAFwAXABUAFQAVAB4AHgAeAB4AJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAgACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlACUAJQAeAB4AHgAeAB4AHgAeAB4AHgAeACUAJQAlACUAJQAlAB4AHgAeAB4AHgAeAB4AHgAlACUAJQAlACUAJQAlACUAHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAgACUAJQAgACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAJQAlACUAJQAlACUAIAAlACUAJQAlACUAJQAlACUAJQAgACAAIAAgACAAIAAgACAAIAAgACUAJQAgACAAIAAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACAAIAAlACAAIAAlACAAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAgACAAIAAlACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAJQAlAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AKwAeAB4AHgAeAB4AHgAeAB4AHgAeAB4AHgArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAEsASwBLAEsASwBLAEsASwBLAEsAKwArACsAKwArACsAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwArAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwAlACUAJQAlACUAJQAlACUAJQAlACUAVwBXACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQBXAFcAVwBXAFcAVwBXAFcAVwBXAFcAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAJQAlACUAKwAEACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArACsAKwArAA==", Di = 50, kl = 1, Ba = 2, ga = 3, Pl = 4, _l = 5, yi = 7, ca = 8, Ei = 9, OA = 10, fn = 11, pi = 12, Mn = 13, Zl = 14, Ke = 15, Cn = 16, ht = 17, He = 18, Wl = 19, Ti = 20, Qn = 21, je = 22, jr = 23, le = 24, cA = 25, Oe = 26, Re = 27, ue = 28, Vl = 29, te = 30, Jl = 31, It = 32, dt = 33, hn = 34, In = 35, dn = 36, rt = 37, Nn = 38, kt = 39, Pt = 40, xr = 41, la = 42, Xl = 43, $l = [9001, 65288], ua = "!", j = "\xD7", Nt = "\xF7", Un = Gl(Rl), mA = [te, dn], Fn = [kl, Ba, ga, _l], wa = [OA, ca], zi = [Re, Oe], ql = Fn.concat(wa), Li = [Nn, kt, Pt, hn, In], Au = [Ke, Mn], eu = function(A, e) {
  e === void 0 && (e = "strict");
  var t = [], r = [], n = [];
  return A.forEach(function(i, s) {
    var o = Un.get(i);
    if (o > Di ? (n.push(!0), o -= Di) : n.push(!1), ["normal", "auto", "loose"].indexOf(e) !== -1 && [8208, 8211, 12316, 12448].indexOf(i) !== -1)
      return r.push(s), t.push(Cn);
    if (o === Pl || o === fn) {
      if (s === 0)
        return r.push(s), t.push(te);
      var a = t[s - 1];
      return ql.indexOf(a) === -1 ? (r.push(r[s - 1]), t.push(a)) : (r.push(s), t.push(te));
    }
    if (r.push(s), o === Jl)
      return t.push(e === "strict" ? Qn : rt);
    if (o === la || o === Vl)
      return t.push(te);
    if (o === Xl)
      return i >= 131072 && i <= 196605 || i >= 196608 && i <= 262141 ? t.push(rt) : t.push(te);
    t.push(o);
  }), [r, t, n];
}, Yr = function(A, e, t, r) {
  var n = r[t];
  if (Array.isArray(A) ? A.indexOf(n) !== -1 : A === n)
    for (var i = t; i <= r.length; ) {
      i++;
      var s = r[i];
      if (s === e)
        return !0;
      if (s !== OA)
        break;
    }
  if (n === OA)
    for (var i = t; i > 0; ) {
      i--;
      var o = r[i];
      if (Array.isArray(A) ? A.indexOf(o) !== -1 : A === o)
        for (var a = t; a <= r.length; ) {
          a++;
          var s = r[a];
          if (s === e)
            return !0;
          if (s !== OA)
            break;
        }
      if (o !== OA)
        break;
    }
  return !1;
}, mi = function(A, e) {
  for (var t = A; t >= 0; ) {
    var r = e[t];
    if (r === OA)
      t--;
    else
      return r;
  }
  return 0;
}, tu = function(A, e, t, r, n) {
  if (t[r] === 0)
    return j;
  var i = r - 1;
  if (Array.isArray(n) && n[i] === !0)
    return j;
  var s = i - 1, o = i + 1, a = e[i], B = s >= 0 ? e[s] : 0, g = e[o];
  if (a === Ba && g === ga)
    return j;
  if (Fn.indexOf(a) !== -1)
    return ua;
  if (Fn.indexOf(g) !== -1 || wa.indexOf(g) !== -1)
    return j;
  if (mi(i, e) === ca)
    return Nt;
  if (Un.get(A[i]) === fn || (a === It || a === dt) && Un.get(A[o]) === fn || a === yi || g === yi || a === Ei || [OA, Mn, Ke].indexOf(a) === -1 && g === Ei || [ht, He, Wl, le, ue].indexOf(g) !== -1 || mi(i, e) === je || Yr(jr, je, i, e) || Yr([ht, He], Qn, i, e) || Yr(pi, pi, i, e))
    return j;
  if (a === OA)
    return Nt;
  if (a === jr || g === jr)
    return j;
  if (g === Cn || a === Cn)
    return Nt;
  if ([Mn, Ke, Qn].indexOf(g) !== -1 || a === Zl || B === dn && Au.indexOf(a) !== -1 || a === ue && g === dn || g === Ti || mA.indexOf(g) !== -1 && a === cA || mA.indexOf(a) !== -1 && g === cA || a === Re && [rt, It, dt].indexOf(g) !== -1 || [rt, It, dt].indexOf(a) !== -1 && g === Oe || mA.indexOf(a) !== -1 && zi.indexOf(g) !== -1 || zi.indexOf(a) !== -1 && mA.indexOf(g) !== -1 || [Re, Oe].indexOf(a) !== -1 && (g === cA || [je, Ke].indexOf(g) !== -1 && e[o + 1] === cA) || [je, Ke].indexOf(a) !== -1 && g === cA || a === cA && [cA, ue, le].indexOf(g) !== -1)
    return j;
  if ([cA, ue, le, ht, He].indexOf(g) !== -1)
    for (var c = i; c >= 0; ) {
      var l = e[c];
      if (l === cA)
        return j;
      if ([ue, le].indexOf(l) !== -1)
        c--;
      else
        break;
    }
  if ([Re, Oe].indexOf(g) !== -1)
    for (var c = [ht, He].indexOf(a) !== -1 ? s : i; c >= 0; ) {
      var l = e[c];
      if (l === cA)
        return j;
      if ([ue, le].indexOf(l) !== -1)
        c--;
      else
        break;
    }
  if (Nn === a && [Nn, kt, hn, In].indexOf(g) !== -1 || [kt, hn].indexOf(a) !== -1 && [kt, Pt].indexOf(g) !== -1 || [Pt, In].indexOf(a) !== -1 && g === Pt || Li.indexOf(a) !== -1 && [Ti, Oe].indexOf(g) !== -1 || Li.indexOf(g) !== -1 && a === Re || mA.indexOf(a) !== -1 && mA.indexOf(g) !== -1 || a === le && mA.indexOf(g) !== -1 || mA.concat(cA).indexOf(a) !== -1 && g === je && $l.indexOf(A[o]) === -1 || mA.concat(cA).indexOf(g) !== -1 && a === He)
    return j;
  if (a === xr && g === xr) {
    for (var M = t[i], w = 1; M > 0 && (M--, e[M] === xr); )
      w++;
    if (w % 2 !== 0)
      return j;
  }
  return a === It && g === dt ? j : Nt;
}, ru = function(A, e) {
  e || (e = { lineBreak: "normal", wordBreak: "normal" });
  var t = eu(A, e.lineBreak), r = t[0], n = t[1], i = t[2];
  (e.wordBreak === "break-all" || e.wordBreak === "break-word") && (n = n.map(function(o) {
    return [cA, te, la].indexOf(o) !== -1 ? rt : o;
  }));
  var s = e.wordBreak === "keep-all" ? i.map(function(o, a) {
    return o && A[a] >= 19968 && A[a] <= 40959;
  }) : void 0;
  return [r, n, s];
}, nu = function() {
  function A(e, t, r, n) {
    this.codePoints = e, this.required = t === ua, this.start = r, this.end = n;
  }
  return A.prototype.slice = function() {
    return X.apply(void 0, this.codePoints.slice(this.start, this.end));
  }, A;
}(), iu = function(A, e) {
  var t = Ir(A), r = ru(t, e), n = r[0], i = r[1], s = r[2], o = t.length, a = 0, B = 0;
  return {
    next: function() {
      if (B >= o)
        return { done: !0, value: null };
      for (var g = j; B < o && (g = tu(t, i, n, ++B, s)) === j; )
        ;
      if (g !== j || B === o) {
        var c = new nu(t, g, a, B);
        return a = B, { value: c, done: !1 };
      }
      return { done: !0, value: null };
    }
  };
}, su = 1 << 0, au = 1 << 1, ot = 1 << 2, vi = 1 << 3, sr = 10, Hi = 47, We = 92, ou = 9, Bu = 32, Ut = 34, xe = 61, gu = 35, cu = 36, lu = 37, Ft = 39, Dt = 40, Ye = 41, uu = 95, BA = 45, wu = 33, fu = 60, Mu = 62, Cu = 64, Qu = 91, hu = 93, Iu = 61, du = 123, yt = 63, Nu = 125, ji = 124, Uu = 126, Fu = 128, xi = 65533, Sr = 42, ne = 43, Du = 44, yu = 58, Eu = 59, nt = 46, pu = 0, Tu = 8, zu = 11, Lu = 14, mu = 31, vu = 127, NA = -1, fa = 48, Ma = 97, Ca = 101, Hu = 102, ju = 117, xu = 122, Qa = 65, ha = 69, Ia = 70, Yu = 85, Su = 90, iA = function(A) {
  return A >= fa && A <= 57;
}, bu = function(A) {
  return A >= 55296 && A <= 57343;
}, we = function(A) {
  return iA(A) || A >= Qa && A <= Ia || A >= Ma && A <= Hu;
}, Gu = function(A) {
  return A >= Ma && A <= xu;
}, Ku = function(A) {
  return A >= Qa && A <= Su;
}, Ou = function(A) {
  return Gu(A) || Ku(A);
}, Ru = function(A) {
  return A >= Fu;
}, Et = function(A) {
  return A === sr || A === ou || A === Bu;
}, ar = function(A) {
  return Ou(A) || Ru(A) || A === uu;
}, Yi = function(A) {
  return ar(A) || iA(A) || A === BA;
}, ku = function(A) {
  return A >= pu && A <= Tu || A === zu || A >= Lu && A <= mu || A === vu;
}, GA = function(A, e) {
  return A !== We ? !1 : e !== sr;
}, pt = function(A, e, t) {
  return A === BA ? ar(e) || GA(e, t) : ar(A) ? !0 : !!(A === We && GA(A, e));
}, br = function(A, e, t) {
  return A === ne || A === BA ? iA(e) ? !0 : e === nt && iA(t) : iA(A === nt ? e : A);
}, Pu = function(A) {
  var e = 0, t = 1;
  (A[e] === ne || A[e] === BA) && (A[e] === BA && (t = -1), e++);
  for (var r = []; iA(A[e]); )
    r.push(A[e++]);
  var n = r.length ? parseInt(X.apply(void 0, r), 10) : 0;
  A[e] === nt && e++;
  for (var i = []; iA(A[e]); )
    i.push(A[e++]);
  var s = i.length, o = s ? parseInt(X.apply(void 0, i), 10) : 0;
  (A[e] === ha || A[e] === Ca) && e++;
  var a = 1;
  (A[e] === ne || A[e] === BA) && (A[e] === BA && (a = -1), e++);
  for (var B = []; iA(A[e]); )
    B.push(A[e++]);
  var g = B.length ? parseInt(X.apply(void 0, B), 10) : 0;
  return t * (n + o * Math.pow(10, -s)) * Math.pow(10, a * g);
}, _u = {
  type: 2
}, Zu = {
  type: 3
}, Wu = { type: 4 }, Vu = { type: 13 }, Ju = { type: 8 }, Xu = { type: 21 }, $u = { type: 9 }, qu = { type: 10 }, Aw = {
  type: 11
}, ew = {
  type: 12
}, tw = { type: 14 }, Tt = { type: 23 }, rw = { type: 1 }, nw = { type: 25 }, iw = { type: 24 }, sw = { type: 26 }, aw = { type: 27 }, ow = {
  type: 28
}, Bw = {
  type: 29
}, gw = { type: 31 }, Dn = { type: 32 }, da = function() {
  function A() {
    this._value = [];
  }
  return A.prototype.write = function(e) {
    this._value = this._value.concat(Ir(e));
  }, A.prototype.read = function() {
    for (var e = [], t = this.consumeToken(); t !== Dn; )
      e.push(t), t = this.consumeToken();
    return e;
  }, A.prototype.consumeToken = function() {
    var e = this.consumeCodePoint();
    switch (e) {
      case Ut:
        return this.consumeStringToken(Ut);
      case gu:
        var t = this.peekCodePoint(0), r = this.peekCodePoint(1), n = this.peekCodePoint(2);
        if (Yi(t) || GA(r, n)) {
          var i = pt(t, r, n) ? au : su, s = this.consumeName();
          return { type: 5, value: s, flags: i };
        }
        break;
      case cu:
        if (this.peekCodePoint(0) === xe)
          return this.consumeCodePoint(), Vu;
        break;
      case Ft:
        return this.consumeStringToken(Ft);
      case Dt:
        return _u;
      case Ye:
        return Zu;
      case Sr:
        if (this.peekCodePoint(0) === xe)
          return this.consumeCodePoint(), tw;
        break;
      case ne:
        if (br(e, this.peekCodePoint(0), this.peekCodePoint(1)))
          return this.reconsumeCodePoint(e), this.consumeNumericToken();
        break;
      case Du:
        return Wu;
      case BA:
        var o = e, a = this.peekCodePoint(0), B = this.peekCodePoint(1);
        if (br(o, a, B))
          return this.reconsumeCodePoint(e), this.consumeNumericToken();
        if (pt(o, a, B))
          return this.reconsumeCodePoint(e), this.consumeIdentLikeToken();
        if (a === BA && B === Mu)
          return this.consumeCodePoint(), this.consumeCodePoint(), iw;
        break;
      case nt:
        if (br(e, this.peekCodePoint(0), this.peekCodePoint(1)))
          return this.reconsumeCodePoint(e), this.consumeNumericToken();
        break;
      case Hi:
        if (this.peekCodePoint(0) === Sr)
          for (this.consumeCodePoint(); ; ) {
            var g = this.consumeCodePoint();
            if (g === Sr && (g = this.consumeCodePoint(), g === Hi))
              return this.consumeToken();
            if (g === NA)
              return this.consumeToken();
          }
        break;
      case yu:
        return sw;
      case Eu:
        return aw;
      case fu:
        if (this.peekCodePoint(0) === wu && this.peekCodePoint(1) === BA && this.peekCodePoint(2) === BA)
          return this.consumeCodePoint(), this.consumeCodePoint(), nw;
        break;
      case Cu:
        var c = this.peekCodePoint(0), l = this.peekCodePoint(1), M = this.peekCodePoint(2);
        if (pt(c, l, M)) {
          var s = this.consumeName();
          return { type: 7, value: s };
        }
        break;
      case Qu:
        return ow;
      case We:
        if (GA(e, this.peekCodePoint(0)))
          return this.reconsumeCodePoint(e), this.consumeIdentLikeToken();
        break;
      case hu:
        return Bw;
      case Iu:
        if (this.peekCodePoint(0) === xe)
          return this.consumeCodePoint(), Ju;
        break;
      case du:
        return Aw;
      case Nu:
        return ew;
      case ju:
      case Yu:
        var w = this.peekCodePoint(0), f = this.peekCodePoint(1);
        return w === ne && (we(f) || f === yt) && (this.consumeCodePoint(), this.consumeUnicodeRangeToken()), this.reconsumeCodePoint(e), this.consumeIdentLikeToken();
      case ji:
        if (this.peekCodePoint(0) === xe)
          return this.consumeCodePoint(), $u;
        if (this.peekCodePoint(0) === ji)
          return this.consumeCodePoint(), Xu;
        break;
      case Uu:
        if (this.peekCodePoint(0) === xe)
          return this.consumeCodePoint(), qu;
        break;
      case NA:
        return Dn;
    }
    return Et(e) ? (this.consumeWhiteSpace(), gw) : iA(e) ? (this.reconsumeCodePoint(e), this.consumeNumericToken()) : ar(e) ? (this.reconsumeCodePoint(e), this.consumeIdentLikeToken()) : { type: 6, value: X(e) };
  }, A.prototype.consumeCodePoint = function() {
    var e = this._value.shift();
    return typeof e > "u" ? -1 : e;
  }, A.prototype.reconsumeCodePoint = function(e) {
    this._value.unshift(e);
  }, A.prototype.peekCodePoint = function(e) {
    return e >= this._value.length ? -1 : this._value[e];
  }, A.prototype.consumeUnicodeRangeToken = function() {
    for (var e = [], t = this.consumeCodePoint(); we(t) && e.length < 6; )
      e.push(t), t = this.consumeCodePoint();
    for (var r = !1; t === yt && e.length < 6; )
      e.push(t), t = this.consumeCodePoint(), r = !0;
    if (r) {
      var n = parseInt(X.apply(void 0, e.map(function(a) {
        return a === yt ? fa : a;
      })), 16), i = parseInt(X.apply(void 0, e.map(function(a) {
        return a === yt ? Ia : a;
      })), 16);
      return { type: 30, start: n, end: i };
    }
    var s = parseInt(X.apply(void 0, e), 16);
    if (this.peekCodePoint(0) === BA && we(this.peekCodePoint(1))) {
      this.consumeCodePoint(), t = this.consumeCodePoint();
      for (var o = []; we(t) && o.length < 6; )
        o.push(t), t = this.consumeCodePoint();
      var i = parseInt(X.apply(void 0, o), 16);
      return { type: 30, start: s, end: i };
    } else
      return { type: 30, start: s, end: s };
  }, A.prototype.consumeIdentLikeToken = function() {
    var e = this.consumeName();
    return e.toLowerCase() === "url" && this.peekCodePoint(0) === Dt ? (this.consumeCodePoint(), this.consumeUrlToken()) : this.peekCodePoint(0) === Dt ? (this.consumeCodePoint(), { type: 19, value: e }) : { type: 20, value: e };
  }, A.prototype.consumeUrlToken = function() {
    var e = [];
    if (this.consumeWhiteSpace(), this.peekCodePoint(0) === NA)
      return { type: 22, value: "" };
    var t = this.peekCodePoint(0);
    if (t === Ft || t === Ut) {
      var r = this.consumeStringToken(this.consumeCodePoint());
      return r.type === 0 && (this.consumeWhiteSpace(), this.peekCodePoint(0) === NA || this.peekCodePoint(0) === Ye) ? (this.consumeCodePoint(), { type: 22, value: r.value }) : (this.consumeBadUrlRemnants(), Tt);
    }
    for (; ; ) {
      var n = this.consumeCodePoint();
      if (n === NA || n === Ye)
        return { type: 22, value: X.apply(void 0, e) };
      if (Et(n))
        return this.consumeWhiteSpace(), this.peekCodePoint(0) === NA || this.peekCodePoint(0) === Ye ? (this.consumeCodePoint(), { type: 22, value: X.apply(void 0, e) }) : (this.consumeBadUrlRemnants(), Tt);
      if (n === Ut || n === Ft || n === Dt || ku(n))
        return this.consumeBadUrlRemnants(), Tt;
      if (n === We)
        if (GA(n, this.peekCodePoint(0)))
          e.push(this.consumeEscapedCodePoint());
        else
          return this.consumeBadUrlRemnants(), Tt;
      else
        e.push(n);
    }
  }, A.prototype.consumeWhiteSpace = function() {
    for (; Et(this.peekCodePoint(0)); )
      this.consumeCodePoint();
  }, A.prototype.consumeBadUrlRemnants = function() {
    for (; ; ) {
      var e = this.consumeCodePoint();
      if (e === Ye || e === NA)
        return;
      GA(e, this.peekCodePoint(0)) && this.consumeEscapedCodePoint();
    }
  }, A.prototype.consumeStringSlice = function(e) {
    for (var t = 5e4, r = ""; e > 0; ) {
      var n = Math.min(t, e);
      r += X.apply(void 0, this._value.splice(0, n)), e -= n;
    }
    return this._value.shift(), r;
  }, A.prototype.consumeStringToken = function(e) {
    var t = "", r = 0;
    do {
      var n = this._value[r];
      if (n === NA || n === void 0 || n === e)
        return t += this.consumeStringSlice(r), { type: 0, value: t };
      if (n === sr)
        return this._value.splice(0, r), rw;
      if (n === We) {
        var i = this._value[r + 1];
        i !== NA && i !== void 0 && (i === sr ? (t += this.consumeStringSlice(r), r = -1, this._value.shift()) : GA(n, i) && (t += this.consumeStringSlice(r), t += X(this.consumeEscapedCodePoint()), r = -1));
      }
      r++;
    } while (!0);
  }, A.prototype.consumeNumber = function() {
    var e = [], t = ot, r = this.peekCodePoint(0);
    for ((r === ne || r === BA) && e.push(this.consumeCodePoint()); iA(this.peekCodePoint(0)); )
      e.push(this.consumeCodePoint());
    r = this.peekCodePoint(0);
    var n = this.peekCodePoint(1);
    if (r === nt && iA(n))
      for (e.push(this.consumeCodePoint(), this.consumeCodePoint()), t = vi; iA(this.peekCodePoint(0)); )
        e.push(this.consumeCodePoint());
    r = this.peekCodePoint(0), n = this.peekCodePoint(1);
    var i = this.peekCodePoint(2);
    if ((r === ha || r === Ca) && ((n === ne || n === BA) && iA(i) || iA(n)))
      for (e.push(this.consumeCodePoint(), this.consumeCodePoint()), t = vi; iA(this.peekCodePoint(0)); )
        e.push(this.consumeCodePoint());
    return [Pu(e), t];
  }, A.prototype.consumeNumericToken = function() {
    var e = this.consumeNumber(), t = e[0], r = e[1], n = this.peekCodePoint(0), i = this.peekCodePoint(1), s = this.peekCodePoint(2);
    if (pt(n, i, s)) {
      var o = this.consumeName();
      return { type: 15, number: t, flags: r, unit: o };
    }
    return n === lu ? (this.consumeCodePoint(), { type: 16, number: t, flags: r }) : { type: 17, number: t, flags: r };
  }, A.prototype.consumeEscapedCodePoint = function() {
    var e = this.consumeCodePoint();
    if (we(e)) {
      for (var t = X(e); we(this.peekCodePoint(0)) && t.length < 6; )
        t += X(this.consumeCodePoint());
      Et(this.peekCodePoint(0)) && this.consumeCodePoint();
      var r = parseInt(t, 16);
      return r === 0 || bu(r) || r > 1114111 ? xi : r;
    }
    return e === NA ? xi : e;
  }, A.prototype.consumeName = function() {
    for (var e = ""; ; ) {
      var t = this.consumeCodePoint();
      if (Yi(t))
        e += X(t);
      else if (GA(t, this.peekCodePoint(0)))
        e += X(this.consumeEscapedCodePoint());
      else
        return this.reconsumeCodePoint(t), e;
    }
  }, A;
}(), Na = function() {
  function A(e) {
    this._tokens = e;
  }
  return A.create = function(e) {
    var t = new da();
    return t.write(e), new A(t.read());
  }, A.parseValue = function(e) {
    return A.create(e).parseComponentValue();
  }, A.parseValues = function(e) {
    return A.create(e).parseComponentValues();
  }, A.prototype.parseComponentValue = function() {
    for (var e = this.consumeToken(); e.type === 31; )
      e = this.consumeToken();
    if (e.type === 32)
      throw new SyntaxError("Error parsing CSS component value, unexpected EOF");
    this.reconsumeToken(e);
    var t = this.consumeComponentValue();
    do
      e = this.consumeToken();
    while (e.type === 31);
    if (e.type === 32)
      return t;
    throw new SyntaxError("Error parsing CSS component value, multiple values found when expecting only one");
  }, A.prototype.parseComponentValues = function() {
    for (var e = []; ; ) {
      var t = this.consumeComponentValue();
      if (t.type === 32)
        return e;
      e.push(t), e.push();
    }
  }, A.prototype.consumeComponentValue = function() {
    var e = this.consumeToken();
    switch (e.type) {
      case 11:
      case 28:
      case 2:
        return this.consumeSimpleBlock(e.type);
      case 19:
        return this.consumeFunction(e);
    }
    return e;
  }, A.prototype.consumeSimpleBlock = function(e) {
    for (var t = { type: e, values: [] }, r = this.consumeToken(); ; ) {
      if (r.type === 32 || lw(r, e))
        return t;
      this.reconsumeToken(r), t.values.push(this.consumeComponentValue()), r = this.consumeToken();
    }
  }, A.prototype.consumeFunction = function(e) {
    for (var t = {
      name: e.value,
      values: [],
      type: 18
    }; ; ) {
      var r = this.consumeToken();
      if (r.type === 32 || r.type === 3)
        return t;
      this.reconsumeToken(r), t.values.push(this.consumeComponentValue());
    }
  }, A.prototype.consumeToken = function() {
    var e = this._tokens.shift();
    return typeof e > "u" ? Dn : e;
  }, A.prototype.reconsumeToken = function(e) {
    this._tokens.unshift(e);
  }, A;
}(), Bt = function(A) {
  return A.type === 15;
}, ze = function(A) {
  return A.type === 17;
}, _ = function(A) {
  return A.type === 20;
}, cw = function(A) {
  return A.type === 0;
}, yn = function(A, e) {
  return _(A) && A.value === e;
}, Ua = function(A) {
  return A.type !== 31;
}, Te = function(A) {
  return A.type !== 31 && A.type !== 4;
}, EA = function(A) {
  var e = [], t = [];
  return A.forEach(function(r) {
    if (r.type === 4) {
      if (t.length === 0)
        throw new Error("Error parsing function args, zero tokens for arg");
      e.push(t), t = [];
      return;
    }
    r.type !== 31 && t.push(r);
  }), t.length && e.push(t), e;
}, lw = function(A, e) {
  return e === 11 && A.type === 12 || e === 28 && A.type === 29 ? !0 : e === 2 && A.type === 3;
}, WA = function(A) {
  return A.type === 17 || A.type === 15;
}, q = function(A) {
  return A.type === 16 || WA(A);
}, Fa = function(A) {
  return A.length > 1 ? [A[0], A[1]] : [A[0]];
}, rA = {
  type: 17,
  number: 0,
  flags: ot
}, Wn = {
  type: 16,
  number: 50,
  flags: ot
}, RA = {
  type: 16,
  number: 100,
  flags: ot
}, ke = function(A, e, t) {
  var r = A[0], n = A[1];
  return [W(r, e), W(typeof n < "u" ? n : r, t)];
}, W = function(A, e) {
  if (A.type === 16)
    return A.number / 100 * e;
  if (Bt(A))
    switch (A.unit) {
      case "rem":
      case "em":
        return 16 * A.number;
      case "px":
      default:
        return A.number;
    }
  return A.number;
}, Da = "deg", ya = "grad", Ea = "rad", pa = "turn", dr = {
  name: "angle",
  parse: function(A, e) {
    if (e.type === 15)
      switch (e.unit) {
        case Da:
          return Math.PI * e.number / 180;
        case ya:
          return Math.PI / 200 * e.number;
        case Ea:
          return e.number;
        case pa:
          return Math.PI * 2 * e.number;
      }
    throw new Error("Unsupported angle type");
  }
}, Ta = function(A) {
  return A.type === 15 && (A.unit === Da || A.unit === ya || A.unit === Ea || A.unit === pa);
}, za = function(A) {
  var e = A.filter(_).map(function(t) {
    return t.value;
  }).join(" ");
  switch (e) {
    case "to bottom right":
    case "to right bottom":
    case "left top":
    case "top left":
      return [rA, rA];
    case "to top":
    case "bottom":
      return fA(0);
    case "to bottom left":
    case "to left bottom":
    case "right top":
    case "top right":
      return [rA, RA];
    case "to right":
    case "left":
      return fA(90);
    case "to top left":
    case "to left top":
    case "right bottom":
    case "bottom right":
      return [RA, RA];
    case "to bottom":
    case "top":
      return fA(180);
    case "to top right":
    case "to right top":
    case "left bottom":
    case "bottom left":
      return [RA, rA];
    case "to left":
    case "right":
      return fA(270);
  }
  return 0;
}, fA = function(A) {
  return Math.PI * A / 180;
}, _A = {
  name: "color",
  parse: function(A, e) {
    if (e.type === 18) {
      var t = uw[e.name];
      if (typeof t > "u")
        throw new Error('Attempting to parse an unsupported color function "' + e.name + '"');
      return t(A, e.values);
    }
    if (e.type === 5) {
      if (e.value.length === 3) {
        var r = e.value.substring(0, 1), n = e.value.substring(1, 2), i = e.value.substring(2, 3);
        return kA(parseInt(r + r, 16), parseInt(n + n, 16), parseInt(i + i, 16), 1);
      }
      if (e.value.length === 4) {
        var r = e.value.substring(0, 1), n = e.value.substring(1, 2), i = e.value.substring(2, 3), s = e.value.substring(3, 4);
        return kA(parseInt(r + r, 16), parseInt(n + n, 16), parseInt(i + i, 16), parseInt(s + s, 16) / 255);
      }
      if (e.value.length === 6) {
        var r = e.value.substring(0, 2), n = e.value.substring(2, 4), i = e.value.substring(4, 6);
        return kA(parseInt(r, 16), parseInt(n, 16), parseInt(i, 16), 1);
      }
      if (e.value.length === 8) {
        var r = e.value.substring(0, 2), n = e.value.substring(2, 4), i = e.value.substring(4, 6), s = e.value.substring(6, 8);
        return kA(parseInt(r, 16), parseInt(n, 16), parseInt(i, 16), parseInt(s, 16) / 255);
      }
    }
    if (e.type === 20) {
      var o = HA[e.value.toUpperCase()];
      if (typeof o < "u")
        return o;
    }
    return HA.TRANSPARENT;
  }
}, ZA = function(A) {
  return (255 & A) === 0;
}, eA = function(A) {
  var e = 255 & A, t = 255 & A >> 8, r = 255 & A >> 16, n = 255 & A >> 24;
  return e < 255 ? "rgba(" + n + "," + r + "," + t + "," + e / 255 + ")" : "rgb(" + n + "," + r + "," + t + ")";
}, kA = function(A, e, t, r) {
  return (A << 24 | e << 16 | t << 8 | Math.round(r * 255) << 0) >>> 0;
}, Si = function(A, e) {
  if (A.type === 17)
    return A.number;
  if (A.type === 16) {
    var t = e === 3 ? 1 : 255;
    return e === 3 ? A.number / 100 * t : Math.round(A.number / 100 * t);
  }
  return 0;
}, bi = function(A, e) {
  var t = e.filter(Te);
  if (t.length === 3) {
    var r = t.map(Si), n = r[0], i = r[1], s = r[2];
    return kA(n, i, s, 1);
  }
  if (t.length === 4) {
    var o = t.map(Si), n = o[0], i = o[1], s = o[2], a = o[3];
    return kA(n, i, s, a);
  }
  return 0;
};
function Gr(A, e, t) {
  return t < 0 && (t += 1), t >= 1 && (t -= 1), t < 1 / 6 ? (e - A) * t * 6 + A : t < 1 / 2 ? e : t < 2 / 3 ? (e - A) * 6 * (2 / 3 - t) + A : A;
}
var Gi = function(A, e) {
  var t = e.filter(Te), r = t[0], n = t[1], i = t[2], s = t[3], o = (r.type === 17 ? fA(r.number) : dr.parse(A, r)) / (Math.PI * 2), a = q(n) ? n.number / 100 : 0, B = q(i) ? i.number / 100 : 0, g = typeof s < "u" && q(s) ? W(s, 1) : 1;
  if (a === 0)
    return kA(B * 255, B * 255, B * 255, 1);
  var c = B <= 0.5 ? B * (a + 1) : B + a - B * a, l = B * 2 - c, M = Gr(l, c, o + 1 / 3), w = Gr(l, c, o), f = Gr(l, c, o - 1 / 3);
  return kA(M * 255, w * 255, f * 255, g);
}, uw = {
  hsl: Gi,
  hsla: Gi,
  rgb: bi,
  rgba: bi
}, Ve = function(A, e) {
  return _A.parse(A, Na.create(e).parseComponentValue());
}, HA = {
  ALICEBLUE: 4042850303,
  ANTIQUEWHITE: 4209760255,
  AQUA: 16777215,
  AQUAMARINE: 2147472639,
  AZURE: 4043309055,
  BEIGE: 4126530815,
  BISQUE: 4293182719,
  BLACK: 255,
  BLANCHEDALMOND: 4293643775,
  BLUE: 65535,
  BLUEVIOLET: 2318131967,
  BROWN: 2771004159,
  BURLYWOOD: 3736635391,
  CADETBLUE: 1604231423,
  CHARTREUSE: 2147418367,
  CHOCOLATE: 3530104575,
  CORAL: 4286533887,
  CORNFLOWERBLUE: 1687547391,
  CORNSILK: 4294499583,
  CRIMSON: 3692313855,
  CYAN: 16777215,
  DARKBLUE: 35839,
  DARKCYAN: 9145343,
  DARKGOLDENROD: 3095837695,
  DARKGRAY: 2846468607,
  DARKGREEN: 6553855,
  DARKGREY: 2846468607,
  DARKKHAKI: 3182914559,
  DARKMAGENTA: 2332068863,
  DARKOLIVEGREEN: 1433087999,
  DARKORANGE: 4287365375,
  DARKORCHID: 2570243327,
  DARKRED: 2332033279,
  DARKSALMON: 3918953215,
  DARKSEAGREEN: 2411499519,
  DARKSLATEBLUE: 1211993087,
  DARKSLATEGRAY: 793726975,
  DARKSLATEGREY: 793726975,
  DARKTURQUOISE: 13554175,
  DARKVIOLET: 2483082239,
  DEEPPINK: 4279538687,
  DEEPSKYBLUE: 12582911,
  DIMGRAY: 1768516095,
  DIMGREY: 1768516095,
  DODGERBLUE: 512819199,
  FIREBRICK: 2988581631,
  FLORALWHITE: 4294635775,
  FORESTGREEN: 579543807,
  FUCHSIA: 4278255615,
  GAINSBORO: 3705462015,
  GHOSTWHITE: 4177068031,
  GOLD: 4292280575,
  GOLDENROD: 3668254975,
  GRAY: 2155905279,
  GREEN: 8388863,
  GREENYELLOW: 2919182335,
  GREY: 2155905279,
  HONEYDEW: 4043305215,
  HOTPINK: 4285117695,
  INDIANRED: 3445382399,
  INDIGO: 1258324735,
  IVORY: 4294963455,
  KHAKI: 4041641215,
  LAVENDER: 3873897215,
  LAVENDERBLUSH: 4293981695,
  LAWNGREEN: 2096890111,
  LEMONCHIFFON: 4294626815,
  LIGHTBLUE: 2916673279,
  LIGHTCORAL: 4034953471,
  LIGHTCYAN: 3774873599,
  LIGHTGOLDENRODYELLOW: 4210742015,
  LIGHTGRAY: 3553874943,
  LIGHTGREEN: 2431553791,
  LIGHTGREY: 3553874943,
  LIGHTPINK: 4290167295,
  LIGHTSALMON: 4288707327,
  LIGHTSEAGREEN: 548580095,
  LIGHTSKYBLUE: 2278488831,
  LIGHTSLATEGRAY: 2005441023,
  LIGHTSLATEGREY: 2005441023,
  LIGHTSTEELBLUE: 2965692159,
  LIGHTYELLOW: 4294959359,
  LIME: 16711935,
  LIMEGREEN: 852308735,
  LINEN: 4210091775,
  MAGENTA: 4278255615,
  MAROON: 2147483903,
  MEDIUMAQUAMARINE: 1724754687,
  MEDIUMBLUE: 52735,
  MEDIUMORCHID: 3126187007,
  MEDIUMPURPLE: 2473647103,
  MEDIUMSEAGREEN: 1018393087,
  MEDIUMSLATEBLUE: 2070474495,
  MEDIUMSPRINGGREEN: 16423679,
  MEDIUMTURQUOISE: 1221709055,
  MEDIUMVIOLETRED: 3340076543,
  MIDNIGHTBLUE: 421097727,
  MINTCREAM: 4127193855,
  MISTYROSE: 4293190143,
  MOCCASIN: 4293178879,
  NAVAJOWHITE: 4292783615,
  NAVY: 33023,
  OLDLACE: 4260751103,
  OLIVE: 2155872511,
  OLIVEDRAB: 1804477439,
  ORANGE: 4289003775,
  ORANGERED: 4282712319,
  ORCHID: 3664828159,
  PALEGOLDENROD: 4008225535,
  PALEGREEN: 2566625535,
  PALETURQUOISE: 2951671551,
  PALEVIOLETRED: 3681588223,
  PAPAYAWHIP: 4293907967,
  PEACHPUFF: 4292524543,
  PERU: 3448061951,
  PINK: 4290825215,
  PLUM: 3718307327,
  POWDERBLUE: 2967529215,
  PURPLE: 2147516671,
  REBECCAPURPLE: 1714657791,
  RED: 4278190335,
  ROSYBROWN: 3163525119,
  ROYALBLUE: 1097458175,
  SADDLEBROWN: 2336560127,
  SALMON: 4202722047,
  SANDYBROWN: 4104413439,
  SEAGREEN: 780883967,
  SEASHELL: 4294307583,
  SIENNA: 2689740287,
  SILVER: 3233857791,
  SKYBLUE: 2278484991,
  SLATEBLUE: 1784335871,
  SLATEGRAY: 1887473919,
  SLATEGREY: 1887473919,
  SNOW: 4294638335,
  SPRINGGREEN: 16744447,
  STEELBLUE: 1182971135,
  TAN: 3535047935,
  TEAL: 8421631,
  THISTLE: 3636451583,
  TOMATO: 4284696575,
  TRANSPARENT: 0,
  TURQUOISE: 1088475391,
  VIOLET: 4001558271,
  WHEAT: 4125012991,
  WHITE: 4294967295,
  WHITESMOKE: 4126537215,
  YELLOW: 4294902015,
  YELLOWGREEN: 2597139199
}, ww = {
  name: "background-clip",
  initialValue: "border-box",
  prefix: !1,
  type: 1,
  parse: function(A, e) {
    return e.map(function(t) {
      if (_(t))
        switch (t.value) {
          case "padding-box":
            return 1;
          case "content-box":
            return 2;
        }
      return 0;
    });
  }
}, fw = {
  name: "background-color",
  initialValue: "transparent",
  prefix: !1,
  type: 3,
  format: "color"
}, Nr = function(A, e) {
  var t = _A.parse(A, e[0]), r = e[1];
  return r && q(r) ? { color: t, stop: r } : { color: t, stop: null };
}, Ki = function(A, e) {
  var t = A[0], r = A[A.length - 1];
  t.stop === null && (t.stop = rA), r.stop === null && (r.stop = RA);
  for (var n = [], i = 0, s = 0; s < A.length; s++) {
    var o = A[s].stop;
    if (o !== null) {
      var a = W(o, e);
      a > i ? n.push(a) : n.push(i), i = a;
    } else
      n.push(null);
  }
  for (var B = null, s = 0; s < n.length; s++) {
    var g = n[s];
    if (g === null)
      B === null && (B = s);
    else if (B !== null) {
      for (var c = s - B, l = n[B - 1], M = (g - l) / (c + 1), w = 1; w <= c; w++)
        n[B + w - 1] = M * w;
      B = null;
    }
  }
  return A.map(function(f, u) {
    var C = f.color;
    return { color: C, stop: Math.max(Math.min(1, n[u] / e), 0) };
  });
}, Mw = function(A, e, t) {
  var r = e / 2, n = t / 2, i = W(A[0], e) - r, s = n - W(A[1], t);
  return (Math.atan2(s, i) + Math.PI * 2) % (Math.PI * 2);
}, Cw = function(A, e, t) {
  var r = typeof A == "number" ? A : Mw(A, e, t), n = Math.abs(e * Math.sin(r)) + Math.abs(t * Math.cos(r)), i = e / 2, s = t / 2, o = n / 2, a = Math.sin(r - Math.PI / 2) * o, B = Math.cos(r - Math.PI / 2) * o;
  return [n, i - B, i + B, s - a, s + a];
}, CA = function(A, e) {
  return Math.sqrt(A * A + e * e);
}, Oi = function(A, e, t, r, n) {
  var i = [
    [0, 0],
    [0, e],
    [A, 0],
    [A, e]
  ];
  return i.reduce(function(s, o) {
    var a = o[0], B = o[1], g = CA(t - a, r - B);
    return (n ? g < s.optimumDistance : g > s.optimumDistance) ? {
      optimumCorner: o,
      optimumDistance: g
    } : s;
  }, {
    optimumDistance: n ? 1 / 0 : -1 / 0,
    optimumCorner: null
  }).optimumCorner;
}, Qw = function(A, e, t, r, n) {
  var i = 0, s = 0;
  switch (A.size) {
    case 0:
      A.shape === 0 ? i = s = Math.min(Math.abs(e), Math.abs(e - r), Math.abs(t), Math.abs(t - n)) : A.shape === 1 && (i = Math.min(Math.abs(e), Math.abs(e - r)), s = Math.min(Math.abs(t), Math.abs(t - n)));
      break;
    case 2:
      if (A.shape === 0)
        i = s = Math.min(CA(e, t), CA(e, t - n), CA(e - r, t), CA(e - r, t - n));
      else if (A.shape === 1) {
        var o = Math.min(Math.abs(t), Math.abs(t - n)) / Math.min(Math.abs(e), Math.abs(e - r)), a = Oi(r, n, e, t, !0), B = a[0], g = a[1];
        i = CA(B - e, (g - t) / o), s = o * i;
      }
      break;
    case 1:
      A.shape === 0 ? i = s = Math.max(Math.abs(e), Math.abs(e - r), Math.abs(t), Math.abs(t - n)) : A.shape === 1 && (i = Math.max(Math.abs(e), Math.abs(e - r)), s = Math.max(Math.abs(t), Math.abs(t - n)));
      break;
    case 3:
      if (A.shape === 0)
        i = s = Math.max(CA(e, t), CA(e, t - n), CA(e - r, t), CA(e - r, t - n));
      else if (A.shape === 1) {
        var o = Math.max(Math.abs(t), Math.abs(t - n)) / Math.max(Math.abs(e), Math.abs(e - r)), c = Oi(r, n, e, t, !1), B = c[0], g = c[1];
        i = CA(B - e, (g - t) / o), s = o * i;
      }
      break;
  }
  return Array.isArray(A.size) && (i = W(A.size[0], r), s = A.size.length === 2 ? W(A.size[1], n) : i), [i, s];
}, hw = function(A, e) {
  var t = fA(180), r = [];
  return EA(e).forEach(function(n, i) {
    if (i === 0) {
      var s = n[0];
      if (s.type === 20 && s.value === "to") {
        t = za(n);
        return;
      } else if (Ta(s)) {
        t = dr.parse(A, s);
        return;
      }
    }
    var o = Nr(A, n);
    r.push(o);
  }), { angle: t, stops: r, type: 1 };
}, zt = function(A, e) {
  var t = fA(180), r = [];
  return EA(e).forEach(function(n, i) {
    if (i === 0) {
      var s = n[0];
      if (s.type === 20 && ["top", "left", "right", "bottom"].indexOf(s.value) !== -1) {
        t = za(n);
        return;
      } else if (Ta(s)) {
        t = (dr.parse(A, s) + fA(270)) % fA(360);
        return;
      }
    }
    var o = Nr(A, n);
    r.push(o);
  }), {
    angle: t,
    stops: r,
    type: 1
  };
}, Iw = function(A, e) {
  var t = fA(180), r = [], n = 1, i = 0, s = 3, o = [];
  return EA(e).forEach(function(a, B) {
    var g = a[0];
    if (B === 0) {
      if (_(g) && g.value === "linear") {
        n = 1;
        return;
      } else if (_(g) && g.value === "radial") {
        n = 2;
        return;
      }
    }
    if (g.type === 18) {
      if (g.name === "from") {
        var c = _A.parse(A, g.values[0]);
        r.push({ stop: rA, color: c });
      } else if (g.name === "to") {
        var c = _A.parse(A, g.values[0]);
        r.push({ stop: RA, color: c });
      } else if (g.name === "color-stop") {
        var l = g.values.filter(Te);
        if (l.length === 2) {
          var c = _A.parse(A, l[1]), M = l[0];
          ze(M) && r.push({
            stop: { type: 16, number: M.number * 100, flags: M.flags },
            color: c
          });
        }
      }
    }
  }), n === 1 ? {
    angle: (t + fA(180)) % fA(360),
    stops: r,
    type: n
  } : { size: s, shape: i, stops: r, position: o, type: n };
}, La = "closest-side", ma = "farthest-side", va = "closest-corner", Ha = "farthest-corner", ja = "circle", xa = "ellipse", Ya = "cover", Sa = "contain", dw = function(A, e) {
  var t = 0, r = 3, n = [], i = [];
  return EA(e).forEach(function(s, o) {
    var a = !0;
    if (o === 0) {
      var B = !1;
      a = s.reduce(function(c, l) {
        if (B)
          if (_(l))
            switch (l.value) {
              case "center":
                return i.push(Wn), c;
              case "top":
              case "left":
                return i.push(rA), c;
              case "right":
              case "bottom":
                return i.push(RA), c;
            }
          else
            (q(l) || WA(l)) && i.push(l);
        else if (_(l))
          switch (l.value) {
            case ja:
              return t = 0, !1;
            case xa:
              return t = 1, !1;
            case "at":
              return B = !0, !1;
            case La:
              return r = 0, !1;
            case Ya:
            case ma:
              return r = 1, !1;
            case Sa:
            case va:
              return r = 2, !1;
            case Ha:
              return r = 3, !1;
          }
        else if (WA(l) || q(l))
          return Array.isArray(r) || (r = []), r.push(l), !1;
        return c;
      }, a);
    }
    if (a) {
      var g = Nr(A, s);
      n.push(g);
    }
  }), { size: r, shape: t, stops: n, position: i, type: 2 };
}, Lt = function(A, e) {
  var t = 0, r = 3, n = [], i = [];
  return EA(e).forEach(function(s, o) {
    var a = !0;
    if (o === 0 ? a = s.reduce(function(g, c) {
      if (_(c))
        switch (c.value) {
          case "center":
            return i.push(Wn), !1;
          case "top":
          case "left":
            return i.push(rA), !1;
          case "right":
          case "bottom":
            return i.push(RA), !1;
        }
      else if (q(c) || WA(c))
        return i.push(c), !1;
      return g;
    }, a) : o === 1 && (a = s.reduce(function(g, c) {
      if (_(c))
        switch (c.value) {
          case ja:
            return t = 0, !1;
          case xa:
            return t = 1, !1;
          case Sa:
          case La:
            return r = 0, !1;
          case ma:
            return r = 1, !1;
          case va:
            return r = 2, !1;
          case Ya:
          case Ha:
            return r = 3, !1;
        }
      else if (WA(c) || q(c))
        return Array.isArray(r) || (r = []), r.push(c), !1;
      return g;
    }, a)), a) {
      var B = Nr(A, s);
      n.push(B);
    }
  }), { size: r, shape: t, stops: n, position: i, type: 2 };
}, Nw = function(A) {
  return A.type === 1;
}, Uw = function(A) {
  return A.type === 2;
}, Vn = {
  name: "image",
  parse: function(A, e) {
    if (e.type === 22) {
      var t = { url: e.value, type: 0 };
      return A.cache.addImage(e.value), t;
    }
    if (e.type === 18) {
      var r = ba[e.name];
      if (typeof r > "u")
        throw new Error('Attempting to parse an unsupported image function "' + e.name + '"');
      return r(A, e.values);
    }
    throw new Error("Unsupported image type " + e.type);
  }
};
function Fw(A) {
  return !(A.type === 20 && A.value === "none") && (A.type !== 18 || !!ba[A.name]);
}
var ba = {
  "linear-gradient": hw,
  "-moz-linear-gradient": zt,
  "-ms-linear-gradient": zt,
  "-o-linear-gradient": zt,
  "-webkit-linear-gradient": zt,
  "radial-gradient": dw,
  "-moz-radial-gradient": Lt,
  "-ms-radial-gradient": Lt,
  "-o-radial-gradient": Lt,
  "-webkit-radial-gradient": Lt,
  "-webkit-gradient": Iw
}, Dw = {
  name: "background-image",
  initialValue: "none",
  type: 1,
  prefix: !1,
  parse: function(A, e) {
    if (e.length === 0)
      return [];
    var t = e[0];
    return t.type === 20 && t.value === "none" ? [] : e.filter(function(r) {
      return Te(r) && Fw(r);
    }).map(function(r) {
      return Vn.parse(A, r);
    });
  }
}, yw = {
  name: "background-origin",
  initialValue: "border-box",
  prefix: !1,
  type: 1,
  parse: function(A, e) {
    return e.map(function(t) {
      if (_(t))
        switch (t.value) {
          case "padding-box":
            return 1;
          case "content-box":
            return 2;
        }
      return 0;
    });
  }
}, Ew = {
  name: "background-position",
  initialValue: "0% 0%",
  type: 1,
  prefix: !1,
  parse: function(A, e) {
    return EA(e).map(function(t) {
      return t.filter(q);
    }).map(Fa);
  }
}, pw = {
  name: "background-repeat",
  initialValue: "repeat",
  prefix: !1,
  type: 1,
  parse: function(A, e) {
    return EA(e).map(function(t) {
      return t.filter(_).map(function(r) {
        return r.value;
      }).join(" ");
    }).map(Tw);
  }
}, Tw = function(A) {
  switch (A) {
    case "no-repeat":
      return 1;
    case "repeat-x":
    case "repeat no-repeat":
      return 2;
    case "repeat-y":
    case "no-repeat repeat":
      return 3;
    case "repeat":
    default:
      return 0;
  }
}, De;
(function(A) {
  A.AUTO = "auto", A.CONTAIN = "contain", A.COVER = "cover";
})(De || (De = {}));
var zw = {
  name: "background-size",
  initialValue: "0",
  prefix: !1,
  type: 1,
  parse: function(A, e) {
    return EA(e).map(function(t) {
      return t.filter(Lw);
    });
  }
}, Lw = function(A) {
  return _(A) || q(A);
}, Ur = function(A) {
  return {
    name: "border-" + A + "-color",
    initialValue: "transparent",
    prefix: !1,
    type: 3,
    format: "color"
  };
}, mw = Ur("top"), vw = Ur("right"), Hw = Ur("bottom"), jw = Ur("left"), Fr = function(A) {
  return {
    name: "border-radius-" + A,
    initialValue: "0 0",
    prefix: !1,
    type: 1,
    parse: function(e, t) {
      return Fa(t.filter(q));
    }
  };
}, xw = Fr("top-left"), Yw = Fr("top-right"), Sw = Fr("bottom-right"), bw = Fr("bottom-left"), Dr = function(A) {
  return {
    name: "border-" + A + "-style",
    initialValue: "solid",
    prefix: !1,
    type: 2,
    parse: function(e, t) {
      switch (t) {
        case "none":
          return 0;
        case "dashed":
          return 2;
        case "dotted":
          return 3;
        case "double":
          return 4;
      }
      return 1;
    }
  };
}, Gw = Dr("top"), Kw = Dr("right"), Ow = Dr("bottom"), Rw = Dr("left"), yr = function(A) {
  return {
    name: "border-" + A + "-width",
    initialValue: "0",
    type: 0,
    prefix: !1,
    parse: function(e, t) {
      return Bt(t) ? t.number : 0;
    }
  };
}, kw = yr("top"), Pw = yr("right"), _w = yr("bottom"), Zw = yr("left"), Ww = {
  name: "color",
  initialValue: "transparent",
  prefix: !1,
  type: 3,
  format: "color"
}, Vw = {
  name: "direction",
  initialValue: "ltr",
  prefix: !1,
  type: 2,
  parse: function(A, e) {
    switch (e) {
      case "rtl":
        return 1;
      case "ltr":
      default:
        return 0;
    }
  }
}, Jw = {
  name: "display",
  initialValue: "inline-block",
  prefix: !1,
  type: 1,
  parse: function(A, e) {
    return e.filter(_).reduce(function(t, r) {
      return t | Xw(r.value);
    }, 0);
  }
}, Xw = function(A) {
  switch (A) {
    case "block":
    case "-webkit-box":
      return 2;
    case "inline":
      return 4;
    case "run-in":
      return 8;
    case "flow":
      return 16;
    case "flow-root":
      return 32;
    case "table":
      return 64;
    case "flex":
    case "-webkit-flex":
      return 128;
    case "grid":
    case "-ms-grid":
      return 256;
    case "ruby":
      return 512;
    case "subgrid":
      return 1024;
    case "list-item":
      return 2048;
    case "table-row-group":
      return 4096;
    case "table-header-group":
      return 8192;
    case "table-footer-group":
      return 16384;
    case "table-row":
      return 32768;
    case "table-cell":
      return 65536;
    case "table-column-group":
      return 131072;
    case "table-column":
      return 262144;
    case "table-caption":
      return 524288;
    case "ruby-base":
      return 1048576;
    case "ruby-text":
      return 2097152;
    case "ruby-base-container":
      return 4194304;
    case "ruby-text-container":
      return 8388608;
    case "contents":
      return 16777216;
    case "inline-block":
      return 33554432;
    case "inline-list-item":
      return 67108864;
    case "inline-table":
      return 134217728;
    case "inline-flex":
      return 268435456;
    case "inline-grid":
      return 536870912;
  }
  return 0;
}, $w = {
  name: "float",
  initialValue: "none",
  prefix: !1,
  type: 2,
  parse: function(A, e) {
    switch (e) {
      case "left":
        return 1;
      case "right":
        return 2;
      case "inline-start":
        return 3;
      case "inline-end":
        return 4;
    }
    return 0;
  }
}, qw = {
  name: "letter-spacing",
  initialValue: "0",
  prefix: !1,
  type: 0,
  parse: function(A, e) {
    return e.type === 20 && e.value === "normal" ? 0 : e.type === 17 || e.type === 15 ? e.number : 0;
  }
}, or;
(function(A) {
  A.NORMAL = "normal", A.STRICT = "strict";
})(or || (or = {}));
var Af = {
  name: "line-break",
  initialValue: "normal",
  prefix: !1,
  type: 2,
  parse: function(A, e) {
    switch (e) {
      case "strict":
        return or.STRICT;
      case "normal":
      default:
        return or.NORMAL;
    }
  }
}, ef = {
  name: "line-height",
  initialValue: "normal",
  prefix: !1,
  type: 4
}, Ri = function(A, e) {
  return _(A) && A.value === "normal" ? 1.2 * e : A.type === 17 ? e * A.number : q(A) ? W(A, e) : e;
}, tf = {
  name: "list-style-image",
  initialValue: "none",
  type: 0,
  prefix: !1,
  parse: function(A, e) {
    return e.type === 20 && e.value === "none" ? null : Vn.parse(A, e);
  }
}, rf = {
  name: "list-style-position",
  initialValue: "outside",
  prefix: !1,
  type: 2,
  parse: function(A, e) {
    switch (e) {
      case "inside":
        return 0;
      case "outside":
      default:
        return 1;
    }
  }
}, En = {
  name: "list-style-type",
  initialValue: "none",
  prefix: !1,
  type: 2,
  parse: function(A, e) {
    switch (e) {
      case "disc":
        return 0;
      case "circle":
        return 1;
      case "square":
        return 2;
      case "decimal":
        return 3;
      case "cjk-decimal":
        return 4;
      case "decimal-leading-zero":
        return 5;
      case "lower-roman":
        return 6;
      case "upper-roman":
        return 7;
      case "lower-greek":
        return 8;
      case "lower-alpha":
        return 9;
      case "upper-alpha":
        return 10;
      case "arabic-indic":
        return 11;
      case "armenian":
        return 12;
      case "bengali":
        return 13;
      case "cambodian":
        return 14;
      case "cjk-earthly-branch":
        return 15;
      case "cjk-heavenly-stem":
        return 16;
      case "cjk-ideographic":
        return 17;
      case "devanagari":
        return 18;
      case "ethiopic-numeric":
        return 19;
      case "georgian":
        return 20;
      case "gujarati":
        return 21;
      case "gurmukhi":
        return 22;
      case "hebrew":
        return 22;
      case "hiragana":
        return 23;
      case "hiragana-iroha":
        return 24;
      case "japanese-formal":
        return 25;
      case "japanese-informal":
        return 26;
      case "kannada":
        return 27;
      case "katakana":
        return 28;
      case "katakana-iroha":
        return 29;
      case "khmer":
        return 30;
      case "korean-hangul-formal":
        return 31;
      case "korean-hanja-formal":
        return 32;
      case "korean-hanja-informal":
        return 33;
      case "lao":
        return 34;
      case "lower-armenian":
        return 35;
      case "malayalam":
        return 36;
      case "mongolian":
        return 37;
      case "myanmar":
        return 38;
      case "oriya":
        return 39;
      case "persian":
        return 40;
      case "simp-chinese-formal":
        return 41;
      case "simp-chinese-informal":
        return 42;
      case "tamil":
        return 43;
      case "telugu":
        return 44;
      case "thai":
        return 45;
      case "tibetan":
        return 46;
      case "trad-chinese-formal":
        return 47;
      case "trad-chinese-informal":
        return 48;
      case "upper-armenian":
        return 49;
      case "disclosure-open":
        return 50;
      case "disclosure-closed":
        return 51;
      case "none":
      default:
        return -1;
    }
  }
}, Er = function(A) {
  return {
    name: "margin-" + A,
    initialValue: "0",
    prefix: !1,
    type: 4
  };
}, nf = Er("top"), sf = Er("right"), af = Er("bottom"), of = Er("left"), Bf = {
  name: "overflow",
  initialValue: "visible",
  prefix: !1,
  type: 1,
  parse: function(A, e) {
    return e.filter(_).map(function(t) {
      switch (t.value) {
        case "hidden":
          return 1;
        case "scroll":
          return 2;
        case "clip":
          return 3;
        case "auto":
          return 4;
        case "visible":
        default:
          return 0;
      }
    });
  }
}, gf = {
  name: "overflow-wrap",
  initialValue: "normal",
  prefix: !1,
  type: 2,
  parse: function(A, e) {
    switch (e) {
      case "break-word":
        return "break-word";
      case "normal":
      default:
        return "normal";
    }
  }
}, pr = function(A) {
  return {
    name: "padding-" + A,
    initialValue: "0",
    prefix: !1,
    type: 3,
    format: "length-percentage"
  };
}, cf = pr("top"), lf = pr("right"), uf = pr("bottom"), wf = pr("left"), ff = {
  name: "text-align",
  initialValue: "left",
  prefix: !1,
  type: 2,
  parse: function(A, e) {
    switch (e) {
      case "right":
        return 2;
      case "center":
      case "justify":
        return 1;
      case "left":
      default:
        return 0;
    }
  }
}, Mf = {
  name: "position",
  initialValue: "static",
  prefix: !1,
  type: 2,
  parse: function(A, e) {
    switch (e) {
      case "relative":
        return 1;
      case "absolute":
        return 2;
      case "fixed":
        return 3;
      case "sticky":
        return 4;
    }
    return 0;
  }
}, Cf = {
  name: "text-shadow",
  initialValue: "none",
  type: 1,
  prefix: !1,
  parse: function(A, e) {
    return e.length === 1 && yn(e[0], "none") ? [] : EA(e).map(function(t) {
      for (var r = {
        color: HA.TRANSPARENT,
        offsetX: rA,
        offsetY: rA,
        blur: rA
      }, n = 0, i = 0; i < t.length; i++) {
        var s = t[i];
        WA(s) ? (n === 0 ? r.offsetX = s : n === 1 ? r.offsetY = s : r.blur = s, n++) : r.color = _A.parse(A, s);
      }
      return r;
    });
  }
}, Qf = {
  name: "text-transform",
  initialValue: "none",
  prefix: !1,
  type: 2,
  parse: function(A, e) {
    switch (e) {
      case "uppercase":
        return 2;
      case "lowercase":
        return 1;
      case "capitalize":
        return 3;
    }
    return 0;
  }
}, hf = {
  name: "transform",
  initialValue: "none",
  prefix: !0,
  type: 0,
  parse: function(A, e) {
    if (e.type === 20 && e.value === "none")
      return null;
    if (e.type === 18) {
      var t = Nf[e.name];
      if (typeof t > "u")
        throw new Error('Attempting to parse an unsupported transform function "' + e.name + '"');
      return t(e.values);
    }
    return null;
  }
}, If = function(A) {
  var e = A.filter(function(t) {
    return t.type === 17;
  }).map(function(t) {
    return t.number;
  });
  return e.length === 6 ? e : null;
}, df = function(A) {
  var e = A.filter(function(a) {
    return a.type === 17;
  }).map(function(a) {
    return a.number;
  }), t = e[0], r = e[1];
  e[2], e[3];
  var n = e[4], i = e[5];
  e[6], e[7], e[8], e[9], e[10], e[11];
  var s = e[12], o = e[13];
  return e[14], e[15], e.length === 16 ? [t, r, n, i, s, o] : null;
}, Nf = {
  matrix: If,
  matrix3d: df
}, ki = {
  type: 16,
  number: 50,
  flags: ot
}, Uf = [ki, ki], Ff = {
  name: "transform-origin",
  initialValue: "50% 50%",
  prefix: !0,
  type: 1,
  parse: function(A, e) {
    var t = e.filter(q);
    return t.length !== 2 ? Uf : [t[0], t[1]];
  }
}, Df = {
  name: "visible",
  initialValue: "none",
  prefix: !1,
  type: 2,
  parse: function(A, e) {
    switch (e) {
      case "hidden":
        return 1;
      case "collapse":
        return 2;
      case "visible":
      default:
        return 0;
    }
  }
}, Je;
(function(A) {
  A.NORMAL = "normal", A.BREAK_ALL = "break-all", A.KEEP_ALL = "keep-all";
})(Je || (Je = {}));
var yf = {
  name: "word-break",
  initialValue: "normal",
  prefix: !1,
  type: 2,
  parse: function(A, e) {
    switch (e) {
      case "break-all":
        return Je.BREAK_ALL;
      case "keep-all":
        return Je.KEEP_ALL;
      case "normal":
      default:
        return Je.NORMAL;
    }
  }
}, Ef = {
  name: "z-index",
  initialValue: "auto",
  prefix: !1,
  type: 0,
  parse: function(A, e) {
    if (e.type === 20)
      return { auto: !0, order: 0 };
    if (ze(e))
      return { auto: !1, order: e.number };
    throw new Error("Invalid z-index number parsed");
  }
}, Ga = {
  name: "time",
  parse: function(A, e) {
    if (e.type === 15)
      switch (e.unit.toLowerCase()) {
        case "s":
          return 1e3 * e.number;
        case "ms":
          return e.number;
      }
    throw new Error("Unsupported time type");
  }
}, pf = {
  name: "opacity",
  initialValue: "1",
  type: 0,
  prefix: !1,
  parse: function(A, e) {
    return ze(e) ? e.number : 1;
  }
}, Tf = {
  name: "text-decoration-color",
  initialValue: "transparent",
  prefix: !1,
  type: 3,
  format: "color"
}, zf = {
  name: "text-decoration-line",
  initialValue: "none",
  prefix: !1,
  type: 1,
  parse: function(A, e) {
    return e.filter(_).map(function(t) {
      switch (t.value) {
        case "underline":
          return 1;
        case "overline":
          return 2;
        case "line-through":
          return 3;
        case "none":
          return 4;
      }
      return 0;
    }).filter(function(t) {
      return t !== 0;
    });
  }
}, Lf = {
  name: "font-family",
  initialValue: "",
  prefix: !1,
  type: 1,
  parse: function(A, e) {
    var t = [], r = [];
    return e.forEach(function(n) {
      switch (n.type) {
        case 20:
        case 0:
          t.push(n.value);
          break;
        case 17:
          t.push(n.number.toString());
          break;
        case 4:
          r.push(t.join(" ")), t.length = 0;
          break;
      }
    }), t.length && r.push(t.join(" ")), r.map(function(n) {
      return n.indexOf(" ") === -1 ? n : "'" + n + "'";
    });
  }
}, mf = {
  name: "font-size",
  initialValue: "0",
  prefix: !1,
  type: 3,
  format: "length"
}, vf = {
  name: "font-weight",
  initialValue: "normal",
  type: 0,
  prefix: !1,
  parse: function(A, e) {
    if (ze(e))
      return e.number;
    if (_(e))
      switch (e.value) {
        case "bold":
          return 700;
        case "normal":
        default:
          return 400;
      }
    return 400;
  }
}, Hf = {
  name: "font-variant",
  initialValue: "none",
  type: 1,
  prefix: !1,
  parse: function(A, e) {
    return e.filter(_).map(function(t) {
      return t.value;
    });
  }
}, jf = {
  name: "font-style",
  initialValue: "normal",
  prefix: !1,
  type: 2,
  parse: function(A, e) {
    switch (e) {
      case "oblique":
        return "oblique";
      case "italic":
        return "italic";
      case "normal":
      default:
        return "normal";
    }
  }
}, AA = function(A, e) {
  return (A & e) !== 0;
}, xf = {
  name: "content",
  initialValue: "none",
  type: 1,
  prefix: !1,
  parse: function(A, e) {
    if (e.length === 0)
      return [];
    var t = e[0];
    return t.type === 20 && t.value === "none" ? [] : e;
  }
}, Yf = {
  name: "counter-increment",
  initialValue: "none",
  prefix: !0,
  type: 1,
  parse: function(A, e) {
    if (e.length === 0)
      return null;
    var t = e[0];
    if (t.type === 20 && t.value === "none")
      return null;
    for (var r = [], n = e.filter(Ua), i = 0; i < n.length; i++) {
      var s = n[i], o = n[i + 1];
      if (s.type === 20) {
        var a = o && ze(o) ? o.number : 1;
        r.push({ counter: s.value, increment: a });
      }
    }
    return r;
  }
}, Sf = {
  name: "counter-reset",
  initialValue: "none",
  prefix: !0,
  type: 1,
  parse: function(A, e) {
    if (e.length === 0)
      return [];
    for (var t = [], r = e.filter(Ua), n = 0; n < r.length; n++) {
      var i = r[n], s = r[n + 1];
      if (_(i) && i.value !== "none") {
        var o = s && ze(s) ? s.number : 0;
        t.push({ counter: i.value, reset: o });
      }
    }
    return t;
  }
}, bf = {
  name: "duration",
  initialValue: "0s",
  prefix: !1,
  type: 1,
  parse: function(A, e) {
    return e.filter(Bt).map(function(t) {
      return Ga.parse(A, t);
    });
  }
}, Gf = {
  name: "quotes",
  initialValue: "none",
  prefix: !0,
  type: 1,
  parse: function(A, e) {
    if (e.length === 0)
      return null;
    var t = e[0];
    if (t.type === 20 && t.value === "none")
      return null;
    var r = [], n = e.filter(cw);
    if (n.length % 2 !== 0)
      return null;
    for (var i = 0; i < n.length; i += 2) {
      var s = n[i].value, o = n[i + 1].value;
      r.push({ open: s, close: o });
    }
    return r;
  }
}, Pi = function(A, e, t) {
  if (!A)
    return "";
  var r = A[Math.min(e, A.length - 1)];
  return r ? t ? r.open : r.close : "";
}, Kf = {
  name: "box-shadow",
  initialValue: "none",
  type: 1,
  prefix: !1,
  parse: function(A, e) {
    return e.length === 1 && yn(e[0], "none") ? [] : EA(e).map(function(t) {
      for (var r = {
        color: 255,
        offsetX: rA,
        offsetY: rA,
        blur: rA,
        spread: rA,
        inset: !1
      }, n = 0, i = 0; i < t.length; i++) {
        var s = t[i];
        yn(s, "inset") ? r.inset = !0 : WA(s) ? (n === 0 ? r.offsetX = s : n === 1 ? r.offsetY = s : n === 2 ? r.blur = s : r.spread = s, n++) : r.color = _A.parse(A, s);
      }
      return r;
    });
  }
}, Of = {
  name: "paint-order",
  initialValue: "normal",
  prefix: !1,
  type: 1,
  parse: function(A, e) {
    var t = [0, 1, 2], r = [];
    return e.filter(_).forEach(function(n) {
      switch (n.value) {
        case "stroke":
          r.push(1);
          break;
        case "fill":
          r.push(0);
          break;
        case "markers":
          r.push(2);
          break;
      }
    }), t.forEach(function(n) {
      r.indexOf(n) === -1 && r.push(n);
    }), r;
  }
}, Rf = {
  name: "-webkit-text-stroke-color",
  initialValue: "currentcolor",
  prefix: !1,
  type: 3,
  format: "color"
}, kf = {
  name: "-webkit-text-stroke-width",
  initialValue: "0",
  type: 0,
  prefix: !1,
  parse: function(A, e) {
    return Bt(e) ? e.number : 0;
  }
}, Pf = function() {
  function A(e, t) {
    var r, n;
    this.animationDuration = p(e, bf, t.animationDuration), this.backgroundClip = p(e, ww, t.backgroundClip), this.backgroundColor = p(e, fw, t.backgroundColor), this.backgroundImage = p(e, Dw, t.backgroundImage), this.backgroundOrigin = p(e, yw, t.backgroundOrigin), this.backgroundPosition = p(e, Ew, t.backgroundPosition), this.backgroundRepeat = p(e, pw, t.backgroundRepeat), this.backgroundSize = p(e, zw, t.backgroundSize), this.borderTopColor = p(e, mw, t.borderTopColor), this.borderRightColor = p(e, vw, t.borderRightColor), this.borderBottomColor = p(e, Hw, t.borderBottomColor), this.borderLeftColor = p(e, jw, t.borderLeftColor), this.borderTopLeftRadius = p(e, xw, t.borderTopLeftRadius), this.borderTopRightRadius = p(e, Yw, t.borderTopRightRadius), this.borderBottomRightRadius = p(e, Sw, t.borderBottomRightRadius), this.borderBottomLeftRadius = p(e, bw, t.borderBottomLeftRadius), this.borderTopStyle = p(e, Gw, t.borderTopStyle), this.borderRightStyle = p(e, Kw, t.borderRightStyle), this.borderBottomStyle = p(e, Ow, t.borderBottomStyle), this.borderLeftStyle = p(e, Rw, t.borderLeftStyle), this.borderTopWidth = p(e, kw, t.borderTopWidth), this.borderRightWidth = p(e, Pw, t.borderRightWidth), this.borderBottomWidth = p(e, _w, t.borderBottomWidth), this.borderLeftWidth = p(e, Zw, t.borderLeftWidth), this.boxShadow = p(e, Kf, t.boxShadow), this.color = p(e, Ww, t.color), this.direction = p(e, Vw, t.direction), this.display = p(e, Jw, t.display), this.float = p(e, $w, t.cssFloat), this.fontFamily = p(e, Lf, t.fontFamily), this.fontSize = p(e, mf, t.fontSize), this.fontStyle = p(e, jf, t.fontStyle), this.fontVariant = p(e, Hf, t.fontVariant), this.fontWeight = p(e, vf, t.fontWeight), this.letterSpacing = p(e, qw, t.letterSpacing), this.lineBreak = p(e, Af, t.lineBreak), this.lineHeight = p(e, ef, t.lineHeight), this.listStyleImage = p(e, tf, t.listStyleImage), this.listStylePosition = p(e, rf, t.listStylePosition), this.listStyleType = p(e, En, t.listStyleType), this.marginTop = p(e, nf, t.marginTop), this.marginRight = p(e, sf, t.marginRight), this.marginBottom = p(e, af, t.marginBottom), this.marginLeft = p(e, of, t.marginLeft), this.opacity = p(e, pf, t.opacity);
    var i = p(e, Bf, t.overflow);
    this.overflowX = i[0], this.overflowY = i[i.length > 1 ? 1 : 0], this.overflowWrap = p(e, gf, t.overflowWrap), this.paddingTop = p(e, cf, t.paddingTop), this.paddingRight = p(e, lf, t.paddingRight), this.paddingBottom = p(e, uf, t.paddingBottom), this.paddingLeft = p(e, wf, t.paddingLeft), this.paintOrder = p(e, Of, t.paintOrder), this.position = p(e, Mf, t.position), this.textAlign = p(e, ff, t.textAlign), this.textDecorationColor = p(e, Tf, (r = t.textDecorationColor) !== null && r !== void 0 ? r : t.color), this.textDecorationLine = p(e, zf, (n = t.textDecorationLine) !== null && n !== void 0 ? n : t.textDecoration), this.textShadow = p(e, Cf, t.textShadow), this.textTransform = p(e, Qf, t.textTransform), this.transform = p(e, hf, t.transform), this.transformOrigin = p(e, Ff, t.transformOrigin), this.visibility = p(e, Df, t.visibility), this.webkitTextStrokeColor = p(e, Rf, t.webkitTextStrokeColor), this.webkitTextStrokeWidth = p(e, kf, t.webkitTextStrokeWidth), this.wordBreak = p(e, yf, t.wordBreak), this.zIndex = p(e, Ef, t.zIndex);
  }
  return A.prototype.isVisible = function() {
    return this.display > 0 && this.opacity > 0 && this.visibility === 0;
  }, A.prototype.isTransparent = function() {
    return ZA(this.backgroundColor);
  }, A.prototype.isTransformed = function() {
    return this.transform !== null;
  }, A.prototype.isPositioned = function() {
    return this.position !== 0;
  }, A.prototype.isPositionedWithZIndex = function() {
    return this.isPositioned() && !this.zIndex.auto;
  }, A.prototype.isFloating = function() {
    return this.float !== 0;
  }, A.prototype.isInlineLevel = function() {
    return AA(this.display, 4) || AA(this.display, 33554432) || AA(this.display, 268435456) || AA(this.display, 536870912) || AA(this.display, 67108864) || AA(this.display, 134217728);
  }, A;
}(), _f = function() {
  function A(e, t) {
    this.content = p(e, xf, t.content), this.quotes = p(e, Gf, t.quotes);
  }
  return A;
}(), _i = function() {
  function A(e, t) {
    this.counterIncrement = p(e, Yf, t.counterIncrement), this.counterReset = p(e, Sf, t.counterReset);
  }
  return A;
}(), p = function(A, e, t) {
  var r = new da(), n = t !== null && typeof t < "u" ? t.toString() : e.initialValue;
  r.write(n);
  var i = new Na(r.read());
  switch (e.type) {
    case 2:
      var s = i.parseComponentValue();
      return e.parse(A, _(s) ? s.value : e.initialValue);
    case 0:
      return e.parse(A, i.parseComponentValue());
    case 1:
      return e.parse(A, i.parseComponentValues());
    case 4:
      return i.parseComponentValue();
    case 3:
      switch (e.format) {
        case "angle":
          return dr.parse(A, i.parseComponentValue());
        case "color":
          return _A.parse(A, i.parseComponentValue());
        case "image":
          return Vn.parse(A, i.parseComponentValue());
        case "length":
          var o = i.parseComponentValue();
          return WA(o) ? o : rA;
        case "length-percentage":
          var a = i.parseComponentValue();
          return q(a) ? a : rA;
        case "time":
          return Ga.parse(A, i.parseComponentValue());
      }
      break;
  }
}, Zf = "data-html2canvas-debug", Wf = function(A) {
  var e = A.getAttribute(Zf);
  switch (e) {
    case "all":
      return 1;
    case "clone":
      return 2;
    case "parse":
      return 3;
    case "render":
      return 4;
    default:
      return 0;
  }
}, pn = function(A, e) {
  var t = Wf(A);
  return t === 1 || e === t;
}, pA = function() {
  function A(e, t) {
    if (this.context = e, this.textNodes = [], this.elements = [], this.flags = 0, pn(t, 3))
      debugger;
    this.styles = new Pf(e, window.getComputedStyle(t, null)), Ln(t) && (this.styles.animationDuration.some(function(r) {
      return r > 0;
    }) && (t.style.animationDuration = "0s"), this.styles.transform !== null && (t.style.transform = "none")), this.bounds = hr(this.context, t), pn(t, 4) && (this.flags |= 16);
  }
  return A;
}(), Vf = "AAAAAAAAAAAAEA4AGBkAAFAaAAACAAAAAAAIABAAGAAwADgACAAQAAgAEAAIABAACAAQAAgAEAAIABAACAAQAAgAEAAIABAAQABIAEQATAAIABAACAAQAAgAEAAIABAAVABcAAgAEAAIABAACAAQAGAAaABwAHgAgACIAI4AlgAIABAAmwCjAKgAsAC2AL4AvQDFAMoA0gBPAVYBWgEIAAgACACMANoAYgFkAWwBdAF8AX0BhQGNAZUBlgGeAaMBlQGWAasBswF8AbsBwwF0AcsBYwHTAQgA2wG/AOMBdAF8AekB8QF0AfkB+wHiAHQBfAEIAAMC5gQIAAsCEgIIAAgAFgIeAggAIgIpAggAMQI5AkACygEIAAgASAJQAlgCYAIIAAgACAAKBQoFCgUTBRMFGQUrBSsFCAAIAAgACAAIAAgACAAIAAgACABdAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABoAmgCrwGvAQgAbgJ2AggAHgEIAAgACADnAXsCCAAIAAgAgwIIAAgACAAIAAgACACKAggAkQKZAggAPADJAAgAoQKkAqwCsgK6AsICCADJAggA0AIIAAgACAAIANYC3gIIAAgACAAIAAgACABAAOYCCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAkASoB+QIEAAgACAA8AEMCCABCBQgACABJBVAFCAAIAAgACAAIAAgACAAIAAgACABTBVoFCAAIAFoFCABfBWUFCAAIAAgACAAIAAgAbQUIAAgACAAIAAgACABzBXsFfQWFBYoFigWKBZEFigWKBYoFmAWfBaYFrgWxBbkFCAAIAAgACAAIAAgACAAIAAgACAAIAMEFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAMgFCADQBQgACAAIAAgACAAIAAgACAAIAAgACAAIAO4CCAAIAAgAiQAIAAgACABAAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAD0AggACAD8AggACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIANYFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAMDvwAIAAgAJAIIAAgACAAIAAgACAAIAAgACwMTAwgACAB9BOsEGwMjAwgAKwMyAwsFYgE3A/MEPwMIAEUDTQNRAwgAWQOsAGEDCAAIAAgACAAIAAgACABpAzQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFOgU0BTUFNgU3BTgFOQU6BTQFNQU2BTcFOAU5BToFNAU1BTYFNwU4BTkFIQUoBSwFCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABtAwgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABMAEwACAAIAAgACAAIABgACAAIAAgACAC/AAgACAAyAQgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACAAIAAwAAgACAAIAAgACAAIAAgACAAIAAAARABIAAgACAAIABQASAAIAAgAIABwAEAAjgCIABsAqAC2AL0AigDQAtwC+IJIQqVAZUBWQqVAZUBlQGVAZUBlQGrC5UBlQGVAZUBlQGVAZUBlQGVAXsKlQGVAbAK6wsrDGUMpQzlDJUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAZUBlQGVAfAKAAuZA64AtwCJALoC6ADwAAgAuACgA/oEpgO6AqsD+AAIAAgAswMIAAgACAAIAIkAuwP5AfsBwwPLAwgACAAIAAgACADRA9kDCAAIAOED6QMIAAgACAAIAAgACADuA/YDCAAIAP4DyQAIAAgABgQIAAgAXQAOBAgACAAIAAgACAAIABMECAAIAAgACAAIAAgACAD8AAQBCAAIAAgAGgQiBCoECAExBAgAEAEIAAgACAAIAAgACAAIAAgACAAIAAgACAA4BAgACABABEYECAAIAAgATAQYAQgAVAQIAAgACAAIAAgACAAIAAgACAAIAFoECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAOQEIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAB+BAcACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAEABhgSMBAgACAAIAAgAlAQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAwAEAAQABAADAAMAAwADAAQABAAEAAQABAAEAAQABHATAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAdQMIAAgACAAIAAgACAAIAMkACAAIAAgAfQMIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACACFA4kDCAAIAAgACAAIAOcBCAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAIcDCAAIAAgACAAIAAgACAAIAAgACAAIAJEDCAAIAAgACADFAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABgBAgAZgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAbAQCBXIECAAIAHkECAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACABAAJwEQACjBKoEsgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAC6BMIECAAIAAgACAAIAAgACABmBAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAxwQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAGYECAAIAAgAzgQIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBd0FXwUIAOIF6gXxBYoF3gT5BQAGCAaKBYoFigWKBYoFigWKBYoFigWKBYoFigXWBIoFigWKBYoFigWKBYoFigWKBYsFEAaKBYoFigWKBYoFigWKBRQGCACKBYoFigWKBQgACAAIANEECAAIABgGigUgBggAJgYIAC4GMwaKBYoF0wQ3Bj4GigWKBYoFigWKBYoFigWKBYoFigWKBYoFigUIAAgACAAIAAgACAAIAAgAigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWKBYoFigWLBf///////wQABAAEAAQABAAEAAQABAAEAAQAAwAEAAQAAgAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAQADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUAAAAFAAUAAAAFAAUAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUAAQAAAAUABQAFAAUABQAFAAAAAAAFAAUAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAFAAUAAQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAAABwAHAAcAAAAHAAcABwAFAAEAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAcABwAFAAUAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAAAAQABAAAAAAAAAAAAAAAFAAUABQAFAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAHAAcAAAAHAAcAAAAAAAUABQAHAAUAAQAHAAEABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwABAAUABQAFAAUAAAAAAAAAAAAAAAEAAQABAAEAAQABAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABQANAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAAEAAQABAAEAAQABAAEAAQABAAEAAQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAABQAHAAUABQAFAAAAAAAAAAcABQAFAAUABQAFAAQABAAEAAQABAAEAAQABAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAEAAQABAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUAAAAFAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAUAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAcABwAFAAcABwAAAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUABwAHAAUABQAFAAUAAAAAAAcABwAAAAAABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAABQAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAAAAAAAAAAABQAFAAAAAAAFAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAFAAUABQAFAAUAAAAFAAUABwAAAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABwAFAAUABQAFAAAAAAAHAAcAAAAAAAcABwAFAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAAAAAAAAAHAAcABwAAAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAABQAHAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAUABQAFAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAHAAcABQAHAAcAAAAFAAcABwAAAAcABwAFAAUAAAAAAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAFAAcABwAFAAUABQAAAAUAAAAHAAcABwAHAAcABwAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAHAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAABwAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAUAAAAFAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABwAFAAUABQAFAAUAAAAFAAUAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABwAFAAUABQAFAAUABQAAAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABQAFAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABQAFAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAHAAUABQAFAAUABQAFAAUABwAHAAcABwAHAAcABwAHAAUABwAHAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABwAHAAcABwAFAAUABwAHAAcAAAAAAAAAAAAHAAcABQAHAAcABwAHAAcABwAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAcABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAUABQAFAAUABQAFAAUAAAAFAAAABQAAAAAABQAFAAUABQAFAAUABQAFAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAFAAUAAAAAAAUABQAFAAUABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABwAFAAcABwAHAAcABwAFAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAUABQAFAAUABwAHAAUABQAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABQAFAAcABwAHAAUABwAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAcABQAFAAUABQAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAAAAAABwAFAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAAAAAAAAAFAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAUABQAHAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAUABQAFAAUABQAHAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAcABwAFAAUABQAFAAcABwAFAAUABwAHAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAFAAcABwAFAAUABwAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAFAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAFAAUABQAAAAAABQAFAAAAAAAAAAAAAAAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAcABwAAAAAAAAAAAAAABwAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAcABwAFAAcABwAAAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAFAAUABQAAAAUABQAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABwAFAAUABQAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAUABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAHAAcABQAHAAUABQAAAAAAAAAAAAAAAAAFAAAABwAHAAcABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAHAAcABwAAAAAABwAHAAAAAAAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABwAHAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAFAAUABwAFAAcABwAFAAcABQAFAAcABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAHAAcABQAFAAUABQAAAAAABwAHAAcABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAHAAUABQAFAAUABQAFAAUABQAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABwAFAAcABwAFAAUABQAFAAUABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAcABwAFAAUABQAFAAcABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAUABQAFAAUABQAHAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAFAAUABQAFAAAAAAAFAAUABwAHAAcABwAFAAAAAAAAAAcAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABwAHAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAcABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUAAAAHAAUABQAFAAUABQAFAAUABwAFAAUABwAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUAAAAAAAAABQAAAAUABQAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAHAAcABwAHAAcAAAAFAAUAAAAHAAcABQAHAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAAAAUABQAFAAAAAAAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAFAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAFAAUABQAAAAAABQAFAAUABQAFAAUABQAAAAUABQAAAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAFAAUABQAFAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABQAFAAUABQAFAAUABQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAFAAUABQAFAAUADgAOAA4ADgAOAA4ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAA8ADwAPAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAcABwAHAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAgACAAIAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAMAAwADAAMAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkACQAJAAkAAAAAAAAAAAAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAKAAoACgAAAAAAAAAAAAsADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwACwAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAMAAwADAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAADgAOAA4AAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAAAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4AAAAOAAAAAAAAAAAAAAAAAA4AAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAAAAAAAAAAAA4AAAAOAAAAAAAAAAAADgAOAA4AAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAA4AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4AAAAAAA4ADgAOAA4ADgAOAA4ADgAOAAAADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4ADgAOAAAAAAAAAAAAAAAAAAAAAAAAAAAADgAOAA4ADgAOAA4AAAAAAAAAAAAAAAAAAAAAAA4ADgAOAA4ADgAOAA4ADgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAOAA4ADgAOAA4ADgAAAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4ADgAOAA4AAAAAAAAAAAA=", Zi = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Pe = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var mt = 0; mt < Zi.length; mt++)
  Pe[Zi.charCodeAt(mt)] = mt;
var Jf = function(A) {
  var e = A.length * 0.75, t = A.length, r, n = 0, i, s, o, a;
  A[A.length - 1] === "=" && (e--, A[A.length - 2] === "=" && e--);
  var B = typeof ArrayBuffer < "u" && typeof Uint8Array < "u" && typeof Uint8Array.prototype.slice < "u" ? new ArrayBuffer(e) : new Array(e), g = Array.isArray(B) ? B : new Uint8Array(B);
  for (r = 0; r < t; r += 4)
    i = Pe[A.charCodeAt(r)], s = Pe[A.charCodeAt(r + 1)], o = Pe[A.charCodeAt(r + 2)], a = Pe[A.charCodeAt(r + 3)], g[n++] = i << 2 | s >> 4, g[n++] = (s & 15) << 4 | o >> 2, g[n++] = (o & 3) << 6 | a & 63;
  return B;
}, Xf = function(A) {
  for (var e = A.length, t = [], r = 0; r < e; r += 2)
    t.push(A[r + 1] << 8 | A[r]);
  return t;
}, $f = function(A) {
  for (var e = A.length, t = [], r = 0; r < e; r += 4)
    t.push(A[r + 3] << 24 | A[r + 2] << 16 | A[r + 1] << 8 | A[r]);
  return t;
}, ae = 5, Jn = 6 + 5, Kr = 2, qf = Jn - ae, Ka = 65536 >> ae, AM = 1 << ae, Or = AM - 1, eM = 1024 >> ae, tM = Ka + eM, rM = tM, nM = 32, iM = rM + nM, sM = 65536 >> Jn, aM = 1 << qf, oM = aM - 1, Wi = function(A, e, t) {
  return A.slice ? A.slice(e, t) : new Uint16Array(Array.prototype.slice.call(A, e, t));
}, BM = function(A, e, t) {
  return A.slice ? A.slice(e, t) : new Uint32Array(Array.prototype.slice.call(A, e, t));
}, gM = function(A, e) {
  var t = Jf(A), r = Array.isArray(t) ? $f(t) : new Uint32Array(t), n = Array.isArray(t) ? Xf(t) : new Uint16Array(t), i = 24, s = Wi(n, i / 2, r[4] / 2), o = r[5] === 2 ? Wi(n, (i + r[4]) / 2) : BM(r, Math.ceil((i + r[4]) / 4));
  return new cM(r[0], r[1], r[2], r[3], s, o);
}, cM = function() {
  function A(e, t, r, n, i, s) {
    this.initialValue = e, this.errorValue = t, this.highStart = r, this.highValueIndex = n, this.index = i, this.data = s;
  }
  return A.prototype.get = function(e) {
    var t;
    if (e >= 0) {
      if (e < 55296 || e > 56319 && e <= 65535)
        return t = this.index[e >> ae], t = (t << Kr) + (e & Or), this.data[t];
      if (e <= 65535)
        return t = this.index[Ka + (e - 55296 >> ae)], t = (t << Kr) + (e & Or), this.data[t];
      if (e < this.highStart)
        return t = iM - sM + (e >> Jn), t = this.index[t], t += e >> ae & oM, t = this.index[t], t = (t << Kr) + (e & Or), this.data[t];
      if (e <= 1114111)
        return this.data[this.highValueIndex];
    }
    return this.errorValue;
  }, A;
}(), Vi = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", lM = typeof Uint8Array > "u" ? [] : new Uint8Array(256);
for (var vt = 0; vt < Vi.length; vt++)
  lM[Vi.charCodeAt(vt)] = vt;
var uM = 1, Rr = 2, kr = 3, Ji = 4, Xi = 5, wM = 7, $i = 8, Pr = 9, _r = 10, qi = 11, As = 12, es = 13, ts = 14, Zr = 15, fM = function(A) {
  for (var e = [], t = 0, r = A.length; t < r; ) {
    var n = A.charCodeAt(t++);
    if (n >= 55296 && n <= 56319 && t < r) {
      var i = A.charCodeAt(t++);
      (i & 64512) === 56320 ? e.push(((n & 1023) << 10) + (i & 1023) + 65536) : (e.push(n), t--);
    } else
      e.push(n);
  }
  return e;
}, MM = function() {
  for (var A = [], e = 0; e < arguments.length; e++)
    A[e] = arguments[e];
  if (String.fromCodePoint)
    return String.fromCodePoint.apply(String, A);
  var t = A.length;
  if (!t)
    return "";
  for (var r = [], n = -1, i = ""; ++n < t; ) {
    var s = A[n];
    s <= 65535 ? r.push(s) : (s -= 65536, r.push((s >> 10) + 55296, s % 1024 + 56320)), (n + 1 === t || r.length > 16384) && (i += String.fromCharCode.apply(String, r), r.length = 0);
  }
  return i;
}, CM = gM(Vf), uA = "\xD7", Wr = "\xF7", QM = function(A) {
  return CM.get(A);
}, hM = function(A, e, t) {
  var r = t - 2, n = e[r], i = e[t - 1], s = e[t];
  if (i === Rr && s === kr)
    return uA;
  if (i === Rr || i === kr || i === Ji || s === Rr || s === kr || s === Ji)
    return Wr;
  if (i === $i && [$i, Pr, qi, As].indexOf(s) !== -1 || (i === qi || i === Pr) && (s === Pr || s === _r) || (i === As || i === _r) && s === _r || s === es || s === Xi || s === wM || i === uM)
    return uA;
  if (i === es && s === ts) {
    for (; n === Xi; )
      n = e[--r];
    if (n === ts)
      return uA;
  }
  if (i === Zr && s === Zr) {
    for (var o = 0; n === Zr; )
      o++, n = e[--r];
    if (o % 2 === 0)
      return uA;
  }
  return Wr;
}, IM = function(A) {
  var e = fM(A), t = e.length, r = 0, n = 0, i = e.map(QM);
  return {
    next: function() {
      if (r >= t)
        return { done: !0, value: null };
      for (var s = uA; r < t && (s = hM(e, i, ++r)) === uA; )
        ;
      if (s !== uA || r === t) {
        var o = MM.apply(null, e.slice(n, r));
        return n = r, { value: o, done: !1 };
      }
      return { done: !0, value: null };
    }
  };
}, dM = function(A) {
  for (var e = IM(A), t = [], r; !(r = e.next()).done; )
    r.value && t.push(r.value.slice());
  return t;
}, NM = function(A) {
  var e = 123;
  if (A.createRange) {
    var t = A.createRange();
    if (t.getBoundingClientRect) {
      var r = A.createElement("boundtest");
      r.style.height = e + "px", r.style.display = "block", A.body.appendChild(r), t.selectNode(r);
      var n = t.getBoundingClientRect(), i = Math.round(n.height);
      if (A.body.removeChild(r), i === e)
        return !0;
    }
  }
  return !1;
}, UM = function(A) {
  var e = A.createElement("boundtest");
  e.style.width = "50px", e.style.display = "block", e.style.fontSize = "12px", e.style.letterSpacing = "0px", e.style.wordSpacing = "0px", A.body.appendChild(e);
  var t = A.createRange();
  e.innerHTML = typeof "".repeat == "function" ? "&#128104;".repeat(10) : "";
  var r = e.firstChild, n = Ir(r.data).map(function(a) {
    return X(a);
  }), i = 0, s = {}, o = n.every(function(a, B) {
    t.setStart(r, i), t.setEnd(r, i + a.length);
    var g = t.getBoundingClientRect();
    i += a.length;
    var c = g.x > s.x || g.y > s.y;
    return s = g, B === 0 ? !0 : c;
  });
  return A.body.removeChild(e), o;
}, FM = function() {
  return typeof new Image().crossOrigin < "u";
}, DM = function() {
  return typeof new XMLHttpRequest().responseType == "string";
}, yM = function(A) {
  var e = new Image(), t = A.createElement("canvas"), r = t.getContext("2d");
  if (!r)
    return !1;
  e.src = "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg'></svg>";
  try {
    r.drawImage(e, 0, 0), t.toDataURL();
  } catch {
    return !1;
  }
  return !0;
}, rs = function(A) {
  return A[0] === 0 && A[1] === 255 && A[2] === 0 && A[3] === 255;
}, EM = function(A) {
  var e = A.createElement("canvas"), t = 100;
  e.width = t, e.height = t;
  var r = e.getContext("2d");
  if (!r)
    return Promise.reject(!1);
  r.fillStyle = "rgb(0, 255, 0)", r.fillRect(0, 0, t, t);
  var n = new Image(), i = e.toDataURL();
  n.src = i;
  var s = Tn(t, t, 0, 0, n);
  return r.fillStyle = "red", r.fillRect(0, 0, t, t), ns(s).then(function(o) {
    r.drawImage(o, 0, 0);
    var a = r.getImageData(0, 0, t, t).data;
    r.fillStyle = "red", r.fillRect(0, 0, t, t);
    var B = A.createElement("div");
    return B.style.backgroundImage = "url(" + i + ")", B.style.height = t + "px", rs(a) ? ns(Tn(t, t, 0, 0, B)) : Promise.reject(!1);
  }).then(function(o) {
    return r.drawImage(o, 0, 0), rs(r.getImageData(0, 0, t, t).data);
  }).catch(function() {
    return !1;
  });
}, Tn = function(A, e, t, r, n) {
  var i = "http://www.w3.org/2000/svg", s = document.createElementNS(i, "svg"), o = document.createElementNS(i, "foreignObject");
  return s.setAttributeNS(null, "width", A.toString()), s.setAttributeNS(null, "height", e.toString()), o.setAttributeNS(null, "width", "100%"), o.setAttributeNS(null, "height", "100%"), o.setAttributeNS(null, "x", t.toString()), o.setAttributeNS(null, "y", r.toString()), o.setAttributeNS(null, "externalResourcesRequired", "true"), s.appendChild(o), o.appendChild(n), s;
}, ns = function(A) {
  return new Promise(function(e, t) {
    var r = new Image();
    r.onload = function() {
      return e(r);
    }, r.onerror = t, r.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(A));
  });
}, tA = {
  get SUPPORT_RANGE_BOUNDS() {
    var A = NM(document);
    return Object.defineProperty(tA, "SUPPORT_RANGE_BOUNDS", { value: A }), A;
  },
  get SUPPORT_WORD_BREAKING() {
    var A = tA.SUPPORT_RANGE_BOUNDS && UM(document);
    return Object.defineProperty(tA, "SUPPORT_WORD_BREAKING", { value: A }), A;
  },
  get SUPPORT_SVG_DRAWING() {
    var A = yM(document);
    return Object.defineProperty(tA, "SUPPORT_SVG_DRAWING", { value: A }), A;
  },
  get SUPPORT_FOREIGNOBJECT_DRAWING() {
    var A = typeof Array.from == "function" && typeof window.fetch == "function" ? EM(document) : Promise.resolve(!1);
    return Object.defineProperty(tA, "SUPPORT_FOREIGNOBJECT_DRAWING", { value: A }), A;
  },
  get SUPPORT_CORS_IMAGES() {
    var A = FM();
    return Object.defineProperty(tA, "SUPPORT_CORS_IMAGES", { value: A }), A;
  },
  get SUPPORT_RESPONSE_TYPE() {
    var A = DM();
    return Object.defineProperty(tA, "SUPPORT_RESPONSE_TYPE", { value: A }), A;
  },
  get SUPPORT_CORS_XHR() {
    var A = "withCredentials" in new XMLHttpRequest();
    return Object.defineProperty(tA, "SUPPORT_CORS_XHR", { value: A }), A;
  },
  get SUPPORT_NATIVE_TEXT_SEGMENTATION() {
    var A = !!(typeof Intl < "u" && Intl.Segmenter);
    return Object.defineProperty(tA, "SUPPORT_NATIVE_TEXT_SEGMENTATION", { value: A }), A;
  }
}, Xe = function() {
  function A(e, t) {
    this.text = e, this.bounds = t;
  }
  return A;
}(), pM = function(A, e, t, r) {
  var n = LM(e, t), i = [], s = 0;
  return n.forEach(function(o) {
    if (t.textDecorationLine.length || o.trim().length > 0)
      if (tA.SUPPORT_RANGE_BOUNDS) {
        var a = is(r, s, o.length).getClientRects();
        if (a.length > 1) {
          var B = Xn(o), g = 0;
          B.forEach(function(l) {
            i.push(new Xe(l, xA.fromDOMRectList(A, is(r, g + s, l.length).getClientRects()))), g += l.length;
          });
        } else
          i.push(new Xe(o, xA.fromDOMRectList(A, a)));
      } else {
        var c = r.splitText(o.length);
        i.push(new Xe(o, TM(A, r))), r = c;
      }
    else
      tA.SUPPORT_RANGE_BOUNDS || (r = r.splitText(o.length));
    s += o.length;
  }), i;
}, TM = function(A, e) {
  var t = e.ownerDocument;
  if (t) {
    var r = t.createElement("html2canvaswrapper");
    r.appendChild(e.cloneNode(!0));
    var n = e.parentNode;
    if (n) {
      n.replaceChild(r, e);
      var i = hr(A, r);
      return r.firstChild && n.replaceChild(r.firstChild, r), i;
    }
  }
  return xA.EMPTY;
}, is = function(A, e, t) {
  var r = A.ownerDocument;
  if (!r)
    throw new Error("Node has no owner document");
  var n = r.createRange();
  return n.setStart(A, e), n.setEnd(A, e + t), n;
}, Xn = function(A) {
  if (tA.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
    var e = new Intl.Segmenter(void 0, { granularity: "grapheme" });
    return Array.from(e.segment(A)).map(function(t) {
      return t.segment;
    });
  }
  return dM(A);
}, zM = function(A, e) {
  if (tA.SUPPORT_NATIVE_TEXT_SEGMENTATION) {
    var t = new Intl.Segmenter(void 0, {
      granularity: "word"
    });
    return Array.from(t.segment(A)).map(function(r) {
      return r.segment;
    });
  }
  return vM(A, e);
}, LM = function(A, e) {
  return e.letterSpacing !== 0 ? Xn(A) : zM(A, e);
}, mM = [32, 160, 4961, 65792, 65793, 4153, 4241], vM = function(A, e) {
  for (var t = iu(A, {
    lineBreak: e.lineBreak,
    wordBreak: e.overflowWrap === "break-word" ? "break-word" : e.wordBreak
  }), r = [], n, i = function() {
    if (n.value) {
      var s = n.value.slice(), o = Ir(s), a = "";
      o.forEach(function(B) {
        mM.indexOf(B) === -1 ? a += X(B) : (a.length && r.push(a), r.push(X(B)), a = "");
      }), a.length && r.push(a);
    }
  }; !(n = t.next()).done; )
    i();
  return r;
}, HM = function() {
  function A(e, t, r) {
    this.text = jM(t.data, r.textTransform), this.textBounds = pM(e, this.text, r, t);
  }
  return A;
}(), jM = function(A, e) {
  switch (e) {
    case 1:
      return A.toLowerCase();
    case 3:
      return A.replace(xM, YM);
    case 2:
      return A.toUpperCase();
    default:
      return A;
  }
}, xM = /(^|\s|:|-|\(|\))([a-z])/g, YM = function(A, e, t) {
  return A.length > 0 ? e + t.toUpperCase() : A;
}, Oa = function(A) {
  dA(e, A);
  function e(t, r) {
    var n = A.call(this, t, r) || this;
    return n.src = r.currentSrc || r.src, n.intrinsicWidth = r.naturalWidth, n.intrinsicHeight = r.naturalHeight, n.context.cache.addImage(n.src), n;
  }
  return e;
}(pA), Ra = function(A) {
  dA(e, A);
  function e(t, r) {
    var n = A.call(this, t, r) || this;
    return n.canvas = r, n.intrinsicWidth = r.width, n.intrinsicHeight = r.height, n;
  }
  return e;
}(pA), ka = function(A) {
  dA(e, A);
  function e(t, r) {
    var n = A.call(this, t, r) || this, i = new XMLSerializer(), s = hr(t, r);
    return r.setAttribute("width", s.width + "px"), r.setAttribute("height", s.height + "px"), n.svg = "data:image/svg+xml," + encodeURIComponent(i.serializeToString(r)), n.intrinsicWidth = r.width.baseVal.value, n.intrinsicHeight = r.height.baseVal.value, n.context.cache.addImage(n.svg), n;
  }
  return e;
}(pA), Pa = function(A) {
  dA(e, A);
  function e(t, r) {
    var n = A.call(this, t, r) || this;
    return n.value = r.value, n;
  }
  return e;
}(pA), zn = function(A) {
  dA(e, A);
  function e(t, r) {
    var n = A.call(this, t, r) || this;
    return n.start = r.start, n.reversed = typeof r.reversed == "boolean" && r.reversed === !0, n;
  }
  return e;
}(pA), SM = [
  {
    type: 15,
    flags: 0,
    unit: "px",
    number: 3
  }
], bM = [
  {
    type: 16,
    flags: 0,
    number: 50
  }
], GM = function(A) {
  return A.width > A.height ? new xA(A.left + (A.width - A.height) / 2, A.top, A.height, A.height) : A.width < A.height ? new xA(A.left, A.top + (A.height - A.width) / 2, A.width, A.width) : A;
}, KM = function(A) {
  var e = A.type === OM ? new Array(A.value.length + 1).join("\u2022") : A.value;
  return e.length === 0 ? A.placeholder || "" : e;
}, Br = "checkbox", gr = "radio", OM = "password", ss = 707406591, $n = function(A) {
  dA(e, A);
  function e(t, r) {
    var n = A.call(this, t, r) || this;
    switch (n.type = r.type.toLowerCase(), n.checked = r.checked, n.value = KM(r), (n.type === Br || n.type === gr) && (n.styles.backgroundColor = 3739148031, n.styles.borderTopColor = n.styles.borderRightColor = n.styles.borderBottomColor = n.styles.borderLeftColor = 2779096575, n.styles.borderTopWidth = n.styles.borderRightWidth = n.styles.borderBottomWidth = n.styles.borderLeftWidth = 1, n.styles.borderTopStyle = n.styles.borderRightStyle = n.styles.borderBottomStyle = n.styles.borderLeftStyle = 1, n.styles.backgroundClip = [0], n.styles.backgroundOrigin = [0], n.bounds = GM(n.bounds)), n.type) {
      case Br:
        n.styles.borderTopRightRadius = n.styles.borderTopLeftRadius = n.styles.borderBottomRightRadius = n.styles.borderBottomLeftRadius = SM;
        break;
      case gr:
        n.styles.borderTopRightRadius = n.styles.borderTopLeftRadius = n.styles.borderBottomRightRadius = n.styles.borderBottomLeftRadius = bM;
        break;
    }
    return n;
  }
  return e;
}(pA), _a = function(A) {
  dA(e, A);
  function e(t, r) {
    var n = A.call(this, t, r) || this, i = r.options[r.selectedIndex || 0];
    return n.value = i && i.text || "", n;
  }
  return e;
}(pA), Za = function(A) {
  dA(e, A);
  function e(t, r) {
    var n = A.call(this, t, r) || this;
    return n.value = r.value, n;
  }
  return e;
}(pA), Wa = function(A) {
  dA(e, A);
  function e(t, r) {
    var n = A.call(this, t, r) || this;
    n.src = r.src, n.width = parseInt(r.width, 10) || 0, n.height = parseInt(r.height, 10) || 0, n.backgroundColor = n.styles.backgroundColor;
    try {
      if (r.contentWindow && r.contentWindow.document && r.contentWindow.document.documentElement) {
        n.tree = Ja(t, r.contentWindow.document.documentElement);
        var i = r.contentWindow.document.documentElement ? Ve(t, getComputedStyle(r.contentWindow.document.documentElement).backgroundColor) : HA.TRANSPARENT, s = r.contentWindow.document.body ? Ve(t, getComputedStyle(r.contentWindow.document.body).backgroundColor) : HA.TRANSPARENT;
        n.backgroundColor = ZA(i) ? ZA(s) ? n.styles.backgroundColor : s : i;
      }
    } catch {
    }
    return n;
  }
  return e;
}(pA), RM = ["OL", "UL", "MENU"], _t = function(A, e, t, r) {
  for (var n = e.firstChild, i = void 0; n; n = i)
    if (i = n.nextSibling, Xa(n) && n.data.trim().length > 0)
      t.textNodes.push(new HM(A, n, t.styles));
    else if (Ne(n))
      if (eo(n) && n.assignedNodes)
        n.assignedNodes().forEach(function(o) {
          return _t(A, o, t, r);
        });
      else {
        var s = Va(A, n);
        s.styles.isVisible() && (kM(n, s, r) ? s.flags |= 4 : PM(s.styles) && (s.flags |= 2), RM.indexOf(n.tagName) !== -1 && (s.flags |= 8), t.elements.push(s), n.slot, n.shadowRoot ? _t(A, n.shadowRoot, s, r) : !cr(n) && !$a(n) && !lr(n) && _t(A, n, s, r));
      }
}, Va = function(A, e) {
  return mn(e) ? new Oa(A, e) : qa(e) ? new Ra(A, e) : $a(e) ? new ka(A, e) : _M(e) ? new Pa(A, e) : ZM(e) ? new zn(A, e) : WM(e) ? new $n(A, e) : lr(e) ? new _a(A, e) : cr(e) ? new Za(A, e) : Ao(e) ? new Wa(A, e) : new pA(A, e);
}, Ja = function(A, e) {
  var t = Va(A, e);
  return t.flags |= 4, _t(A, e, t, t), t;
}, kM = function(A, e, t) {
  return e.styles.isPositionedWithZIndex() || e.styles.opacity < 1 || e.styles.isTransformed() || qn(A) && t.styles.isTransparent();
}, PM = function(A) {
  return A.isPositioned() || A.isFloating();
}, Xa = function(A) {
  return A.nodeType === Node.TEXT_NODE;
}, Ne = function(A) {
  return A.nodeType === Node.ELEMENT_NODE;
}, Ln = function(A) {
  return Ne(A) && typeof A.style < "u" && !Zt(A);
}, Zt = function(A) {
  return typeof A.className == "object";
}, _M = function(A) {
  return A.tagName === "LI";
}, ZM = function(A) {
  return A.tagName === "OL";
}, WM = function(A) {
  return A.tagName === "INPUT";
}, VM = function(A) {
  return A.tagName === "HTML";
}, $a = function(A) {
  return A.tagName === "svg";
}, qn = function(A) {
  return A.tagName === "BODY";
}, qa = function(A) {
  return A.tagName === "CANVAS";
}, as = function(A) {
  return A.tagName === "VIDEO";
}, mn = function(A) {
  return A.tagName === "IMG";
}, Ao = function(A) {
  return A.tagName === "IFRAME";
}, os = function(A) {
  return A.tagName === "STYLE";
}, JM = function(A) {
  return A.tagName === "SCRIPT";
}, cr = function(A) {
  return A.tagName === "TEXTAREA";
}, lr = function(A) {
  return A.tagName === "SELECT";
}, eo = function(A) {
  return A.tagName === "SLOT";
}, Bs = function(A) {
  return A.tagName.indexOf("-") > 0;
}, XM = function() {
  function A() {
    this.counters = {};
  }
  return A.prototype.getCounterValue = function(e) {
    var t = this.counters[e];
    return t && t.length ? t[t.length - 1] : 1;
  }, A.prototype.getCounterValues = function(e) {
    var t = this.counters[e];
    return t || [];
  }, A.prototype.pop = function(e) {
    var t = this;
    e.forEach(function(r) {
      return t.counters[r].pop();
    });
  }, A.prototype.parse = function(e) {
    var t = this, r = e.counterIncrement, n = e.counterReset, i = !0;
    r !== null && r.forEach(function(o) {
      var a = t.counters[o.counter];
      a && o.increment !== 0 && (i = !1, a.length || a.push(1), a[Math.max(0, a.length - 1)] += o.increment);
    });
    var s = [];
    return i && n.forEach(function(o) {
      var a = t.counters[o.counter];
      s.push(o.counter), a || (a = t.counters[o.counter] = []), a.push(o.reset);
    }), s;
  }, A;
}(), gs = {
  integers: [1e3, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1],
  values: ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"]
}, cs = {
  integers: [
    9e3,
    8e3,
    7e3,
    6e3,
    5e3,
    4e3,
    3e3,
    2e3,
    1e3,
    900,
    800,
    700,
    600,
    500,
    400,
    300,
    200,
    100,
    90,
    80,
    70,
    60,
    50,
    40,
    30,
    20,
    10,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1
  ],
  values: [
    "\u0554",
    "\u0553",
    "\u0552",
    "\u0551",
    "\u0550",
    "\u054F",
    "\u054E",
    "\u054D",
    "\u054C",
    "\u054B",
    "\u054A",
    "\u0549",
    "\u0548",
    "\u0547",
    "\u0546",
    "\u0545",
    "\u0544",
    "\u0543",
    "\u0542",
    "\u0541",
    "\u0540",
    "\u053F",
    "\u053E",
    "\u053D",
    "\u053C",
    "\u053B",
    "\u053A",
    "\u0539",
    "\u0538",
    "\u0537",
    "\u0536",
    "\u0535",
    "\u0534",
    "\u0533",
    "\u0532",
    "\u0531"
  ]
}, $M = {
  integers: [
    1e4,
    9e3,
    8e3,
    7e3,
    6e3,
    5e3,
    4e3,
    3e3,
    2e3,
    1e3,
    400,
    300,
    200,
    100,
    90,
    80,
    70,
    60,
    50,
    40,
    30,
    20,
    19,
    18,
    17,
    16,
    15,
    10,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1
  ],
  values: [
    "\u05D9\u05F3",
    "\u05D8\u05F3",
    "\u05D7\u05F3",
    "\u05D6\u05F3",
    "\u05D5\u05F3",
    "\u05D4\u05F3",
    "\u05D3\u05F3",
    "\u05D2\u05F3",
    "\u05D1\u05F3",
    "\u05D0\u05F3",
    "\u05EA",
    "\u05E9",
    "\u05E8",
    "\u05E7",
    "\u05E6",
    "\u05E4",
    "\u05E2",
    "\u05E1",
    "\u05E0",
    "\u05DE",
    "\u05DC",
    "\u05DB",
    "\u05D9\u05D8",
    "\u05D9\u05D7",
    "\u05D9\u05D6",
    "\u05D8\u05D6",
    "\u05D8\u05D5",
    "\u05D9",
    "\u05D8",
    "\u05D7",
    "\u05D6",
    "\u05D5",
    "\u05D4",
    "\u05D3",
    "\u05D2",
    "\u05D1",
    "\u05D0"
  ]
}, qM = {
  integers: [
    1e4,
    9e3,
    8e3,
    7e3,
    6e3,
    5e3,
    4e3,
    3e3,
    2e3,
    1e3,
    900,
    800,
    700,
    600,
    500,
    400,
    300,
    200,
    100,
    90,
    80,
    70,
    60,
    50,
    40,
    30,
    20,
    10,
    9,
    8,
    7,
    6,
    5,
    4,
    3,
    2,
    1
  ],
  values: [
    "\u10F5",
    "\u10F0",
    "\u10EF",
    "\u10F4",
    "\u10EE",
    "\u10ED",
    "\u10EC",
    "\u10EB",
    "\u10EA",
    "\u10E9",
    "\u10E8",
    "\u10E7",
    "\u10E6",
    "\u10E5",
    "\u10E4",
    "\u10F3",
    "\u10E2",
    "\u10E1",
    "\u10E0",
    "\u10DF",
    "\u10DE",
    "\u10DD",
    "\u10F2",
    "\u10DC",
    "\u10DB",
    "\u10DA",
    "\u10D9",
    "\u10D8",
    "\u10D7",
    "\u10F1",
    "\u10D6",
    "\u10D5",
    "\u10D4",
    "\u10D3",
    "\u10D2",
    "\u10D1",
    "\u10D0"
  ]
}, fe = function(A, e, t, r, n, i) {
  return A < e || A > t ? it(A, n, i.length > 0) : r.integers.reduce(function(s, o, a) {
    for (; A >= o; )
      A -= o, s += r.values[a];
    return s;
  }, "") + i;
}, to = function(A, e, t, r) {
  var n = "";
  do
    t || A--, n = r(A) + n, A /= e;
  while (A * e >= e);
  return n;
}, J = function(A, e, t, r, n) {
  var i = t - e + 1;
  return (A < 0 ? "-" : "") + (to(Math.abs(A), i, r, function(s) {
    return X(Math.floor(s % i) + e);
  }) + n);
}, Ae = function(A, e, t) {
  t === void 0 && (t = ". ");
  var r = e.length;
  return to(Math.abs(A), r, !1, function(n) {
    return e[Math.floor(n % r)];
  }) + t;
}, Qe = 1 << 0, SA = 1 << 1, bA = 1 << 2, _e = 1 << 3, vA = function(A, e, t, r, n, i) {
  if (A < -9999 || A > 9999)
    return it(A, 4, n.length > 0);
  var s = Math.abs(A), o = n;
  if (s === 0)
    return e[0] + o;
  for (var a = 0; s > 0 && a <= 4; a++) {
    var B = s % 10;
    B === 0 && AA(i, Qe) && o !== "" ? o = e[B] + o : B > 1 || B === 1 && a === 0 || B === 1 && a === 1 && AA(i, SA) || B === 1 && a === 1 && AA(i, bA) && A > 100 || B === 1 && a > 1 && AA(i, _e) ? o = e[B] + (a > 0 ? t[a - 1] : "") + o : B === 1 && a > 0 && (o = t[a - 1] + o), s = Math.floor(s / 10);
  }
  return (A < 0 ? r : "") + o;
}, ls = "\u5341\u767E\u5343\u842C", us = "\u62FE\u4F70\u4EDF\u842C", ws = "\u30DE\u30A4\u30CA\u30B9", Vr = "\uB9C8\uC774\uB108\uC2A4", it = function(A, e, t) {
  var r = t ? ". " : "", n = t ? "\u3001" : "", i = t ? ", " : "", s = t ? " " : "";
  switch (e) {
    case 0:
      return "\u2022" + s;
    case 1:
      return "\u25E6" + s;
    case 2:
      return "\u25FE" + s;
    case 5:
      var o = J(A, 48, 57, !0, r);
      return o.length < 4 ? "0" + o : o;
    case 4:
      return Ae(A, "\u3007\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D", n);
    case 6:
      return fe(A, 1, 3999, gs, 3, r).toLowerCase();
    case 7:
      return fe(A, 1, 3999, gs, 3, r);
    case 8:
      return J(A, 945, 969, !1, r);
    case 9:
      return J(A, 97, 122, !1, r);
    case 10:
      return J(A, 65, 90, !1, r);
    case 11:
      return J(A, 1632, 1641, !0, r);
    case 12:
    case 49:
      return fe(A, 1, 9999, cs, 3, r);
    case 35:
      return fe(A, 1, 9999, cs, 3, r).toLowerCase();
    case 13:
      return J(A, 2534, 2543, !0, r);
    case 14:
    case 30:
      return J(A, 6112, 6121, !0, r);
    case 15:
      return Ae(A, "\u5B50\u4E11\u5BC5\u536F\u8FB0\u5DF3\u5348\u672A\u7533\u9149\u620C\u4EA5", n);
    case 16:
      return Ae(A, "\u7532\u4E59\u4E19\u4E01\u620A\u5DF1\u5E9A\u8F9B\u58EC\u7678", n);
    case 17:
    case 48:
      return vA(A, "\u96F6\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D", ls, "\u8CA0", n, SA | bA | _e);
    case 47:
      return vA(A, "\u96F6\u58F9\u8CB3\u53C3\u8086\u4F0D\u9678\u67D2\u634C\u7396", us, "\u8CA0", n, Qe | SA | bA | _e);
    case 42:
      return vA(A, "\u96F6\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D", ls, "\u8D1F", n, SA | bA | _e);
    case 41:
      return vA(A, "\u96F6\u58F9\u8D30\u53C1\u8086\u4F0D\u9646\u67D2\u634C\u7396", us, "\u8D1F", n, Qe | SA | bA | _e);
    case 26:
      return vA(A, "\u3007\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D", "\u5341\u767E\u5343\u4E07", ws, n, 0);
    case 25:
      return vA(A, "\u96F6\u58F1\u5F10\u53C2\u56DB\u4F0D\u516D\u4E03\u516B\u4E5D", "\u62FE\u767E\u5343\u4E07", ws, n, Qe | SA | bA);
    case 31:
      return vA(A, "\uC601\uC77C\uC774\uC0BC\uC0AC\uC624\uC721\uCE60\uD314\uAD6C", "\uC2ED\uBC31\uCC9C\uB9CC", Vr, i, Qe | SA | bA);
    case 33:
      return vA(A, "\u96F6\u4E00\u4E8C\u4E09\u56DB\u4E94\u516D\u4E03\u516B\u4E5D", "\u5341\u767E\u5343\u842C", Vr, i, 0);
    case 32:
      return vA(A, "\u96F6\u58F9\u8CB3\u53C3\u56DB\u4E94\u516D\u4E03\u516B\u4E5D", "\u62FE\u767E\u5343", Vr, i, Qe | SA | bA);
    case 18:
      return J(A, 2406, 2415, !0, r);
    case 20:
      return fe(A, 1, 19999, qM, 3, r);
    case 21:
      return J(A, 2790, 2799, !0, r);
    case 22:
      return J(A, 2662, 2671, !0, r);
    case 22:
      return fe(A, 1, 10999, $M, 3, r);
    case 23:
      return Ae(A, "\u3042\u3044\u3046\u3048\u304A\u304B\u304D\u304F\u3051\u3053\u3055\u3057\u3059\u305B\u305D\u305F\u3061\u3064\u3066\u3068\u306A\u306B\u306C\u306D\u306E\u306F\u3072\u3075\u3078\u307B\u307E\u307F\u3080\u3081\u3082\u3084\u3086\u3088\u3089\u308A\u308B\u308C\u308D\u308F\u3090\u3091\u3092\u3093");
    case 24:
      return Ae(A, "\u3044\u308D\u306F\u306B\u307B\u3078\u3068\u3061\u308A\u306C\u308B\u3092\u308F\u304B\u3088\u305F\u308C\u305D\u3064\u306D\u306A\u3089\u3080\u3046\u3090\u306E\u304A\u304F\u3084\u307E\u3051\u3075\u3053\u3048\u3066\u3042\u3055\u304D\u3086\u3081\u307F\u3057\u3091\u3072\u3082\u305B\u3059");
    case 27:
      return J(A, 3302, 3311, !0, r);
    case 28:
      return Ae(A, "\u30A2\u30A4\u30A6\u30A8\u30AA\u30AB\u30AD\u30AF\u30B1\u30B3\u30B5\u30B7\u30B9\u30BB\u30BD\u30BF\u30C1\u30C4\u30C6\u30C8\u30CA\u30CB\u30CC\u30CD\u30CE\u30CF\u30D2\u30D5\u30D8\u30DB\u30DE\u30DF\u30E0\u30E1\u30E2\u30E4\u30E6\u30E8\u30E9\u30EA\u30EB\u30EC\u30ED\u30EF\u30F0\u30F1\u30F2\u30F3", n);
    case 29:
      return Ae(A, "\u30A4\u30ED\u30CF\u30CB\u30DB\u30D8\u30C8\u30C1\u30EA\u30CC\u30EB\u30F2\u30EF\u30AB\u30E8\u30BF\u30EC\u30BD\u30C4\u30CD\u30CA\u30E9\u30E0\u30A6\u30F0\u30CE\u30AA\u30AF\u30E4\u30DE\u30B1\u30D5\u30B3\u30A8\u30C6\u30A2\u30B5\u30AD\u30E6\u30E1\u30DF\u30B7\u30F1\u30D2\u30E2\u30BB\u30B9", n);
    case 34:
      return J(A, 3792, 3801, !0, r);
    case 37:
      return J(A, 6160, 6169, !0, r);
    case 38:
      return J(A, 4160, 4169, !0, r);
    case 39:
      return J(A, 2918, 2927, !0, r);
    case 40:
      return J(A, 1776, 1785, !0, r);
    case 43:
      return J(A, 3046, 3055, !0, r);
    case 44:
      return J(A, 3174, 3183, !0, r);
    case 45:
      return J(A, 3664, 3673, !0, r);
    case 46:
      return J(A, 3872, 3881, !0, r);
    case 3:
    default:
      return J(A, 48, 57, !0, r);
  }
}, ro = "data-html2canvas-ignore", fs = function() {
  function A(e, t, r) {
    if (this.context = e, this.options = r, this.scrolledElements = [], this.referenceElement = t, this.counters = new XM(), this.quoteDepth = 0, !t.ownerDocument)
      throw new Error("Cloned element does not have an owner document");
    this.documentElement = this.cloneNode(t.ownerDocument.documentElement, !1);
  }
  return A.prototype.toIFrame = function(e, t) {
    var r = this, n = A0(e, t);
    if (!n.contentWindow)
      return Promise.reject("Unable to find iframe window");
    var i = e.defaultView.pageXOffset, s = e.defaultView.pageYOffset, o = n.contentWindow, a = o.document, B = r0(n).then(function() {
      return oA(r, void 0, void 0, function() {
        var g, c;
        return nA(this, function(l) {
          switch (l.label) {
            case 0:
              return this.scrolledElements.forEach(a0), o && (o.scrollTo(t.left, t.top), /(iPad|iPhone|iPod)/g.test(navigator.userAgent) && (o.scrollY !== t.top || o.scrollX !== t.left) && (this.context.logger.warn("Unable to restore scroll position for cloned document"), this.context.windowBounds = this.context.windowBounds.add(o.scrollX - t.left, o.scrollY - t.top, 0, 0))), g = this.options.onclone, c = this.clonedReferenceElement, typeof c > "u" ? [2, Promise.reject("Error finding the " + this.referenceElement.nodeName + " in the cloned document")] : a.fonts && a.fonts.ready ? [4, a.fonts.ready] : [3, 2];
            case 1:
              l.sent(), l.label = 2;
            case 2:
              return /(AppleWebKit)/g.test(navigator.userAgent) ? [4, t0(a)] : [3, 4];
            case 3:
              l.sent(), l.label = 4;
            case 4:
              return typeof g == "function" ? [2, Promise.resolve().then(function() {
                return g(a, c);
              }).then(function() {
                return n;
              })] : [2, n];
          }
        });
      });
    });
    return a.open(), a.write(i0(document.doctype) + "<html></html>"), s0(this.referenceElement.ownerDocument, i, s), a.replaceChild(a.adoptNode(this.documentElement), a.documentElement), a.close(), B;
  }, A.prototype.createElementClone = function(e) {
    if (pn(e, 2))
      debugger;
    if (qa(e))
      return this.createCanvasClone(e);
    if (as(e))
      return this.createVideoClone(e);
    if (os(e))
      return this.createStyleClone(e);
    var t = e.cloneNode(!1);
    return mn(t) && (mn(e) && e.currentSrc && e.currentSrc !== e.src && (t.src = e.currentSrc, t.srcset = ""), t.loading === "lazy" && (t.loading = "eager")), Bs(t) ? this.createCustomElementClone(t) : t;
  }, A.prototype.createCustomElementClone = function(e) {
    var t = document.createElement("html2canvascustomelement");
    return Jr(e.style, t), t;
  }, A.prototype.createStyleClone = function(e) {
    try {
      var t = e.sheet;
      if (t && t.cssRules) {
        var r = [].slice.call(t.cssRules, 0).reduce(function(i, s) {
          return s && typeof s.cssText == "string" ? i + s.cssText : i;
        }, ""), n = e.cloneNode(!1);
        return n.textContent = r, n;
      }
    } catch (i) {
      if (this.context.logger.error("Unable to access cssRules property", i), i.name !== "SecurityError")
        throw i;
    }
    return e.cloneNode(!1);
  }, A.prototype.createCanvasClone = function(e) {
    var t;
    if (this.options.inlineImages && e.ownerDocument) {
      var r = e.ownerDocument.createElement("img");
      try {
        return r.src = e.toDataURL(), r;
      } catch {
        this.context.logger.info("Unable to inline canvas contents, canvas is tainted", e);
      }
    }
    var n = e.cloneNode(!1);
    try {
      n.width = e.width, n.height = e.height;
      var i = e.getContext("2d"), s = n.getContext("2d");
      if (s)
        if (!this.options.allowTaint && i)
          s.putImageData(i.getImageData(0, 0, e.width, e.height), 0, 0);
        else {
          var o = (t = e.getContext("webgl2")) !== null && t !== void 0 ? t : e.getContext("webgl");
          if (o) {
            var a = o.getContextAttributes();
            (a == null ? void 0 : a.preserveDrawingBuffer) === !1 && this.context.logger.warn("Unable to clone WebGL context as it has preserveDrawingBuffer=false", e);
          }
          s.drawImage(e, 0, 0);
        }
      return n;
    } catch {
      this.context.logger.info("Unable to clone canvas as it is tainted", e);
    }
    return n;
  }, A.prototype.createVideoClone = function(e) {
    var t = e.ownerDocument.createElement("canvas");
    t.width = e.offsetWidth, t.height = e.offsetHeight;
    var r = t.getContext("2d");
    try {
      return r && (r.drawImage(e, 0, 0, t.width, t.height), this.options.allowTaint || r.getImageData(0, 0, t.width, t.height)), t;
    } catch {
      this.context.logger.info("Unable to clone video as it is tainted", e);
    }
    var n = e.ownerDocument.createElement("canvas");
    return n.width = e.offsetWidth, n.height = e.offsetHeight, n;
  }, A.prototype.appendChildNode = function(e, t, r) {
    (!Ne(t) || !JM(t) && !t.hasAttribute(ro) && (typeof this.options.ignoreElements != "function" || !this.options.ignoreElements(t))) && (!this.options.copyStyles || !Ne(t) || !os(t)) && e.appendChild(this.cloneNode(t, r));
  }, A.prototype.cloneChildNodes = function(e, t, r) {
    for (var n = this, i = e.shadowRoot ? e.shadowRoot.firstChild : e.firstChild; i; i = i.nextSibling)
      if (Ne(i) && eo(i) && typeof i.assignedNodes == "function") {
        var s = i.assignedNodes();
        s.length && s.forEach(function(o) {
          return n.appendChildNode(t, o, r);
        });
      } else
        this.appendChildNode(t, i, r);
  }, A.prototype.cloneNode = function(e, t) {
    if (Xa(e))
      return document.createTextNode(e.data);
    if (!e.ownerDocument)
      return e.cloneNode(!1);
    var r = e.ownerDocument.defaultView;
    if (r && Ne(e) && (Ln(e) || Zt(e))) {
      var n = this.createElementClone(e);
      n.style.transitionProperty = "none";
      var i = r.getComputedStyle(e), s = r.getComputedStyle(e, ":before"), o = r.getComputedStyle(e, ":after");
      this.referenceElement === e && Ln(n) && (this.clonedReferenceElement = n), qn(n) && g0(n);
      var a = this.counters.parse(new _i(this.context, i)), B = this.resolvePseudoContent(e, n, s, $e.BEFORE);
      Bs(e) && (t = !0), as(e) || this.cloneChildNodes(e, n, t), B && n.insertBefore(B, n.firstChild);
      var g = this.resolvePseudoContent(e, n, o, $e.AFTER);
      return g && n.appendChild(g), this.counters.pop(a), (i && (this.options.copyStyles || Zt(e)) && !Ao(e) || t) && Jr(i, n), (e.scrollTop !== 0 || e.scrollLeft !== 0) && this.scrolledElements.push([n, e.scrollLeft, e.scrollTop]), (cr(e) || lr(e)) && (cr(n) || lr(n)) && (n.value = e.value), n;
    }
    return e.cloneNode(!1);
  }, A.prototype.resolvePseudoContent = function(e, t, r, n) {
    var i = this;
    if (!!r) {
      var s = r.content, o = t.ownerDocument;
      if (!(!o || !s || s === "none" || s === "-moz-alt-content" || r.display === "none")) {
        this.counters.parse(new _i(this.context, r));
        var a = new _f(this.context, r), B = o.createElement("html2canvaspseudoelement");
        Jr(r, B), a.content.forEach(function(c) {
          if (c.type === 0)
            B.appendChild(o.createTextNode(c.value));
          else if (c.type === 22) {
            var l = o.createElement("img");
            l.src = c.value, l.style.opacity = "1", B.appendChild(l);
          } else if (c.type === 18) {
            if (c.name === "attr") {
              var M = c.values.filter(_);
              M.length && B.appendChild(o.createTextNode(e.getAttribute(M[0].value) || ""));
            } else if (c.name === "counter") {
              var w = c.values.filter(Te), f = w[0], u = w[1];
              if (f && _(f)) {
                var C = i.counters.getCounterValue(f.value), h = u && _(u) ? En.parse(i.context, u.value) : 3;
                B.appendChild(o.createTextNode(it(C, h, !1)));
              }
            } else if (c.name === "counters") {
              var I = c.values.filter(Te), f = I[0], d = I[1], u = I[2];
              if (f && _(f)) {
                var N = i.counters.getCounterValues(f.value), U = u && _(u) ? En.parse(i.context, u.value) : 3, D = d && d.type === 0 ? d.value : "", L = N.map(function(z) {
                  return it(z, U, !1);
                }).join(D);
                B.appendChild(o.createTextNode(L));
              }
            }
          } else if (c.type === 20)
            switch (c.value) {
              case "open-quote":
                B.appendChild(o.createTextNode(Pi(a.quotes, i.quoteDepth++, !0)));
                break;
              case "close-quote":
                B.appendChild(o.createTextNode(Pi(a.quotes, --i.quoteDepth, !1)));
                break;
              default:
                B.appendChild(o.createTextNode(c.value));
            }
        }), B.className = vn + " " + Hn;
        var g = n === $e.BEFORE ? " " + vn : " " + Hn;
        return Zt(t) ? t.className.baseValue += g : t.className += g, B;
      }
    }
  }, A.destroy = function(e) {
    return e.parentNode ? (e.parentNode.removeChild(e), !0) : !1;
  }, A;
}(), $e;
(function(A) {
  A[A.BEFORE = 0] = "BEFORE", A[A.AFTER = 1] = "AFTER";
})($e || ($e = {}));
var A0 = function(A, e) {
  var t = A.createElement("iframe");
  return t.className = "html2canvas-container", t.style.visibility = "hidden", t.style.position = "fixed", t.style.left = "-10000px", t.style.top = "0px", t.style.border = "0", t.width = e.width.toString(), t.height = e.height.toString(), t.scrolling = "no", t.setAttribute(ro, "true"), A.body.appendChild(t), t;
}, e0 = function(A) {
  return new Promise(function(e) {
    if (A.complete) {
      e();
      return;
    }
    if (!A.src) {
      e();
      return;
    }
    A.onload = e, A.onerror = e;
  });
}, t0 = function(A) {
  return Promise.all([].slice.call(A.images, 0).map(e0));
}, r0 = function(A) {
  return new Promise(function(e, t) {
    var r = A.contentWindow;
    if (!r)
      return t("No window assigned for iframe");
    var n = r.document;
    r.onload = A.onload = function() {
      r.onload = A.onload = null;
      var i = setInterval(function() {
        n.body.childNodes.length > 0 && n.readyState === "complete" && (clearInterval(i), e(A));
      }, 50);
    };
  });
}, n0 = [
  "all",
  "d",
  "content"
], Jr = function(A, e) {
  for (var t = A.length - 1; t >= 0; t--) {
    var r = A.item(t);
    n0.indexOf(r) === -1 && e.style.setProperty(r, A.getPropertyValue(r));
  }
  return e;
}, i0 = function(A) {
  var e = "";
  return A && (e += "<!DOCTYPE ", A.name && (e += A.name), A.internalSubset && (e += A.internalSubset), A.publicId && (e += '"' + A.publicId + '"'), A.systemId && (e += '"' + A.systemId + '"'), e += ">"), e;
}, s0 = function(A, e, t) {
  A && A.defaultView && (e !== A.defaultView.pageXOffset || t !== A.defaultView.pageYOffset) && A.defaultView.scrollTo(e, t);
}, a0 = function(A) {
  var e = A[0], t = A[1], r = A[2];
  e.scrollLeft = t, e.scrollTop = r;
}, o0 = ":before", B0 = ":after", vn = "___html2canvas___pseudoelement_before", Hn = "___html2canvas___pseudoelement_after", Ms = `{
    content: "" !important;
    display: none !important;
}`, g0 = function(A) {
  c0(A, "." + vn + o0 + Ms + `
         .` + Hn + B0 + Ms);
}, c0 = function(A, e) {
  var t = A.ownerDocument;
  if (t) {
    var r = t.createElement("style");
    r.textContent = e, A.appendChild(r);
  }
}, no = function() {
  function A() {
  }
  return A.getOrigin = function(e) {
    var t = A._link;
    return t ? (t.href = e, t.href = t.href, t.protocol + t.hostname + t.port) : "about:blank";
  }, A.isSameOrigin = function(e) {
    return A.getOrigin(e) === A._origin;
  }, A.setContext = function(e) {
    A._link = e.document.createElement("a"), A._origin = A.getOrigin(e.location.href);
  }, A._origin = "about:blank", A;
}(), l0 = function() {
  function A(e, t) {
    this.context = e, this._options = t, this._cache = {};
  }
  return A.prototype.addImage = function(e) {
    var t = Promise.resolve();
    return this.has(e) || ($r(e) || M0(e)) && (this._cache[e] = this.loadImage(e)).catch(function() {
    }), t;
  }, A.prototype.match = function(e) {
    return this._cache[e];
  }, A.prototype.loadImage = function(e) {
    return oA(this, void 0, void 0, function() {
      var t, r, n, i, s = this;
      return nA(this, function(o) {
        switch (o.label) {
          case 0:
            return t = no.isSameOrigin(e), r = !Xr(e) && this._options.useCORS === !0 && tA.SUPPORT_CORS_IMAGES && !t, n = !Xr(e) && !t && !$r(e) && typeof this._options.proxy == "string" && tA.SUPPORT_CORS_XHR && !r, !t && this._options.allowTaint === !1 && !Xr(e) && !$r(e) && !n && !r ? [2] : (i = e, n ? [4, this.proxy(i)] : [3, 2]);
          case 1:
            i = o.sent(), o.label = 2;
          case 2:
            return this.context.logger.debug("Added image " + e.substring(0, 256)), [4, new Promise(function(a, B) {
              var g = new Image();
              g.onload = function() {
                return a(g);
              }, g.onerror = B, (C0(i) || r) && (g.crossOrigin = "anonymous"), g.src = i, g.complete === !0 && setTimeout(function() {
                return a(g);
              }, 500), s._options.imageTimeout > 0 && setTimeout(function() {
                return B("Timed out (" + s._options.imageTimeout + "ms) loading image");
              }, s._options.imageTimeout);
            })];
          case 3:
            return [2, o.sent()];
        }
      });
    });
  }, A.prototype.has = function(e) {
    return typeof this._cache[e] < "u";
  }, A.prototype.keys = function() {
    return Promise.resolve(Object.keys(this._cache));
  }, A.prototype.proxy = function(e) {
    var t = this, r = this._options.proxy;
    if (!r)
      throw new Error("No proxy defined");
    var n = e.substring(0, 256);
    return new Promise(function(i, s) {
      var o = tA.SUPPORT_RESPONSE_TYPE ? "blob" : "text", a = new XMLHttpRequest();
      a.onload = function() {
        if (a.status === 200)
          if (o === "text")
            i(a.response);
          else {
            var c = new FileReader();
            c.addEventListener("load", function() {
              return i(c.result);
            }, !1), c.addEventListener("error", function(l) {
              return s(l);
            }, !1), c.readAsDataURL(a.response);
          }
        else
          s("Failed to proxy resource " + n + " with status code " + a.status);
      }, a.onerror = s;
      var B = r.indexOf("?") > -1 ? "&" : "?";
      if (a.open("GET", "" + r + B + "url=" + encodeURIComponent(e) + "&responseType=" + o), o !== "text" && a instanceof XMLHttpRequest && (a.responseType = o), t._options.imageTimeout) {
        var g = t._options.imageTimeout;
        a.timeout = g, a.ontimeout = function() {
          return s("Timed out (" + g + "ms) proxying " + n);
        };
      }
      a.send();
    });
  }, A;
}(), u0 = /^data:image\/svg\+xml/i, w0 = /^data:image\/.*;base64,/i, f0 = /^data:image\/.*/i, M0 = function(A) {
  return tA.SUPPORT_SVG_DRAWING || !Q0(A);
}, Xr = function(A) {
  return f0.test(A);
}, C0 = function(A) {
  return w0.test(A);
}, $r = function(A) {
  return A.substr(0, 4) === "blob";
}, Q0 = function(A) {
  return A.substr(-3).toLowerCase() === "svg" || u0.test(A);
}, E = function() {
  function A(e, t) {
    this.type = 0, this.x = e, this.y = t;
  }
  return A.prototype.add = function(e, t) {
    return new A(this.x + e, this.y + t);
  }, A;
}(), Me = function(A, e, t) {
  return new E(A.x + (e.x - A.x) * t, A.y + (e.y - A.y) * t);
}, Ht = function() {
  function A(e, t, r, n) {
    this.type = 1, this.start = e, this.startControl = t, this.endControl = r, this.end = n;
  }
  return A.prototype.subdivide = function(e, t) {
    var r = Me(this.start, this.startControl, e), n = Me(this.startControl, this.endControl, e), i = Me(this.endControl, this.end, e), s = Me(r, n, e), o = Me(n, i, e), a = Me(s, o, e);
    return t ? new A(this.start, r, s, a) : new A(a, o, i, this.end);
  }, A.prototype.add = function(e, t) {
    return new A(this.start.add(e, t), this.startControl.add(e, t), this.endControl.add(e, t), this.end.add(e, t));
  }, A.prototype.reverse = function() {
    return new A(this.end, this.endControl, this.startControl, this.start);
  }, A;
}(), wA = function(A) {
  return A.type === 1;
}, h0 = function() {
  function A(e) {
    var t = e.styles, r = e.bounds, n = ke(t.borderTopLeftRadius, r.width, r.height), i = n[0], s = n[1], o = ke(t.borderTopRightRadius, r.width, r.height), a = o[0], B = o[1], g = ke(t.borderBottomRightRadius, r.width, r.height), c = g[0], l = g[1], M = ke(t.borderBottomLeftRadius, r.width, r.height), w = M[0], f = M[1], u = [];
    u.push((i + a) / r.width), u.push((w + c) / r.width), u.push((s + f) / r.height), u.push((B + l) / r.height);
    var C = Math.max.apply(Math, u);
    C > 1 && (i /= C, s /= C, a /= C, B /= C, c /= C, l /= C, w /= C, f /= C);
    var h = r.width - a, I = r.height - l, d = r.width - c, N = r.height - f, U = t.borderTopWidth, D = t.borderRightWidth, L = t.borderBottomWidth, y = t.borderLeftWidth, K = W(t.paddingTop, e.bounds.width), z = W(t.paddingRight, e.bounds.width), x = W(t.paddingBottom, e.bounds.width), v = W(t.paddingLeft, e.bounds.width);
    this.topLeftBorderDoubleOuterBox = i > 0 || s > 0 ? V(r.left + y / 3, r.top + U / 3, i - y / 3, s - U / 3, R.TOP_LEFT) : new E(r.left + y / 3, r.top + U / 3), this.topRightBorderDoubleOuterBox = i > 0 || s > 0 ? V(r.left + h, r.top + U / 3, a - D / 3, B - U / 3, R.TOP_RIGHT) : new E(r.left + r.width - D / 3, r.top + U / 3), this.bottomRightBorderDoubleOuterBox = c > 0 || l > 0 ? V(r.left + d, r.top + I, c - D / 3, l - L / 3, R.BOTTOM_RIGHT) : new E(r.left + r.width - D / 3, r.top + r.height - L / 3), this.bottomLeftBorderDoubleOuterBox = w > 0 || f > 0 ? V(r.left + y / 3, r.top + N, w - y / 3, f - L / 3, R.BOTTOM_LEFT) : new E(r.left + y / 3, r.top + r.height - L / 3), this.topLeftBorderDoubleInnerBox = i > 0 || s > 0 ? V(r.left + y * 2 / 3, r.top + U * 2 / 3, i - y * 2 / 3, s - U * 2 / 3, R.TOP_LEFT) : new E(r.left + y * 2 / 3, r.top + U * 2 / 3), this.topRightBorderDoubleInnerBox = i > 0 || s > 0 ? V(r.left + h, r.top + U * 2 / 3, a - D * 2 / 3, B - U * 2 / 3, R.TOP_RIGHT) : new E(r.left + r.width - D * 2 / 3, r.top + U * 2 / 3), this.bottomRightBorderDoubleInnerBox = c > 0 || l > 0 ? V(r.left + d, r.top + I, c - D * 2 / 3, l - L * 2 / 3, R.BOTTOM_RIGHT) : new E(r.left + r.width - D * 2 / 3, r.top + r.height - L * 2 / 3), this.bottomLeftBorderDoubleInnerBox = w > 0 || f > 0 ? V(r.left + y * 2 / 3, r.top + N, w - y * 2 / 3, f - L * 2 / 3, R.BOTTOM_LEFT) : new E(r.left + y * 2 / 3, r.top + r.height - L * 2 / 3), this.topLeftBorderStroke = i > 0 || s > 0 ? V(r.left + y / 2, r.top + U / 2, i - y / 2, s - U / 2, R.TOP_LEFT) : new E(r.left + y / 2, r.top + U / 2), this.topRightBorderStroke = i > 0 || s > 0 ? V(r.left + h, r.top + U / 2, a - D / 2, B - U / 2, R.TOP_RIGHT) : new E(r.left + r.width - D / 2, r.top + U / 2), this.bottomRightBorderStroke = c > 0 || l > 0 ? V(r.left + d, r.top + I, c - D / 2, l - L / 2, R.BOTTOM_RIGHT) : new E(r.left + r.width - D / 2, r.top + r.height - L / 2), this.bottomLeftBorderStroke = w > 0 || f > 0 ? V(r.left + y / 2, r.top + N, w - y / 2, f - L / 2, R.BOTTOM_LEFT) : new E(r.left + y / 2, r.top + r.height - L / 2), this.topLeftBorderBox = i > 0 || s > 0 ? V(r.left, r.top, i, s, R.TOP_LEFT) : new E(r.left, r.top), this.topRightBorderBox = a > 0 || B > 0 ? V(r.left + h, r.top, a, B, R.TOP_RIGHT) : new E(r.left + r.width, r.top), this.bottomRightBorderBox = c > 0 || l > 0 ? V(r.left + d, r.top + I, c, l, R.BOTTOM_RIGHT) : new E(r.left + r.width, r.top + r.height), this.bottomLeftBorderBox = w > 0 || f > 0 ? V(r.left, r.top + N, w, f, R.BOTTOM_LEFT) : new E(r.left, r.top + r.height), this.topLeftPaddingBox = i > 0 || s > 0 ? V(r.left + y, r.top + U, Math.max(0, i - y), Math.max(0, s - U), R.TOP_LEFT) : new E(r.left + y, r.top + U), this.topRightPaddingBox = a > 0 || B > 0 ? V(r.left + Math.min(h, r.width - D), r.top + U, h > r.width + D ? 0 : Math.max(0, a - D), Math.max(0, B - U), R.TOP_RIGHT) : new E(r.left + r.width - D, r.top + U), this.bottomRightPaddingBox = c > 0 || l > 0 ? V(r.left + Math.min(d, r.width - y), r.top + Math.min(I, r.height - L), Math.max(0, c - D), Math.max(0, l - L), R.BOTTOM_RIGHT) : new E(r.left + r.width - D, r.top + r.height - L), this.bottomLeftPaddingBox = w > 0 || f > 0 ? V(r.left + y, r.top + Math.min(N, r.height - L), Math.max(0, w - y), Math.max(0, f - L), R.BOTTOM_LEFT) : new E(r.left + y, r.top + r.height - L), this.topLeftContentBox = i > 0 || s > 0 ? V(r.left + y + v, r.top + U + K, Math.max(0, i - (y + v)), Math.max(0, s - (U + K)), R.TOP_LEFT) : new E(r.left + y + v, r.top + U + K), this.topRightContentBox = a > 0 || B > 0 ? V(r.left + Math.min(h, r.width + y + v), r.top + U + K, h > r.width + y + v ? 0 : a - y + v, B - (U + K), R.TOP_RIGHT) : new E(r.left + r.width - (D + z), r.top + U + K), this.bottomRightContentBox = c > 0 || l > 0 ? V(r.left + Math.min(d, r.width - (y + v)), r.top + Math.min(I, r.height + U + K), Math.max(0, c - (D + z)), l - (L + x), R.BOTTOM_RIGHT) : new E(r.left + r.width - (D + z), r.top + r.height - (L + x)), this.bottomLeftContentBox = w > 0 || f > 0 ? V(r.left + y + v, r.top + N, Math.max(0, w - (y + v)), f - (L + x), R.BOTTOM_LEFT) : new E(r.left + y + v, r.top + r.height - (L + x));
  }
  return A;
}(), R;
(function(A) {
  A[A.TOP_LEFT = 0] = "TOP_LEFT", A[A.TOP_RIGHT = 1] = "TOP_RIGHT", A[A.BOTTOM_RIGHT = 2] = "BOTTOM_RIGHT", A[A.BOTTOM_LEFT = 3] = "BOTTOM_LEFT";
})(R || (R = {}));
var V = function(A, e, t, r, n) {
  var i = 4 * ((Math.sqrt(2) - 1) / 3), s = t * i, o = r * i, a = A + t, B = e + r;
  switch (n) {
    case R.TOP_LEFT:
      return new Ht(new E(A, B), new E(A, B - o), new E(a - s, e), new E(a, e));
    case R.TOP_RIGHT:
      return new Ht(new E(A, e), new E(A + s, e), new E(a, B - o), new E(a, B));
    case R.BOTTOM_RIGHT:
      return new Ht(new E(a, e), new E(a, e + o), new E(A + s, B), new E(A, B));
    case R.BOTTOM_LEFT:
    default:
      return new Ht(new E(a, B), new E(a - s, B), new E(A, e + o), new E(A, e));
  }
}, ur = function(A) {
  return [A.topLeftBorderBox, A.topRightBorderBox, A.bottomRightBorderBox, A.bottomLeftBorderBox];
}, I0 = function(A) {
  return [
    A.topLeftContentBox,
    A.topRightContentBox,
    A.bottomRightContentBox,
    A.bottomLeftContentBox
  ];
}, wr = function(A) {
  return [
    A.topLeftPaddingBox,
    A.topRightPaddingBox,
    A.bottomRightPaddingBox,
    A.bottomLeftPaddingBox
  ];
}, d0 = function() {
  function A(e, t, r) {
    this.offsetX = e, this.offsetY = t, this.matrix = r, this.type = 0, this.target = 6;
  }
  return A;
}(), jt = function() {
  function A(e, t) {
    this.path = e, this.target = t, this.type = 1;
  }
  return A;
}(), N0 = function() {
  function A(e) {
    this.opacity = e, this.type = 2, this.target = 6;
  }
  return A;
}(), U0 = function(A) {
  return A.type === 0;
}, io = function(A) {
  return A.type === 1;
}, F0 = function(A) {
  return A.type === 2;
}, Cs = function(A, e) {
  return A.length === e.length ? A.some(function(t, r) {
    return t === e[r];
  }) : !1;
}, D0 = function(A, e, t, r, n) {
  return A.map(function(i, s) {
    switch (s) {
      case 0:
        return i.add(e, t);
      case 1:
        return i.add(e + r, t);
      case 2:
        return i.add(e + r, t + n);
      case 3:
        return i.add(e, t + n);
    }
    return i;
  });
}, so = function() {
  function A(e) {
    this.element = e, this.inlineLevel = [], this.nonInlineLevel = [], this.negativeZIndex = [], this.zeroOrAutoZIndexOrTransformedOrOpacity = [], this.positiveZIndex = [], this.nonPositionedFloats = [], this.nonPositionedInlineLevel = [];
  }
  return A;
}(), ao = function() {
  function A(e, t) {
    if (this.container = e, this.parent = t, this.effects = [], this.curves = new h0(this.container), this.container.styles.opacity < 1 && this.effects.push(new N0(this.container.styles.opacity)), this.container.styles.transform !== null) {
      var r = this.container.bounds.left + this.container.styles.transformOrigin[0].number, n = this.container.bounds.top + this.container.styles.transformOrigin[1].number, i = this.container.styles.transform;
      this.effects.push(new d0(r, n, i));
    }
    if (this.container.styles.overflowX !== 0) {
      var s = ur(this.curves), o = wr(this.curves);
      Cs(s, o) ? this.effects.push(new jt(s, 6)) : (this.effects.push(new jt(s, 2)), this.effects.push(new jt(o, 4)));
    }
  }
  return A.prototype.getEffects = function(e) {
    for (var t = [2, 3].indexOf(this.container.styles.position) === -1, r = this.parent, n = this.effects.slice(0); r; ) {
      var i = r.effects.filter(function(a) {
        return !io(a);
      });
      if (t || r.container.styles.position !== 0 || !r.parent) {
        if (n.unshift.apply(n, i), t = [2, 3].indexOf(r.container.styles.position) === -1, r.container.styles.overflowX !== 0) {
          var s = ur(r.curves), o = wr(r.curves);
          Cs(s, o) || n.unshift(new jt(o, 6));
        }
      } else
        n.unshift.apply(n, i);
      r = r.parent;
    }
    return n.filter(function(a) {
      return AA(a.target, e);
    });
  }, A;
}(), jn = function(A, e, t, r) {
  A.container.elements.forEach(function(n) {
    var i = AA(n.flags, 4), s = AA(n.flags, 2), o = new ao(n, A);
    AA(n.styles.display, 2048) && r.push(o);
    var a = AA(n.flags, 8) ? [] : r;
    if (i || s) {
      var B = i || n.styles.isPositioned() ? t : e, g = new so(o);
      if (n.styles.isPositioned() || n.styles.opacity < 1 || n.styles.isTransformed()) {
        var c = n.styles.zIndex.order;
        if (c < 0) {
          var l = 0;
          B.negativeZIndex.some(function(w, f) {
            return c > w.element.container.styles.zIndex.order ? (l = f, !1) : l > 0;
          }), B.negativeZIndex.splice(l, 0, g);
        } else if (c > 0) {
          var M = 0;
          B.positiveZIndex.some(function(w, f) {
            return c >= w.element.container.styles.zIndex.order ? (M = f + 1, !1) : M > 0;
          }), B.positiveZIndex.splice(M, 0, g);
        } else
          B.zeroOrAutoZIndexOrTransformedOrOpacity.push(g);
      } else
        n.styles.isFloating() ? B.nonPositionedFloats.push(g) : B.nonPositionedInlineLevel.push(g);
      jn(o, g, i ? g : t, a);
    } else
      n.styles.isInlineLevel() ? e.inlineLevel.push(o) : e.nonInlineLevel.push(o), jn(o, e, t, a);
    AA(n.flags, 8) && oo(n, a);
  });
}, oo = function(A, e) {
  for (var t = A instanceof zn ? A.start : 1, r = A instanceof zn ? A.reversed : !1, n = 0; n < e.length; n++) {
    var i = e[n];
    i.container instanceof Pa && typeof i.container.value == "number" && i.container.value !== 0 && (t = i.container.value), i.listValue = it(t, i.container.styles.listStyleType, !0), t += r ? -1 : 1;
  }
}, y0 = function(A) {
  var e = new ao(A, null), t = new so(e), r = [];
  return jn(e, t, t, r), oo(e.container, r), t;
}, Qs = function(A, e) {
  switch (e) {
    case 0:
      return MA(A.topLeftBorderBox, A.topLeftPaddingBox, A.topRightBorderBox, A.topRightPaddingBox);
    case 1:
      return MA(A.topRightBorderBox, A.topRightPaddingBox, A.bottomRightBorderBox, A.bottomRightPaddingBox);
    case 2:
      return MA(A.bottomRightBorderBox, A.bottomRightPaddingBox, A.bottomLeftBorderBox, A.bottomLeftPaddingBox);
    case 3:
    default:
      return MA(A.bottomLeftBorderBox, A.bottomLeftPaddingBox, A.topLeftBorderBox, A.topLeftPaddingBox);
  }
}, E0 = function(A, e) {
  switch (e) {
    case 0:
      return MA(A.topLeftBorderBox, A.topLeftBorderDoubleOuterBox, A.topRightBorderBox, A.topRightBorderDoubleOuterBox);
    case 1:
      return MA(A.topRightBorderBox, A.topRightBorderDoubleOuterBox, A.bottomRightBorderBox, A.bottomRightBorderDoubleOuterBox);
    case 2:
      return MA(A.bottomRightBorderBox, A.bottomRightBorderDoubleOuterBox, A.bottomLeftBorderBox, A.bottomLeftBorderDoubleOuterBox);
    case 3:
    default:
      return MA(A.bottomLeftBorderBox, A.bottomLeftBorderDoubleOuterBox, A.topLeftBorderBox, A.topLeftBorderDoubleOuterBox);
  }
}, p0 = function(A, e) {
  switch (e) {
    case 0:
      return MA(A.topLeftBorderDoubleInnerBox, A.topLeftPaddingBox, A.topRightBorderDoubleInnerBox, A.topRightPaddingBox);
    case 1:
      return MA(A.topRightBorderDoubleInnerBox, A.topRightPaddingBox, A.bottomRightBorderDoubleInnerBox, A.bottomRightPaddingBox);
    case 2:
      return MA(A.bottomRightBorderDoubleInnerBox, A.bottomRightPaddingBox, A.bottomLeftBorderDoubleInnerBox, A.bottomLeftPaddingBox);
    case 3:
    default:
      return MA(A.bottomLeftBorderDoubleInnerBox, A.bottomLeftPaddingBox, A.topLeftBorderDoubleInnerBox, A.topLeftPaddingBox);
  }
}, T0 = function(A, e) {
  switch (e) {
    case 0:
      return xt(A.topLeftBorderStroke, A.topRightBorderStroke);
    case 1:
      return xt(A.topRightBorderStroke, A.bottomRightBorderStroke);
    case 2:
      return xt(A.bottomRightBorderStroke, A.bottomLeftBorderStroke);
    case 3:
    default:
      return xt(A.bottomLeftBorderStroke, A.topLeftBorderStroke);
  }
}, xt = function(A, e) {
  var t = [];
  return wA(A) ? t.push(A.subdivide(0.5, !1)) : t.push(A), wA(e) ? t.push(e.subdivide(0.5, !0)) : t.push(e), t;
}, MA = function(A, e, t, r) {
  var n = [];
  return wA(A) ? n.push(A.subdivide(0.5, !1)) : n.push(A), wA(t) ? n.push(t.subdivide(0.5, !0)) : n.push(t), wA(r) ? n.push(r.subdivide(0.5, !0).reverse()) : n.push(r), wA(e) ? n.push(e.subdivide(0.5, !1).reverse()) : n.push(e), n;
}, Bo = function(A) {
  var e = A.bounds, t = A.styles;
  return e.add(t.borderLeftWidth, t.borderTopWidth, -(t.borderRightWidth + t.borderLeftWidth), -(t.borderTopWidth + t.borderBottomWidth));
}, fr = function(A) {
  var e = A.styles, t = A.bounds, r = W(e.paddingLeft, t.width), n = W(e.paddingRight, t.width), i = W(e.paddingTop, t.width), s = W(e.paddingBottom, t.width);
  return t.add(r + e.borderLeftWidth, i + e.borderTopWidth, -(e.borderRightWidth + e.borderLeftWidth + r + n), -(e.borderTopWidth + e.borderBottomWidth + i + s));
}, z0 = function(A, e) {
  return A === 0 ? e.bounds : A === 2 ? fr(e) : Bo(e);
}, L0 = function(A, e) {
  return A === 0 ? e.bounds : A === 2 ? fr(e) : Bo(e);
}, qr = function(A, e, t) {
  var r = z0(he(A.styles.backgroundOrigin, e), A), n = L0(he(A.styles.backgroundClip, e), A), i = m0(he(A.styles.backgroundSize, e), t, r), s = i[0], o = i[1], a = ke(he(A.styles.backgroundPosition, e), r.width - s, r.height - o), B = v0(he(A.styles.backgroundRepeat, e), a, i, r, n), g = Math.round(r.left + a[0]), c = Math.round(r.top + a[1]);
  return [B, g, c, s, o];
}, Ce = function(A) {
  return _(A) && A.value === De.AUTO;
}, Yt = function(A) {
  return typeof A == "number";
}, m0 = function(A, e, t) {
  var r = e[0], n = e[1], i = e[2], s = A[0], o = A[1];
  if (!s)
    return [0, 0];
  if (q(s) && o && q(o))
    return [W(s, t.width), W(o, t.height)];
  var a = Yt(i);
  if (_(s) && (s.value === De.CONTAIN || s.value === De.COVER)) {
    if (Yt(i)) {
      var B = t.width / t.height;
      return B < i != (s.value === De.COVER) ? [t.width, t.width / i] : [t.height * i, t.height];
    }
    return [t.width, t.height];
  }
  var g = Yt(r), c = Yt(n), l = g || c;
  if (Ce(s) && (!o || Ce(o))) {
    if (g && c)
      return [r, n];
    if (!a && !l)
      return [t.width, t.height];
    if (l && a) {
      var M = g ? r : n * i, w = c ? n : r / i;
      return [M, w];
    }
    var f = g ? r : t.width, u = c ? n : t.height;
    return [f, u];
  }
  if (a) {
    var C = 0, h = 0;
    return q(s) ? C = W(s, t.width) : q(o) && (h = W(o, t.height)), Ce(s) ? C = h * i : (!o || Ce(o)) && (h = C / i), [C, h];
  }
  var I = null, d = null;
  if (q(s) ? I = W(s, t.width) : o && q(o) && (d = W(o, t.height)), I !== null && (!o || Ce(o)) && (d = g && c ? I / r * n : t.height), d !== null && Ce(s) && (I = g && c ? d / n * r : t.width), I !== null && d !== null)
    return [I, d];
  throw new Error("Unable to calculate background-size for element");
}, he = function(A, e) {
  var t = A[e];
  return typeof t > "u" ? A[0] : t;
}, v0 = function(A, e, t, r, n) {
  var i = e[0], s = e[1], o = t[0], a = t[1];
  switch (A) {
    case 2:
      return [
        new E(Math.round(r.left), Math.round(r.top + s)),
        new E(Math.round(r.left + r.width), Math.round(r.top + s)),
        new E(Math.round(r.left + r.width), Math.round(a + r.top + s)),
        new E(Math.round(r.left), Math.round(a + r.top + s))
      ];
    case 3:
      return [
        new E(Math.round(r.left + i), Math.round(r.top)),
        new E(Math.round(r.left + i + o), Math.round(r.top)),
        new E(Math.round(r.left + i + o), Math.round(r.height + r.top)),
        new E(Math.round(r.left + i), Math.round(r.height + r.top))
      ];
    case 1:
      return [
        new E(Math.round(r.left + i), Math.round(r.top + s)),
        new E(Math.round(r.left + i + o), Math.round(r.top + s)),
        new E(Math.round(r.left + i + o), Math.round(r.top + s + a)),
        new E(Math.round(r.left + i), Math.round(r.top + s + a))
      ];
    default:
      return [
        new E(Math.round(n.left), Math.round(n.top)),
        new E(Math.round(n.left + n.width), Math.round(n.top)),
        new E(Math.round(n.left + n.width), Math.round(n.height + n.top)),
        new E(Math.round(n.left), Math.round(n.height + n.top))
      ];
  }
}, H0 = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7", hs = "Hidden Text", j0 = function() {
  function A(e) {
    this._data = {}, this._document = e;
  }
  return A.prototype.parseMetrics = function(e, t) {
    var r = this._document.createElement("div"), n = this._document.createElement("img"), i = this._document.createElement("span"), s = this._document.body;
    r.style.visibility = "hidden", r.style.fontFamily = e, r.style.fontSize = t, r.style.margin = "0", r.style.padding = "0", r.style.whiteSpace = "nowrap", s.appendChild(r), n.src = H0, n.width = 1, n.height = 1, n.style.margin = "0", n.style.padding = "0", n.style.verticalAlign = "baseline", i.style.fontFamily = e, i.style.fontSize = t, i.style.margin = "0", i.style.padding = "0", i.appendChild(this._document.createTextNode(hs)), r.appendChild(i), r.appendChild(n);
    var o = n.offsetTop - i.offsetTop + 2;
    r.removeChild(i), r.appendChild(this._document.createTextNode(hs)), r.style.lineHeight = "normal", n.style.verticalAlign = "super";
    var a = n.offsetTop - r.offsetTop + 2;
    return s.removeChild(r), { baseline: o, middle: a };
  }, A.prototype.getMetrics = function(e, t) {
    var r = e + " " + t;
    return typeof this._data[r] > "u" && (this._data[r] = this.parseMetrics(e, t)), this._data[r];
  }, A;
}(), go = function() {
  function A(e, t) {
    this.context = e, this.options = t;
  }
  return A;
}(), x0 = 1e4, Y0 = function(A) {
  dA(e, A);
  function e(t, r) {
    var n = A.call(this, t, r) || this;
    return n._activeEffects = [], n.canvas = r.canvas ? r.canvas : document.createElement("canvas"), n.ctx = n.canvas.getContext("2d"), r.canvas || (n.canvas.width = Math.floor(r.width * r.scale), n.canvas.height = Math.floor(r.height * r.scale), n.canvas.style.width = r.width + "px", n.canvas.style.height = r.height + "px"), n.fontMetrics = new j0(document), n.ctx.scale(n.options.scale, n.options.scale), n.ctx.translate(-r.x, -r.y), n.ctx.textBaseline = "bottom", n._activeEffects = [], n.context.logger.debug("Canvas renderer initialized (" + r.width + "x" + r.height + ") with scale " + r.scale), n;
  }
  return e.prototype.applyEffects = function(t) {
    for (var r = this; this._activeEffects.length; )
      this.popEffect();
    t.forEach(function(n) {
      return r.applyEffect(n);
    });
  }, e.prototype.applyEffect = function(t) {
    this.ctx.save(), F0(t) && (this.ctx.globalAlpha = t.opacity), U0(t) && (this.ctx.translate(t.offsetX, t.offsetY), this.ctx.transform(t.matrix[0], t.matrix[1], t.matrix[2], t.matrix[3], t.matrix[4], t.matrix[5]), this.ctx.translate(-t.offsetX, -t.offsetY)), io(t) && (this.path(t.path), this.ctx.clip()), this._activeEffects.push(t);
  }, e.prototype.popEffect = function() {
    this._activeEffects.pop(), this.ctx.restore();
  }, e.prototype.renderStack = function(t) {
    return oA(this, void 0, void 0, function() {
      var r;
      return nA(this, function(n) {
        switch (n.label) {
          case 0:
            return r = t.element.container.styles, r.isVisible() ? [4, this.renderStackContent(t)] : [3, 2];
          case 1:
            n.sent(), n.label = 2;
          case 2:
            return [2];
        }
      });
    });
  }, e.prototype.renderNode = function(t) {
    return oA(this, void 0, void 0, function() {
      return nA(this, function(r) {
        switch (r.label) {
          case 0:
            if (AA(t.container.flags, 16))
              debugger;
            return t.container.styles.isVisible() ? [4, this.renderNodeBackgroundAndBorders(t)] : [3, 3];
          case 1:
            return r.sent(), [4, this.renderNodeContent(t)];
          case 2:
            r.sent(), r.label = 3;
          case 3:
            return [2];
        }
      });
    });
  }, e.prototype.renderTextWithLetterSpacing = function(t, r, n) {
    var i = this;
    if (r === 0)
      this.ctx.fillText(t.text, t.bounds.left, t.bounds.top + n);
    else {
      var s = Xn(t.text);
      s.reduce(function(o, a) {
        return i.ctx.fillText(a, o, t.bounds.top + n), o + i.ctx.measureText(a).width;
      }, t.bounds.left);
    }
  }, e.prototype.createFontStyle = function(t) {
    var r = t.fontVariant.filter(function(s) {
      return s === "normal" || s === "small-caps";
    }).join(""), n = O0(t.fontFamily).join(", "), i = Bt(t.fontSize) ? "" + t.fontSize.number + t.fontSize.unit : t.fontSize.number + "px";
    return [
      [t.fontStyle, r, t.fontWeight, i, n].join(" "),
      n,
      i
    ];
  }, e.prototype.renderTextNode = function(t, r) {
    return oA(this, void 0, void 0, function() {
      var n, i, s, o, a, B, g, c, l = this;
      return nA(this, function(M) {
        return n = this.createFontStyle(r), i = n[0], s = n[1], o = n[2], this.ctx.font = i, this.ctx.direction = r.direction === 1 ? "rtl" : "ltr", this.ctx.textAlign = "left", this.ctx.textBaseline = "alphabetic", a = this.fontMetrics.getMetrics(s, o), B = a.baseline, g = a.middle, c = r.paintOrder, t.textBounds.forEach(function(w) {
          c.forEach(function(f) {
            switch (f) {
              case 0:
                l.ctx.fillStyle = eA(r.color), l.renderTextWithLetterSpacing(w, r.letterSpacing, B);
                var u = r.textShadow;
                u.length && w.text.trim().length && (u.slice(0).reverse().forEach(function(C) {
                  l.ctx.shadowColor = eA(C.color), l.ctx.shadowOffsetX = C.offsetX.number * l.options.scale, l.ctx.shadowOffsetY = C.offsetY.number * l.options.scale, l.ctx.shadowBlur = C.blur.number, l.renderTextWithLetterSpacing(w, r.letterSpacing, B);
                }), l.ctx.shadowColor = "", l.ctx.shadowOffsetX = 0, l.ctx.shadowOffsetY = 0, l.ctx.shadowBlur = 0), r.textDecorationLine.length && (l.ctx.fillStyle = eA(r.textDecorationColor || r.color), r.textDecorationLine.forEach(function(C) {
                  switch (C) {
                    case 1:
                      l.ctx.fillRect(w.bounds.left, Math.round(w.bounds.top + B), w.bounds.width, 1);
                      break;
                    case 2:
                      l.ctx.fillRect(w.bounds.left, Math.round(w.bounds.top), w.bounds.width, 1);
                      break;
                    case 3:
                      l.ctx.fillRect(w.bounds.left, Math.ceil(w.bounds.top + g), w.bounds.width, 1);
                      break;
                  }
                }));
                break;
              case 1:
                r.webkitTextStrokeWidth && w.text.trim().length && (l.ctx.strokeStyle = eA(r.webkitTextStrokeColor), l.ctx.lineWidth = r.webkitTextStrokeWidth, l.ctx.lineJoin = window.chrome ? "miter" : "round", l.ctx.strokeText(w.text, w.bounds.left, w.bounds.top + B)), l.ctx.strokeStyle = "", l.ctx.lineWidth = 0, l.ctx.lineJoin = "miter";
                break;
            }
          });
        }), [2];
      });
    });
  }, e.prototype.renderReplacedElement = function(t, r, n) {
    if (n && t.intrinsicWidth > 0 && t.intrinsicHeight > 0) {
      var i = fr(t), s = wr(r);
      this.path(s), this.ctx.save(), this.ctx.clip(), this.ctx.drawImage(n, 0, 0, t.intrinsicWidth, t.intrinsicHeight, i.left, i.top, i.width, i.height), this.ctx.restore();
    }
  }, e.prototype.renderNodeContent = function(t) {
    return oA(this, void 0, void 0, function() {
      var r, n, i, s, o, a, h, h, B, g, c, l, d, M, w, N, f, u, C, h, I, d, N;
      return nA(this, function(U) {
        switch (U.label) {
          case 0:
            this.applyEffects(t.getEffects(4)), r = t.container, n = t.curves, i = r.styles, s = 0, o = r.textNodes, U.label = 1;
          case 1:
            return s < o.length ? (a = o[s], [4, this.renderTextNode(a, i)]) : [3, 4];
          case 2:
            U.sent(), U.label = 3;
          case 3:
            return s++, [3, 1];
          case 4:
            if (!(r instanceof Oa))
              return [3, 8];
            U.label = 5;
          case 5:
            return U.trys.push([5, 7, , 8]), [4, this.context.cache.match(r.src)];
          case 6:
            return h = U.sent(), this.renderReplacedElement(r, n, h), [3, 8];
          case 7:
            return U.sent(), this.context.logger.error("Error loading image " + r.src), [3, 8];
          case 8:
            if (r instanceof Ra && this.renderReplacedElement(r, n, r.canvas), !(r instanceof ka))
              return [3, 12];
            U.label = 9;
          case 9:
            return U.trys.push([9, 11, , 12]), [4, this.context.cache.match(r.svg)];
          case 10:
            return h = U.sent(), this.renderReplacedElement(r, n, h), [3, 12];
          case 11:
            return U.sent(), this.context.logger.error("Error loading svg " + r.svg.substring(0, 255)), [3, 12];
          case 12:
            return r instanceof Wa && r.tree ? (B = new e(this.context, {
              scale: this.options.scale,
              backgroundColor: r.backgroundColor,
              x: 0,
              y: 0,
              width: r.width,
              height: r.height
            }), [4, B.render(r.tree)]) : [3, 14];
          case 13:
            g = U.sent(), r.width && r.height && this.ctx.drawImage(g, 0, 0, r.width, r.height, r.bounds.left, r.bounds.top, r.bounds.width, r.bounds.height), U.label = 14;
          case 14:
            if (r instanceof $n && (c = Math.min(r.bounds.width, r.bounds.height), r.type === Br ? r.checked && (this.ctx.save(), this.path([
              new E(r.bounds.left + c * 0.39363, r.bounds.top + c * 0.79),
              new E(r.bounds.left + c * 0.16, r.bounds.top + c * 0.5549),
              new E(r.bounds.left + c * 0.27347, r.bounds.top + c * 0.44071),
              new E(r.bounds.left + c * 0.39694, r.bounds.top + c * 0.5649),
              new E(r.bounds.left + c * 0.72983, r.bounds.top + c * 0.23),
              new E(r.bounds.left + c * 0.84, r.bounds.top + c * 0.34085),
              new E(r.bounds.left + c * 0.39363, r.bounds.top + c * 0.79)
            ]), this.ctx.fillStyle = eA(ss), this.ctx.fill(), this.ctx.restore()) : r.type === gr && r.checked && (this.ctx.save(), this.ctx.beginPath(), this.ctx.arc(r.bounds.left + c / 2, r.bounds.top + c / 2, c / 4, 0, Math.PI * 2, !0), this.ctx.fillStyle = eA(ss), this.ctx.fill(), this.ctx.restore())), S0(r) && r.value.length) {
              switch (l = this.createFontStyle(i), d = l[0], M = l[1], w = this.fontMetrics.getMetrics(d, M).baseline, this.ctx.font = d, this.ctx.fillStyle = eA(i.color), this.ctx.textBaseline = "alphabetic", this.ctx.textAlign = G0(r.styles.textAlign), N = fr(r), f = 0, r.styles.textAlign) {
                case 1:
                  f += N.width / 2;
                  break;
                case 2:
                  f += N.width;
                  break;
              }
              u = N.add(f, 0, 0, -N.height / 2 + 1), this.ctx.save(), this.path([
                new E(N.left, N.top),
                new E(N.left + N.width, N.top),
                new E(N.left + N.width, N.top + N.height),
                new E(N.left, N.top + N.height)
              ]), this.ctx.clip(), this.renderTextWithLetterSpacing(new Xe(r.value, u), i.letterSpacing, w), this.ctx.restore(), this.ctx.textBaseline = "alphabetic", this.ctx.textAlign = "left";
            }
            if (!AA(r.styles.display, 2048))
              return [3, 20];
            if (r.styles.listStyleImage === null)
              return [3, 19];
            if (C = r.styles.listStyleImage, C.type !== 0)
              return [3, 18];
            h = void 0, I = C.url, U.label = 15;
          case 15:
            return U.trys.push([15, 17, , 18]), [4, this.context.cache.match(I)];
          case 16:
            return h = U.sent(), this.ctx.drawImage(h, r.bounds.left - (h.width + 10), r.bounds.top), [3, 18];
          case 17:
            return U.sent(), this.context.logger.error("Error loading list-style-image " + I), [3, 18];
          case 18:
            return [3, 20];
          case 19:
            t.listValue && r.styles.listStyleType !== -1 && (d = this.createFontStyle(i)[0], this.ctx.font = d, this.ctx.fillStyle = eA(i.color), this.ctx.textBaseline = "middle", this.ctx.textAlign = "right", N = new xA(r.bounds.left, r.bounds.top + W(r.styles.paddingTop, r.bounds.width), r.bounds.width, Ri(i.lineHeight, i.fontSize.number) / 2 + 1), this.renderTextWithLetterSpacing(new Xe(t.listValue, N), i.letterSpacing, Ri(i.lineHeight, i.fontSize.number) / 2 + 2), this.ctx.textBaseline = "bottom", this.ctx.textAlign = "left"), U.label = 20;
          case 20:
            return [2];
        }
      });
    });
  }, e.prototype.renderStackContent = function(t) {
    return oA(this, void 0, void 0, function() {
      var r, n, C, i, s, C, o, a, C, B, g, C, c, l, C, M, w, C, f, u, C;
      return nA(this, function(h) {
        switch (h.label) {
          case 0:
            if (AA(t.element.container.flags, 16))
              debugger;
            return [4, this.renderNodeBackgroundAndBorders(t.element)];
          case 1:
            h.sent(), r = 0, n = t.negativeZIndex, h.label = 2;
          case 2:
            return r < n.length ? (C = n[r], [4, this.renderStack(C)]) : [3, 5];
          case 3:
            h.sent(), h.label = 4;
          case 4:
            return r++, [3, 2];
          case 5:
            return [4, this.renderNodeContent(t.element)];
          case 6:
            h.sent(), i = 0, s = t.nonInlineLevel, h.label = 7;
          case 7:
            return i < s.length ? (C = s[i], [4, this.renderNode(C)]) : [3, 10];
          case 8:
            h.sent(), h.label = 9;
          case 9:
            return i++, [3, 7];
          case 10:
            o = 0, a = t.nonPositionedFloats, h.label = 11;
          case 11:
            return o < a.length ? (C = a[o], [4, this.renderStack(C)]) : [3, 14];
          case 12:
            h.sent(), h.label = 13;
          case 13:
            return o++, [3, 11];
          case 14:
            B = 0, g = t.nonPositionedInlineLevel, h.label = 15;
          case 15:
            return B < g.length ? (C = g[B], [4, this.renderStack(C)]) : [3, 18];
          case 16:
            h.sent(), h.label = 17;
          case 17:
            return B++, [3, 15];
          case 18:
            c = 0, l = t.inlineLevel, h.label = 19;
          case 19:
            return c < l.length ? (C = l[c], [4, this.renderNode(C)]) : [3, 22];
          case 20:
            h.sent(), h.label = 21;
          case 21:
            return c++, [3, 19];
          case 22:
            M = 0, w = t.zeroOrAutoZIndexOrTransformedOrOpacity, h.label = 23;
          case 23:
            return M < w.length ? (C = w[M], [4, this.renderStack(C)]) : [3, 26];
          case 24:
            h.sent(), h.label = 25;
          case 25:
            return M++, [3, 23];
          case 26:
            f = 0, u = t.positiveZIndex, h.label = 27;
          case 27:
            return f < u.length ? (C = u[f], [4, this.renderStack(C)]) : [3, 30];
          case 28:
            h.sent(), h.label = 29;
          case 29:
            return f++, [3, 27];
          case 30:
            return [2];
        }
      });
    });
  }, e.prototype.mask = function(t) {
    this.ctx.beginPath(), this.ctx.moveTo(0, 0), this.ctx.lineTo(this.canvas.width, 0), this.ctx.lineTo(this.canvas.width, this.canvas.height), this.ctx.lineTo(0, this.canvas.height), this.ctx.lineTo(0, 0), this.formatPath(t.slice(0).reverse()), this.ctx.closePath();
  }, e.prototype.path = function(t) {
    this.ctx.beginPath(), this.formatPath(t), this.ctx.closePath();
  }, e.prototype.formatPath = function(t) {
    var r = this;
    t.forEach(function(n, i) {
      var s = wA(n) ? n.start : n;
      i === 0 ? r.ctx.moveTo(s.x, s.y) : r.ctx.lineTo(s.x, s.y), wA(n) && r.ctx.bezierCurveTo(n.startControl.x, n.startControl.y, n.endControl.x, n.endControl.y, n.end.x, n.end.y);
    });
  }, e.prototype.renderRepeat = function(t, r, n, i) {
    this.path(t), this.ctx.fillStyle = r, this.ctx.translate(n, i), this.ctx.fill(), this.ctx.translate(-n, -i);
  }, e.prototype.resizeImage = function(t, r, n) {
    var i;
    if (t.width === r && t.height === n)
      return t;
    var s = (i = this.canvas.ownerDocument) !== null && i !== void 0 ? i : document, o = s.createElement("canvas");
    o.width = Math.max(1, r), o.height = Math.max(1, n);
    var a = o.getContext("2d");
    return a.drawImage(t, 0, 0, t.width, t.height, 0, 0, r, n), o;
  }, e.prototype.renderBackgroundImage = function(t) {
    return oA(this, void 0, void 0, function() {
      var r, n, i, s, o, a;
      return nA(this, function(B) {
        switch (B.label) {
          case 0:
            r = t.styles.backgroundImage.length - 1, n = function(g) {
              var c, l, M, K, T, S, v, O, L, w, K, T, S, v, O, f, u, C, h, I, d, N, U, D, L, y, K, z, x, v, O, $, T, S, aA, P, YA, VA, JA, TA, XA, zA;
              return nA(this, function(ge) {
                switch (ge.label) {
                  case 0:
                    if (g.type !== 0)
                      return [3, 5];
                    c = void 0, l = g.url, ge.label = 1;
                  case 1:
                    return ge.trys.push([1, 3, , 4]), [4, i.context.cache.match(l)];
                  case 2:
                    return c = ge.sent(), [3, 4];
                  case 3:
                    return ge.sent(), i.context.logger.error("Error loading background-image " + l), [3, 4];
                  case 4:
                    return c && (M = qr(t, r, [
                      c.width,
                      c.height,
                      c.width / c.height
                    ]), K = M[0], T = M[1], S = M[2], v = M[3], O = M[4], L = i.ctx.createPattern(i.resizeImage(c, v, O), "repeat"), i.renderRepeat(K, L, T, S)), [3, 6];
                  case 5:
                    Nw(g) ? (w = qr(t, r, [null, null, null]), K = w[0], T = w[1], S = w[2], v = w[3], O = w[4], f = Cw(g.angle, v, O), u = f[0], C = f[1], h = f[2], I = f[3], d = f[4], N = document.createElement("canvas"), N.width = v, N.height = O, U = N.getContext("2d"), D = U.createLinearGradient(C, I, h, d), Ki(g.stops, u).forEach(function(me) {
                      return D.addColorStop(me.stop, eA(me.color));
                    }), U.fillStyle = D, U.fillRect(0, 0, v, O), v > 0 && O > 0 && (L = i.ctx.createPattern(N, "repeat"), i.renderRepeat(K, L, T, S))) : Uw(g) && (y = qr(t, r, [
                      null,
                      null,
                      null
                    ]), K = y[0], z = y[1], x = y[2], v = y[3], O = y[4], $ = g.position.length === 0 ? [Wn] : g.position, T = W($[0], v), S = W($[$.length - 1], O), aA = Qw(g, T, S, v, O), P = aA[0], YA = aA[1], P > 0 && YA > 0 && (VA = i.ctx.createRadialGradient(z + T, x + S, 0, z + T, x + S, P), Ki(g.stops, P * 2).forEach(function(me) {
                      return VA.addColorStop(me.stop, eA(me.color));
                    }), i.path(K), i.ctx.fillStyle = VA, P !== YA ? (JA = t.bounds.left + 0.5 * t.bounds.width, TA = t.bounds.top + 0.5 * t.bounds.height, XA = YA / P, zA = 1 / XA, i.ctx.save(), i.ctx.translate(JA, TA), i.ctx.transform(1, 0, 0, XA, 0, 0), i.ctx.translate(-JA, -TA), i.ctx.fillRect(z, zA * (x - TA) + TA, v, O * zA), i.ctx.restore()) : i.ctx.fill())), ge.label = 6;
                  case 6:
                    return r--, [2];
                }
              });
            }, i = this, s = 0, o = t.styles.backgroundImage.slice(0).reverse(), B.label = 1;
          case 1:
            return s < o.length ? (a = o[s], [5, n(a)]) : [3, 4];
          case 2:
            B.sent(), B.label = 3;
          case 3:
            return s++, [3, 1];
          case 4:
            return [2];
        }
      });
    });
  }, e.prototype.renderSolidBorder = function(t, r, n) {
    return oA(this, void 0, void 0, function() {
      return nA(this, function(i) {
        return this.path(Qs(n, r)), this.ctx.fillStyle = eA(t), this.ctx.fill(), [2];
      });
    });
  }, e.prototype.renderDoubleBorder = function(t, r, n, i) {
    return oA(this, void 0, void 0, function() {
      var s, o;
      return nA(this, function(a) {
        switch (a.label) {
          case 0:
            return r < 3 ? [4, this.renderSolidBorder(t, n, i)] : [3, 2];
          case 1:
            return a.sent(), [2];
          case 2:
            return s = E0(i, n), this.path(s), this.ctx.fillStyle = eA(t), this.ctx.fill(), o = p0(i, n), this.path(o), this.ctx.fill(), [2];
        }
      });
    });
  }, e.prototype.renderNodeBackgroundAndBorders = function(t) {
    return oA(this, void 0, void 0, function() {
      var r, n, i, s, o, a, B, g, c = this;
      return nA(this, function(l) {
        switch (l.label) {
          case 0:
            return this.applyEffects(t.getEffects(2)), r = t.container.styles, n = !ZA(r.backgroundColor) || r.backgroundImage.length, i = [
              { style: r.borderTopStyle, color: r.borderTopColor, width: r.borderTopWidth },
              { style: r.borderRightStyle, color: r.borderRightColor, width: r.borderRightWidth },
              { style: r.borderBottomStyle, color: r.borderBottomColor, width: r.borderBottomWidth },
              { style: r.borderLeftStyle, color: r.borderLeftColor, width: r.borderLeftWidth }
            ], s = b0(he(r.backgroundClip, 0), t.curves), n || r.boxShadow.length ? (this.ctx.save(), this.path(s), this.ctx.clip(), ZA(r.backgroundColor) || (this.ctx.fillStyle = eA(r.backgroundColor), this.ctx.fill()), [4, this.renderBackgroundImage(t.container)]) : [3, 2];
          case 1:
            l.sent(), this.ctx.restore(), r.boxShadow.slice(0).reverse().forEach(function(M) {
              c.ctx.save();
              var w = ur(t.curves), f = M.inset ? 0 : x0, u = D0(w, -f + (M.inset ? 1 : -1) * M.spread.number, (M.inset ? 1 : -1) * M.spread.number, M.spread.number * (M.inset ? -2 : 2), M.spread.number * (M.inset ? -2 : 2));
              M.inset ? (c.path(w), c.ctx.clip(), c.mask(u)) : (c.mask(w), c.ctx.clip(), c.path(u)), c.ctx.shadowOffsetX = M.offsetX.number + f, c.ctx.shadowOffsetY = M.offsetY.number, c.ctx.shadowColor = eA(M.color), c.ctx.shadowBlur = M.blur.number, c.ctx.fillStyle = M.inset ? eA(M.color) : "rgba(0,0,0,1)", c.ctx.fill(), c.ctx.restore();
            }), l.label = 2;
          case 2:
            o = 0, a = 0, B = i, l.label = 3;
          case 3:
            return a < B.length ? (g = B[a], g.style !== 0 && !ZA(g.color) && g.width > 0 ? g.style !== 2 ? [3, 5] : [4, this.renderDashedDottedBorder(g.color, g.width, o, t.curves, 2)] : [3, 11]) : [3, 13];
          case 4:
            return l.sent(), [3, 11];
          case 5:
            return g.style !== 3 ? [3, 7] : [4, this.renderDashedDottedBorder(g.color, g.width, o, t.curves, 3)];
          case 6:
            return l.sent(), [3, 11];
          case 7:
            return g.style !== 4 ? [3, 9] : [4, this.renderDoubleBorder(g.color, g.width, o, t.curves)];
          case 8:
            return l.sent(), [3, 11];
          case 9:
            return [4, this.renderSolidBorder(g.color, o, t.curves)];
          case 10:
            l.sent(), l.label = 11;
          case 11:
            o++, l.label = 12;
          case 12:
            return a++, [3, 3];
          case 13:
            return [2];
        }
      });
    });
  }, e.prototype.renderDashedDottedBorder = function(t, r, n, i, s) {
    return oA(this, void 0, void 0, function() {
      var o, a, B, g, c, l, M, w, f, u, C, h, I, d, N, U, N, U;
      return nA(this, function(D) {
        return this.ctx.save(), o = T0(i, n), a = Qs(i, n), s === 2 && (this.path(a), this.ctx.clip()), wA(a[0]) ? (B = a[0].start.x, g = a[0].start.y) : (B = a[0].x, g = a[0].y), wA(a[1]) ? (c = a[1].end.x, l = a[1].end.y) : (c = a[1].x, l = a[1].y), n === 0 || n === 2 ? M = Math.abs(B - c) : M = Math.abs(g - l), this.ctx.beginPath(), s === 3 ? this.formatPath(o) : this.formatPath(a.slice(0, 2)), w = r < 3 ? r * 3 : r * 2, f = r < 3 ? r * 2 : r, s === 3 && (w = r, f = r), u = !0, M <= w * 2 ? u = !1 : M <= w * 2 + f ? (C = M / (2 * w + f), w *= C, f *= C) : (h = Math.floor((M + f) / (w + f)), I = (M - h * w) / (h - 1), d = (M - (h + 1) * w) / h, f = d <= 0 || Math.abs(f - I) < Math.abs(f - d) ? I : d), u && (s === 3 ? this.ctx.setLineDash([0, w + f]) : this.ctx.setLineDash([w, f])), s === 3 ? (this.ctx.lineCap = "round", this.ctx.lineWidth = r) : this.ctx.lineWidth = r * 2 + 1.1, this.ctx.strokeStyle = eA(t), this.ctx.stroke(), this.ctx.setLineDash([]), s === 2 && (wA(a[0]) && (N = a[3], U = a[0], this.ctx.beginPath(), this.formatPath([new E(N.end.x, N.end.y), new E(U.start.x, U.start.y)]), this.ctx.stroke()), wA(a[1]) && (N = a[1], U = a[2], this.ctx.beginPath(), this.formatPath([new E(N.end.x, N.end.y), new E(U.start.x, U.start.y)]), this.ctx.stroke())), this.ctx.restore(), [2];
      });
    });
  }, e.prototype.render = function(t) {
    return oA(this, void 0, void 0, function() {
      var r;
      return nA(this, function(n) {
        switch (n.label) {
          case 0:
            return this.options.backgroundColor && (this.ctx.fillStyle = eA(this.options.backgroundColor), this.ctx.fillRect(this.options.x, this.options.y, this.options.width, this.options.height)), r = y0(t), [4, this.renderStack(r)];
          case 1:
            return n.sent(), this.applyEffects([]), [2, this.canvas];
        }
      });
    });
  }, e;
}(go), S0 = function(A) {
  return A instanceof Za || A instanceof _a ? !0 : A instanceof $n && A.type !== gr && A.type !== Br;
}, b0 = function(A, e) {
  switch (A) {
    case 0:
      return ur(e);
    case 2:
      return I0(e);
    case 1:
    default:
      return wr(e);
  }
}, G0 = function(A) {
  switch (A) {
    case 1:
      return "center";
    case 2:
      return "right";
    case 0:
    default:
      return "left";
  }
}, K0 = ["-apple-system", "system-ui"], O0 = function(A) {
  return /iPhone OS 15_(0|1)/.test(window.navigator.userAgent) ? A.filter(function(e) {
    return K0.indexOf(e) === -1;
  }) : A;
}, R0 = function(A) {
  dA(e, A);
  function e(t, r) {
    var n = A.call(this, t, r) || this;
    return n.canvas = r.canvas ? r.canvas : document.createElement("canvas"), n.ctx = n.canvas.getContext("2d"), n.options = r, n.canvas.width = Math.floor(r.width * r.scale), n.canvas.height = Math.floor(r.height * r.scale), n.canvas.style.width = r.width + "px", n.canvas.style.height = r.height + "px", n.ctx.scale(n.options.scale, n.options.scale), n.ctx.translate(-r.x, -r.y), n.context.logger.debug("EXPERIMENTAL ForeignObject renderer initialized (" + r.width + "x" + r.height + " at " + r.x + "," + r.y + ") with scale " + r.scale), n;
  }
  return e.prototype.render = function(t) {
    return oA(this, void 0, void 0, function() {
      var r, n;
      return nA(this, function(i) {
        switch (i.label) {
          case 0:
            return r = Tn(this.options.width * this.options.scale, this.options.height * this.options.scale, this.options.scale, this.options.scale, t), [4, k0(r)];
          case 1:
            return n = i.sent(), this.options.backgroundColor && (this.ctx.fillStyle = eA(this.options.backgroundColor), this.ctx.fillRect(0, 0, this.options.width * this.options.scale, this.options.height * this.options.scale)), this.ctx.drawImage(n, -this.options.x * this.options.scale, -this.options.y * this.options.scale), [2, this.canvas];
        }
      });
    });
  }, e;
}(go), k0 = function(A) {
  return new Promise(function(e, t) {
    var r = new Image();
    r.onload = function() {
      e(r);
    }, r.onerror = t, r.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(new XMLSerializer().serializeToString(A));
  });
}, P0 = function() {
  function A(e) {
    var t = e.id, r = e.enabled;
    this.id = t, this.enabled = r, this.start = Date.now();
  }
  return A.prototype.debug = function() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e[t] = arguments[t];
    this.enabled && (typeof window < "u" && window.console && typeof console.debug == "function" ? console.debug.apply(console, ft([this.id, this.getTime() + "ms"], e)) : this.info.apply(this, e));
  }, A.prototype.getTime = function() {
    return Date.now() - this.start;
  }, A.prototype.info = function() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e[t] = arguments[t];
    this.enabled && typeof window < "u" && window.console && typeof console.info == "function" && console.info.apply(console, ft([this.id, this.getTime() + "ms"], e));
  }, A.prototype.warn = function() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e[t] = arguments[t];
    this.enabled && (typeof window < "u" && window.console && typeof console.warn == "function" ? console.warn.apply(console, ft([this.id, this.getTime() + "ms"], e)) : this.info.apply(this, e));
  }, A.prototype.error = function() {
    for (var e = [], t = 0; t < arguments.length; t++)
      e[t] = arguments[t];
    this.enabled && (typeof window < "u" && window.console && typeof console.error == "function" ? console.error.apply(console, ft([this.id, this.getTime() + "ms"], e)) : this.info.apply(this, e));
  }, A.instances = {}, A;
}(), _0 = function() {
  function A(e, t) {
    var r;
    this.windowBounds = t, this.instanceName = "#" + A.instanceCount++, this.logger = new P0({ id: this.instanceName, enabled: e.logging }), this.cache = (r = e.cache) !== null && r !== void 0 ? r : new l0(this, e);
  }
  return A.instanceCount = 1, A;
}(), Is = function(A, e) {
  return e === void 0 && (e = {}), Z0(A, e);
};
typeof window < "u" && no.setContext(window);
var Z0 = function(A, e) {
  return oA(void 0, void 0, void 0, function() {
    var t, r, n, i, s, o, a, B, g, c, l, M, w, f, u, C, h, I, d, N, D, U, D, L, y, K, z, x, v, O, $, T, S, aA, P, YA, VA, JA, TA, XA;
    return nA(this, function(zA) {
      switch (zA.label) {
        case 0:
          if (!A || typeof A != "object")
            return [2, Promise.reject("Invalid element provided as first argument")];
          if (t = A.ownerDocument, !t)
            throw new Error("Element is not attached to a Document");
          if (r = t.defaultView, !r)
            throw new Error("Document is not attached to a Window");
          return n = {
            allowTaint: (L = e.allowTaint) !== null && L !== void 0 ? L : !1,
            imageTimeout: (y = e.imageTimeout) !== null && y !== void 0 ? y : 15e3,
            proxy: e.proxy,
            useCORS: (K = e.useCORS) !== null && K !== void 0 ? K : !1
          }, i = wn({ logging: (z = e.logging) !== null && z !== void 0 ? z : !0, cache: e.cache }, n), s = {
            windowWidth: (x = e.windowWidth) !== null && x !== void 0 ? x : r.innerWidth,
            windowHeight: (v = e.windowHeight) !== null && v !== void 0 ? v : r.innerHeight,
            scrollX: (O = e.scrollX) !== null && O !== void 0 ? O : r.pageXOffset,
            scrollY: ($ = e.scrollY) !== null && $ !== void 0 ? $ : r.pageYOffset
          }, o = new xA(s.scrollX, s.scrollY, s.windowWidth, s.windowHeight), a = new _0(i, o), B = (T = e.foreignObjectRendering) !== null && T !== void 0 ? T : !1, g = {
            allowTaint: (S = e.allowTaint) !== null && S !== void 0 ? S : !1,
            onclone: e.onclone,
            ignoreElements: e.ignoreElements,
            inlineImages: B,
            copyStyles: B
          }, a.logger.debug("Starting document clone with size " + o.width + "x" + o.height + " scrolled to " + -o.left + "," + -o.top), c = new fs(a, A, g), l = c.clonedReferenceElement, l ? [4, c.toIFrame(t, o)] : [2, Promise.reject("Unable to find element in cloned iframe")];
        case 1:
          return M = zA.sent(), w = qn(l) || VM(l) ? Fl(l.ownerDocument) : hr(a, l), f = w.width, u = w.height, C = w.left, h = w.top, I = W0(a, l, e.backgroundColor), d = {
            canvas: e.canvas,
            backgroundColor: I,
            scale: (P = (aA = e.scale) !== null && aA !== void 0 ? aA : r.devicePixelRatio) !== null && P !== void 0 ? P : 1,
            x: ((YA = e.x) !== null && YA !== void 0 ? YA : 0) + C,
            y: ((VA = e.y) !== null && VA !== void 0 ? VA : 0) + h,
            width: (JA = e.width) !== null && JA !== void 0 ? JA : Math.ceil(f),
            height: (TA = e.height) !== null && TA !== void 0 ? TA : Math.ceil(u)
          }, B ? (a.logger.debug("Document cloned, using foreign object rendering"), D = new R0(a, d), [4, D.render(l)]) : [3, 3];
        case 2:
          return N = zA.sent(), [3, 5];
        case 3:
          return a.logger.debug("Document cloned, element located at " + C + "," + h + " with size " + f + "x" + u + " using computed rendering"), a.logger.debug("Starting DOM parsing"), U = Ja(a, l), I === U.styles.backgroundColor && (U.styles.backgroundColor = HA.TRANSPARENT), a.logger.debug("Starting renderer for element at " + d.x + "," + d.y + " with size " + d.width + "x" + d.height), D = new Y0(a, d), [4, D.render(U)];
        case 4:
          N = zA.sent(), zA.label = 5;
        case 5:
          return (!((XA = e.removeContainer) !== null && XA !== void 0) || XA) && (fs.destroy(M) || a.logger.error("Cannot detach cloned iframe as it is not in the DOM anymore")), a.logger.debug("Finished rendering"), [2, N];
      }
    });
  });
}, W0 = function(A, e, t) {
  var r = e.ownerDocument, n = r.documentElement ? Ve(A, getComputedStyle(r.documentElement).backgroundColor) : HA.TRANSPARENT, i = r.body ? Ve(A, getComputedStyle(r.body).backgroundColor) : HA.TRANSPARENT, s = typeof t == "string" ? Ve(A, t) : t === null ? HA.TRANSPARENT : 4294967295;
  return e === r.documentElement ? ZA(n) ? ZA(i) ? s : i : n : s;
};
const V0 = [
  {
    name: "fengGeQi",
    fillWidth: 3,
    labelPosition: "middle",
    height: 0.5,
    base64: "data:image/svg+xml;base64,PHN2ZyB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBjb250ZW50U2NyaXB0VHlwZT0idGV4dC9lY21hc2NyaXB0IiB3aWR0aD0iMTAyNCIgem9vbUFuZFBhbj0ibWFnbmlmeSIgY29udGVudFN0eWxlVHlwZT0idGV4dC9jc3MiIHZpZXdCb3g9IjAgMjA0IDM0MSA2MTQiIGhlaWdodD0iMTAyNCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSIgdmVyc2lvbj0iMS4wIj4NCg0KDQoNCgk8cGF0aCBkPSJNMCAyMDQuOGgzNDEuMzMzMzMzdjYxNC40SDB6Ii8+DQoJPHBhdGggZD0iTTE3MC42NjY2NjcgNTI1LjA3MzA2N0wzMDcuMiA3ODUuMDY2NjY3SDM0LjEzMzMzM3pNMTcwLjY2NjY2NyA0OTcuMzkwOTMzTDM0LjEzMzMzMyAyMzguOTMzMzMzaDI3My4wNjY2Njd6TTE4My43NzM4NjcgNTEyLjc4NTA2N0wzMDcuMiAyNzMuMDY2NjY3djQ3Ny44NjY2NjZ6TTE1Ny41OTM2IDUwOS42Nzg5MzNMMzQuMTMzMzMzIDI3My4wNjY2Njd2NDc3Ljg2NjY2NnoiIGZpbGw9IiNGRkZGRkYiLz4NCg0KDQo8L3N2Zz4="
  },
  {
    name: "guanXie",
    fillWidth: 0,
    labelPosition: "bottom",
    height: 0.5,
    base64: "data:image/svg+xml;base64,PHN2ZyBjb250ZW50U2NyaXB0VHlwZT0idGV4dC9lY21hc2NyaXB0IiB3aWR0aD0iMTAyNCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHpvb21BbmRQYW49Im1hZ25pZnkiIGNvbnRlbnRTdHlsZVR5cGU9InRleHQvY3NzIiB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiBoZWlnaHQ9IjEwMjQiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4wIj4NCgk8cGF0aCBkPSJNMCAwaDEwMjR2MTAyNEgweiIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik0wIDBoMTAyNHYxMDI0SDB6Ij48L3BhdGg+DQoJPHBhdGggZD0iTTM0LjEzMzMzMyAzNC4xMzMzMzNsMzA3LjMwMjQtMC4xNzA2NjYtMzA2Ljg1ODY2NiA5NTYuMDQwNTMzek05ODkuOTAwOCAzNC4zMDRMNjgyLjY2NjY2NyAzNC4xMzMzMzNsMzA2Ljc5MDQgOTU2LjAwNjR6TTM3My4zNTA0IDM2LjI4MzczM2gyNjIuNDE3MDY3TTcyLjUzMzMzMyA5ODMuNDgzNzMzaDg4MS4wODM3MzRNMzc1LjQ2NjY2NyAzNC4xMzMzMzNoMjczLjA2NjY2NmwzMDcuMiA5NTUuNzMzMzM0SDY4LjI2NjY2N3oiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4NCjwvc3ZnPg=="
  },
  {
    name: "qiuZuo",
    fillWidth: 2,
    labelPosition: "bottom",
    height: 0.5,
    base64: "data:image/svg+xml;base64,PHN2ZyBjb250ZW50U2NyaXB0VHlwZT0idGV4dC9lY21hc2NyaXB0IiB3aWR0aD0iMTMwMCIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHhtbG5zOnN2Zz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHpvb21BbmRQYW49Im1hZ25pZnkiIGNvbnRlbnRTdHlsZVR5cGU9InRleHQvY3NzIiB2aWV3Qm94PSI2MyAwIDEyMzMgOTIwIiBoZWlnaHQ9IjEwMjQiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmVyc2lvbj0iMS4wIj4NCiANCiAgPGc+DQogIA0KCTxwYXRoIGQ9Ik02My45OTk5OTk5OSAwaDEyMzIuMjUwMzAxdjkyNC4xODc3MjZINjMuOTk5OTk5OTl6IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+DQoJPHBhdGggZD0iTTYzLjk5OTk5OTk5IDBtOTIuNDE4NzczIDBsMTA0Ny40MTI3NTUgMHE5Mi40MTg3NzMgMCA5Mi40MTg3NzMgOTIuNDE4NzczbDAgNzM5LjM1MDE4cTAgOTIuNDE4NzczLTkyLjQxODc3MyA5Mi40MTg3NzNsLTEwNDcuNDEyNzU1IDBxLTkyLjQxODc3MyAwLTkyLjQxODc3My05Mi40MTg3NzNsMC03MzkuMzUwMThxMC05Mi40MTg3NzMgOTIuNDE4NzczLTkyLjQxODc3M1oiPjwvcGF0aD4NCgk8cGF0aCBkPSJNOTQuODA2MjU3OTkgMzAuODA2MjU4bTYxLjYxMjUxNSAwbDEwNDcuNDEyNzU1IDBxNjEuNjEyNTE1IDAgNjEuNjEyNTE1IDYxLjYxMjUxNWwwIDczOS4zNTAxOHEwIDYxLjYxMjUxNS02MS42MTI1MTUgNjEuNjEyNTE1bC0xMDQ3LjQxMjc1NSAwcS02MS42MTI1MTUgMC02MS42MTI1MTUtNjEuNjEyNTE1bDAtNzM5LjM1MDE4cTAtNjEuNjEyNTE1IDYxLjYxMjUxNS02MS42MTI1MTVaIiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+DQoJPHBhdGggZD0iTTY4MC4xMjUxNDk5OSA0NjIuMDkzODYzbS0yMTUuNjQzODAyIDBhMjE1LjY0MzgwMyAyMTUuNjQzODAzIDAgMSAwIDQzMS4yODc2MDUgMCAyMTUuNjQzODAzIDIxNS42NDM4MDMgMCAxIDAtNDMxLjI4NzYwNSAwWiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik02ODAuMTI1MTQ5OTkgNDYyLjA5Mzg2M20tMTg0LjgzNzU0NSAwYTE4NC44Mzc1NDUgMTg0LjgzNzU0NSAwIDEgMCAzNjkuNjc1MDkxIDAgMTg0LjgzNzU0NSAxODQuODM3NTQ1IDAgMSAwLTM2OS42NzUwOTEgMFoiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4NCg0KIDwvZz4NCjwvc3ZnPg=="
  },
  {
    name: "shaiGuan",
    fillWidth: 0,
    labelPosition: "bottom",
    height: 0.5,
    base64: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iNjk0cHgiIGhlaWdodD0iMTAyNHB4IiB2aWV3Qm94PSIwIDAgNjk0IDEwMjQiIHZlcnNpb249IjEuMSIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+c2hhaUd1YW48L3RpdGxlPgogICAgPGcgaWQ9Iumhtemdoi0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0ic2hhaUd1YW4iPgogICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2iIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMTYiIGZpbGw9IiNGRkZGRkYiIHg9IjgiIHk9IjgiIHdpZHRoPSI2NzgiIGhlaWdodD0iMTAwOCIgcng9IjYyIj48L3JlY3Q+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik02MzIsMCBDNjY2LjI0MTY1NCwwIDY5NCwyNy43NTgzNDU1IDY5NCw2MiBMNjk0LDk2MiBDNjk0LDk5Ni4yNDE2NTQgNjY2LjI0MTY1NCwxMDI0IDYzMiwxMDI0IEw2MiwxMDI0IEMyNy43NTgzNDU1LDEwMjQgMCw5OTYuMjQxNjU0IDAsOTYyIEwwLDYyIEMwLDI3Ljc1ODM0NTUgMjcuNzU4MzQ1NSwwIDYyLDAgTDYzMiwwIFogTTYzMiwxNiBMNjIsMTYgQzM2Ljg0ODk1MjUsMTYgMTYuNDEyMzc5LDM2LjE4NTA2MyAxNiw2MS4yMzkzMDU5IEwxNiw2MiBMMTYsOTYyIEMxNiw5ODcuMTUxMDQ4IDM2LjE4NTA2MywxMDA3LjU4NzYyIDYxLjIzOTMwNTksMTAwOCBMNjIsMTAwOCBMNjMyLDEwMDggQzY1Ny4xNTEwNDgsMTAwOCA2NzcuNTg3NjIxLDk4Ny44MTQ5MzcgNjc4LDk2Mi43NjA2OTQgTDY3OCw5NjIgTDY3OCw2MiBDNjc4LDM2Ljg0ODk1MjUgNjU3LjgxNDkzNywxNi40MTIzNzkgNjMyLjc2MDY5NCwxNiBMNjMyLDE2IFoiIGlkPSLnn6nlvaIiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPgogICAgICAgICAgICA8ZyBpZD0i57yW57uELTE4IiB0cmFuc2Zvcm09InRyYW5zbGF0ZSg4Ni4wMDAwMDAsIDk5LjAwMDAwMCkiIGZpbGw9IiMwMDAwMDAiIGZpbGwtcnVsZT0ibm9uemVybyI+CiAgICAgICAgICAgICAgICA8ZyBpZD0i57yW57uELTEzIj4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNMTE5LDAgQzE4NC43MjE4ODUsMCAyMzgsNTMuMjc4MTE0OCAyMzgsMTE5IEMyMzgsMTg0LjcyMTg4NSAxODQuNzIxODg1LDIzOCAxMTksMjM4IEM1My4yNzgxMTQ4LDIzOCAwLDE4NC43MjE4ODUgMCwxMTkgQzAsNTMuMjc4MTE0OCA1My4yNzgxMTQ4LDAgMTE5LDAgWiBNMTE5LDE2IEM2Mi4xMTQ2NzA4LDE2IDE2LDYyLjExNDY3MDggMTYsMTE5IEMxNiwxNzUuODg1MzI5IDYyLjExNDY3MDgsMjIyIDExOSwyMjIgQzE3NS44ODUzMjksMjIyIDIyMiwxNzUuODg1MzI5IDIyMiwxMTkgQzIyMiw2Mi4xMTQ2NzA4IDE3NS44ODUzMjksMTYgMTE5LDE2IFoiIGlkPSLmpK3lnIblvaIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNDAzLDAgQzQ2OC43MjE4ODUsMCA1MjIsNTMuMjc4MTE0OCA1MjIsMTE5IEM1MjIsMTg0LjcyMTg4NSA0NjguNzIxODg1LDIzOCA0MDMsMjM4IEMzMzcuMjc4MTE1LDIzOCAyODQsMTg0LjcyMTg4NSAyODQsMTE5IEMyODQsNTMuMjc4MTE0OCAzMzcuMjc4MTE1LDAgNDAzLDAgWiBNNDAzLDE2IEMzNDYuMTE0NjcxLDE2IDMwMCw2Mi4xMTQ2NzA4IDMwMCwxMTkgQzMwMCwxNzUuODg1MzI5IDM0Ni4xMTQ2NzEsMjIyIDQwMywyMjIgQzQ1OS44ODUzMjksMjIyIDUwNiwxNzUuODg1MzI5IDUwNiwxMTkgQzUwNiw2Mi4xMTQ2NzA4IDQ1OS44ODUzMjksMTYgNDAzLDE2IFoiIGlkPSLmpK3lnIblvaLlpIfku70iPjwvcGF0aD4KICAgICAgICAgICAgICAgIDwvZz4KICAgICAgICAgICAgICAgIDxnIGlkPSLnvJbnu4QtMTUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAuMDAwMDAwLCA1ODguMDAwMDAwKSI+CiAgICAgICAgICAgICAgICAgICAgPHBhdGggZD0iTTExOSwwIEMxODQuNzIxODg1LDAgMjM4LDUzLjI3ODExNDggMjM4LDExOSBDMjM4LDE4NC43MjE4ODUgMTg0LjcyMTg4NSwyMzggMTE5LDIzOCBDNTMuMjc4MTE0OCwyMzggMCwxODQuNzIxODg1IDAsMTE5IEMwLDUzLjI3ODExNDggNTMuMjc4MTE0OCwwIDExOSwwIFogTTExOSwxNiBDNjIuMTE0NjcwOCwxNiAxNiw2Mi4xMTQ2NzA4IDE2LDExOSBDMTYsMTc1Ljg4NTMyOSA2Mi4xMTQ2NzA4LDIyMiAxMTksMjIyIEMxNzUuODg1MzI5LDIyMiAyMjIsMTc1Ljg4NTMyOSAyMjIsMTE5IEMyMjIsNjIuMTE0NjcwOCAxNzUuODg1MzI5LDE2IDExOSwxNiBaIiBpZD0i5qSt5ZyG5b2i5aSH5Lu9LTIiPjwvcGF0aD4KICAgICAgICAgICAgICAgICAgICA8cGF0aCBkPSJNNDAzLDAgQzQ2OC43MjE4ODUsMCA1MjIsNTMuMjc4MTE0OCA1MjIsMTE5IEM1MjIsMTg0LjcyMTg4NSA0NjguNzIxODg1LDIzOCA0MDMsMjM4IEMzMzcuMjc4MTE1LDIzOCAyODQsMTg0LjcyMTg4NSAyODQsMTE5IEMyODQsNTMuMjc4MTE0OCAzMzcuMjc4MTE1LDAgNDAzLDAgWiBNNDAzLDE2IEMzNDYuMTE0NjcxLDE2IDMwMCw2Mi4xMTQ2NzA4IDMwMCwxMTkgQzMwMCwxNzUuODg1MzI5IDM0Ni4xMTQ2NzEsMjIyIDQwMywyMjIgQzQ1OS44ODUzMjksMjIyIDUwNiwxNzUuODg1MzI5IDUwNiwxMTkgQzUwNiw2Mi4xMTQ2NzA4IDQ1OS44ODUzMjksMTYgNDAzLDE2IFoiIGlkPSLmpK3lnIblvaLlpIfku70tMyI+PC9wYXRoPgogICAgICAgICAgICAgICAgPC9nPgogICAgICAgICAgICAgICAgPHBhdGggZD0iTTI2MSwyOTQgQzMyNi43MjE4ODUsMjk0IDM4MCwzNDcuMjc4MTE1IDM4MCw0MTMgQzM4MCw0NzguNzIxODg1IDMyNi43MjE4ODUsNTMyIDI2MSw1MzIgQzE5NS4yNzgxMTUsNTMyIDE0Miw0NzguNzIxODg1IDE0Miw0MTMgQzE0MiwzNDcuMjc4MTE1IDE5NS4yNzgxMTUsMjk0IDI2MSwyOTQgWiBNMjYxLDMxMCBDMjA0LjExNDY3MSwzMTAgMTU4LDM1Ni4xMTQ2NzEgMTU4LDQxMyBDMTU4LDQ2OS44ODUzMjkgMjA0LjExNDY3MSw1MTYgMjYxLDUxNiBDMzE3Ljg4NTMyOSw1MTYgMzY0LDQ2OS44ODUzMjkgMzY0LDQxMyBDMzY0LDM1Ni4xMTQ2NzEgMzE3Ljg4NTMyOSwzMTAgMjYxLDMxMCBaIiBpZD0i5qSt5ZyG5b2i5aSH5Lu9LTQiPjwvcGF0aD4KICAgICAgICAgICAgPC9nPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
  },
  {
    name: "sheKongQiang",
    fillWidth: 0,
    labelPosition: "bottom",
    height: 2,
    base64: "data:image/svg+xml;base64,PHN2ZyB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBjb250ZW50U2NyaXB0VHlwZT0idGV4dC9lY21hc2NyaXB0IiB3aWR0aD0iNjAwIiB6b29tQW5kUGFuPSJtYWduaWZ5IiBjb250ZW50U3R5bGVUeXBlPSJ0ZXh0L2NzcyIgdmlld0JveD0iMTU5IDAgNzA2IDEwMjQiIGhlaWdodD0iMTAyNCIgcHJlc2VydmVBc3BlY3RSYXRpbz0ibm9uZSIgdmVyc2lvbj0iMS4wIj4NCgk8cGF0aCBkPSJNMTU4Ljg5NjU1MiAwaDcwNi4yMDY4OTZ2MTAyNEgxNTguODk2NTUyeiIvPg0KCTxwYXRoIGQ9Ik0xOTQuMjA2ODk3IDM1LjMxMDM0NWg2MzUuNTg2MjA2djk1My4zNzkzMUgxOTQuMjA2ODk3eiIgZmlsbD0iI0ZGRkZGRiIvPg0KCTxwYXRoIGQ9Ik03MjMuODYyMDY5IDE0MS4yNDEzNzltLTcwLjYyMDY5IDBhNzAuNjIwNjkgNzAuNjIwNjkgMCAxIDAgMTQxLjI0MTM4IDAgNzAuNjIwNjkgNzAuNjIwNjkgMCAxIDAtMTQxLjI0MTM4IDBaIi8+DQoJPHBhdGggZD0iTTcyMy44NjIwNjkgMTQxLjI0MTM3OW0tMzUuMzEwMzQ1IDBhMzUuMzEwMzQ1IDM1LjMxMDM0NSAwIDEgMCA3MC42MjA2OSAwIDM1LjMxMDM0NSAzNS4zMTAzNDUgMCAxIDAtNzAuNjIwNjkgMFoiIGZpbGw9IiNGRkZGRkYiLz4NCgk8cGF0aCBkPSJNNTEyIDI4Mi40ODI3NTltLTcwLjYyMDY5IDBhNzAuNjIwNjkgNzAuNjIwNjkgMCAxIDAgMTQxLjI0MTM4IDAgNzAuNjIwNjkgNzAuNjIwNjkgMCAxIDAtMTQxLjI0MTM4IDBaIi8+DQoJPHBhdGggZD0iTTUxMiAyODIuNDgyNzU5bS0zNS4zMTAzNDUgMGEzNS4zMTAzNDUgMzUuMzEwMzQ1IDAgMSAwIDcwLjYyMDY5IDAgMzUuMzEwMzQ1IDM1LjMxMDM0NSAwIDEgMC03MC42MjA2OSAwWiIgZmlsbD0iI0ZGRkZGRiIvPg0KCTxwYXRoIGQ9Ik0zMDAuMTM3OTMxIDQyMy43MjQxMzhtLTcwLjYyMDY5IDBhNzAuNjIwNjkgNzAuNjIwNjkgMCAxIDAgMTQxLjI0MTM4IDAgNzAuNjIwNjkgNzAuNjIwNjkgMCAxIDAtMTQxLjI0MTM4IDBaIi8+DQoJPHBhdGggZD0iTTMwMC4xMzc5MzEgNDIzLjcyNDEzOG0tMzUuMzEwMzQ1IDBhMzUuMzEwMzQ1IDM1LjMxMDM0NSAwIDEgMCA3MC42MjA2OSAwIDM1LjMxMDM0NSAzNS4zMTAzNDUgMCAxIDAtNzAuNjIwNjkgMFoiIGZpbGw9IiNGRkZGRkYiLz4NCgk8cGF0aCBkPSJNMzAwLjEzNzkzMSAxNDEuMjQxMzc5bS03MC42MjA2OSAwYTcwLjYyMDY5IDcwLjYyMDY5IDAgMSAwIDE0MS4yNDEzOCAwIDcwLjYyMDY5IDcwLjYyMDY5IDAgMSAwLTE0MS4yNDEzOCAwWiIvPg0KCTxwYXRoIGQ9Ik0zMDAuMTM3OTMxIDE0MS4yNDEzNzltLTM1LjMxMDM0NSAwYTM1LjMxMDM0NSAzNS4zMTAzNDUgMCAxIDAgNzAuNjIwNjkgMCAzNS4zMTAzNDUgMzUuMzEwMzQ1IDAgMSAwLTcwLjYyMDY5IDBaIiBmaWxsPSIjRkZGRkZGIi8+DQoJPHBhdGggZD0iTTcyMy44NjIwNjkgNDIzLjcyNDEzOG0tNzAuNjIwNjkgMGE3MC42MjA2OSA3MC42MjA2OSAwIDEgMCAxNDEuMjQxMzggMCA3MC42MjA2OSA3MC42MjA2OSAwIDEgMC0xNDEuMjQxMzggMFoiLz4NCgk8cGF0aCBkPSJNNzIzLjg2MjA2OSA0MjMuNzI0MTM4bS0zNS4zMTAzNDUgMGEzNS4zMTAzNDUgMzUuMzEwMzQ1IDAgMSAwIDcwLjYyMDY5IDAgMzUuMzEwMzQ1IDM1LjMxMDM0NSAwIDEgMC03MC42MjA2OSAwWiIgZmlsbD0iI0ZGRkZGRiIvPg0KCTxwYXRoIGQ9Ik01MTIgNTY0Ljk2NTUxN20tNzAuNjIwNjkgMGE3MC42MjA2OSA3MC42MjA2OSAwIDEgMCAxNDEuMjQxMzggMCA3MC42MjA2OSA3MC42MjA2OSAwIDEgMC0xNDEuMjQxMzggMFoiLz4NCgk8cGF0aCBkPSJNNTEyIDU2NC45NjU1MTdtLTM1LjMxMDM0NSAwYTM1LjMxMDM0NSAzNS4zMTAzNDUgMCAxIDAgNzAuNjIwNjkgMCAzNS4zMTAzNDUgMzUuMzEwMzQ1IDAgMSAwLTcwLjYyMDY5IDBaIiBmaWxsPSIjRkZGRkZGIi8+DQoJPHBhdGggZD0iTTcyMy44NjIwNjkgNzA2LjIwNjg5N20tNzAuNjIwNjkgMGE3MC42MjA2OSA3MC42MjA2OSAwIDEgMCAxNDEuMjQxMzggMCA3MC42MjA2OSA3MC42MjA2OSAwIDEgMC0xNDEuMjQxMzggMFoiLz4NCgk8cGF0aCBkPSJNNzIzLjg2MjA2OSA3MDYuMjA2ODk3bS0zNS4zMTAzNDUgMGEzNS4zMTAzNDUgMzUuMzEwMzQ1IDAgMSAwIDcwLjYyMDY5IDAgMzUuMzEwMzQ1IDM1LjMxMDM0NSAwIDEgMC03MC42MjA2OSAwWiIgZmlsbD0iI0ZGRkZGRiIvPg0KCTxwYXRoIGQ9Ik0zMDAuMTM3OTMxIDc0MS41MTcyNDFtLTcwLjYyMDY5IDBhNzAuNjIwNjkgNzAuNjIwNjkgMCAxIDAgMTQxLjI0MTM4IDAgNzAuNjIwNjkgNzAuNjIwNjkgMCAxIDAtMTQxLjI0MTM4IDBaIi8+DQoJPHBhdGggZD0iTTMwMC4xMzc5MzEgNzQxLjUxNzI0MW0tMzUuMzEwMzQ1IDBhMzUuMzEwMzQ1IDM1LjMxMDM0NSAwIDEgMCA3MC42MjA2OSAwIDM1LjMxMDM0NSAzNS4zMTAzNDUgMCAxIDAtNzAuNjIwNjkgMFoiIGZpbGw9IiNGRkZGRkYiLz4NCgk8cGF0aCBkPSJNNTEyIDg4Mi43NTg2MjFtLTcwLjYyMDY5IDBhNzAuNjIwNjkgNzAuNjIwNjkgMCAxIDAgMTQxLjI0MTM4IDAgNzAuNjIwNjkgNzAuNjIwNjkgMCAxIDAtMTQxLjI0MTM4IDBaIi8+DQoJPHBhdGggZD0iTTUxMiA4ODIuNzU4NjIxbS0zNS4zMTAzNDUgMGEzNS4zMTAzNDUgMzUuMzEwMzQ1IDAgMSAwIDcwLjYyMDY5IDAgMzUuMzEwMzQ1IDM1LjMxMDM0NSAwIDEgMC03MC42MjA2OSAwWiIgZmlsbD0iI0ZGRkZGRiIvPg0KPC9zdmc+"
  },
  {
    name: "siDu",
    fillWidth: 0,
    labelPosition: "bottom",
    height: 0.5,
    base64: "data:image/svg+xml;base64,PHN2ZyAgY29udGVudFNjcmlwdFR5cGU9InRleHQvZWNtYXNjcmlwdCIgd2lkdGg9IjEwMjQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB6b29tQW5kUGFuPSJtYWduaWZ5IiBjb250ZW50U3R5bGVUeXBlPSJ0ZXh0L2NzcyIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgaGVpZ2h0PSIxMDI0IiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMCI+DQoJPHBhdGggZD0iTTAgMGgxMDI0djEwMjRIMHoiPjwvcGF0aD4NCgk8cGF0aCBkPSJNNTEyIDU0Ni4xMzMzMzNsNDQzLjczMzMzMyA0NDMuNzMzMzM0SDY4LjI2NjY2N3oiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4NCgk8cGF0aCBkPSJNNTEyIDQ3Ny44NjY2NjdMNjguMjY2NjY3IDM0LjEzMzMzM2g4ODcuNDY2NjY2eiIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik01NDYuMTMzMzMzIDUxMkw5ODkuODY2NjY3IDY4LjI2NjY2N3Y4ODcuNDY2NjY2eiIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik00NzcuODY2NjY3IDUxMkwzNC4xMzMzMzMgOTU1LjczMzMzM1Y2OC4yNjY2Njd6IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+DQo8L3N2Zz4="
  },
  {
    name: "qiaoSai",
    fillWidth: 1,
    labelPosition: "top",
    height: 0.5,
    base64: "data:image/svg+xml;base64,PHN2ZyAgY29udGVudFNjcmlwdFR5cGU9InRleHQvZWNtYXNjcmlwdCIgd2lkdGg9IjEwMjQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB6b29tQW5kUGFuPSJtYWduaWZ5IiBjb250ZW50U3R5bGVUeXBlPSJ0ZXh0L2NzcyIgdmlld0JveD0iMCAyNDAgMTAyNCA1NTAiIGhlaWdodD0iNTAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMCI+DQoJPHBhdGggZD0iTTY4LjI2NjY2NyAyMzguOTMzMzMzaDg4Ny40NjY2NjZ2MjA0LjhINjguMjY2NjY3eiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik0xMDIuNCAyNzMuMDY2NjY3aDgxOS4ydjE3MC42NjY2NjZIMTAyLjR6IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+DQoJPHBhdGggZD0iTTAgNDQzLjczMzMzM2gxMDI0djE3MC42NjY2NjdIMHoiPjwvcGF0aD4NCgk8cGF0aCBkPSJNMzQuMTMzMzMzIDQ3Ny44NjY2NjdoOTU1LjczMzMzNHYxMDIuNEgzNC4xMzMzMzN6IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+DQoJPHBhdGggZD0iTTY4LjI2NjY2NyA1OTcuMzMzMzMzbDEwMi40IDE3MC42NjY2NjdoNjgyLjY2NjY2NmwxMDIuNC0xNzAuNjY2NjY3eiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik05MjQuMjk2NTMzIDYyMS4yMjY2NjdsLTc4LjUwNjY2NiAxMzcuMTgxODY2aC02NjIuMTg2NjY3TDEwMi40IDYyMS4yMjY2Njd6IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+DQoJPHBhdGggZD0iTTkyNC4yOTY1MzMgNjU1LjM2bDY4LjI2NjY2NyAxMDIuNGgtMTM2LjUzMzMzM3oiPjwvcGF0aD4NCgk8cGF0aCBkPSJNOTQxLjM2MzIgNjE0LjRsNTEuMiA2OC4yNjY2NjdoLTEwMi40eiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik05NzguMTkzMDY3IDc1MC45MzMzMzN6IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+DQoJPHBhdGggZD0iTTkxNS43NjMyIDY1OC4wMjI0bDYzLjQ1Mzg2NyA5My4zMjA1MzNoLTExNy44MjgyNjd6IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+DQoJPHBhdGggZD0iTTkzNy42NzY4IDYyMS4yMjY2NjdsNDIuNjMyNTMzIDU2LjAxMjhoLTQwLjAwNDI2NmwtMjAuMDAyMTM0LTI0Ljc4MDh6IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+DQoJPHBhdGggZD0iTTEwMi40IDY1NS4zNmw2OC4yNjY2NjcgMTAyLjRIMzQuMTMzMzMzeiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik04NS4zMzMzMzMgNjE0LjRMMTM2LjUzMzMzMyA2ODIuNjY2NjY3SDM0LjEzMzMzM3oiPjwvcGF0aD4NCgk8cGF0aCBkPSJNNDguNTM3NiA3NTAuOTMzMzMzeiIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik0xMTAuOTMzMzMzIDY1OC4wMjI0bC02My40NTM4NjYgOTMuMzU0NjY3aDExNy44NjI0eiIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik04OS4wMTk3MzMgNjIxLjIyNjY2N2wtNDIuNjMyNTMzIDU2LjAxMjhoNDAuMDA0MjY3bDIwLjAwMjEzMy0yNC43ODA4eiIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik0xMDIuNCA3NTAuOTMzMzMzbDMxLjE5Nzg2NyAzNC4xMzMzMzRoNzU1Ljc4MDI2Nkw5MjEuNiA3NTAuOTMzMzMzeiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik0xMjcuNzI2OTMzIDc1OC40MDg1MzNsMTQuMDYyOTM0IDE4Ljg0MTZoNzM1LjQ3MDkzM2wxOC45NzgxMzMtMTguODQxNnoiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4NCgk8cGF0aCBkPSJNNDQzLjczMzMzMyA0NzcuODY2NjY3aDEzNi41MzMzMzR2MTAyLjRoLTEzNi41MzMzMzR6Ij48L3BhdGg+DQoJPHBhdGggZD0iTTQ3Ny44NjY2NjcgNTI5LjA2NjY2N0w0NDMuNzMzMzMzIDQ3Ny44NjY2Njd2MTAyLjR6IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+DQoJPHBhdGggZD0iTTU0Ni4xMzMzMzMgNTI5LjA2NjY2N2wzNC4xMzMzMzQtNTEuMnYxMDIuNHoiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4NCgk8cGF0aCBkPSJNNTAxLjAwOTA2NyA1ODEuNzY4NTMzbDUuMTItMTAuNjQ5Ni0yMi43MzI4LTM1LjIyNTYtMjkuNTI1MzM0IDQ1Ljg3NTJ6IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+DQoJPHBhdGggZD0iTTUyMy45NDY2NjcgNTgxLjc2ODUzM2wtNS4xMi0xMC42NDk2IDIyLjc2NjkzMy0zNS4yMjU2IDI5LjU5MzYgNDUuODc1MnoiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4NCgk8cGF0aCBkPSJNNTEyLjI3MzA2NyA0OTUuNDc5NDY3bC0yMy44OTMzMzQgMzUuNzM3NiAyMy44OTMzMzQgMzIuMDE3MDY2IDIzLjE3NjUzMy0zMS45ODI5MzN6IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+DQoJPHBhdGggZD0iTTUyMi4xMDM0NjcgNDc3Ljg2NjY2N2wtNi44MjY2NjcgMTEuMTk1NzMzIDI1LjE1NjI2NyAzMy4wNzUyIDMwLjcyLTQ0LjM3MzMzM3oiIGZpbGw9IiNGRkZGRkYiPjwvcGF0aD4NCgk8cGF0aCBkPSJNNTAxLjI4MjEzMyA0NzcuODY2NjY3bDYuODI2NjY3IDExLjg3ODQtMjUuMzk1MiAzNS4wNTQ5MzNMNDUxLjc1NDY2NyA0NzcuODY2NjY3eiIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPg0KPC9zdmc+"
  },
  {
    name: "qiTa",
    fillWidth: 2,
    labelPosition: "bottom",
    height: 0.5,
    base64: "data:image/svg+xml;base64,PHN2ZyAgY29udGVudFNjcmlwdFR5cGU9InRleHQvZWNtYXNjcmlwdCIgd2lkdGg9IjEwMjQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB6b29tQW5kUGFuPSJtYWduaWZ5IiBjb250ZW50U3R5bGVUeXBlPSJ0ZXh0L2NzcyIgdmlld0JveD0iMCAxMzYgMTAyNCA3NTAiIGhlaWdodD0iNzUwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMCI+DQoJPHBhdGggZD0iTTAgMTM2LjUzMzMzM20xMzYuNTMzMzMzIDBsNzUwLjkzMzMzNCAwcTEzNi41MzMzMzMgMCAxMzYuNTMzMzMzIDEzNi41MzMzMzRsMCA0NzcuODY2NjY2cTAgMTM2LjUzMzMzMy0xMzYuNTMzMzMzIDEzNi41MzMzMzRsLTc1MC45MzMzMzQgMHEtMTM2LjUzMzMzMyAwLTEzNi41MzMzMzMtMTM2LjUzMzMzNGwwLTQ3Ny44NjY2NjZxMC0xMzYuNTMzMzMzIDEzNi41MzMzMzMtMTM2LjUzMzMzNFoiPjwvcGF0aD4NCgk8cGF0aCBkPSJNMzQuMTMzMzMzIDE3MC42NjY2NjdtMTAyLjQgMGw3NTAuOTMzMzM0IDBxMTAyLjQgMCAxMDIuNCAxMDIuNGwwIDQ3Ny44NjY2NjZxMCAxMDIuNC0xMDIuNCAxMDIuNGwtNzUwLjkzMzMzNCAwcS0xMDIuNCAwLTEwMi40LTEwMi40bDAtNDc3Ljg2NjY2NnEwLTEwMi40IDEwMi40LTEwMi40WiIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPg0KPC9zdmc+"
  },
  {
    name: "daoZhui",
    fillWidth: 0,
    labelPosition: "bottom",
    height: 0.5,
    base64: "data:image/svg+xml;base64,PHN2ZyAgY29udGVudFNjcmlwdFR5cGU9InRleHQvZWNtYXNjcmlwdCIgd2lkdGg9IjEwMjQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB6b29tQW5kUGFuPSJtYWduaWZ5IiBjb250ZW50U3R5bGVUeXBlPSJ0ZXh0L2NzcyIgdmlld0JveD0iMCAwIDEwMjQgMTAyNCIgaGVpZ2h0PSIxMDI0IiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMCI+DQoJPHBhdGggZD0iTTUxMiAxMDI0TDAgMGgxMDI0eiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik01MTIgOTU1LjczMzMzM0w2OC4yNjY2NjcgMzQuMTMzMzMzaDg4Ny40NjY2NjZ6IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+DQo8L3N2Zz4="
  },
  {
    name: "shuiLiMao",
    fillWidth: 3,
    labelPosition: "middle",
    height: 0.5,
    base64: "data:image/svg+xml;base64,PHN2ZyB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayIgeG1sbnM6c3ZnPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBjb250ZW50U2NyaXB0VHlwZT0idGV4dC9lY21hc2NyaXB0IiB3aWR0aD0iNTAwIiB6b29tQW5kUGFuPSJtYWduaWZ5IiBjb250ZW50U3R5bGVUeXBlPSJ0ZXh0L2NzcyIgdmlld0JveD0iMCAzMjMgNTAwIDM5MCIgaGVpZ2h0PSIzNzAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiIHZlcnNpb249IjEuMCI+DQoNCg0KCTxwYXRoIGQ9Ik0wIDUxMS4xNDY2NjdsNDUyLjg0NjkzMy0xODYuODQ1ODY3djM3My42OTE3MzN6Ii8+DQoNCg0KCTxwYXRoIGQ9Ik01MS4yIDUxMmwzNzUuNDY2NjY3LTE1My42djMwNy4yeiIgZmlsbD0iI0ZGRkZGRiIvPg0KPC9zdmc+"
  },
  {
    name: "huiMian",
    fillWidth: 1,
    labelPosition: "top",
    height: 0.5,
    base64: "data:image/svg+xml;base64,PHN2ZyAgY29udGVudFNjcmlwdFR5cGU9InRleHQvZWNtYXNjcmlwdCIgd2lkdGg9IjEwMjQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB6b29tQW5kUGFuPSJtYWduaWZ5IiBjb250ZW50U3R5bGVUeXBlPSJ0ZXh0L2NzcyIgdmlld0JveD0iMCAzMDcgMTAyNCA0MDkiIGhlaWdodD0iNDEwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMCI+DQo8cGF0aCBkPSJNMCAzMDcuMmgxMDI0djQwOS42SDB6Ij48L3BhdGg+PHBhdGggZD0iTTM0LjEzMzMzMyAzNDEuMzMzMzMzaDk1NS43MzMzMzR2MzQxLjMzMzMzNEgzNC4xMzMzMzN6IiBmaWxsPSIjRTRFNEU0Ij48L3BhdGg+DQo8L3N2Zz4="
  },
  {
    name: "shaMian",
    fillWidth: 1,
    labelPosition: "top",
    height: 0.5,
    base64: "data:image/svg+xml;base64,PHN2ZyAgY29udGVudFNjcmlwdFR5cGU9InRleHQvZWNtYXNjcmlwdCIgd2lkdGg9IjEwMjQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB6b29tQW5kUGFuPSJtYWduaWZ5IiBjb250ZW50U3R5bGVUeXBlPSJ0ZXh0L2NzcyIgdmlld0JveD0iMCAyNzMgMTAyNCA0NDUiIGhlaWdodD0iNDQ1IiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMCI+DQoJPHBhdGggZD0iTTAgMjczLjA2NjY2N2gxMDI0djQ0My43MzMzMzNIMHoiPjwvcGF0aD4NCgk8cGF0aCBkPSJNMzQuMTMzMzMzIDMwNy4yaDk1NS43MzMzMzR2Mzc1LjQ2NjY2N0gzNC4xMzMzMzN6IiBmaWxsPSIjRkZGRkZGIj48L3BhdGg+DQoJPHBhdGggZD0iTTc2OCAzNTguNG0tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzQgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzNCAwWiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik05MDQuNTMzMzMzIDU2My4ybS0xNy4wNjY2NjYgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzMyAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzMzIDBaIj48L3BhdGg+DQoJPHBhdGggZD0iTTgwMi4xMzMzMzMgNDYwLjhtLTE3LjA2NjY2NiAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzMzIDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzMgMFoiPjwvcGF0aD4NCgk8cGF0aCBkPSJNNzMzLjg2NjY2NyA1MjkuMDY2NjY3bS0xNy4wNjY2NjcgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzMyAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzMzIDBaIj48L3BhdGg+DQoJPHBhdGggZD0iTTYzMS40NjY2NjcgNDI2LjY2NjY2N20tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzMgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzMyAwWiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik02OTkuNzMzMzMzIDQ2MC44bS0xNy4wNjY2NjYgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzMyAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzMzIDBaIj48L3BhdGg+DQoJPHBhdGggZD0iTTU5Ny4zMzMzMzMgNDk0LjkzMzMzM20tMTcuMDY2NjY2IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzMgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzMyAwWiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik00NjAuOCA1NjMuMm0tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzQgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzNCAwWiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik0zNTguNCA0NjAuOG0tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzQgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzNCAwWiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik00MjYuNjY2NjY3IDQ2MC44bS0xNy4wNjY2NjcgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzMyAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzMzIDBaIj48L3BhdGg+DQoJPHBhdGggZD0iTTM1OC40IDUyOS4wNjY2NjdtLTE3LjA2NjY2NyAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzM0IDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzQgMFoiPjwvcGF0aD4NCgk8cGF0aCBkPSJNMzU4LjQgMzU4LjRtLTE3LjA2NjY2NyAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzM0IDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzQgMFoiPjwvcGF0aD4NCgk8cGF0aCBkPSJNMjIxLjg2NjY2NyAzNTguNG0tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzMgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzMyAwWiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik0xODcuNzMzMzMzIDYzMS40NjY2NjdtLTE3LjA2NjY2NiAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzMzIDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzMgMFoiPjwvcGF0aD4NCgk8cGF0aCBkPSJNODUuMzMzMzMzIDU5Ny4zMzMzMzNtLTE3LjA2NjY2NiAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzMzIDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzMgMFoiPjwvcGF0aD4NCgk8cGF0aCBkPSJNMTUzLjYgNDk0LjkzMzMzM20tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzQgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzNCAwWiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik0xMTkuNDY2NjY3IDUyOS4wNjY2NjdtLTE3LjA2NjY2NyAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzMzIDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzMgMFoiPjwvcGF0aD4NCgk8cGF0aCBkPSJNODcwLjQgNDk0LjkzMzMzM20tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzQgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzNCAwWiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik04MDIuMTMzMzMzIDUyOS4wNjY2NjdtLTE3LjA2NjY2NiAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzMzIDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzMgMFoiPjwvcGF0aD4NCgk8cGF0aCBkPSJNOTcyLjggNTYzLjJtLTE3LjA2NjY2NyAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzM0IDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzQgMFoiPjwvcGF0aD4NCgk8cGF0aCBkPSJNOTcyLjggMzkyLjUzMzMzM20tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzQgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzNCAwWiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik05MDQuNTMzMzMzIDQ2MC44bS0xNy4wNjY2NjYgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzMyAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzMzIDBaIj48L3BhdGg+DQoJPHBhdGggZD0iTTg3MC40IDM5Mi41MzMzMzNtLTE3LjA2NjY2NyAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzM0IDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzQgMFoiPjwvcGF0aD4NCgk8cGF0aCBkPSJNNTI5LjA2NjY2NyA1MjkuMDY2NjY3bS0xNy4wNjY2NjcgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzMyAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzMzIDBaIj48L3BhdGg+DQoJPHBhdGggZD0iTTU5Ny4zMzMzMzMgNTk3LjMzMzMzM20tMTcuMDY2NjY2IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzMgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzMyAwWiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik02NjUuNiA1NjMuMm0tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzQgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzNCAwWiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik01NjMuMiA1NjMuMm0tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzQgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzNCAwWiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik00NjAuOCA2MzEuNDY2NjY3bS0xNy4wNjY2NjcgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzNCAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzM0IDBaIj48L3BhdGg+DQoJPHBhdGggZD0iTTM5Mi41MzMzMzMgNTk3LjMzMzMzM20tMTcuMDY2NjY2IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzMgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzMyAwWiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik0zNTguNCA1NjMuMm0tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzQgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzNCAwWiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik0zMjQuMjY2NjY3IDUyOS4wNjY2NjdtLTE3LjA2NjY2NyAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzMzIDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzMgMFoiPjwvcGF0aD4NCgk8cGF0aCBkPSJNMjkwLjEzMzMzMyAzOTIuNTMzMzMzbS0xNy4wNjY2NjYgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzMyAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzMzIDBaIj48L3BhdGg+DQoJPHBhdGggZD0iTTExOS40NjY2NjcgNjMxLjQ2NjY2N20tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzMgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzMyAwWiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik01MS4yIDU2My4ybS0xNy4wNjY2NjcgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzNCAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzM0IDBaIj48L3BhdGg+DQoJPHBhdGggZD0iTTExOS40NjY2NjcgMzU4LjRtLTE3LjA2NjY2NyAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzMzIDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzMgMFoiPjwvcGF0aD4NCgk8cGF0aCBkPSJNODUuMzMzMzMzIDM5Mi41MzMzMzNtLTE3LjA2NjY2NiAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzMzIDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzMgMFoiPjwvcGF0aD4NCgk8cGF0aCBkPSJNNTEuMiAzNTguNG0tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzQgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzNCAwWiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik04NS4zMzMzMzMgMzI0LjI2NjY2N20tMTcuMDY2NjY2IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzMgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzMyAwWiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik01MS4yIDMyNC4yNjY2NjdtLTE3LjA2NjY2NyAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzM0IDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzQgMFoiPjwvcGF0aD4NCgk8cGF0aCBkPSJNNTk3LjMzMzMzMyAzOTIuNTMzMzMzbS0xNy4wNjY2NjYgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzMyAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzMzIDBaIj48L3BhdGg+DQoJPHBhdGggZD0iTTU5Ny4zMzMzMzMgMzI0LjI2NjY2N20tMTcuMDY2NjY2IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzMgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzMyAwWiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik01NjMuMiAzNTguNG0tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzQgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzNCAwWiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik00OTQuOTMzMzMzIDMyNC4yNjY2NjdtLTE3LjA2NjY2NiAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzMzIDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzMgMFoiPjwvcGF0aD4NCgk8cGF0aCBkPSJNOTcyLjggNDk0LjkzMzMzM20tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzQgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzNCAwWiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik0zNTguNCA2NjUuNm0tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzQgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzNCAwWiI+PC9wYXRoPg0KCTxwYXRoIGQ9Ik0zMjQuMjY2NjY3IDU5Ny4zMzMzMzNtLTE3LjA2NjY2NyAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzMzIDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzMgMFoiPjwvcGF0aD4NCgk8cGF0aCBkPSJNODUuMzMzMzMzIDUyOS4wNjY2NjdtLTE3LjA2NjY2NiAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzMzIDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzMgMFoiPjwvcGF0aD4NCgk8cGF0aCBkPSJNMTUzLjYgNDI2LjY2NjY2N20tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzQgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzNCAwWiI+PC9wYXRoPg0KPC9zdmc+"
  },
  {
    name: "biJian",
    fillWidth: 0,
    labelPosition: "bottom",
    height: 0.5,
    base64: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB0PSIxNjA1ODUzMDEzMzAyIiBjbGFzcz0iaWNvbiIgdmVyc2lvbj0iMS4xIiBwLWlkPSI4NzQ0IiB3aWR0aD0iNTEyIiB6b29tQW5kUGFuPSJtYWduaWZ5IiBjb250ZW50U3R5bGVUeXBlPSJ0ZXh0L2NzcyIgdmlld0JveD0iMzA3IDAgNDQwIDk1MCIgaGVpZ2h0PSI5NTAiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPg0KDQoNCiAgICA8cGF0aCBkPSJNMzA3LjIgMGg0NDMuNzMzMzMzdjQzMC41NTc4NjdMMzA3LjIgMTAyNHoiIHAtaWQ9Ijg3NDYiLz4NCiAgICA8cGF0aCBkPSJNMzM2LjgyNzczMyAyMy4wMDU4NjdWOTI0LjMzMDY2N2wzODUuMzY1MzM0LTUwMy42NzE0NjdWMjMuMDA1ODY3eiIgZmlsbD0iI0ZGRkZGRiIgcC1pZD0iODc0NyIvPg0KPC9zdmc+"
  },
  {
    name: "beng2",
    fillWidth: 2,
    labelPosition: "bottom",
    height: 0.6,
    base64: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTE1NnB4IiBoZWlnaHQ9IjEwMjRweCIgdmlld0JveD0iMCAwIDExNTYgMTAyNCIgdmVyc2lvbj0iMS4xIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KCTx0aXRsZT5iZW5nPC90aXRsZT4KCTxnIGlkPSLpobXpnaItMSIgc3Ryb2tlPSJub25lIiBzdHJva2Utd2lkdGg9IjEiIGZpbGw9Im5vbmUiIGZpbGwtcnVsZT0iZXZlbm9kZCI+CgkJPGcgaWQ9ImJlbmciPgoJCQk8cmVjdCBpZD0i55+p5b2iIiBzdHJva2U9IiM5Nzk3OTciIGZpbGw9IiNGRkZGRkYiIHg9IjAuNSIgeT0iMC41IiB3aWR0aD0iMTE1NSIgaGVpZ2h0PSIxMDIzIj48L3JlY3Q+CgkJCTxyZWN0IGlkPSLnn6nlvaIiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxNiIgeD0iOCIgeT0iOCIgd2lkdGg9IjExNDAiIGhlaWdodD0iMTAwOCI+PC9yZWN0PgoJCQk8cG9seWdvbiBpZD0i6Lev5b6ELTQiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIxNiIgcG9pbnRzPSI4IDQ5MCA4IDEwMTYuNTUwNzEgNDg4IDEwMTYuNTUwNzEiPjwvcG9seWdvbj4KCQkJPHBvbHlnb24gaWQ9Iui3r+W+hC005aSH5Lu9IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMTYiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDkwOC4wMDAwMDAsIDc1My4yNzUzNTYpIHNjYWxlKC0xLCAxKSB0cmFuc2xhdGUoLTkwOC4wMDAwMDAsIC03NTMuMjc1MzU2KSAiIHBvaW50cz0iNjY4IDQ5MCA2NjggMTAxNi41NTA3MSAxMTQ4IDEwMTYuNTUwNzEiPjwvcG9seWdvbj4KCQkJPGNpcmNsZSBpZD0i5qSt5ZyG5b2iIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMTYiIGN4PSI1NzgiIGN5PSIzNjciIHI9IjE3NSI+PC9jaXJjbGU+CgkJPC9nPgoJPC9nPgo8L3N2Zz4K"
  },
  {
    name: "beng",
    fillWidth: 2,
    labelPosition: "bottom",
    height: 0.6,
    base64: "data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTAyNnB4IiBoZWlnaHQ9IjgwMnB4IiB2aWV3Qm94PSIwIDAgMTAyNiA4MDIiIHZlcnNpb249IjEuMSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CiAgICA8dGl0bGU+6KaB5pS555qEMDLlpIfku708L3RpdGxlPgogICAgPGcgaWQ9Iumhtemdoi0xIiBzdHJva2U9Im5vbmUiIHN0cm9rZS13aWR0aD0iMSIgZmlsbD0ibm9uZSIgZmlsbC1ydWxlPSJldmVub2RkIj4KICAgICAgICA8ZyBpZD0i6KaB5pS555qEMDLlpIfku70iIHRyYW5zZm9ybT0idHJhbnNsYXRlKDEuMDAwMDAwLCAxLjAwMDAwMCkiPgogICAgICAgICAgICA8cmVjdCBpZD0i55+p5b2iIiBzdHJva2U9IiM5Nzk3OTciIGZpbGw9IiNGRkZGRkYiIGZpbGwtcnVsZT0ibm9uemVybyIgeD0iMCIgeT0iMCIgd2lkdGg9IjEwMjQiIGhlaWdodD0iODAwIj48L3JlY3Q+CiAgICAgICAgICAgIDxyZWN0IGlkPSLnn6nlvaIiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLXdpZHRoPSIzNCIgeD0iMjMuMDc3MTUxMyIgeT0iMjMuMjU2MTA5NSIgd2lkdGg9Ijk3Ni44MzI4MzkiIGhlaWdodD0iNzU0LjI2OTc5NSI+PC9yZWN0PgogICAgICAgICAgICA8cGF0aCBkPSJNMjMuMDc3MTUxMyw0MjIuNDc3MDU2IEwzOTAuNDM4OTg3LDc3Ny41MjU5MDQgTDIzLjA3NzE1MTMsNzc3LjUyNTkwNCBMMjMuMDc3MTUxMyw0MjIuNDc3MDU2IFoiIGlkPSLot6/lvoQtNCIgc3Ryb2tlPSIjMDAwMDAwIiBzdHJva2Utd2lkdGg9IjM0Ij48L3BhdGg+CiAgICAgICAgICAgIDxwYXRoIGQ9Ik02MDcuNDk2NTM4LDQyMi40NzcwNTYgTDk3NC44NTgzNzQsNzc3LjUyNTkwNCBMNjA3LjQ5NjUzOCw3NzcuNTI1OTA0IEw2MDcuNDk2NTM4LDQyMi40NzcwNTYgWiIgaWQ9Iui3r+W+hC005aSH5Lu9IiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMzQiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDgwMy43MDMyNjQsIDU4OC40NjUyOTgpIHNjYWxlKC0xLCAxKSB0cmFuc2xhdGUoLTgwMy43MDMyNjQsIC01ODguNDY1Mjk4KSAiPjwvcGF0aD4KICAgICAgICAgICAgPGNpcmNsZSBpZD0i5qSt5ZyG5b2iIiBzdHJva2U9IiMwMDAwMDAiIHN0cm9rZS13aWR0aD0iMzQiIGN4PSI1MTIuMDc3NjQ2IiBjeT0iMjgxLjY5MDIzNSIgcj0iMTM0LjUiPjwvY2lyY2xlPgogICAgICAgIDwvZz4KICAgIDwvZz4KPC9zdmc+"
  },
  {
    name: "luoYu",
    fillWidth: 0,
    labelPosition: "top",
    height: 1,
    marginBottom: 0,
    base64: "data:image/svg+xml;base64,PHN2ZyAgY29udGVudFNjcmlwdFR5cGU9InRleHQvZWNtYXNjcmlwdCIgd2lkdGg9IjEwMjQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB6b29tQW5kUGFuPSJtYWduaWZ5IiBjb250ZW50U3R5bGVUeXBlPSJ0ZXh0L2NzcyIgdmlld0JveD0iMCAxMzYgMTAyNCA3NTAiIGhlaWdodD0iNzUwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMCI+DQoJPHBhdGggZD0iTTAgMTM2LjUzMzMzM20xMzYuNTMzMzMzIDBsNzUwLjkzMzMzNCAwcTEzNi41MzMzMzMgMCAxMzYuNTMzMzMzIDEzNi41MzMzMzRsMCA0NzcuODY2NjY2cTAgMTM2LjUzMzMzMy0xMzYuNTMzMzMzIDEzNi41MzMzMzRsLTc1MC45MzMzMzQgMHEtMTM2LjUzMzMzMyAwLTEzNi41MzMzMzMtMTM2LjUzMzMzNGwwLTQ3Ny44NjY2NjZxMC0xMzYuNTMzMzMzIDEzNi41MzMzMzMtMTM2LjUzMzMzNFoiPjwvcGF0aD4NCgk8cGF0aCBkPSJNMzQuMTMzMzMzIDE3MC42NjY2NjdtMTAyLjQgMGw3NTAuOTMzMzM0IDBxMTAyLjQgMCAxMDIuNCAxMDIuNGwwIDQ3Ny44NjY2NjZxMCAxMDIuNC0xMDIuNCAxMDIuNGwtNzUwLjkzMzMzNCAwcS0xMDIuNCAwLTEwMi40LTEwMi40bDAtNDc3Ljg2NjY2NnEwLTEwMi40IDEwMi40LTEwMi40WiIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPg0KPC9zdmc+"
  },
  {
    name: "huiMian-xie",
    fillWidth: 1,
    labelPosition: "top",
    height: 0.5,
    base64: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB0PSIxNjA1ODQxODA5NDgzIiBjbGFzcz0iaWNvbiIgdmlld0JveD0iNyAzMjAgMTAxMCAzODUiIHZlcnNpb249IjEuMSIgcC1pZD0iMzE4MCIgd2lkdGg9IjUwMCIgaGVpZ2h0PSIxNTkiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPg0KDQogICAgPHBhdGggZD0iTTAgMzA3LjJoODgwLjM2NjkzM0wxMDI0IDcxNi44SDE2MS40NTA2Njd6IiBwLWlkPSIzMTgyIi8+DQogICAgPHBhdGggZD0iTTEyLjQ1ODY2NyAzNDEuMzMzMzMzaDg4Mi4xMDc3MzNsMTIwLjU5MzA2NyAzNDEuMzMzMzM0SDE0Mi41NDA4eiIgZmlsbD0iI0U0RTRFNCIgcC1pZD0iMzE4MyIvPg0KPC9zdmc+"
  },
  {
    name: "shaMian-xie",
    fillWidth: 1,
    labelPosition: "top",
    height: 0.5,
    base64: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB0PSIxNjA1ODM1NDA3OTA1IiBjbGFzcz0iaWNvbiIgdmlld0JveD0iMCAyNzYgMTAyNCA0NDYiIHZlcnNpb249IjEuMSIgcC1pZD0iMTY2OSIgd2lkdGg9IjUwMCIgaGVpZ2h0PSIxNTkiIHByZXNlcnZlQXNwZWN0UmF0aW89Im5vbmUiPgoKICAgIDxwYXRoIGQ9Ik0wIDI3My4wNjY2NjdoODcwLjA1ODY2N0wxMDI0IDcxNi44SDE1OS4wNjEzMzN6IiBwLWlkPSI1NzU3Ii8+CiAgICA8cGF0aCBkPSJNNy43NDgyNjcgMjk2Ljk2aDg3Mi42ODY5MzNsMTM4Ljg4ODUzMyA0MDAuMDc2OEgxNDQuNTU0NjY3eiIgZmlsbD0iI0ZGRkZGRiIgcC1pZD0iNTc1OCIvPgogICAgPHBhdGggZD0iTTc2OCAzNTguNG0tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzQgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzNCAwWiIgcC1pZD0iNTc1OSIvPgogICAgPHBhdGggZD0iTTkwNC41MzMzMzMgNTYzLjJtLTE3LjA2NjY2NiAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzMzIDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzMgMFoiIHAtaWQ9IjU3NjAiLz4KICAgIDxwYXRoIGQ9Ik04MDIuMTMzMzMzIDQ2MC44bS0xNy4wNjY2NjYgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzMyAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzMzIDBaIiBwLWlkPSI1NzYxIi8+CiAgICA8cGF0aCBkPSJNNzMzLjg2NjY2NyA1MjkuMDY2NjY3bS0xNy4wNjY2NjcgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzMyAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzMzIDBaIiBwLWlkPSI1NzYyIi8+CiAgICA8cGF0aCBkPSJNNjMxLjQ2NjY2NyA0MjYuNjY2NjY3bS0xNy4wNjY2NjcgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzMyAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzMzIDBaIiBwLWlkPSI1NzYzIi8+CiAgICA8cGF0aCBkPSJNNjk5LjczMzMzMyA0NjAuOG0tMTcuMDY2NjY2IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzMgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzMyAwWiIgcC1pZD0iNTc2NCIvPgogICAgPHBhdGggZD0iTTU5Ny4zMzMzMzMgNDk0LjkzMzMzM20tMTcuMDY2NjY2IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzMgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzMyAwWiIgcC1pZD0iNTc2NSIvPgogICAgPHBhdGggZD0iTTQ2MC44IDU2My4ybS0xNy4wNjY2NjcgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzNCAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzM0IDBaIiBwLWlkPSI1NzY2Ii8+CiAgICA8cGF0aCBkPSJNMzU4LjQgNDYwLjhtLTE3LjA2NjY2NyAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzM0IDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzQgMFoiIHAtaWQ9IjU3NjciLz4KICAgIDxwYXRoIGQ9Ik00MjYuNjY2NjY3IDQ2MC44bS0xNy4wNjY2NjcgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzMyAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzMzIDBaIiBwLWlkPSI1NzY4Ii8+CiAgICA8cGF0aCBkPSJNMzU4LjQgNTI5LjA2NjY2N20tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzQgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzNCAwWiIgcC1pZD0iNTc2OSIvPgogICAgPHBhdGggZD0iTTM1OC40IDM1OC40bS0xNy4wNjY2NjcgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzNCAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzM0IDBaIiBwLWlkPSI1NzcwIi8+CiAgICA8cGF0aCBkPSJNMjIxLjg2NjY2NyAzNTguNG0tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzMgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzMyAwWiIgcC1pZD0iNTc3MSIvPgogICAgPHBhdGggZD0iTTE4Ny43MzMzMzMgNjMxLjQ2NjY2N20tMTcuMDY2NjY2IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzMgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzMyAwWiIgcC1pZD0iNTc3MiIvPgogICAgPHBhdGggZD0iTTE1My42IDQ5NC45MzMzMzNtLTE3LjA2NjY2NyAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzM0IDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzQgMFoiIHAtaWQ9IjU3NzMiLz4KICAgIDxwYXRoIGQ9Ik0xMTkuNDY2NjY3IDUyOS4wNjY2NjdtLTE3LjA2NjY2NyAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzMzIDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzMgMFoiIHAtaWQ9IjU3NzQiLz4KICAgIDxwYXRoIGQ9Ik04NzAuNCA0OTQuOTMzMzMzbS0xNy4wNjY2NjcgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzNCAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzM0IDBaIiBwLWlkPSI1Nzc1Ii8+CiAgICA8cGF0aCBkPSJNODAyLjEzMzMzMyA1MjkuMDY2NjY3bS0xNy4wNjY2NjYgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzMyAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzMzIDBaIiBwLWlkPSI1Nzc2Ii8+CiAgICA8cGF0aCBkPSJNOTA0LjUzMzMzMyA0NjAuOG0tMTcuMDY2NjY2IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzMgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzMyAwWiIgcC1pZD0iNTc3NyIvPgogICAgPHBhdGggZD0iTTg3MC40IDM5Mi41MzMzMzNtLTE3LjA2NjY2NyAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzM0IDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzQgMFoiIHAtaWQ9IjU3NzgiLz4KICAgIDxwYXRoIGQ9Ik01MjkuMDY2NjY3IDUyOS4wNjY2NjdtLTE3LjA2NjY2NyAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzMzIDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzMgMFoiIHAtaWQ9IjU3NzkiLz4KICAgIDxwYXRoIGQ9Ik01OTcuMzMzMzMzIDU5Ny4zMzMzMzNtLTE3LjA2NjY2NiAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzMzIDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzMgMFoiIHAtaWQ9IjU3ODAiLz4KICAgIDxwYXRoIGQ9Ik02NjUuNiA1NjMuMm0tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzQgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzNCAwWiIgcC1pZD0iNTc4MSIvPgogICAgPHBhdGggZD0iTTU2My4yIDU2My4ybS0xNy4wNjY2NjcgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzNCAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzM0IDBaIiBwLWlkPSI1NzgyIi8+CiAgICA8cGF0aCBkPSJNNDYwLjggNjMxLjQ2NjY2N20tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzQgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzNCAwWiIgcC1pZD0iNTc4MyIvPgogICAgPHBhdGggZD0iTTM5Mi41MzMzMzMgNTk3LjMzMzMzM20tMTcuMDY2NjY2IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzMgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzMyAwWiIgcC1pZD0iNTc4NCIvPgogICAgPHBhdGggZD0iTTM1OC40IDU2My4ybS0xNy4wNjY2NjcgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzNCAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzM0IDBaIiBwLWlkPSI1Nzg1Ii8+CiAgICA8cGF0aCBkPSJNMzI0LjI2NjY2NyA1MjkuMDY2NjY3bS0xNy4wNjY2NjcgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzMyAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzMzIDBaIiBwLWlkPSI1Nzg2Ii8+CiAgICA8cGF0aCBkPSJNMjkwLjEzMzMzMyAzOTIuNTMzMzMzbS0xNy4wNjY2NjYgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzMyAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzMzIDBaIiBwLWlkPSI1Nzg3Ii8+CiAgICA8cGF0aCBkPSJNMTE5LjQ2NjY2NyAzNTguNG0tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzMgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzMyAwWiIgcC1pZD0iNTc4OCIvPgogICAgPHBhdGggZD0iTTg1LjMzMzMzMyAzOTIuNTMzMzMzbS0xNy4wNjY2NjYgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzMyAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzMzIDBaIiBwLWlkPSI1Nzg5Ii8+CiAgICA8cGF0aCBkPSJNNTEuMiAzNTguNG0tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzQgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzNCAwWiIgcC1pZD0iNTc5MCIvPgogICAgPHBhdGggZD0iTTg1LjMzMzMzMyAzMjQuMjY2NjY3bS0xNy4wNjY2NjYgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzMyAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzMzIDBaIiBwLWlkPSI1NzkxIi8+CiAgICA8cGF0aCBkPSJNNTEuMiAzMjQuMjY2NjY3bS0xNy4wNjY2NjcgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzNCAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzM0IDBaIiBwLWlkPSI1NzkyIi8+CiAgICA8cGF0aCBkPSJNNTk3LjMzMzMzMyAzOTIuNTMzMzMzbS0xNy4wNjY2NjYgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzMyAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzMzIDBaIiBwLWlkPSI1NzkzIi8+CiAgICA8cGF0aCBkPSJNNTk3LjMzMzMzMyAzMjQuMjY2NjY3bS0xNy4wNjY2NjYgMGExNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwIDM0LjEzMzMzMyAwIDE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAtMzQuMTMzMzMzIDBaIiBwLWlkPSI1Nzk0Ii8+CiAgICA8cGF0aCBkPSJNNTYzLjIgMzU4LjRtLTE3LjA2NjY2NyAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzM0IDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzQgMFoiIHAtaWQ9IjU3OTUiLz4KICAgIDxwYXRoIGQ9Ik00OTQuOTMzMzMzIDMyNC4yNjY2NjdtLTE3LjA2NjY2NiAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzMzIDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzMgMFoiIHAtaWQ9IjU3OTYiLz4KICAgIDxwYXRoIGQ9Ik0zNTguNCA2NjUuNm0tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzQgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzNCAwWiIgcC1pZD0iNTc5NyIvPgogICAgPHBhdGggZD0iTTMyNC4yNjY2NjcgNTk3LjMzMzMzM20tMTcuMDY2NjY3IDBhMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMCAzNC4xMzMzMzMgMCAxNy4wNjY2NjcgMTcuMDY2NjY3IDAgMSAwLTM0LjEzMzMzMyAwWiIgcC1pZD0iNTc5OCIvPgogICAgPHBhdGggZD0iTTE1My42IDQyNi42NjY2NjdtLTE3LjA2NjY2NyAwYTE3LjA2NjY2NyAxNy4wNjY2NjcgMCAxIDAgMzQuMTMzMzM0IDAgMTcuMDY2NjY3IDE3LjA2NjY2NyAwIDEgMC0zNC4xMzMzMzQgMFoiIHAtaWQ9IjU3OTkiLz4KPC9zdmc+"
  },
  {
    name: "luoYu-xie",
    fillWidth: 0,
    labelPosition: "top",
    height: 1,
    marginBottom: 0,
    base64: "data:image/svg+xml;base64,PHN2ZyAgY29udGVudFNjcmlwdFR5cGU9InRleHQvZWNtYXNjcmlwdCIgd2lkdGg9IjEwMjQiIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIiB4bWxuczpzdmc9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB6b29tQW5kUGFuPSJtYWduaWZ5IiBjb250ZW50U3R5bGVUeXBlPSJ0ZXh0L2NzcyIgdmlld0JveD0iMCAxMzYgMTAyNCA3NTAiIGhlaWdodD0iNzUwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZlcnNpb249IjEuMCI+DQoJPHBhdGggZD0iTTAgMTM2LjUzMzMzM20xMzYuNTMzMzMzIDBsNzUwLjkzMzMzNCAwcTEzNi41MzMzMzMgMCAxMzYuNTMzMzMzIDEzNi41MzMzMzRsMCA0NzcuODY2NjY2cTAgMTM2LjUzMzMzMy0xMzYuNTMzMzMzIDEzNi41MzMzMzRsLTc1MC45MzMzMzQgMHEtMTM2LjUzMzMzMyAwLTEzNi41MzMzMzMtMTM2LjUzMzMzNGwwLTQ3Ny44NjY2NjZxMC0xMzYuNTMzMzMzIDEzNi41MzMzMzMtMTM2LjUzMzMzNFoiPjwvcGF0aD4NCgk8cGF0aCBkPSJNMzQuMTMzMzMzIDE3MC42NjY2NjdtMTAyLjQgMGw3NTAuOTMzMzM0IDBxMTAyLjQgMCAxMDIuNCAxMDIuNGwwIDQ3Ny44NjY2NjZxMCAxMDIuNC0xMDIuNCAxMDIuNGwtNzUwLjkzMzMzNCAwcS0xMDIuNCAwLTEwMi40LTEwMi40bDAtNDc3Ljg2NjY2NnEwLTEwMi40IDEwMi40LTEwMi40WiIgZmlsbD0iI0ZGRkZGRiI+PC9wYXRoPg0KPC9zdmc+"
  },
  {
    name: "qiaoSai-xie",
    fillWidth: 1,
    labelPosition: "middle",
    height: 0.5,
    base64: "data:image/svg+xml;base64,DQo8c3ZnIHQ9IjE2MDU4NDQ0MDc4MzQiIGNsYXNzPSJpY29uIiAgdmlld0JveD0iMjAgMjM4IDEwMTMgNTU2IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgcC1pZD0iNDgxMCINCiAgICAgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSI1MDAiIGhlaWdodD0iMjAwIiBwcmVzZXJ2ZUFzcGVjdFJhdGlvPSJub25lIj4NCiAgICA8cGF0aCBkPSJNMjM4LjkzMzMzMyAyNzMuMDY2NjY3aDU0Ni4xMzMzMzR2MTcwLjY2NjY2NkgyMzguOTMzMzMzeiIgcC1pZD0iMTAzMjkiPjwvcGF0aD4NCiAgICA8cGF0aCBkPSJNMjczLjA2NjY2NyAzMDcuMmg0NzcuODY2NjY2djEzNi41MzMzMzNIMjczLjA2NjY2N3oiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjEwMzMwIj48L3BhdGg+DQogICAgPHBhdGggZD0iTTY1LjMzMTIgNDQzLjczMzMzM0g5NTUuNzMzMzMzbDQxLjk0OTg2NyAxNzAuNjY2NjY3SDExOS4xNTk0Njd6IiBwLWlkPSIxMDMzMSI+PC9wYXRoPg0KICAgIDxwYXRoIGQ9Ik03NS4wOTMzMzMgNDc3Ljg2NjY2N2g4OTkuMTc0NEw5ODkuODY2NjY3IDU4MC4yNjY2NjdIMTA2LjI5MTJ6IiBmaWxsPSIjRkZGRkZGIiBwLWlkPSIxMDMzMiI+PC9wYXRoPg0KICAgIDxwYXRoIGQ9Ik0yOTkuNjU2NTMzIDYxNC40bDU1LjIyNzczNCAxNTMuNmgzNjguMDI1Nkw3NzguMjQgNjE0LjR6IiBwLWlkPSIxMDMzMyI+PC9wYXRoPg0KICAgIDxwYXRoIGQ9Ik03NTAuOTMzMzMzIDYyMS4yMjY2NjdsLTQzLjU1NDEzMyAxMzcuMjE2aC0zODkuMTJMMjcwLjg0OCA2MjEuMjI2NjY3eiIgZmlsbD0iI0ZGRkZGRiIgcC1pZD0iMTAzMzQiPjwvcGF0aD4NCiAgICA8cGF0aCBkPSJNNzUwLjkzMzMzMyA2NTUuMzZsNjguMjY2NjY3IDEwMi40aC0xMTcuMDQzMnoiIHAtaWQ9IjEwMzM1Ij48L3BhdGg+DQogICAgPHBhdGggZD0iTTc3Mi45MTUyIDYxNC40bDU1LjA1NzA2NyA3NS40MzQ2NjdoLTc3LjA3MzA2N3oiIHAtaWQ9IjEwMzM2Ij48L3BhdGg+DQogICAgPHBhdGggZD0iTTgwNC43OTU3MzMgNzUwLjkzMzMzM3oiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjEwMzM3Ij48L3BhdGg+DQogICAgPHBhdGggZD0iTTc0OC43MTQ2NjcgNjczLjg2MDI2N2w1Ny4xMzkyIDc3LjUxNjhoLTc5LjE4OTMzNHoiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjEwMzM4Ij48L3BhdGg+DQogICAgPHBhdGggZD0iTTc2OS41NzAxMzMgNjMzLjg5MDEzM2wzNy4zNDE4NjcgNDMuMzQ5MzM0aC0zNy4zNDE4NjdsLTE4LjY3MDkzMy0yNC43ODA4eiIgZmlsbD0iI0ZGRkZGRiINCiAgICAgICAgICBwLWlkPSIxMDMzOSI+PC9wYXRoPg0KICAgIDxwYXRoIGQ9Ik0zMTEuMzk4NCA2NTUuMzZsNTYuMzU0MTMzIDEwNS44MTMzMzNIMjQ2LjU0NTA2N3oiIHAtaWQ9IjEwMzQwIj48L3BhdGg+DQogICAgPHBhdGggZD0iTTMwMS42NzA0IDYxNC40bDkuNzI4IDMwLjIwOEwzMjMuNzIwNTMzIDY4Mi42NjY2NjdIMjI4LjkzMjI2N3oiIHAtaWQ9IjEwMzQxIj48L3BhdGg+DQogICAgPHBhdGggZD0iTTIyNi44MTYgNzUwLjkzMzMzM3oiIGZpbGw9IiNGRkZGRkYiIHAtaWQ9IjEwMzQyIj48L3BhdGg+DQogICAgPHBhdGggZD0iTTMxMC42NDc0NjcgNjcxLjgxMjI2N2wtNTAuNzU2MjY3IDc5LjAxODY2Nmg4My42NjA4eiIgZmlsbD0iI0ZGRkZGRiIgcC1pZD0iMTAzNDMiPjwvcGF0aD4NCiAgICA8cGF0aCBkPSJNMjkzLjQ3ODQgNjM4LjYzNDY2N2wtNDYuOTMzMzMzIDM3LjU4MDhoNDYuOTMzMzMzbDEyLjU5NTItMTcuNzgzNDY3eiIgZmlsbD0iI0ZGRkZGRiIgcC1pZD0iMTAzNDQiPjwvcGF0aD4NCiAgICA8cGF0aCBkPSJNMzMyLjk3MDY2NyA3NTAuOTMzMzMzbDE1LjA1MjggNTEuNDM4OTM0aDM2NC45NTM2TDcyOC41NDE4NjcgNzUwLjkzMzMzM3oiIHAtaWQ9IjEwMzQ1Ij48L3BhdGg+DQogICAgPHBhdGggZD0iTTM1NC45MTg0IDc1OC40MDg1MzNsNi41MTk0NjcgMjYuNjU4MTM0aDM0MC43MTg5MzNsOC43NzIyNjctMjYuNjU4MTM0eiIgZmlsbD0iI0ZGRkZGRiIgcC1pZD0iMTAzNDYiPjwvcGF0aD4NCiAgICA8cGF0aCBkPSJNNDQzLjczMzMzMyA0NzcuODY2NjY3aDEzNi41MzMzMzR2MTAyLjRoLTEzNi41MzMzMzR6IiBwLWlkPSIxMDM0NyI+PC9wYXRoPg0KICAgIDxwYXRoIGQ9Ik00NzcuODY2NjY3IDUyOS4wNjY2NjdMNDQzLjczMzMzMyA0NzcuODY2NjY3djEwMi40eiIgZmlsbD0iI0ZGRkZGRiIgcC1pZD0iMTAzNDgiPjwvcGF0aD4NCiAgICA8cGF0aCBkPSJNNTQ2LjEzMzMzMyA1MjkuMDY2NjY3bDM0LjEzMzMzNC01MS4ydjEwMi40eiIgZmlsbD0iI0ZGRkZGRiIgcC1pZD0iMTAzNDkiPjwvcGF0aD4NCiAgICA8cGF0aCBkPSJNNTAxLjAwOTA2NyA1ODEuNzY4NTMzbDUuMTItMTAuNjQ5Ni0yMi43MzI4LTM1LjIyNTYtMjkuNTI1MzM0IDQ1Ljg3NTJ6IiBmaWxsPSIjRkZGRkZGIiBwLWlkPSIxMDM1MCI+PC9wYXRoPg0KICAgIDxwYXRoIGQ9Ik01MjMuOTQ2NjY3IDU4MS43Njg1MzNsLTUuMTItMTAuNjQ5NiAyMi43NjY5MzMtMzUuMjI1NiAyOS41OTM2IDQ1Ljg3NTJ6IiBmaWxsPSIjRkZGRkZGIg0KICAgICAgICAgIHAtaWQ9IjEwMzUxIj48L3BhdGg+DQogICAgPHBhdGggZD0iTTUxMi4yNzMwNjcgNDk1LjQ3OTQ2N2wtMjMuODkzMzM0IDM1LjczNzYgMjMuODkzMzM0IDMyLjAxNzA2NiAyMy4xNzY1MzMtMzEuOTgyOTMzeiIgZmlsbD0iI0ZGRkZGRiINCiAgICAgICAgICBwLWlkPSIxMDM1MiI+PC9wYXRoPg0KICAgIDxwYXRoIGQ9Ik01MjIuMTAzNDY3IDQ3Ny44NjY2NjdsLTYuODI2NjY3IDExLjE5NTczMyAyNS4xNTYyNjcgMzMuMDc1MiAzMC43Mi00NC4zNzMzMzN6IiBmaWxsPSIjRkZGRkZGIg0KICAgICAgICAgIHAtaWQ9IjEwMzUzIj48L3BhdGg+DQogICAgPHBhdGggZD0iTTUwMS4yODIxMzMgNDc3Ljg2NjY2N2w2LjgyNjY2NyAxMS44Nzg0LTI1LjM5NTIgMzUuMDU0OTMzTDQ1MS43NTQ2NjcgNDc3Ljg2NjY2N3oiIGZpbGw9IiNGRkZGRkYiDQogICAgICAgICAgcC1pZD0iMTAzNTQiPjwvcGF0aD4NCjwvc3ZnPg=="
  }
], J0 = 3, X0 = 5, $0 = 5, q0 = 20, AC = 100, eC = 250, tC = 400, F = {
  TOOLS_SETTING: V0,
  JTWIDTH: J0,
  LEFT_MARGIN_WIDTH: X0,
  RIGHT_MARGIN_WIDTH: $0,
  MAX_CS: q0,
  _HIEGHT_INTERVAL: AC,
  LEFT_MARGIN: eC,
  RIGHT_MARGIN: tC
}, k = function() {
  let A = F.LEFT_MARGIN, e = 0, t = 0;
  return {
    setLeft(r) {
      r < A && (A = r);
    },
    setRight(r) {
      r > e && (e = r);
    },
    setBottom(r) {
      r > t && (t = r);
    },
    getLeft() {
      return A;
    },
    getRight() {
      return e;
    },
    getBottom() {
      return t;
    },
    reset() {
      A = F.LEFT_MARGIN, e = 0, t = 0;
    }
  };
}();
let An = aa().x((A) => A[0]).y((A) => A[1]);
const rC = 20;
String.prototype.visualLength = function(A = "12px", e = "SimSun") {
  let t = document.createElement("span");
  t.innerHTML = `${this}`, t.style.fontSize = A, t.style.fontFamily = e, document.body.appendChild(t);
  let r = t.offsetWidth;
  return t.remove(), r;
};
const Q = {
  getLineScale(A, e, t, r) {
    return ia().domain([A, e]).range([t, r]);
  },
  drawLineByD3(A, e, t) {
    return A.append("path").attr("stroke", "black").attr("stroke-width", t).attr("fill", "none").attr("d", An(e));
  },
  drawLineByD3Lower(A, e, t) {
    return A.append("path").lower().attr("stroke", "black").attr("stroke-width", t).attr("fill", "none").attr("d", An(e));
  },
  fillPathByD3(A, e, t, r) {
    A.append("path").attr("stroke", "black").attr("stroke-width", r).attr("fill", t).attr("d", An(e));
  },
  drawStringPath(A, e, t, r, n) {
    n = n || "black", A.append("path").lower().attr("d", e.toString()).style("fill", t).style("stroke", n).style("stroke-width", r);
  },
  getGrassData(A, e, t) {
    let r = [];
    for (let n = A + 5; n < e; n = n + 5) {
      let i = [];
      i.push({
        x: n,
        y: t
      }), i.push({
        x: n - 5,
        y: t + 10
      }), r.push(i);
    }
    return r;
  },
  drawGrass(A, e) {
    let t = aa().x((r) => r.x).y((r) => r.y);
    A.selectAll("path.monirline").data(e).enter().append("path").attr("class", "monirline").attr("d", (r) => t(r)).attr("stroke", "black");
  },
  drawText(A, e, t, r) {
    return A.append("text").text(e).attr("x", t).attr("y", r).attr("font-size", "12px").attr("font-family", "SimSun");
  },
  drawMultiLineText(A, e, t, r) {
    var n = A.append("text").attr("x", t).attr("y", r).attr("font-size", "12px").attr("font-family", "SimSun");
    return n.selectAll("tspan").data(e).enter().append("tspan").attr("x", n.attr("x")).attr("dy", "1em").text(function(i) {
      return i;
    }), n;
  },
  drawImage(A, e, t, r, n, i, s) {
    let o = A.append("image").attr("xlink:href", e).attr("x", t).attr("y", r).attr("width", n).attr("height", i);
    return s && o.attr("transform", `rotate(${s}, ${t}, ${r})`), o;
  },
  downloadImg(A, e) {
    let t = document.getElementById(e), r = document.body.style.overflow;
    document.body.style.overflow = "hidden", Is(t, {
      backgroundColor: "white",
      x: k.getLeft(),
      width: k.getRight() - k.getLeft() + 50,
      height: k.getBottom() + 150,
      onclone: function(n) {
        let i = parseFloat(t.style.width);
        n.querySelector("svg#wellConstruct").setAttribute("width", i), n.querySelector(".chart-container").style.marginLeft = "0px";
      }
    }).then((n) => {
      let i = document.createElement("a");
      i.href = n.toDataURL(), i.setAttribute("download", A + "\u4E95\u8EAB\u7ED3\u6784\u56FE.png"), i.style.display = "none", document.body.appendChild(i), i.click(), document.body.style.overflow = r, i.remove();
    });
  },
  getImageBase64(A) {
    let e = document.getElementById(A), t = document.body.style.overflow;
    return document.body.style.overflow = "hidden", Is(e, {
      backgroundColor: "white",
      x: k.getLeft(),
      width: k.getRight() - k.getLeft() + 50,
      height: k.getBottom() + 100,
      onclone: function(r) {
        let n = parseFloat(e.style.width);
        r.querySelector("svg#wellConstruct").setAttribute("width", n), r.querySelector(".chart-container").style.marginLeft = "0px";
      }
    }).then((r) => {
      let n = r.toDataURL();
      return document.body.style.overflow = t, n;
    });
  },
  drawRectByD3(A, e, t, r, n) {
    A.append("rect").attr("x", e).attr("y", t).attr("width", r).attr("height", n).attr("stroke", "black").attr("fill", "rgba(255, 255, 255, 0)");
  },
  fillRectByD3(A, e, t, r, n) {
    n <= 1 || r <= 1 || A.append("rect").attr("x", e + 0.5).attr("y", t + 1).attr("width", r - 1).attr("height", n - 1).attr("fill", "#ccc");
  },
  getTranform20(A, e, t, r = rC) {
    return t <= e ? A : Math.floor((t - e) * Math.tan(Math.PI * r / 180) + A);
  }
};
var b = {}, G = {}, xn = !0, Z = null, FA = {}, Le = 0;
let Wt = [];
function nC(A) {
  let e = document.getElementById(A).offsetWidth, t = sA("#" + A).select("svg"), r = [
    [F.LEFT_MARGIN, 0],
    [e, 0]
  ];
  Q.drawLineByD3(t, r, 3), k.setLeft(F.LEFT_MARGIN), k.setRight(e);
  let n = document.querySelector(".chart-title-center");
  n.style.width = e + F.LEFT_MARGIN + "px";
}
function iC(A) {
  document.getElementById(A).querySelector("svg").innerHTML = "", document.querySelector(".chart-box").style.width = "auto", document.getElementById(A).style.height = "100%", sA("#" + A).select("svg").attr("width", "100%").attr("height", 10), b = {}, G = {}, xn = !0, Z = null, FA = {};
}
function sC(A, e) {
  let t = document.getElementById(A).offsetWidth, r = document.getElementById(A).offsetHeight;
  e.tg.cs >= F.MAX_CS && (document.getElementById(A).style.height = r + Math.round(e.tg.cs / F.MAX_CS) * F._HIEGHT_INTERVAL + "px", r = document.getElementById(A).offsetHeight), sA("#" + A).select("svg").attr("width", t).attr("height", r);
}
function aC(A, e, t, r, n) {
  let i = sA("#" + n).select("svg"), s = document.getElementById(n).offsetWidth - F.LEFT_MARGIN, o = document.getElementById(n).offsetHeight, a = t * 2 + F.JTWIDTH + F.LEFT_MARGIN_WIDTH + F.RIGHT_MARGIN_WIDTH, B = Q.getLineScale(0, a, 0, s), g = Q.getLineScale(0, r, 0, o - 40), c = B(e + F.LEFT_MARGIN_WIDTH) + F.LEFT_MARGIN;
  ds(i, A, c, B, g, "left", e, a);
  let l = B(a - F.RIGHT_MARGIN_WIDTH - 1 - e) + F.LEFT_MARGIN;
  ds(i, A, l, B, g, "right", e, a), Z = A.zxd;
}
function ds(A, e, t, r, n, i, s, o) {
  let a = r(1), B = n(e.start), g = n(e.zxd), c = n(e.end), l = n(e.snfs), M = [], w = [], f = [], u = null;
  if (k.setBottom(c), (e.addition.name == "\u88F8\u773C" || e.addition.name == "\u7B5B\u7BA1") && (a = 0), e.zxd && e.end > e.zxd) {
    let C;
    if (e.zxd > e.start) {
      if (u = Q.getTranform20(t, g, c), e.addition.name == "\u88F8\u773C" || e.addition.name == "\u7B5B\u7BA1" ? i == "left" ? M = [
        [t, B],
        [t, g],
        [u, c]
      ] : (u += r(1), M = [
        [u, c],
        [t + r(1), g],
        [t + r(1), B]
      ]) : M = [
        [t, B],
        [t, g],
        [u, c],
        [u + a, c],
        [t + a, g],
        [t + a, B],
        [t, B]
      ], e.snfs != null && e.snfs > e.zxd) {
        let d = Q.getTranform20(t, g, l);
        w = [
          [d + 0.5, l + 0.5],
          [u + 0.5, c - 0.5],
          [u + a - 0.5, c - 0.5],
          [d + a - 0.5, l + 0.5],
          [d + 0.5, l + 0.5]
        ], C = d;
      }
      e.snfs != null && e.snfs <= e.zxd && (w = [
        [t + 0.5, l + 0.5],
        [t + 0.5, g],
        [u + 0.5, c - 0.5],
        [u + a - 0.5, c - 0.5],
        [t + a, g],
        [t + a - 0.5, l + 0.5],
        [t + 0.5, l + 0.5]
      ], C = t);
    } else {
      let d = Q.getTranform20(t, g, B);
      if (u = Q.getTranform20(t, g, c), e.addition.name == "\u88F8\u773C" || e.addition.name == "\u7B5B\u7BA1" ? i == "left" ? M = [
        [d, B],
        [u, c]
      ] : (u += r(1), M = [
        [u, c],
        [d + r(1), B]
      ]) : M = [
        [d, B],
        [u, c],
        [u + a, c],
        [d + a, B],
        [d, B]
      ], e.snfs != null && e.snfs >= e.start) {
        let N = Q.getTranform20(t, g, l);
        w = [
          [N + 0.5, l + 0.5],
          [u + 0.5, c - 0.5],
          [u + a - 0.5, c - 0.5],
          [N + a - 0.5, l + 0.5],
          [N + 0.5, l + 0.5]
        ], C = N;
      }
      e.snfs != null && e.snfs < e.start && (w = M);
    }
    let h = Q.getTranform20(t, g, c - 10), I = [i == "left" ? h + a : h, c - 10];
    if (f = [
      [u, c],
      [u + a, c],
      I
    ], i == "left")
      b = {
        x: u,
        y: c,
        zxdY: g,
        tgWidth: a
      };
    else {
      G = {
        x: u,
        y: c,
        zxdY: g,
        tgWidth: a
      };
      let d = FA[e.end], N = KA(d);
      d.iterator == 0 && Q.drawLineByD3(A, [
        [u + a, c],
        [u + s * a + 30, c]
      ], 1);
      let U = e.addition.start && e.addition.start != 0 ? "(" + e.addition.startString + "m - " + e.addition.endString + "m)" : e.addition.endString + "m";
      if (U = e.addition.name + ":D" + e.addition.wjString + "mm\xD7" + U, Q.drawText(A, U, u + s * a + 32, c - N + 5), d.iterator++, k.setRight(u + s * a + 32 + U.visualLength()), e.snfs && e.snfs > e.start) {
        let D = FA[e.snfs], L = KA(D);
        D.iterator == 0 && Q.drawLineByD3(A, [
          [C, l],
          [C + s * a + 30, l]
        ], 1);
        let y = "\u6C34\u6CE5\u8FD4\u6DF1:" + e.addition.snfsString + "m";
        Q.drawText(A, y, C + s * a + 32, l - L + 5), D.iterator++, k.setRight(C + s * a + 32 + y.visualLength());
      }
      if (xn) {
        let D = FA[e.zxd], L = KA(D);
        D.iterator == 0 && Q.drawLineByD3(A, [
          [t, n(e.zxd)],
          [t + s * a + 30, n(e.zxd)]
        ], 1);
        let y = "\u9020\u659C\u70B9:" + e.addition.zxdString + "m";
        Q.drawText(A, y, t + s * a + 32, n(e.zxd) - L), D.iterator++, xn = !1, k.setRight(t + s * a + 32 + y.visualLength());
      }
    }
  } else {
    e.addition.name == "\u88F8\u773C" || e.addition.name == "\u7B5B\u7BA1" ? i == "left" ? M = [
      [t, B],
      [t, c]
    ] : (t += r(1), M = [
      [t, c],
      [t, B]
    ]) : M = [
      [t, B],
      [t, c],
      [t + a, c],
      [t + a, B],
      [t, B]
    ], e.snfs != null && (w = [
      [t + 0.5, l + 0.5],
      [t + 0.5, c - 0.5],
      [t + a - 0.5, c - 0.5],
      [t + a - 0.5, l + 0.5],
      [t + 0.5, l + 0.5]
    ]);
    let C = [i == "left" ? t + a : t, c - 10];
    if (f = [
      [t, c],
      [t + a, c],
      C
    ], i == "left")
      b = {
        x: t,
        y: c,
        zxdY: void 0,
        tgWidth: a
      };
    else {
      G = {
        x: t,
        y: c,
        zxdY: void 0,
        tgWidth: a
      };
      let h = FA[e.end], I = KA(h);
      h.iterator == 0 && Q.drawLineByD3(A, [
        [t + a, c],
        [F.LEFT_MARGIN + r(o - 2), c]
      ], 1);
      let d = e.addition.start && e.addition.start != 0 ? "(" + e.addition.startString + "m - " + e.addition.endString + "m)" : e.addition.endString + "m";
      if (d = e.addition.name + ":D" + e.addition.wjString + "mm\xD7" + d, Q.drawText(A, d, F.LEFT_MARGIN + r(o - 2) + 3, c - I), h.iterator++, k.setRight(F.LEFT_MARGIN + r(o - 2) + 3 + d.visualLength()), e.snfs) {
        let N = FA[e.snfs], U = KA(N);
        N.iterator == 0 && Q.drawLineByD3(A, [
          [t, l],
          [F.LEFT_MARGIN + r(o - 2), l]
        ], 1);
        let D = "\u6C34\u6CE5\u8FD4\u6DF1:" + e.addition.snfsString + "m";
        Q.drawText(A, D, F.LEFT_MARGIN + r(o - 2) + 3, l - U), N.iterator++, k.setRight(F.LEFT_MARGIN + r(o - 2) + 3 + D.visualLength());
      }
    }
  }
  e.addition.name == "\u88F8\u773C" ? Q.drawLineByD3(A, M, 1) : e.addition.name == "\u7B5B\u7BA1" ? Q.drawLineByD3(A, M, 1).attr("stroke-dasharray", "2, 2") : (Q.fillPathByD3(A, M, "none", 1), Q.fillPathByD3(A, w, "#ccc", 0.6), Q.fillPathByD3(A, f, "#333", 0));
}
function KA(A) {
  return (Math.floor(A.count / 2) - A.iterator) * 12;
}
function Ns(A, e, t, r) {
  let n = Q.getGrassData(e, t, r);
  Q.drawGrass(A, n);
}
let Vt;
function oC(A, e) {
  if (!e.wellinfo.wzjs && !e.wellinfo.rgjd)
    return;
  e.wellinfo.wzjs == e.wellinfo.rgjd && (e.wellinfo.rgjd = null);
  let t = sA("#" + A).select("svg"), r = e.tg.cs, n = document.getElementById(A).clientHeight, i = Q.getLineScale(0, r, 0, n - 40), s = document.getElementById(A).offsetWidth - F.LEFT_MARGIN, o = e.tg.data.length - Le, a = o * 2 + F.JTWIDTH + F.LEFT_MARGIN_WIDTH + F.RIGHT_MARGIN_WIDTH, B = Q.getLineScale(0, a, 0, s), g = F.LEFT_MARGIN + B(F.LEFT_MARGIN_WIDTH + o), c = [], l, M, w, f = Math.max(i(e.wellinfo.rgjd), b.y - 30), u = Math.max(i(e.wellinfo.wzjs), b.y + 30), C = G.x + 30;
  if (Vt = f, !b.zxdY)
    e.wellinfo.wzjs && e.wellinfo.rgjd ? (c = [
      [b.x + b.tgWidth, f],
      [G.x, f],
      [G.x, G.y],
      [G.x + G.tgWidth, G.y],
      [G.x + G.tgWidth, u],
      [b.x, u],
      [b.x, b.y],
      [b.x + b.tgWidth, b.y]
    ], l = b.x + b.tgWidth, M = G.x, w = G.x + G.tgWidth, Q.fillPathByD3(t, c, "#ccc", 1), Ns(t, l, M, f)) : (c = [
      [G.x, G.y],
      [G.x, u],
      [b.x + b.tgWidth, u],
      [b.x + b.tgWidth, b.y]
    ], Q.fillPathByD3(t, c, "none", 1), w = G.x), C = F.LEFT_MARGIN + B(a - 2);
  else {
    let N = Q.getTranform20(G.x + G.tgWidth, G.y, u), U = Q.getTranform20(g, i(Z), f), D = U + B(F.JTWIDTH), L = Q.getTranform20(b.x, b.y, u);
    if (e.wellinfo.wzjs && e.wellinfo.rgjd)
      c = [
        [U + 1, f],
        [D, f],
        [G.x, G.y],
        [G.x + G.tgWidth, G.y],
        [N, u],
        [L, u],
        [b.x, b.y],
        [b.x + b.tgWidth + 1, b.y]
      ], l = U + 5, M = D, w = N, Q.fillPathByD3(t, c, "#ccc", 1), Ns(t, l, M, f);
    else {
      w = Q.getTranform20(G.x, G.y, u);
      let y = Q.getTranform20(b.x + G.tgWidth, b.y, u);
      c = [
        [G.x, G.y],
        [w, u],
        [y, u],
        [b.x + b.tgWidth, b.y]
      ], Q.fillPathByD3(t, c, "none", 1);
    }
  }
  if (e.wellinfo.rgjd) {
    Q.drawLineByD3(t, [
      [M, f],
      [C, f]
    ], 1);
    let N = e.wellinfo.addition.rgjdName + ":" + e.wellinfo.addition.rgjdString + "m";
    Q.drawText(t, N, C + 3, f + 6), k.setRight(C + 3 + N.visualLength());
  }
  let h = FA[e.wellinfo.wzjs], I = KA(h);
  h.iterator == 0 && Q.drawLineByD3(t, [
    [w, u],
    [C, u]
  ], 1);
  let d = "\u5B8C\u94BB\u4E95\u6DF1:" + e.wellinfo.addition.wzjsString + "m";
  Q.drawText(t, d, C + 3, u + 6 - I), k.setRight(C + 3 + d.visualLength()), k.setBottom(u);
}
function St(A, e, t) {
  return A >= e && A <= t;
}
function BC(A) {
  let e = A.length;
  if (e <= 1)
    return;
  for (let r = 0; r < e - 1; r++) {
    let n = A[r];
    for (let i = r + 1; i < e; i++) {
      let s = A[i].start, o = A[i].end;
      (St(n.start, s, o) || St(n.end, s, o)) && (n.intersection = !0);
    }
  }
  let t = A[e - 1];
  for (let r = 0; r < e - 1; r++) {
    let n = A[r].start, i = A[r].end;
    (St(t.start, n, i) || St(t.end, n, i)) && (t.intersection = !0);
  }
}
function gC(A, e) {
  if (!(!e.sy || e.sy.length < 1)) {
    BC(e.sy);
    for (let t = 0; t < e.sy.length; t++)
      lC(A, t, e);
  }
}
function Us(A, e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    for (let n = 0; n < e[r].data.length; n++)
      if (A >= e[r].data[n].start && A <= e[r].data[n].end && e[r].data[n].addition.name != "\u88F8\u773C" && e[r].data[n].addition.name != "\u7B5B\u7BA1") {
        t = e[r].xh;
        break;
      }
    if (t)
      break;
  }
  return t;
}
function cC(A, e, t, r) {
  let n = Us(A.start, e), i = Us(A.end, e);
  return n = t(n + F.LEFT_MARGIN_WIDTH) + F.LEFT_MARGIN, i = t(i + F.LEFT_MARGIN_WIDTH) + F.LEFT_MARGIN, Z && Z < A.start && (n = Q.getTranform20(n, r(Z), r(A.start))), Z && Z < A.end && (i = Q.getTranform20(i, r(Z), r(A.end))), {
    top: n,
    bottom: i
  };
}
function lC(A, e, t) {
  let r = t.sy[e], n = sA("#" + A).select("svg"), i = document.getElementById(A).offsetWidth - F.LEFT_MARGIN, s = document.getElementById(A).offsetHeight;
  var o = t.tg.data.length - Le;
  let a = o * 2 + F.JTWIDTH + F.LEFT_MARGIN_WIDTH + F.RIGHT_MARGIN_WIDTH, B = Q.getLineScale(0, a, 0, i), g = Q.getLineScale(0, t.tg.cs, 0, s - 40), c = cC(r, t.tg.data, B, g);
  if (Z) {
    let l = c.top, M = c.bottom, w = l - 120, f = l, u = M - 120, C = M;
    r.intersection && (w = w - e * 120, f = f - e * 120, C = C - e * 120, u = u - e * 120), Q.drawLineByD3(n, [
      [w, g(r.start)],
      [f, g(r.start)]
    ], 1), Q.drawLineByD3(n, [
      [u, g(r.end)],
      [C, g(r.end)]
    ], 1);
    let h = [r.addition.title || "", (r.addition.syjd1String || "") + "-" + (r.addition.syjd2String || "") + "m", (r.addition.hdString || "") + "m/" + (r.addition.cs || "")];
    r.addition.cs !== "\u88F8\u773C" && h[h.length - 1];
    let I = (g(r.end) - g(r.start) - 36) / 2 + g(r.start);
    I = Math.max(I, g(r.start)), Q.drawMultiLineText(n, h, u, I), k.setLeft(w);
  } else {
    let l = c.top - 120, M = c.top;
    r.intersection && (l = l - e * 120, M = M - e * 120), Q.drawLineByD3(n, [
      [l, g(r.start)],
      [M, g(r.start)]
    ], 1), Q.drawLineByD3(n, [
      [l, g(r.end)],
      [M, g(r.end)]
    ], 1);
    let w = [r.addition.title || "", (r.addition.syjd1String || "") + "-" + (r.addition.syjd2String || "") + "m"], f = [(r.addition.hdString || "") + "m/" + (r.addition.cs || "")];
    r.addition.cs !== "\u88F8\u773C" && (f[f.length - 1] += "\u5C42");
    let u = (g(r.end) - g(r.start) - 36) / 2 + g(r.start);
    u = Math.max(u, g(r.start)), Q.drawMultiLineText(n, w, l, u), Q.drawMultiLineText(n, f, l + 26, u + 18), k.setLeft(l - 75);
  }
}
function uC(A) {
  let e = 0;
  for (let t = 0; t < A.length; t++) {
    let r = A[t];
    r.data.length == 1 && (r.data[0].addition.name == "\u88F8\u773C" || r.data[0].addition.name == "\u7B5B\u7BA1") && e++;
  }
  return e;
}
function wC(A, e) {
  let t = e.tg.data, r = t.length;
  r -= Le;
  let n = e.tg.cs;
  for (let i = 0; i < t.length; i++) {
    let s = t[i];
    for (let o = 0; o < s.data.length; o++)
      aC(s.data[o], s.xh, r, n, A);
  }
}
function fC(A, e) {
  let t = 0;
  for (let r = e.length - 1; r >= 0; r--) {
    let n = e[r];
    for (let i = 0; i < n.data.length; i++)
      if (n.data[i].start <= A && n.data[i].end >= A && n.data[i].addition.name != "\u88F8\u773C" && n.data[i].addition.name != "\u7B5B\u7BA1") {
        t = n.xh + 1;
        break;
      }
    if (t)
      break;
  }
  return t;
}
function Fs(A, e, t) {
  let r = sA("#" + A).select("svg"), n = document.getElementById(A).offsetWidth - F.LEFT_MARGIN, i = document.getElementById(A).offsetHeight, s = Q.getLineScale(0, e.tg.cs, 0, i - 40), o = e.tg.data.length - Le, a = o * 2 + F.JTWIDTH + F.LEFT_MARGIN_WIDTH + F.RIGHT_MARGIN_WIDTH, B = Q.getLineScale(0, a, 0, n);
  if (!e[t] || e[t].length < 1)
    return;
  Wt = [];
  let g = !1, c = !1;
  if (t == "jdgj") {
    let w = e[t].map((f) => f.name);
    w.indexOf("shaMian") > -1 && (w.indexOf("huiMian") > -1 || w.indexOf("qiaoSai") > -1) && (c = !0);
  }
  for (let w = 0; w < e[t].length; w++) {
    let f = 0, u = e[t][w];
    if (u.name == "youGuan")
      continue;
    let C = Object.assign({}, F.TOOLS_SETTING.find((T) => T.name == u.name));
    C.height = C.height < 1 && C.fillWidth != 3 && e.tg.cs > F.MAX_CS ? C.height + 0.2 : C.height;
    var l = s(C.height < 2 ? C.height : u.end - u.start);
    let h = co(l, C.labelPosition), I = s(C.height < 2 ? u.start : u.end) - h, d = fC(u.start, e.tg.data), N = C.fillWidth == 1 || C.fillWidth == 3 ? d : o, U = F.LEFT_MARGIN + B(F.LEFT_MARGIN_WIDTH + N), D = B(1), L = Vt - I - l;
    var M;
    let y = !1;
    if (u.name === "shaMian")
      if (w === e[t].length - 1)
        M = Vt - I - l, console.log("\u627E\u4EBA\u5DE5\u4E95\u5E95"), y = !0;
      else {
        console.log("\u627E\u94BB\u5177");
        let T = s(C.height < 2 ? e[t][w + 1].start : e[t][w + 1].end) - h, S = Vt - T - l;
        M = e[t][w + 1].name ? L - S - l : I, y = !1;
      }
    e[t][w].name === "daoZhui" || e[t][w].name === "siDu" ? e[t][w + 1] && (Wt.push([!0, e[t][w].start, U, I, D, l, f]), g = !0) : g && (g = !1, Wt.push([!1, e[t][w].start, U, I, D, l, f])), Z && Z < (C.height < 2 ? u.start : u.end) && (U = Math.ceil(Q.getTranform20(U, s(Z), I)), u.name == "luoYu" && (U += 9), f = -20, t == "jdgj" && (f = 0, C = F.TOOLS_SETTING.find((T) => T.name == u.name + "-xie")));
    let K = B(F.JTWIDTH);
    if (C.fillWidth == 0)
      if (U += B(1), C.height < 2)
        Q.drawImage(r, C.base64, U, I, D, l, f);
      else {
        let T = r.append("g").attr("id", "dangan-elements"), S = Math.max(u.start, Z);
        for (let P = 0; P < S - u.start; P++)
          r.append("image").attr("xlink:href", C.base64).attr("x", U).attr("y", I + s(1) * P).attr("width", D).attr("height", s(1));
        let aA = I + s(S - u.start);
        for (let P = 0; P < u.end - S; P++)
          T.append("image").attr("xlink:href", C.base64).attr("x", U).attr("y", aA + s(1) * P).attr("width", D).attr("height", s(1) + 0.5);
        T.attr("transform", `rotate(${f}, ${U}, ${aA})`), I = Z ? I - l * Math.sin(Math.PI * 20 / 180) * Math.sin(Math.PI * 20 / 180) + 10 : I;
      }
    else if (C.fillWidth == 2)
      U += B(0.5), D = K - B(1), Q.drawImage(r, C.base64, U, I, D, l, f);
    else if (C.fillWidth == 3)
      D = B(o - d + 1), Q.drawImage(r, C.base64, U + (e[t][w].name === "fengGeQi" ? 0 : 1), I, D, l, f), Z && u.start >= Z ? (Q.drawImage(r, C.base64, U + D + K, I + s(0.1), D, l, f - 180), D = D + K + D) : (Q.drawImage(r, C.base64, U + D + B(1) - (e[t][w].name === "fengGeQi" ? 2 : 1), I, D, l).attr("transform", `rotate(-180, ${U + D + B(1) - 1 + D / 2}, ${I + l / 2})`), D = D + D + B(1));
    else {
      D = K + B((o - d) * 2);
      let T = D;
      if (t == "jdgj" && Z && Z < (C.height < 2 ? u.start : u.end) && (U += 1, T += l * Math.tan(Math.PI * 20 / 180) + 2), u.addition.smAble === "true")
        Q.drawImage(r, C.base64, U, I, T, l, f);
      else if (c) {
        let S;
        S = u.name == "shaMian" ? I + M + 1.5 : I, Q.drawImage(r, C.base64, U - 0.8, S, T + 1.6, l, f);
      } else
        u.name == "shaMian" ? Q.drawImage(r, C.base64, U - 0.8, I + L + 1, T + 1.6, l, f) : Q.drawImage(r, C.base64, U, I, T, l, f);
    }
    let z = U + D;
    t == "jdgj" && Z && Z < (C.height < 2 ? u.start : u.end) && (z += h * Math.tan(Math.PI * 20 / 180)), u.name == "daoZhui" ? z -= D / 2 : u.name == "biJian" && (z -= D);
    let x = z + B(o + 3), v = FA[C.height < 2 ? u.start : u.end];
    if (v.iterator == 0)
      if (u.addition.smAble === "true") {
        let T = u.name == "qiaoSai" ? 11 : 0;
        Q.drawLineByD3(r, [
          [z, I + h + T],
          [x, I + h + T]
        ], 1);
      } else if (c) {
        let T;
        T = u.name == "shaMian" ? M : 0;
        let S = u.name == "qiaoSai" ? 11 : 0;
        Q.drawLineByD3(r, [
          [z, I + h + T + 2 + S],
          [x, I + h + T + 2 + S]
        ], 1);
      } else if (u.name == "shaMian")
        Q.drawLineByD3(r, [
          [z, I + L + 1],
          [x, I + L + 1]
        ], 1);
      else {
        let T = u.name == "qiaoSai" ? 11 : 0;
        Q.drawLineByD3(r, [
          [z, I + h + T],
          [x, I + h + T]
        ], 1);
      }
    let O = KA(v), $ = u.addition.mc + ":" + u.addition.sdString + "m";
    if (u.addition.smAble === "true") {
      let T = u.name == "qiaoSai" ? 11 : 0;
      Q.drawText(r, $, x + 3, I + h - O + 5 + T);
    } else if (c) {
      let T;
      T = u.name == "shaMian" ? M : 0;
      let S = u.name == "qiaoSai" ? 11 : 0;
      Q.drawText(r, $, x + 3, I + h + T + 5 + S);
    } else if (u.name == "shaMian")
      Q.drawText(r, $, x + 3, I + h + L + 6);
    else {
      let T = u.name == "qiaoSai" ? 11 : 0;
      Q.drawText(r, $, x + 3, I + h - O + 5 + T);
    }
    v.iterator++, k.setRight(x + 3 + $.visualLength() + 10);
  }
}
function co(A, e) {
  switch (e) {
    case "middle":
      return A / 2;
    case "top":
      return 0;
    case "bottom":
      return A;
    default:
      return A;
  }
}
function MC(A, e) {
  let t = sA("#" + A).select("svg"), r = document.getElementById(A).offsetWidth - F.LEFT_MARGIN, n = document.getElementById(A).offsetHeight, i = Q.getLineScale(0, e.tg.cs, 0, n - 40), s = e.tg.data.length - Le, o = s * 2 + F.JTWIDTH + F.LEFT_MARGIN_WIDTH + F.RIGHT_MARGIN_WIDTH, a = Q.getLineScale(0, o, 0, r), B = e.zj.find((w) => w.name == "youGuan"), g = Math.max.apply(null, e.zj.filter((w) => w.name != "youGuan").map((w) => w.start)), c = F.LEFT_MARGIN + a(F.LEFT_MARGIN_WIDTH + s);
  if (e.zj.length == 0)
    return;
  let l;
  if (B)
    l = i(B.start);
  else {
    e.zj.sort(function(h, I) {
      return h.start - I.start;
    });
    let w = e.zj[e.zj.length - 1], f = F.TOOLS_SETTING.find((C) => C.name == w.name);
    var M = i(f.height < 2 ? f.height : w.end - w.start);
    let u = co(M, f.labelPosition);
    l = B ? i(B.start) : i(f.height < 2 ? w.start : w.end) - u;
  }
  if (Z && g > Z) {
    let w = Q.getTranform20(c + a(1), i(Z), l);
    Q.drawLineByD3Lower(t, [
      [c + a(1), 0],
      [c + a(1), i(Z)],
      [w, l]
    ], 1);
    let f = Q.getTranform20(c + a(2), i(Z), l);
    Q.drawLineByD3Lower(t, [
      [c + a(2), 0],
      [c + a(2), i(Z)],
      [f, l]
    ], 1), Q.drawLineByD3Lower(t, [
      [w, l],
      [f, l]
    ], 1), B && (Q.drawLineByD3(t, [
      [f, l - Math.sin(Math.PI * 20 / 180) * a(1)],
      [f + a(s) / Math.sin(Math.PI * 20 / 180), l - Math.sin(Math.PI * 20 / 180) * a(1)]
    ], 1), Q.drawText(t, B.addition.mc + ":" + B.addition.sdString + "m", f + a(s) / Math.sin(Math.PI * 20 / 180) + 3, l - Math.sin(Math.PI * 20 / 180) * a(1) + 5));
  } else if ([a(1), a(2)].forEach((w) => {
    let f = tt();
    f.moveTo(c + w, 0), Wt.forEach((u) => {
      u[0] ? f.lineTo(u[2] + w, u[3]) : f.moveTo(u[2] + w, u[3]);
    }), f.lineTo(c + w, l), Q.drawStringPath(t, f, "none", 1);
  }), Q.drawLineByD3Lower(t, [
    [c + a(1), l],
    [c + a(2), l]
  ], 1), B) {
    let w = FA[B.start];
    w.iterator == 0 && Q.drawLineByD3(t, [
      [c + a(2), l],
      [F.LEFT_MARGIN + a(o - 2), l]
    ], 1);
    let f = KA(w);
    Q.drawText(t, B.addition.mc + ":" + B.addition.sdString + "m", F.LEFT_MARGIN + a(o - 2) + 3, l - f + 5), w.iterator++;
  }
}
function CC(A) {
  for (let e in A)
    FA[e] = {
      count: A[e],
      iterator: 0
    };
}
const QC = function(A, e, t) {
  k.reset(), iC(e), !(!A.tg.cs || A.tg.data.length < 1) && (sC(e, A), nC(e, A.title), CC(A.labelCount), Le = uC(A.tg.data), wC(e, A), oC(e, A), gC(e, A), Fs(e, A, "jdgj"), t && (Fs(e, A, "zj"), MC(e, A)), document.querySelector(".chart-box").style.width = G.x + F.RIGHT_MARGIN + "px");
};
var Y = {}, H = {}, Ze = {}, PA = {}, m = null;
function hC(A) {
  let e = document.getElementById(A).offsetWidth, t = sA("#" + A).select("svg"), r = [
    [e - F.LEFT_MARGIN, 0],
    [e, 0]
  ];
  k.setLeft(F.LEFT_MARGIN), Q.drawLineByD3(t, r, 3);
  let n = document.querySelector(".chart-title-center");
  n.style.width = e + F.LEFT_MARGIN + "px";
}
function IC(A) {
  document.getElementById(A).querySelector("svg").innerHTML = "", document.querySelector(".chart-box").style.width = "auto", document.getElementById(A).style.height = "100%", sA("#" + A).select("svg").attr("width", "100%").attr("height", 10), Y = {}, H = {}, Ze = {}, PA = {}, m = null;
}
function dC(A, e) {
  let t = document.getElementById(A).offsetWidth, r = document.getElementById(A).offsetHeight;
  e.tg.cs >= F.MAX_CS && (document.getElementById(A).style.height = r + Math.round(e.tg.cs / F.MAX_CS) * F._HIEGHT_INTERVAL + "px", r = document.getElementById(A).offsetHeight), sA("#" + A).select("svg").attr("width", t).attr("height", r);
}
function NC(A, e, t, r, n, i) {
  let s = sA("#" + n).select("svg"), o = document.getElementById(n).offsetWidth - F.LEFT_MARGIN, a = document.getElementById(n).offsetHeight, B = t * 2 + F.JTWIDTH + F.LEFT_MARGIN_WIDTH + F.RIGHT_MARGIN_WIDTH, g = Q.getLineScale(0, B, 0, o), c = Q.getLineScale(0, r, 0, a - 40), l = F.LEFT_MARGIN + g(e + F.LEFT_MARGIN_WIDTH), M = g(1);
  Ds(s, A, l, M, c, "left", e, t, i);
  let w = F.LEFT_MARGIN + g(B - F.RIGHT_MARGIN_WIDTH - 1 - e);
  Ds(s, A, w, M, c, "right", e, t, i), m = A.zxd;
}
function Ds(A, e, t, r, n, i, s, o, a) {
  let B = n(e.start), g = n(e.zxd), c = n(e.end), l = n(e.snfs), M = [], w = [], f = [];
  if (e.zxd && e.end > e.zxd) {
    let u = n(1);
    if (u += i == "left" ? F.JTWIDTH * r + o * r + (o - s - 1) * r : s * r, e.zxd > e.start) {
      let h = tt();
      if (h.moveTo(t, B), h.lineTo(t, g), h.quadraticCurveTo(t, g + u, t + u, g + u), h.lineTo(t + u + c - g, g + u), h.lineTo(t + u + c - g, g + u - r), h.lineTo(t + u, g + u - r), h.quadraticCurveTo(t + r, g + u - r, t + r, g), h.lineTo(t + r, B), h.closePath(), Q.drawStringPath(A, h, "none", 1), e.snfs != null && e.snfs > e.zxd && (w = [
        [t + u + c - g, g + u],
        [t + u + l - g, g + u],
        [t + u + l - g, g + u - r],
        [t + u + c - g, g + u - r],
        [t + u + c - g, g + u]
      ]), e.snfs != null && e.snfs <= e.zxd) {
        let I = tt();
        I.moveTo(t, l + 0.5), I.lineTo(t, g), I.quadraticCurveTo(t, g + u, t + u, g + u), I.lineTo(t + u + c - g, g + u), I.lineTo(t + u + c - g, g + u - r), I.lineTo(t + u, g + u - r), I.quadraticCurveTo(t + r, g + u - r, t + r, g), I.lineTo(t + r, l + 0.5), I.closePath(), Q.drawStringPath(A, I, "#ccc", 0.6);
      }
    } else
      M = [
        [t + u + c - g, g + u],
        [t + u + B - g, g + u],
        [t + u + B - g, g + u - r],
        [t + u + c - g, g + u - r],
        [t + u + c - g, g + u]
      ], e.snfs != null && e.snfs >= e.start && (w = [
        [t + u + c - g, g + u],
        [t + u + l - g, g + u],
        [t + u + l - g, g + u - r],
        [t + u + c - g, g + u - r],
        [t + u + c - g, g + u]
      ]), e.snfs != null && e.snfs < e.start && (w = M);
    let C = [t + u + c - g - 10, i == "left" ? g + u - r : g + u];
    if (f = [[t + u + c - g, g + u], [t + u + c - g, g + u - r], C], i == "left") {
      Y = { x: t + u + c - g, y: g + u, dx: c, zxdY: g, tgWidth: r, originZXD: e.zxd, xh: s }, Q.drawLineByD3(A, [[t + u + c - g, g + u], [t + u + c - g, g + u + (o - s + 1) * r + a * n(1)]], 1);
      let h = e.addition.start && e.addition.start != 0 ? "(" + e.addition.start + "m - " + e.addition.end + "m)" : e.addition.end + "m", I = [e.addition.name + ":", "D" + e.wj + "mm\xD7" + h], d = Math.max.call(I[0].visualLength(), I[1].visualLength());
      Q.drawMultiLineText(A, I, t + u + c - g + d * 0.2, g + u + (o - s + 1) * r + a * n(1)).attr("transform", "rotate(-90, " + (t + u + c - g) + "," + (g + u + (o - s + 1) * r + a * n(1)) + ") translate(-" + d + ", 0)"), k.setBottom(g + u + (o - s + 1) * r + a * n(1));
    } else {
      if (H = { x: t + u + c - g, y: g + u, dx: c, zxdY: g, tgWidth: r, originZXD: e.zxd, xh: s }, e.snfs && e.snfs > e.start && e.snfs < e.zxd && (Q.drawLineByD3(A, [[t, l], [t + s * r + 30, l]], 1), Q.drawText(A, "\u6C34\u6CE5\u8FD4\u6DF1:" + e.addition.snfsString + "m", t + s * r + 32, l + 5)), e.snfs && e.snfs > e.start && e.snfs > e.zxd) {
        let h = PA[e.snfs], I = Ue(h);
        h.iterator == 0 && (Tr("\u6C34\u6CE5\u8FD4\u6DF1") === "top" ? (Q.drawLineByD3(A, [[t + u + l - g, g + u], [t + u + l - g, g - s * r]], 1), Q.drawText(A, "\u6C34\u6CE5\u8FD4\u6DF1:" + e.addition.snfsString + "m", t + u + l - g - I - 5, g - s * r - 5).attr("transform", "rotate(-90, " + (t + u + l - g - I - 5) + "," + (g - s * r - 5) + ")"), h.iterator++) : (Q.drawLineByD3(A, [[t + u + l - g, l + (2 * s + 3) * r + u], [t + u + l - g, l + (s + 3) * r]], 1), Q.drawText(A, "\u6C34\u6CE5\u8FD4\u6DF1:" + e.addition.snfsString + "m", t + u + l - g - I - 5, g + (2 * s + 2) * r + 3 + 2 * u).attr("transform", "rotate(-90, " + (t + u + l - g - I + 15) + "," + (g + (2 * s + 2) * r + 3 + 2 * u + 25) + ")")));
      }
      if (!Ze.isDraw) {
        let h = PA[e.zxd], I = Ue(h);
        h.iterator == 0 && Q.drawLineByD3(A, [[t + r, g], [t + s * r + 30, g]], 1), Q.drawText(A, "\u9020\u659C\u70B9:" + e.addition.zxdString + "m", t + s * r + 32, g - I), Ze.isDraw = !0, Ze.x = t, Ze.xh = s, h.iterator++;
      }
    }
  } else {
    M = [[t, B], [t, c], [t + r, c], [t + r, B], [t, B]], k.setBottom(c), e.snfs != null && (w = [[t + 0.5, l + 0.5], [t + 0.5, c - 0.5], [t + r - 0.5, c - 0.5], [t + r - 0.5, l + 0.5]]);
    let u = [i == "left" ? t + r : t, c - 10];
    if (f = [[t, c], [t + r, c], u], i == "left")
      Y = { x: t, y: c, zxdY: void 0, tgWidth: r, dx: t };
    else {
      H = { x: t, y: c, zxdY: void 0, tgWidth: r, dx: t };
      let C = e.addition.start && e.addition.start != 0 ? "(" + e.addition.startString + "m - " + e.addition.endString + "m)" : e.addition.endString + "m";
      C = e.addition.name + ":D" + e.addition.wjString + "mm\xD7" + C;
      let h = PA[e.end], I = Ue(h);
      if (h.iterator == 0 && Q.drawLineByD3(A, [[t + r, c], [t + s * r + 30, c]], 1), Q.drawText(A, C, t + s * r + 32, c - I + 5), h.iterator++, e.snfs) {
        let d = PA[e.snfs], N = Ue(d);
        d.iterator == 0 && Q.drawLineByD3(A, [[t, l], [t + s * r + 30, l]], 1), Q.drawText(A, "\u6C34\u6CE5\u8FD4\u6DF1:" + e.addition.snfsString + "m", t + s * r + 32, l - N + 5), d.iterator++;
      }
    }
  }
  Q.fillPathByD3(A, M, "none", 1), Q.fillPathByD3(A, w, "#ccc", 0.6), Q.fillPathByD3(A, f, "#333", 0);
}
function UC(A, e) {
  if (!e.wellinfo.wzjs && !e.wellinfo.rgjd || !Y.zxdY)
    return;
  e.wellinfo.wzjs == e.wellinfo.rgjd && (e.wellinfo.rgjd = null);
  let t = sA("#" + A).select("svg"), r = e.tg.cs, n = document.getElementById(A).clientHeight, i = Q.getLineScale(0, r, 0, n - 40), s = [], o = Math.min(H.x + 30, H.x - (H.dx - i(e.wellinfo.wzjs))), a = H.y;
  if (e.wellinfo.wzjs && e.wellinfo.rgjd) {
    let c = Math.max(H.x - 30, H.x - (H.dx - i(e.wellinfo.rgjd)));
    s = [
      [c, Y.y - Y.tgWidth],
      [Y.x, Y.y - Y.tgWidth],
      [Y.x, Y.y],
      [o, Y.y],
      [o, H.y - H.tgWidth],
      [H.x, H.y - H.tgWidth],
      [H.x, H.y],
      [c, H.y],
      [c, Y.y - Y.tgWidth]
    ];
    let l = Tr(e.wellinfo.addition.rgjdName), M = e.wellinfo.addition.rgjdName + ":" + e.wellinfo.addition.rgjdString + "m";
    l === "top" ? (Q.drawLineByD3(t, [
      [c, H.y - H.tgWidth],
      [c, H.y - H.tgWidth - 32]
    ], 1), Q.drawText(t, M, c, H.y - H.tgWidth - 38).attr("transform", `rotate(-90, ${c}, ${H.y - H.tgWidth - 38}) `)) : (Q.drawLineByD3(t, [
      [c, Y.y],
      [c, Y.y + 32]
    ], 1), Q.drawText(t, M, c - 8, Y.y + 32 + M.visualLength()).attr("transform", `rotate(-90, ${c - 8}, ${Y.y + 32 + M.visualLength() - 20}) `)), Q.fillPathByD3(t, s, "#ccc", 0.5), a = a - H.tgWidth;
  } else
    s = [
      [H.x, H.y],
      [o, H.y],
      [Y.x + (i(e.wellinfo.wzjs) - Y.dx), Y.y - Y.tgWidth],
      [Y.x, Y.y - Y.tgWidth]
    ], Q.fillPathByD3(t, s, "none", 1);
  let B = "\u5B8C\u94BB\u4E95\u6DF1:" + e.wellinfo.addition.wzjsString + "m";
  Q.drawLineByD3(t, [
    [o, a],
    [o, H.y - H.tgWidth - 32]
  ], 1), Q.drawText(t, B, o, H.y - H.tgWidth - 38).attr("transform", `rotate(-90, ${o}, ${H.y - H.tgWidth - 38}) `), k.setRight(o + B.visualLength());
}
function Ue(A) {
  return (Math.floor(A.count / 2) - A.iterator) * 12;
}
function bt(A, e, t) {
  return A >= e && A <= t;
}
function Tr(A) {
  let e;
  return sessionStorage.getItem("topOrBottom") || sessionStorage.setItem("topOrBottom", "{}"), e = JSON.parse(sessionStorage.getItem("topOrBottom")), e[A] || (e[A] = "top", sessionStorage.setItem("topOrBottom", JSON.stringify(e)), e = JSON.parse(sessionStorage.getItem("topOrBottom"))), e[A];
}
function FC(A) {
  let e = A.length;
  if (e <= 1)
    return;
  for (let r = 0; r < e - 1; r++) {
    let n = A[r];
    for (let i = r + 1; i < e; i++) {
      let s = A[i].start, o = A[i].end;
      (bt(n.start, s, o) || bt(n.end, s, o)) && (n.intersection = !0);
    }
  }
  let t = A[e - 1];
  for (let r = 0; r < e - 1; r++) {
    let n = A[r].start, i = A[r].end;
    (bt(t.start, n, i) || bt(t.end, n, i)) && (t.intersection = !0);
  }
}
function DC(A, e) {
  if (!(!e.sy || e.sy.length < 1)) {
    FC(e.sy);
    for (let t = 0; t < e.sy.length; t++)
      EC(A, t, e);
  }
}
function lo(A, e) {
  let t = 0;
  for (let r = 0; r < e.length; r++) {
    for (let n = 0; n < e[r].data.length; n++)
      if (A >= e[r].data[n].start && A <= e[r].data[n].end) {
        t = e[r].xh;
        break;
      }
    if (t)
      break;
  }
  return t;
}
function yC(A, e, t) {
  let r = lo(A.start, e);
  return r = t(r + F.LEFT_MARGIN_WIDTH) + F.LEFT_MARGIN, { top: r };
}
function EC(A, e, t) {
  let r = t.sy[e], n = sA("#" + A).select("svg"), i = document.getElementById(A).offsetHeight, s = Q.getLineScale(0, t.tg.cs, 0, i - 40), o = document.getElementById(A).offsetWidth - F.LEFT_MARGIN, a = t.tg.data.length * 2 + F.JTWIDTH + F.LEFT_MARGIN_WIDTH + F.RIGHT_MARGIN_WIDTH, B = Q.getLineScale(0, a, 0, o), g = B(1), c = t.tg.data.length;
  if (!!m)
    if (r.start > Y.originZXD) {
      let l = Y.x - (Y.dx - s(r.start)), M = Y.x - (Y.dx - s(r.end)), w = lo(r.start, t.tg.data), f = Y.y + g * (c - w - 1), u = f + 120;
      r.intersection && (u = u + e * 120, f = f + e * 120);
      let C = [r.addition.title || "", (r.addition.syjd1String || "") + "-" + (r.addition.syjd2String || "") + "m", (r.addition.hdString || "") + "m/" + (r.addition.cs || "") + "\u5C42"], h = Math.max(C[0].visualLength(), C[1].visualLength(), C[2].visualLength());
      Q.drawLineByD3(n, [[l + B(2), f], [l + B(2), u]], 1), Q.drawLineByD3(n, [[M + B(2), f], [M + B(2), u]], 1);
      let I = (M - l - 36) / 2;
      Q.drawMultiLineText(n, C, l, f + B(2)).attr("transform", "rotate(-90, " + l + "," + f + ")  translate(" + (-h - 10) + ", " + I + ")"), k.setBottom(u);
    } else {
      let M = yC(r, t.tg.data, B).top, w = M - 120, f = s(r.start), u = r.end > Y.originZXD ? Y.zxdY + s(1) + F.JTWIDTH * g + c * g + (c - Y.xh - 1) * g : s(r.end);
      r.intersection && (M = M - 120 * e, w = w - 120 * e), Q.drawLineByD3(n, [[w, f], [M, f]], 1), Q.drawLineByD3(n, [[w, u], [M, u]], 1);
      let C = [r.addition.title || "", (r.addition.syjd1String || "") + "-" + (r.addition.syjd2String || "") + "m", (r.addition.hdString || "") + "m/" + (r.addition.cs || "") + "\u5C42"], h = (u - f - 36) / 2 + f;
      h = Math.max(h, f), Q.drawMultiLineText(n, C, w + 15, h), k.setLeft(w);
    }
}
function pC(A, e) {
  let t = e.tg.data, r = t.length, n = e.tg.cs;
  for (let i = 0; i < t.length; i++) {
    let s = t[i];
    for (let o = 0; o < s.data.length; o++)
      NC(s.data[o], s.xh, r, n, A, o);
  }
}
function TC(A, e) {
  let t = 0;
  for (let r = e.length - 1; r >= 0; r--) {
    let n = e[r];
    for (let i = 0; i < n.data.length; i++)
      if (n.data[i].start <= A && n.data[i].end >= A) {
        t = n.xh + 1;
        break;
      }
    if (t)
      break;
  }
  return t;
}
function ys(A, e, t) {
  let r = sA("#" + A).select("svg"), n = document.getElementById(A).offsetWidth - F.LEFT_MARGIN, i = document.getElementById(A).offsetHeight, s = Q.getLineScale(0, e.tg.cs, 0, i - 40), o = e.tg.data.length, a = o * 2 + F.JTWIDTH + F.LEFT_MARGIN_WIDTH + F.RIGHT_MARGIN_WIDTH, B = Q.getLineScale(0, a, 0, n), g = e[t];
  if (!(!g || g.length < 1))
    for (let l = 0; l < g.length; l++) {
      let M = 0, w = g[l];
      if (w.name == "youGuan")
        continue;
      let f = F.TOOLS_SETTING.find((U) => U.name == w.name);
      var c = s(f.height < 2 ? f.height : w.end - w.start);
      let u = zC(c, f.labelPosition), C = s(f.height < 2 ? w.start : w.end) - u, h = TC(w.start, e.tg.data), I = F.LEFT_MARGIN + B(F.LEFT_MARGIN_WIDTH + h), d = B(F.JTWIDTH), N = B(1);
      if (m && m < (f.height < 2 ? w.start : w.end)) {
        let U = s(1) + o * B(1) + B(4);
        if (I = I + U + s(f.height < 2 ? w.start : w.end) - s(m) - c, C = H.y + d + B(o - h), M = -90, f.fillWidth == 0)
          if (C -= B(1), d = B(1), f.height < 2)
            Q.drawImage(r, f.base64, I, C, N, c, M);
          else {
            let v = r.append("g").attr("id", "dangan-elements"), O = Math.max(w.start, m);
            for (let T = 0; T < O - w.start; T++)
              r.append("image").attr("xlink:href", f.base64).attr("x", I).attr("y", C + s(1) * T).attr("width", N).attr("height", s(1));
            let $ = C + s(O - w.start);
            for (let T = 0; T < w.end - O; T++)
              v.append("image").attr("xlink:href", f.base64).attr("x", I).attr("y", $ + s(1) * T).attr("width", N).attr("height", s(1));
            v.attr("transform", `rotate(${M}, ${I}, ${$})`), C = m ? C - c * Math.sin(Math.PI * 20 / 180) * Math.sin(Math.PI * 20 / 180) + 10 : C;
          }
        else
          f.fillWidth == 2 ? (C -= B(0.5), N = d - B(1), d = B(1) * 2, Q.drawImage(r, f.base64, I, C, N, c, M)) : f.fillWidth == 3 ? (Q.drawImage(r, f.base64, I, C, N, c, M), Q.drawImage(r, f.base64, I + B(1.2), C - d, N, c, M - 180), d = B(1) * 3) : (N = d + B((o - h) * 2), Q.drawImage(r, f.base64, I, C, N, c, M));
        let D = PA[f.height < 2 ? w.start : w.end], L = Ue(D), y = I + u - L, K = Tr(w.addition.mc);
        D.iterator == 0 && (K === "top" ? Q.drawLineByD3(r, [[y, C - d], [y, s(m)]], 1) : Q.drawLineByD3(r, [[y, C], [y, s(m) + 150]], 1));
        let z = w.addition.mc + ":" + w.addition.sdString + "m", x = Q.drawText(r, z, y + 30, s(m) - B(o) - 3);
        K === "top" ? x.attr("transform", `rotate(-90, ${y}, ${s(m) - B(o)}) translate(${-82}, 0)`) : x.attr("transform", `rotate(-90, ${y}, ${s(m) - B(o)}) translate(${-z.visualLength() + -200}, 0)`), D.iterator++;
      } else {
        if (f.fillWidth == 0)
          if (I += B(1), f.height < 2)
            Q.drawImage(r, f.base64, I, C, N, s(0.7));
          else
            for (let L = 0; L < w.end - w.start; L++)
              r.append("image").attr("xlink:href", f.base64).attr("x", I).attr("y", C + s(1) * L).attr("width", N).attr("height", s(1));
        else
          f.fillWidth == 2 ? (I += B(0.5), N = d - B(1), Q.drawImage(r, f.base64, I, C, N, c)) : f.fillWidth == 3 ? (I += B(0.3), Q.drawImage(r, f.base64, I, C, B(0.7), c, M), Q.drawImage(r, f.base64, I + B(2.4), C + s(0.5), B(0.7), c, -180)) : (N = d + B((o - h) * 2), Q.drawImage(r, f.base64, I, C, N, c, M));
        let U = PA[f.height < 2 ? w.start : w.end];
        U.iterator == 0 && Q.drawLineByD3(r, [[I + N, C + u], [I + d + B(o) + 10, C + u]], 1);
        let D = Ue(U);
        Q.drawText(r, w.addition.mc + ":" + w.addition.sdString + "m", I + d + B(o) + 13, C + u - D + 5), U.iterator++;
      }
    }
}
function zC(A, e) {
  switch (e) {
    case "middle":
      return A / 2;
    case "top":
      return 0;
    case "bottom":
      return A;
    default:
      return A;
  }
}
function LC(A, e) {
  let t = sA("#" + A).select("svg"), r = document.getElementById(A).offsetWidth - F.LEFT_MARGIN, n = document.getElementById(A).offsetHeight, i = Q.getLineScale(0, e.tg.cs, 0, n - 40), s = e.tg.data.length, o = s * 2 + F.JTWIDTH + F.LEFT_MARGIN_WIDTH + F.RIGHT_MARGIN_WIDTH, a = Q.getLineScale(0, o, 0, r);
  if (!e.zj || e.zj.length == 0)
    return;
  let B = e.zj.find((l) => l.name == "youGuan"), g = Math.max.apply(null, e.zj.map((l) => l.start)), c = F.LEFT_MARGIN + a(F.LEFT_MARGIN_WIDTH + s);
  if (m && g > m) {
    let l = i(1) + s * a(1) + a(1), M = c + a(1), w = i(1) + s * a(1), f = tt(), u = [], C = [], h = !1;
    if (e.zj.forEach((d, N) => {
      var U, D;
      console.log(d.name), ["daoZhui", "siDu"].includes(d.name) && ((d.start < m && ((U = e.zj[N + 1]) == null ? void 0 : U.start) > m || d.start > m && ((D = e.zj[N - 1]) == null ? void 0 : D.start) < m) && (h = !0), d.start < m ? u.push(Object.assign(d, { index: N ? e.zj[N - 1].start : 0 })) : C.push(Object.assign(d, { index: e.zj.length - N - 1 })));
    }), console.log(h), [[c, l], [M, w]].map((d) => {
      f.moveTo(d[0] + a(1), 0), u.forEach((N) => {
        console.log(N), f.lineTo(d[0] + a(1), i(N.index + 0.5)), f.moveTo(d[0] + a(1), i(N.start));
      }), f.lineTo(d[0] + a(1), i(m - 1)), h ? f.moveTo(d[0] + a(3) + d[1] + i(g - m - 3), i(m) + d[1]) : (f.lineTo(d[0] + a(1), i(m)), f.quadraticCurveTo(d[0] + a(1), i(m) + d[1], d[0] + a(1) + d[1], i(m) + d[1])), C.forEach((N) => {
        e.zj.some((D, L) => {
          var y;
          return ((y = e.zj[L + 1]) == null ? void 0 : y.start) === N.start && D.start < m;
        }) ? f.moveTo(d[0] + a(3) + d[1] + i(g - m - N.index + 1), i(m) + d[1]) : (f.lineTo(d[0] + a(3) + d[1] + i(g - m - N.index), i(m) + d[1]), N.index && f.moveTo(d[0] + a(3) + d[1] + i(g - m - N.index + 1), i(m) + d[1]));
      }), f.lineTo(d[0] + a(3) + d[1] + i(g) - i(m), i(m) + d[1]);
    }), Q.drawStringPath(t, f, "none", 1), B) {
      let d = Tr("\u6CB9\u7BA1");
      if (console.log(d), d === "top")
        Q.drawLineByD3Lower(t, [[c + a(3) + l + i(g) - i(m), i(m) + l], [M + a(3) + w + i(g) - i(m), i(m) + w - (s + 1) * a(1)]], 1), Q.drawText(t, B.addition.mc + ":" + B.addition.sdString + "m", M + a(1) + w + i(g) - i(m) - 2, i(m) + w - (s + 1) * a(1)).attr("transform", `rotate(-90, ${M + a(2) + w + i(g) - i(m)}, ${i(m) + w - (s + 2) * a(1) - 5})`);
      else {
        Q.drawLineByD3Lower(t, [[c + a(3) + l + i(g) - i(m), i(m) + w], [M + a(3) + w + i(g) - i(m), i(m) + w + (s + 2) * a(1)]], 1);
        let N = B.addition.mc + ":" + B.addition.sdString + "m";
        Q.drawText(t, N, M + a(1) + w + i(g) - i(m) - 2, i(m) + w + (s + 3) * a(1)).attr("transform", `rotate(-90, ${M + a(1) + w + i(g) - i(m)}, ${i(m) + w + (s + 2) * a(1)}) translate(${-N.visualLength()}, 15)`);
      }
    }
  } else
    Q.drawLineByD3Lower(t, [[c + a(1), 0], [c + a(1), i(g)]], 1), Q.drawLineByD3Lower(t, [[c + a(2), 0], [c + a(2), i(g)]], 1), B && (Q.drawLineByD3Lower(t, [[c + a(1), i(g)], [c + a(2) + (s + 3) * a(1), i(g)]], 1), Q.drawText(t, B.addition.mc + ":" + B.addition.sdString + "m", c + a(2) + (s + 3) * a(1) + 5, i(g) + 5));
}
function mC(A) {
  for (let e in A)
    PA[e] = {
      count: A[e],
      iterator: 0
    };
}
const vC = function(A, e, t) {
  IC(e), !(!A.tg.cs || A.tg.data.length < 1) && (dC(e, A), hC(e, A.title), mC(A.labelCount), pC(e, A), UC(e, A), DC(e, A), ys(e, A, "jdgj"), t && (ys(e, A, "zj"), LC(e, A)), document.querySelector(".chart-box").style.width = F.RIGHT_MARGIN + H.x + "px");
};
const HC = (A, e) => {
  const t = A.__vccOpts || A;
  for (const [r, n] of e)
    t[r] = n;
  return t;
}, jC = {
  name: "well-contruct",
  props: {
    datas: {
      type: Object,
      required: !0
    },
    isDrawDrillTools: {
      type: Boolean
    }
  },
  data() {
    return {
      jh: null,
      showNoData: !0,
      title: "",
      showDiv: !1,
      showButton: !1,
      topOrBottom: JSON.parse(sessionStorage.getItem("topOrBottom"))
    };
  },
  methods: {
    download() {
      Q.downloadImg(this.jh, "chart-box");
    },
    change(A) {
      this.topOrBottom[A] = this.topOrBottom[A] === "top" ? "bottom" : "top", sessionStorage.setItem("topOrBottom", JSON.stringify(this.topOrBottom)), this.loadChart();
    },
    loadChart() {
      this.showNoData = !this.datas.tg.cs || this.datas.tg.data.length < 1, this.datas.wellType == "H" ? (this.showButton = !0, vC(this.datas, "chart-body", this.isDrawDrillTools)) : QC(this.datas, "chart-body", this.isDrawDrillTools), this.topOrBottom = JSON.parse(sessionStorage.getItem("topOrBottom"));
    },
    getImageBase64() {
      return Q.getImageBase64("chart-box");
    }
  },
  watch: {
    datas(A) {
      this.jh = A.jh, this.title = A.title, this.loadChart();
    }
  },
  mounted() {
    sessionStorage.setItem("topOrBottom", "{}"), Object.keys(this.datas).length > 0 && (this.jh = this.datas.jh, this.title = this.datas.title, this.loadChart());
  }
}, xC = (A) => (fo("data-v-51750c7c"), A = A(), Mo(), A), YC = { class: "chart-container" }, SC = {
  class: "chart-box",
  id: "chart-box"
}, bC = {
  class: "chart-title",
  style: { height: "30px" }
}, GC = { class: "chart-title-center" }, KC = { class: "shift" }, OC = { key: 1 }, RC = { style: { "margin-top": "5px" } }, kC = { style: { "padding-top": "5px" } }, PC = ["onClick"], _C = {
  id: "chart-body",
  class: "chart-body"
}, ZC = {
  key: 0,
  class: "no-data"
}, WC = /* @__PURE__ */ xC(() => /* @__PURE__ */ UA("svg", { id: "wellConstruct" }, null, -1));
function VC(A, e, t, r, n, i) {
  return $A(), qA("div", YC, [
    UA("div", SC, [
      UA("div", bC, [
        UA("div", GC, [
          UA("span", null, zr(n.title), 1),
          n.showNoData ? gt("", !0) : ($A(), qA("i", {
            key: 0,
            class: "icon-download",
            title: "\u5BFC\u51FA\u56FE\u7247",
            onClick: e[0] || (e[0] = (...s) => i.download && i.download(...s)),
            "data-html2canvas-ignore": ""
          })),
          UA("div", KC, [
            n.showButton ? ($A(), qA("button", {
              key: 0,
              style: { float: "right" },
              onClick: e[1] || (e[1] = (s) => n.showDiv = !n.showDiv)
            }, zr("\u6C34\u5E73\u6BB5\u6587\u5B57\u4F4D\u7F6E\u8BBE\u7F6E"))) : gt("", !0),
            n.showDiv ? ($A(), qA("div", OC, [
              UA("div", RC, [
                ($A(!0), qA(uo, null, wo(n.topOrBottom, (s, o) => ($A(), qA("div", { key: o }, [
                  UA("div", kC, zr(o), 1),
                  UA("button", {
                    onClick: (a) => i.change(o)
                  }, "\u5207\u6362", 8, PC)
                ]))), 128))
              ])
            ])) : gt("", !0)
          ])
        ])
      ]),
      UA("div", _C, [
        n.showNoData ? ($A(), qA("div", ZC, "\u65E0\u6570\u636E")) : gt("", !0),
        WC
      ])
    ])
  ]);
}
const Es = /* @__PURE__ */ HC(jC, [["render", VC], ["__scopeId", "data-v-51750c7c"]]);
const JC = (A) => {
  A.component("WellContruct", Es), A.use(Es);
}, $C = { install: JC };
export {
  Es as WellContruct,
  $C as default
};
