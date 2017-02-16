(function() {
    ! function(t, i, e) {
        var s, n, a;
        return a = "slidesjs", n = {
            width: 940,
            height: 528,
            start: 1,
            navigation: {
                active: !0,
                effect: "slide"
            },
            pagination: {
                active: !0,
                effect: "slide"
            },
            play: {
                active: !1,
                effect: "slide",
                interval: 5e3,
                auto: !1,
                swap: !0,
                pauseOnHover: !1,
                restartDelay: 2500
            },
            effect: {
                slide: {
                    speed: 500
                },
                fade: {
                    speed: 300,
                    crossfade: !0
                }
            },
            callback: {
                loaded: function() {},
                start: function() {},
                complete: function() {}
            }
        }, s = function() {
            function i(i, e) {
                this.element = i, this.options = t.extend(!0, {}, n, e), this._defaults = n, this._name = a, this.init()
            }
            return i
        }(), s.prototype.init = function() {
            var e, s, n, a, o, d, r = this;
            return e = t(this.element), this.data = t.data(this), t.data(this, "animating", !1), t.data(this, "total", e.children().not(".slidesjs-navigation", e).length), t.data(this, "current", this.options.start - 1), t.data(this, "vendorPrefix", this._getVendorPrefix()), "undefined" != typeof TouchEvent && (t.data(this, "touch", !0), this.options.effect.slide.speed = this.options.effect.slide.speed / 2), e.css({
                overflow: "hidden"
            }), e.slidesContainer = e.children().not(".slidesjs-navigation", e).wrapAll("<div class='slidesjs-container'>", e).parent().css({
                overflow: "hidden",
                position: "relative"
            }), t(".slidesjs-container", e).wrapInner("<div class='slidesjs-control'>", e).children(), t(".slidesjs-control", e).css({
                position: "relative",
                left: 0
            }), t(".slidesjs-control", e).children().addClass("slidesjs-slide").css({
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 0,
                display: "none",
                webkitBackfaceVisibility: "hidden"
            }), t.each(t(".slidesjs-control", e).children(), function(i) {
                var e;
                return e = t(this), e.attr("slidesjs-index", i)
            }), this.data.touch && (t(".slidesjs-control", e).on("touchstart", function(t) {
                return r._touchstart(t)
            }), t(".slidesjs-control", e).on("touchmove", function(t) {
                return r._touchmove(t)
            }), t(".slidesjs-control", e).on("touchend", function(t) {
                return r._touchend(t)
            })), e.fadeIn(0), this.update(), this.data.touch && this._setuptouch(), t(".slidesjs-control", e).children(":eq(" + this.data.current + ")").eq(0).fadeIn(0, function() {
                return t(this).css({
                    zIndex: 10
                })
            }), this.options.navigation.active && (o = t("<a>", {
                "class": "slidesjs-previous slidesjs-navigation",
                href: "#",
                title: "Previous",
                text: "Previous"
            }).appendTo(e), s = t("<a>", {
                "class": "slidesjs-next slidesjs-navigation",
                href: "#",
                title: "Next",
                text: "Next"
            }).appendTo(e)), t(".slidesjs-next", e).click(function(t) {
                return t.preventDefault(), r.stop(!0), r.next(r.options.navigation.effect)
            }), t(".slidesjs-previous", e).click(function(t) {
                return t.preventDefault(), r.stop(!0), r.previous(r.options.navigation.effect)
            }), this.options.play.active && (a = t("<a>", {
                "class": "slidesjs-play slidesjs-navigation",
                href: "#",
                title: "Play",
                text: "Play"
            }).appendTo(e), d = t("<a>", {
                "class": "slidesjs-stop slidesjs-navigation",
                href: "#",
                title: "Stop",
                text: "Stop"
            }).appendTo(e), a.click(function(t) {
                return t.preventDefault(), r.play(!0)
            }), d.click(function(t) {
                return t.preventDefault(), r.stop(!0)
            }), this.options.play.swap && d.css({
                display: "none"
            })), this.options.pagination.active && (n = t("<ul>", {
                "class": "slidesjs-pagination"
            }).appendTo(e), t.each(new Array(this.data.total), function(i) {
                var e, s;
                return e = t("<li>", {
                    "class": "slidesjs-pagination-item"
                }).appendTo(n), s = t("<a>", {
                    href: "#",
                    "data-slidesjs-item": i,
                    html: i + 1
                }).appendTo(e), s.click(function(i) {
                    return i.preventDefault(), r.stop(!0), r["goto"](1 * t(i.currentTarget).attr("data-slidesjs-item") + 1)
                })
            })), t(i).bind("resize", function() {
                return r.update()
            }), this._setActive(), this.options.play.auto && this.play(), this.options.callback.loaded(this.options.start)
        }, s.prototype._setActive = function(i) {
            var e, s;
            return e = t(this.element), this.data = t.data(this), s = i > -1 ? i : this.data.current, t(".active", e).removeClass("active"), t(".slidesjs-pagination li:eq(" + s + ") a", e).addClass("active")
        }, s.prototype.update = function() {
            var i, e, s;
            return i = t(this.element), this.data = t.data(this), t(".slidesjs-control", i).children(":not(:eq(" + this.data.current + "))").css({
                display: "none",
                left: 0,
                zIndex: 0
            }), s = i.width(), e = this.options.height / this.options.width * s, this.options.width = s, this.options.height = e, t(".slidesjs-control, .slidesjs-container", i).css({
                width: '100%',
                height: '100%'
            })
        }, s.prototype.next = function(i) {
            var e;
            return e = t(this.element), this.data = t.data(this), t.data(this, "direction", "next"), void 0 === i && (i = this.options.navigation.effect), "fade" === i ? this._fade() : this._slide()
        }, s.prototype.previous = function(i) {
            var e;
            return e = t(this.element), this.data = t.data(this), t.data(this, "direction", "previous"), void 0 === i && (i = this.options.navigation.effect), "fade" === i ? this._fade() : this._slide()
        }, s.prototype["goto"] = function(i) {
            var e, s;
            if (e = t(this.element), this.data = t.data(this), void 0 === s && (s = this.options.pagination.effect), i > this.data.total ? i = this.data.total : i < 1 && (i = 1), "number" == typeof i) return "fade" === s ? this._fade(i) : this._slide(i);
            if ("string" == typeof i) {
                if ("first" === i) return "fade" === s ? this._fade(0) : this._slide(0);
                if ("last" === i) return "fade" === s ? this._fade(this.data.total) : this._slide(this.data.total)
            }
        }, s.prototype._setuptouch = function() {
            var i, e, s, n;
            return i = t(this.element), this.data = t.data(this), n = t(".slidesjs-control", i), e = this.data.current + 1, s = this.data.current - 1, s < 0 && (s = this.data.total - 1), e > this.data.total - 1 && (e = 0), n.children(":eq(" + e + ")").css({
                display: "flex",
                left: this.options.width
            }), n.children(":eq(" + s + ")").css({
                display: "flex",
                left: -this.options.width
            })
        }, s.prototype._touchstart = function(i) {
            var e, s;
            return e = t(this.element), this.data = t.data(this), s = i.originalEvent.touches[0], this._setuptouch(), t.data(this, "touchtimer", Number(new Date)), t.data(this, "touchstartx", s.pageX), t.data(this, "touchstarty", s.pageY), i.stopPropagation()
        }, s.prototype._touchend = function(i) {
            var e, s, n, a, o, d, r, l = this;
            return e = t(this.element), this.data = t.data(this), d = i.originalEvent.touches[0], a = t(".slidesjs-control", e), a.position().left > .5 * this.options.width || a.position().left > .1 * this.options.width && Number(new Date) - this.data.touchtimer < 250 ? (t.data(this, "direction", "previous"), this._slide()) : a.position().left < -(.5 * this.options.width) || a.position().left < -(.1 * this.options.width) && Number(new Date) - this.data.touchtimer < 250 ? (t.data(this, "direction", "next"), this._slide()) : (n = this.data.vendorPrefix, r = n + "Transform", s = n + "TransitionDuration", o = n + "TransitionTimingFunction", a[0].style[r] = "translateX(0px)", a[0].style[s] = .85 * this.options.effect.slide.speed + "ms"), a.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function() {
                return n = l.data.vendorPrefix, r = n + "Transform", s = n + "TransitionDuration", o = n + "TransitionTimingFunction", a[0].style[r] = "", a[0].style[s] = "", a[0].style[o] = ""
            }), i.stopPropagation()
        }, s.prototype._touchmove = function(i) {
            var e, s, n, a, o;
            return e = t(this.element), this.data = t.data(this), a = i.originalEvent.touches[0], s = this.data.vendorPrefix, n = t(".slidesjs-control", e), o = s + "Transform", t.data(this, "scrolling", Math.abs(a.pageX - this.data.touchstartx) < Math.abs(a.pageY - this.data.touchstarty)), this.data.animating || this.data.scrolling || (i.preventDefault(), this._setuptouch(), n[0].style[o] = "translateX(" + (a.pageX - this.data.touchstartx) + "px)"), i.stopPropagation()
        }, s.prototype.play = function(i) {
            var e, s, n, a = this;
            if (e = t(this.element), this.data = t.data(this), !this.data.playInterval && (i && (s = this.data.current, this.data.direction = "next", "fade" === this.options.play.effect ? this._fade() : this._slide()), t.data(this, "playInterval", setInterval(function() {
                    return s = a.data.current, a.data.direction = "next", "fade" === a.options.play.effect ? a._fade() : a._slide()
                }, this.options.play.interval)), n = t(".slidesjs-container", e), this.options.play.pauseOnHover && (n.unbind(), n.bind("mouseenter", function() {
                    return a.stop()
                }), n.bind("mouseleave", function() {
                    return a.options.play.restartDelay ? t.data(a, "restartDelay", setTimeout(function() {
                        return a.play(!0)
                    }, a.options.play.restartDelay)) : a.play()
                })), t.data(this, "playing", !0), t(".slidesjs-play", e).addClass("slidesjs-playing"), this.options.play.swap)) return t(".slidesjs-play", e).hide(), t(".slidesjs-stop", e).show()
        }, s.prototype.stop = function(i) {
            var e;
            if (e = t(this.element), this.data = t.data(this), clearInterval(this.data.playInterval), this.options.play.pauseOnHover && i && t(".slidesjs-container", e).unbind(), t.data(this, "playInterval", null), t.data(this, "playing", !1), t(".slidesjs-play", e).removeClass("slidesjs-playing"), this.options.play.swap) return t(".slidesjs-stop", e).hide(), t(".slidesjs-play", e).show()
        }, s.prototype._slide = function(i) {
            var e, s, n, a, o, d, r, l, h, c, p = this;
            if (e = t(this.element), this.data = t.data(this), !this.data.animating && i !== this.data.current + 1) return t.data(this, "animating", !0), s = this.data.current, i > -1 ? (i -= 1, c = i > s ? 1 : -1, n = i > s ? -this.options.width : this.options.width, o = i) : (c = "next" === this.data.direction ? 1 : -1, n = "next" === this.data.direction ? -this.options.width : this.options.width, o = s + c), o === -1 && (o = this.data.total - 1), o === this.data.total && (o = 0), this._setActive(o), r = t(".slidesjs-control", e), i > -1 && r.children(":not(:eq(" + s + "))").css({
                display: "none",
                left: 0,
                zIndex: 0
            }), r.children(":eq(" + o + ")").css({
                display: "flex",
                left: c * this.options.width,
                zIndex: 10
            }), this.options.callback.start(s + 1), this.data.vendorPrefix ? (d = this.data.vendorPrefix, h = d + "Transform", a = d + "TransitionDuration", l = d + "TransitionTimingFunction", r[0].style[h] = "translateX(" + n + "px)", r[0].style[a] = this.options.effect.slide.speed + "ms", r.on("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd", function() {
                return r[0].style[h] = "", r[0].style[a] = "", r.children(":eq(" + o + ")").css({
                    left: 0
                }), r.children(":eq(" + s + ")").css({
                    display: "none",
                    left: 0,
                    zIndex: 0
                }), t.data(p, "current", o), t.data(p, "animating", !1), r.unbind("transitionend webkitTransitionEnd oTransitionEnd otransitionend MSTransitionEnd"), r.children(":not(:eq(" + o + "))").css({
                    display: "none",
                    left: 0,
                    zIndex: 0
                }), p.data.touch && p._setuptouch(), p.options.callback.complete(o + 1)
            })) : r.stop().animate({
                left: n
            }, this.options.effect.slide.speed, function() {
                return r.css({
                    left: 0
                }), r.children(":eq(" + o + ")").css({
                    left: 0
                }), r.children(":eq(" + s + ")").css({
                    display: "none",
                    left: 0,
                    zIndex: 0
                }, t.data(p, "current", o), t.data(p, "animating", !1), p.options.callback.complete(o + 1))
            })
        }, s.prototype._fade = function(i) {
            var e, s, n, a, o, d = this;
            if (e = t(this.element), this.data = t.data(this), !this.data.animating && i !== this.data.current + 1) return t.data(this, "animating", !0), s = this.data.current, i ? (i -= 1, o = i > s ? 1 : -1, n = i) : (o = "next" === this.data.direction ? 1 : -1, n = s + o), n === -1 && (n = this.data.total - 1), n === this.data.total && (n = 0), this._setActive(n), a = t(".slidesjs-control", e), a.children(":eq(" + n + ")").css({
                display: "none",
                left: 0,
                zIndex: 10
            }), this.options.callback.start(s + 1), this.options.effect.fade.crossfade ? (a.children(":eq(" + this.data.current + ")").stop().fadeOut(this.options.effect.fade.speed), a.children(":eq(" + n + ")").stop().fadeIn(this.options.effect.fade.speed, function() {
                return a.children(":eq(" + n + ")").css({
                    zIndex: 0
                }), t.data(d, "animating", !1), t.data(d, "current", n), d.options.callback.complete(n + 1)
            })) : a.children(":eq(" + s + ")").stop().fadeOut(this.options.effect.fade.speed, function() {
                return a.children(":eq(" + n + ")").stop().fadeIn(d.options.effect.fade.speed, function() {
                    return a.children(":eq(" + n + ")").css({
                        zIndex: 10
                    })
                }), t.data(d, "animating", !1), t.data(d, "current", n), d.options.callback.complete(n + 1)
            })
        }, s.prototype._getVendorPrefix = function() {
            var t, i, s, n, a;
            for (t = e.body || e.documentElement, s = t.style, n = "transition", a = ["Moz", "Webkit", "Khtml", "O", "ms"], n = n.charAt(0).toUpperCase() + n.substr(1), i = 0; i < a.length;) {
                if ("string" == typeof s[a[i] + n]) return a[i];
                i++
            }
            return !1
        }, t.fn[a] = function(i) {
            return this.each(function() {
                if (!t.data(this, "plugin_" + a)) return t.data(this, "plugin_" + a, new s(this, i))
            })
        }
    }(jQuery, window, document)
}).call(this);
