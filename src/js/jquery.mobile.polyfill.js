/*
 * jQuery Mobile 1.5.0 Polyfills
 */

// buttonMarkup
(function(a, e) {
    if (a.fn.buttonMarkup) {
        return;
    }
    function b(a) {
        for (var b; a; ) {
            if ((b = typeof a.className === "string" && a.className + " ") && b.indexOf("ui-btn ") > -1 && b.indexOf("ui-disabled ") < 0)
                break;
            a = a.parentNode
        }
        return a
    }
    a.fn.buttonMarkup = function(b) {
        for (var b = b || {}, c = 0; c < this.length; c++) {
            var h = this.eq(c), g = h[0], i = a.extend({}, a.fn.buttonMarkup.defaults, {
                icon: b.icon !== e ? b.icon : h.jqmData("icon"),
                iconpos: b.iconpos !== e ? b.iconpos : h.jqmData("iconpos"),
                theme: b.theme !== e ? b.theme : h.jqmData("theme"),
                inline: b.inline !== e ? b.inline : h.jqmData("inline"),
                shadow: b.shadow !== e ? b.shadow : h.jqmData("shadow"),
                corners: b.corners !== e ? b.corners : h.jqmData("corners"),
                iconshadow: b.iconshadow !== e ? b.iconshadow : h.jqmData("iconshadow")
            }, b), l = "ui-btn-inner", k, o, n = document.createElement(i.wrapperEls), q = document.createElement(i.wrapperEls), j = i.icon ? document.createElement("span") : null;
            if (!(g.tagName === "INPUT" && h.jqmData("role") === "button"))
                if (g.tagName === "BUTTON")
                    a(g.parentNode).hasClass("ui-btn") || a(g).button();
                else {
                    d && d();
                    if (!i.theme)
                        i.theme = a.mobile.getInheritedTheme ? a.mobile.getInheritedTheme(h, "c") : "c";
                    k = "ui-btn ui-btn-up-" + i.theme;
                    i.inline && (k += " ui-btn-inline");
                    if (i.icon)
                        i.icon = "ui-icon-" + i.icon,
                        i.iconpos = i.iconpos || "left",
                        o = "ui-icon " + i.icon,
                        i.iconshadow && (o += " ui-icon-shadow");
                    i.iconpos && (k += " ui-btn-icon-" + i.iconpos,
                    i.iconpos == "notext" && !h.attr("title") && h.attr("title", h.getEncodedText()));
                    i.corners && (k += " ui-btn-corner-all",
                    l += " ui-btn-corner-all");
                    i.shadow && (k += " ui-shadow");
                    g.setAttribute("data-" + a.mobile.ns + "theme", i.theme);
                    h.addClass(k);
                    n.className = l;
                    q.className = "ui-btn-text";
                    n.appendChild(q);
                    if (j)
                        j.className = o,
                        n.appendChild(j);
                    for (; g.firstChild; )
                        q.appendChild(g.firstChild);
                    g.appendChild(n);
                    a.data(g, "textWrapper", a(q))
                }
        }
        return this
    };
    a.fn.buttonMarkup.defaults = {
        corners: true,
        shadow: true,
        iconshadow: true,
        inline: false,
        wrapperEls: "span"
    };
    var d = function() {
        a(document).bind({
            vmousedown: function(d) {
                var d = b(d.target), c;
                d && (d = a(d),
                c = d.attr("data-" + a.mobile.ns + "theme"),
                d.removeClass("ui-btn-up-" + c).addClass("ui-btn-down-" + c))
            },
            "vmousecancel vmouseup": function(d) {
                var d = b(d.target), c;
                d && (d = a(d),
                c = d.attr("data-" + a.mobile.ns + "theme"),
                d.removeClass("ui-btn-down-" + c).addClass("ui-btn-up-" + c))
            },
            "vmouseover focus": function(d) {
                var d = b(d.target), c;
                d && (d = a(d),
                c = d.attr("data-" + a.mobile.ns + "theme"),
                d.removeClass("ui-btn-up-" + c).addClass("ui-btn-hover-" + c))
            },
            "vmouseout blur": function(d) {
                var d = b(d.target), c;
                d && (d = a(d),
                c = d.attr("data-" + a.mobile.ns + "theme"),
                d.removeClass("ui-btn-hover-" + c + " ui-btn-down-" + c).addClass("ui-btn-up-" + c))
            }
        });
        d = null
    };
    a(document).bind("pagecreate create", function(b) {
        a(":jqmData(role='button'), .ui-bar > a, .ui-header > a, .ui-footer > a, .ui-bar > :jqmData(role='controlgroup') > a", b.target).not(".ui-btn, :jqmData(role='none'), :jqmData(role='nojs')").buttonMarkup()
    })
}
)(jQuery);

// listview
(function(a) {
    var e = {};
    a.widget("mobile.listview", a.Widget, {
        options: {
            theme: null,
            countTheme: "c",
            headerTheme: "b",
            dividerTheme: "b",
            splitIcon: "arrow-r",
            splitTheme: "b",
            inset: false,
            initSelector: ":jqmData(role='listview')"
        },
        _create: function() {
            var a = this;
            a.element.addClass(function(d, f) {
                return f + " ui-listview " + (a.options.inset ? " ui-listview-inset ui-corner-all ui-shadow " : "")
            });
            a.refresh(true)
        },
        _removeCorners: function(a, d) {
            a = a.add(a.find(".ui-btn-inner, .ui-li-link-alt, .ui-li-thumb"));
            d === "top" ? a.removeClass("ui-corner-top ui-corner-tr ui-corner-tl") : d === "bottom" ? a.removeClass("ui-corner-bottom ui-corner-br ui-corner-bl") : a.removeClass("ui-corner-top ui-corner-tr ui-corner-tl ui-corner-bottom ui-corner-br ui-corner-bl")
        },
        _refreshCorners: function(a) {
            var d, f;
            this.options.inset && (d = this.element.children("li"),
            f = a ? d.not(".ui-screen-hidden") : d.filter(":visible"),
            this._removeCorners(d),
            d = f.first().addClass("ui-corner-top"),
            d.add(d.find(".ui-btn-inner").not(".ui-li-link-alt span:first-child")).addClass("ui-corner-top").end().find(".ui-li-link-alt, .ui-li-link-alt span:first-child").addClass("ui-corner-tr").end().find(".ui-li-thumb").not(".ui-li-icon").addClass("ui-corner-tl"),
            f = f.last().addClass("ui-corner-bottom"),
            f.add(f.find(".ui-btn-inner")).find(".ui-li-link-alt").addClass("ui-corner-br").end().find(".ui-li-thumb").not(".ui-li-icon").addClass("ui-corner-bl"));
            a || this.element.trigger("updatelayout")
        },
        _findFirstElementByTagName: function(a, d, f, c) {
            var e = {};
            for (e[f] = e[c] = true; a; ) {
                if (e[a.nodeName])
                    return a;
                a = a[d]
            }
            return null
        },
        _getChildrenByTagName: function(b, d, f) {
            var c = []
              , e = {};
            e[d] = e[f] = true;
            for (b = b.firstChild; b; )
                e[b.nodeName] && c.push(b),
                b = b.nextSibling;
            return a(c)
        },
        _addThumbClasses: function(b) {
            var d, f, c = b.length;
            for (d = 0; d < c; d++)
                f = a(this._findFirstElementByTagName(b[d].firstChild, "nextSibling", "img", "IMG")),
                f.length && (f.addClass("ui-li-thumb"),
                a(this._findFirstElementByTagName(f[0].parentNode, "parentNode", "li", "LI")).addClass(f.is(".ui-li-icon") ? "ui-li-has-icon" : "ui-li-has-thumb"))
        },
        refresh: function(b) {
            this.parentPage = this.element.closest(".ui-page");
            this._createSubPages();
            var d = this.options, f = this.element, c = f.jqmData("dividertheme") || d.dividerTheme, e = f.jqmData("splittheme"), g = f.jqmData("spliticon"), i = this._getChildrenByTagName(f[0], "li", "LI"), l = a.support.cssPseudoElement || !a.nodeName(f[0], "ol") ? 0 : 1, k = {}, o, n, q, j, p;
            l && f.find(".ui-li-dec").remove();
            if (!d.theme)
                d.theme = a.mobile.getInheritedTheme ? a.mobile.getInheritedTheme(this.element, "c") : "c";
            for (var m = 0, A = i.length; m < A; m++) {
                o = i.eq(m);
                n = "ui-li";
                if (b || !o.hasClass("ui-li"))
                    q = o.jqmData("theme") || d.theme,
                    j = this._getChildrenByTagName(o[0], "a", "A"),
                    j.length ? (p = o.jqmData("icon"),
                    o.buttonMarkup({
                        wrapperEls: "div",
                        shadow: false,
                        corners: false,
                        iconpos: "right",
                        icon: j.length > 1 || p === false ? false : p || "arrow-r",
                        theme: q
                    }),
                    p != false && j.length == 1 && o.addClass("ui-li-has-arrow"),
                    j.first().addClass("ui-link-inherit"),
                    j.length > 1 && (n += " ui-li-has-alt",
                    j = j.last(),
                    p = e || j.jqmData("theme") || d.splitTheme,
                    j.appendTo(o).attr("title", j.getEncodedText()).addClass("ui-li-link-alt").empty().buttonMarkup({
                        shadow: false,
                        corners: false,
                        theme: q,
                        icon: false,
                        iconpos: false
                    }).find(".ui-btn-inner").append(a(document.createElement("span")).buttonMarkup({
                        shadow: true,
                        corners: true,
                        theme: p,
                        iconpos: "notext",
                        icon: g || j.jqmData("icon") || d.splitIcon
                    })))) : o.jqmData("role") === "list-divider" ? (n += " ui-li-divider ui-btn ui-bar-" + c,
                    o.attr("role", "heading"),
                    l && (l = 1)) : n += " ui-li-static ui-body-" + q;
                l && n.indexOf("ui-li-divider") < 0 && (q = o.is(".ui-li-static:first") ? o : o.find(".ui-link-inherit"),
                q.addClass("ui-li-jsnumbering").prepend("<span class='ui-li-dec'>" + l++ + ". </span>"));
                k[n] || (k[n] = []);
                k[n].push(o[0])
            }
            for (n in k)
                a(k[n]).addClass(n).children(".ui-btn-inner").addClass(n);
            f.find("h1, h2, h3, h4, h5, h6").addClass("ui-li-heading").end().find("p, dl").addClass("ui-li-desc").end().find(".ui-li-aside").each(function() {
                var b = a(this);
                b.prependTo(b.parent())
            }).end().find(".ui-li-count").each(function() {
                a(this).closest("li").addClass("ui-li-has-count")
            }).addClass("ui-btn-up-" + (f.jqmData("counttheme") || this.options.countTheme) + " ui-btn-corner-all");
            this._addThumbClasses(i);
            this._addThumbClasses(f.find(".ui-link-inherit"));
            this._refreshCorners(b)
        },
        _idStringEscape: function(a) {
            return a.replace(/[^a-zA-Z0-9]/g, "-")
        },
        _createSubPages: function() {
            var b = this.element;
            var d = b.closest(".ui-page")
            var f = d.jqmData("url")
            var c = f || d[0] ? d[0][a.expando] : "";
            var h = b.attr("id");
            var g = this.options;
            var i = "data-" + a.mobile.ns;
            var l = this;
            var k = d.find(":jqmData(role='footer')").jqmData("id");
            var o = false;
            typeof e[c] === "undefined" && (e[c] = -1);
            h = h || ++e[c];
            a(b.find("li>ul, li>ol").toArray().reverse()).each(function(c) {
                var d = a(this)
                  , e = d.attr("id") || h + "-" + c
                  , c = d.parent()
                  , l = a(d.prevAll().toArray().reverse())
                  , l = l.length ? l : a("<span>" + a.trim(c.contents()[0].nodeValue) + "</span>")
                  , m = l.first().getEncodedText()
                  , e = (f || "") + "&" + a.mobile.subPageUrlKey + "=" + e
                  , A = d.jqmData("theme") || g.theme
                  , z = d.jqmData("counttheme") || b.jqmData("counttheme") || g.countTheme;
                o = true;
                d.detach().wrap("<div " + i + "role='page' " + i + "url='" + e + "' " + i + "theme='" + A + "' " + i + "count-theme='" + z + "'><div " + i + "role='content'></div></div>").parent().before("<div " + i + "role='header' " + i + "theme='" + g.headerTheme + "'><div class='ui-title'>" + m + "</div></div>").after(k ? a("<div " + i + "role='footer' " + i + "id='" + k + "'>") : "").parent().appendTo(a.mobile.pageContainer).page();
                d = c.find("a:first");
                d.length || (d = a("<a/>").html(l || m).prependTo(c.empty()));
                d.attr("href", "#" + e)
            }).listview();
            o && d.is(":jqmData(external-page='true')") && d.data("page").options.domCache === false && d.unbind("pagehide.remove").bind("pagehide.remove", function(b, c) {
                var e = c.nextPage;
                c.nextPage && (e = e.jqmData("url"),
                e.indexOf(f + "&" + a.mobile.subPageUrlKey) !== 0 && (l.childPages().remove(),
                d.remove()))
            })
        },
        childPages: function() {
            var b = this.parentPage.jqmData("url");
            return a(":jqmData(url^='" + b + "&" + a.mobile.subPageUrlKey + "')")
        }
    });
    a(document).bind("pagecreate create", function(b) {
        a(a.mobile.listview.prototype.options.initSelector, b.target).listview()
    })
}
)(jQuery);
(function(a) {
    a.mobile.listview.prototype.options.filter = false;
    a.mobile.listview.prototype.options.filterPlaceholder = "Filter items...";
    a.mobile.listview.prototype.options.filterTheme = "c";
    a.mobile.listview.prototype.options.filterCallback = function(a, b) {
        return a.toLowerCase().indexOf(b) === -1
    };
    a(document).delegate(":jqmData(role='listview')", "listviewcreate", function() {
        var e = a(this)
          , b = e.data("listview");
        if (b && b.options && b.options.filter) {
            var d = a("<form>", {
                "class": "ui-listview-filter ui-bar-" + b.options.filterTheme,
                role: "search"
            });
            a("<input>", {
                placeholder: b.options.filterPlaceholder
            }).attr("data-" + a.mobile.ns + "type", "search").jqmData("lastval", "").bind("keyup change", function() {
                var d = a(this)
                  , c = this.value.toLowerCase()
                  , h = null
                  , h = d.jqmData("lastval") + ""
                  , g = false
                  , i = "";
                d.jqmData("lastval", c);
                h = c.length < h.length || c.indexOf(h) !== 0 ? e.children() : e.children(":not(.ui-screen-hidden)");
                if (c) {
                    for (var l = h.length - 1; l >= 0; l--)
                        d = a(h[l]),
                        i = d.jqmData("filtertext") || d.text(),
                        d.is("li:jqmData(role=list-divider)") ? (d.toggleClass("ui-filter-hidequeue", !g),
                        g = false) : b.options.filterCallback(i, c) ? d.toggleClass("ui-filter-hidequeue", true) : g = true;
                    h.filter(":not(.ui-filter-hidequeue)").toggleClass("ui-screen-hidden", false);
                    h.filter(".ui-filter-hidequeue").toggleClass("ui-screen-hidden", true).toggleClass("ui-filter-hidequeue", false)
                } else
                    h.toggleClass("ui-screen-hidden", false);
                b._refreshCorners()
            }).appendTo(d).textinput();
            a(this).jqmData("inset") && d.addClass("ui-listview-filter-inset");
            d.bind("submit", function() {
                return false
            }).insertBefore(e)
        }
    })
}
)(jQuery);

// changePage
(function(a, e) {
    function b(a) {
        var b = a.find(".ui-title:eq(0)");
        b.length ? b.focus() : a.focus()
    }
    function d(b) {
        p && (!p.closest(".ui-page-active").length || b) && p.removeClass(a.mobile.activeBtnClass);
        p = null
    }
    function f() {
        z = false;
        A.length > 0 && a.mobile.changePage.apply(null, A.pop())
    }
    function c(c, d, f, e) {
        var g = a.mobile.urlHistory.getActive()
          , j = a.support.touchOverflow && a.mobile.touchOverflowEnabled
          , i = g.lastScroll || (j ? 0 : a.mobile.defaultHomeScroll)
          , g = h();
        window.scrollTo(0, a.mobile.defaultHomeScroll);
        d && d.data("page")._trigger("beforehide", null, {
            nextPage: c
        });
        j || c.height(g + i);
        c.data("page")._trigger("beforeshow", null, {
            prevPage: d || a("")
        });
        a.mobile.hidePageLoadingMsg();
        j && i && (c.addClass("ui-mobile-pre-transition"),
        b(c),
        c.is(".ui-native-fixed") ? c.find(".ui-content").scrollTop(i) : c.scrollTop(i));
        f = (a.mobile.transitionHandlers[f || "none"] || a.mobile.defaultTransitionHandler)(f, e, c, d);
        f.done(function() {
            j || (c.height(""),
            b(c));
            j || a.mobile.silentScroll(i);
            d && (j || d.height(""),
            d.data("page")._trigger("hide", null, {
                nextPage: c
            }));
            c.data("page")._trigger("show", null, {
                prevPage: d || a("")
            })
        });
        return f
    }
    function h() {
        var b = a.event.special.orientationchange.orientation() === "portrait"
          , c = b ? screen.availHeight : screen.availWidth
          , b = Math.max(b ? 480 : 320, a(window).height());
        return Math.min(c, b)
    }
    function g() {
        (!a.support.touchOverflow || !a.mobile.touchOverflowEnabled) && a("." + a.mobile.activePageClass).css("min-height", h())
    }
    function i(b, c) {
        c && b.attr("data-" + a.mobile.ns + "role", c);
        b.page()
    }
    function l(a) {
        for (; a; ) {
            if (typeof a.nodeName === "string" && a.nodeName.toLowerCase() == "a")
                break;
            a = a.parentNode
        }
        return a
    }
    function k(b) {
        var b = a(b).closest(".ui-page").jqmData("url")
          , c = s.hrefNoHash;
        if (!b || !j.isPath(b))
            b = c;
        return j.makeUrlAbsolute(b, c)
    }
    var o = a(window), n = a("html"), q = a("head"), j = {
        urlParseRE: /^(((([^:\/#\?]+:)?(?:(\/\/)((?:(([^:@\/#\?]+)(?:\:([^:@\/#\?]+))?)@)?(([^:\/#\?\]\[]+|\[[^\/\]@#?]+\])(?:\:([0-9]+))?))?)?)?((\/?(?:[^\/\?#]+\/+)*)([^\?#]*)))?(\?[^#]+)?)(#.*)?/,
        parseUrl: function(b) {
            if (a.type(b) === "object")
                return b;
            b = j.urlParseRE.exec(b || "") || [];
            return {
                href: b[0] || "",
                hrefNoHash: b[1] || "",
                hrefNoSearch: b[2] || "",
                domain: b[3] || "",
                protocol: b[4] || "",
                doubleSlash: b[5] || "",
                authority: b[6] || "",
                username: b[8] || "",
                password: b[9] || "",
                host: b[10] || "",
                hostname: b[11] || "",
                port: b[12] || "",
                pathname: b[13] || "",
                directory: b[14] || "",
                filename: b[15] || "",
                search: b[16] || "",
                hash: b[17] || ""
            }
        },
        makePathAbsolute: function(a, b) {
            if (a && a.charAt(0) === "/")
                return a;
            for (var a = a || "", c = (b = b ? b.replace(/^\/|(\/[^\/]*|[^\/]+)$/g, "") : "") ? b.split("/") : [], d = a.split("/"), f = 0; f < d.length; f++) {
                var e = d[f];
                switch (e) {
                case ".":
                    break;
                case "..":
                    c.length && c.pop();
                    break;
                default:
                    c.push(e)
                }
            }
            return "/" + c.join("/")
        },
        isSameDomain: function(a, b) {
            return j.parseUrl(a).domain === j.parseUrl(b).domain
        },
        isRelativeUrl: function(a) {
            return j.parseUrl(a).protocol === ""
        },
        isAbsoluteUrl: function(a) {
            return j.parseUrl(a).protocol !== ""
        },
        makeUrlAbsolute: function(a, b) {
            if (!j.isRelativeUrl(a))
                return a;
            var c = j.parseUrl(a)
              , d = j.parseUrl(b)
              , f = c.protocol || d.protocol
              , e = c.protocol ? c.doubleSlash : c.doubleSlash || d.doubleSlash
              , h = c.authority || d.authority
              , g = c.pathname !== ""
              , i = j.makePathAbsolute(c.pathname || d.filename, d.pathname);
            return f + e + h + i + (c.search || !g && d.search || "") + c.hash
        },
        addSearchParams: function(b, c) {
            var d = j.parseUrl(b)
              , f = typeof c === "object" ? a.param(c) : c
              , e = d.search || "?";
            return d.hrefNoSearch + e + (e.charAt(e.length - 1) !== "?" ? "&" : "") + f + (d.hash || "")
        },
        convertUrlToDataUrl: function(a) {
            var b = j.parseUrl(a);
            if (j.isEmbeddedPage(b))
                return b.hash.split(t)[0].replace(/^#/, "");
            else if (j.isSameDomain(b, s))
                return b.hrefNoHash.replace(s.domain, "");
            return a
        },
        get: function(a) {
            if (a === e)
                a = location.hash;
            return j.stripHash(a).replace(/[^\/]*\.[^\/*]+$/, "")
        },
        getFilePath: function(b) {
            var c = "&" + a.mobile.subPageUrlKey;
            return b && b.split(c)[0].split(t)[0]
        },
        set: function(a) {
            location.hash = a
        },
        isPath: function(a) {
            return /\//.test(a)
        },
        clean: function(a) {
            return a.replace(s.domain, "")
        },
        stripHash: function(a) {
            return a.replace(/^#/, "")
        },
        cleanHash: function(a) {
            return j.stripHash(a.replace(/\?.*$/, "").replace(t, ""))
        },
        isExternal: function(a) {
            a = j.parseUrl(a);
            return a.protocol && a.domain !== v.domain ? true : false
        },
        hasProtocol: function(a) {
            return /^(:?\w+:)/.test(a)
        },
        isFirstPageUrl: function(b) {
            var b = j.parseUrl(j.makeUrlAbsolute(b, s))
              , c = a.mobile.firstPage
              , c = c && c[0] ? c[0].id : e;
            return (b.hrefNoHash === v.hrefNoHash || x && b.hrefNoHash === s.hrefNoHash) && (!b.hash || b.hash === "#" || c && b.hash.replace(/^#/, "") === c)
        },
        isEmbeddedPage: function(a) {
            a = j.parseUrl(a);
            return a.protocol !== "" ? a.hash && (a.hrefNoHash === v.hrefNoHash || x && a.hrefNoHash === s.hrefNoHash) : /^#/.test(a.href)
        },
        isPermittedCrossDomainRequest: function(b, c) {
            return a.mobile.allowCrossDomainPages && b.protocol === "file:" && c.search(/^https?:/) != -1
        }
    }, p = null, m = {
        stack: [],
        activeIndex: 0,
        getActive: function() {
            return m.stack[m.activeIndex]
        },
        getPrev: function() {
            return m.stack[m.activeIndex - 1]
        },
        getNext: function() {
            return m.stack[m.activeIndex + 1]
        },
        addNew: function(a, b, c, d, f) {
            m.getNext() && m.clearForward();
            m.stack.push({
                url: a,
                transition: b,
                title: c,
                pageUrl: d,
                role: f
            });
            m.activeIndex = m.stack.length - 1
        },
        clearForward: function() {
            m.stack = m.stack.slice(0, m.activeIndex + 1)
        },
        directHashChange: function(b) {
            var c, d, f;
            this.getActive();
            a.each(m.stack, function(a, e) {
                b.currentUrl === e.url && (c = a < m.activeIndex,
                d = !c,
                f = a)
            });
            this.activeIndex = f !== e ? f : this.activeIndex;
            c ? (b.either || b.isBack)(true) : d && (b.either || b.isForward)(false)
        },
        ignoreNextHashChange: false
    }, A = [], z = false, t = "&ui-state=dialog", w = q.children("base"), v = j.parseUrl(location.href), s = w.length ? j.parseUrl(j.makeUrlAbsolute(w.attr("href"), v.href)) : v, x = v.hrefNoHash !== s.hrefNoHash, u = a.support.dynamicBaseTag ? {
        element: w.length ? w : a("<base>", {
            href: s.hrefNoHash
        }).prependTo(q),
        set: function(a) {
            u.element.attr("href", j.makeUrlAbsolute(a, s))
        },
        reset: function() {
            u.element.attr("href", s.hrefNoHash)
        }
    } : e, C = true, y, E, B;
    y = function() {
        var b = o;
        a.support.touchOverflow && a.mobile.touchOverflowEnabled && (b = a(".ui-page-active"),
        b = b.is(".ui-native-fixed") ? b.find(".ui-content") : b);
        return b
    };
    E = function(b) {
        if (C) {
            var c = a.mobile.urlHistory.getActive();
            if (c)
                b = b && b.scrollTop(),
                c.lastScroll = b < a.mobile.minScrollBack ? a.mobile.defaultHomeScroll : b
        }
    };
    B = function() {
        setTimeout(E, 100, a(this))
    };
    o.bind(a.support.pushState ? "popstate" : "hashchange", function() {
        C = false
    });
    o.one(a.support.pushState ? "popstate" : "hashchange", function() {
        C = true
    });
    o.one("pagecontainercreate", function() {
        a.mobile.pageContainer.bind("pagechange", function() {
            var a = y();
            C = true;
            a.unbind("scrollstop", B);
            a.bind("scrollstop", B)
        })
    });
    y().bind("scrollstop", B);
    a.mobile.getScreenHeight = a.mobile.getScreenHeight || h;
    a.fn.animationComplete = function(b) {
        return a.support.cssTransitions ? a(this).one("webkitAnimationEnd", b) : (setTimeout(b, 0),
        a(this))
    };
    a.mobile.path = a.mobile.path || j;
    a.mobile.base = a.mobile.base || u;
    a.mobile.urlHistory = a.mobile.urlHistory || m;
    a.mobile.dialogHashKey = a.mobile.dialogHashKey || t;
    a.mobile.noneTransitionHandler = function(b, c, d, f) {
        f && f.removeClass(a.mobile.activePageClass);
        d.addClass(a.mobile.activePageClass);
        return a.Deferred().resolve(b, c, d, f).promise()
    };
    a.mobile.defaultTransitionHandler = a.mobile.defaultTransitionHandler || a.mobile.noneTransitionHandler;
    a.mobile.transitionHandlers = a.mobile.transitionHandlers || {
        none: a.mobile.defaultTransitionHandler
    };
    a.mobile.allowCrossDomainPages = a.mobile.allowCrossDomainPages || false;
    a.mobile.getDocumentUrl = function(b) {
        return b ? a.extend({}, v) : v.href
    };
    a.mobile.getDocumentBase = a.mobile.getDocumentBase || function(b) {
        return b ? a.extend({}, s) : s.href
    };
    a.mobile._bindPageRemove = a.mobile._bindPageRemove || function() {
        var b = a(this);
        !b.data("page").options.domCache && b.is(":jqmData(external-page='true')") && b.bind("pagehide.remove", function() {
            var b = a(this)
              , c = new a.Event("pageremove");
            b.trigger(c);
            c.isDefaultPrevented() || b.removeWithDependents()
        })
    };
    a.mobile.loadPage = a.mobile.loadPage || function(b, c) {
        var d = a.Deferred()
          , f = a.extend({}, a.mobile.loadPage.defaults, c)
          , h = null
          , g = null
          , n = j.makeUrlAbsolute(b, a.mobile.activePage && k(a.mobile.activePage) || s.hrefNoHash);
        if (f.data && f.type === "get")
            n = j.addSearchParams(n, f.data),
            f.data = e;
        if (f.data && f.type === "post")
            f.reloadPage = true;
        var t = j.getFilePath(n)
          , m = j.convertUrlToDataUrl(n);
        f.pageContainer = f.pageContainer || a.mobile.pageContainer;
        h = f.pageContainer.children(":jqmData(url='" + m + "')");
        h.length === 0 && m && !j.isPath(m) && (h = f.pageContainer.children("#" + m).attr("data-" + a.mobile.ns + "url", m));
        if (h.length === 0)
            if (a.mobile.firstPage && j.isFirstPageUrl(t))
                a.mobile.firstPage.parent().length && (h = a(a.mobile.firstPage));
            else if (j.isEmbeddedPage(t))
                return d.reject(n, c),
                d.promise();
        u && u.reset();
        if (h.length) {
            if (!f.reloadPage)
                return i(h, f.role),
                d.resolve(n, c, h),
                d.promise();
            g = h
        }
        var q = f.pageContainer
          , l = new a.Event("pagebeforeload")
          , p = {
            url: b,
            absUrl: n,
            dataUrl: m,
            deferred: d,
            options: f
        };
        q.trigger(l, p);
        if (l.isDefaultPrevented())
            return d.promise();
        if (f.showLoadMsg)
            var w = setTimeout(function() {
                a.mobile.showPageLoadingMsg()
            }, f.loadMsgDelay);
        !a.mobile.allowCrossDomainPages && !j.isSameDomain(v, n) ? d.reject(n, c) : a.ajax({
            url: t,
            type: f.type,
            data: f.data,
            dataType: "html",
            success: function(e, q, k) {
                var l = a("<div></div>")
                  , o = e.match(/<title[^>]*>([^<]*)/) && RegExp.$1
                  , s = RegExp("\\bdata-" + a.mobile.ns + "url=[\"']?([^\"'>]*)[\"']?");
                RegExp("(<[^>]+\\bdata-" + a.mobile.ns + "role=[\"']?page[\"']?[^>]*>)").test(e) && RegExp.$1 && s.test(RegExp.$1) && RegExp.$1 && (b = t = j.getFilePath(RegExp.$1));
                u && u.set(t);
                l.get(0).innerHTML = e;
                h = l.find(":jqmData(role='page'), :jqmData(role='dialog')").first();
                h.length || (h = a("<div data-" + a.mobile.ns + "role='page'>" + e.split(/<\/?body[^>]*>/gmi)[1] + "</div>"));
                o && !h.jqmData("title") && (~o.indexOf("&") && (o = a("<div>" + o + "</div>").text()),
                h.jqmData("title", o));
                if (!a.support.dynamicBaseTag) {
                    var v = j.get(t);
                    h.find("[src], link[href], a[rel='external'], :jqmData(ajax='false'), a[target]").each(function() {
                        var b = a(this).is("[href]") ? "href" : a(this).is("[src]") ? "src" : "action"
                          , c = a(this).attr(b)
                          , c = c.replace(location.protocol + "//" + location.host + location.pathname, "");
                        /^(\w+:|#|\/)/.test(c) || a(this).attr(b, v + c)
                    })
                }
                h.attr("data-" + a.mobile.ns + "url", j.convertUrlToDataUrl(t)).attr("data-" + a.mobile.ns + "external-page", true).appendTo(f.pageContainer);
                h.one("pagecreate", a.mobile._bindPageRemove);
                i(h, f.role);
                n.indexOf("&" + a.mobile.subPageUrlKey) > -1 && (h = f.pageContainer.children(":jqmData(url='" + m + "')"));
                f.showLoadMsg && (clearTimeout(w),
                a.mobile.hidePageLoadingMsg());
                p.xhr = k;
                p.textStatus = q;
                p.page = h;
                f.pageContainer.trigger("pageload", p);
                d.resolve(n, c, h, g)
            },
            error: function(b, e, h) {
                u && u.set(j.get());
                p.xhr = b;
                p.textStatus = e;
                p.errorThrown = h;
                b = new a.Event("pageloadfailed");
                f.pageContainer.trigger(b, p);
                b.isDefaultPrevented() || (f.showLoadMsg && (clearTimeout(w),
                a.mobile.hidePageLoadingMsg(),
                a("<div class='ui-loader ui-overlay-shadow ui-body-e ui-corner-all'><h1>" + a.mobile.pageLoadErrorMessage + "</h1></div>").css({
                    display: "block",
                    opacity: 0.96,
                    top: o.scrollTop() + 100
                }).appendTo(f.pageContainer).delay(800).fadeOut(400, function() {
                    a(this).remove()
                })),
                d.reject(n, c))
            }
        });
        return d.promise()
    };
    a.mobile.loadPage.defaults = a.mobile.loadPage.defaults || {
        type: "get",
        data: e,
        reloadPage: false,
        role: e,
        showLoadMsg: false,
        pageContainer: e,
        loadMsgDelay: 50
    };
    a.mobile.changePage = a.mobile.changePage || function(b, h) {
        if (z)
            A.unshift(arguments);
        else {
            var g = a.extend({}, a.mobile.changePage.defaults, h);
            g.pageContainer = g.pageContainer || a.mobile.pageContainer;
            g.fromPage = g.fromPage || a.mobile.activePage;
            var q = g.pageContainer
              , l = new a.Event("pagebeforechange")
              , k = {
                toPage: b,
                options: g
            };
            q.trigger(l, k);
            if (!l.isDefaultPrevented())
                if (b = k.toPage,
                z = true,
                typeof b == "string")
                    a.mobile.loadPage(b, g).done(function(b, c, d, f) {
                        z = false;
                        c.duplicateCachedPage = f;
                        a.mobile.changePage(d, c)
                    }).fail(function() {
                        z = false;
                        d(true);
                        f();
                        g.pageContainer.trigger("pagechangefailed", k)
                    });
                else {
                    if (b[0] === a.mobile.firstPage[0] && !g.dataUrl)
                        g.dataUrl = v.hrefNoHash;
                    var l = g.fromPage
                      , p = g.dataUrl && j.convertUrlToDataUrl(g.dataUrl) || b.jqmData("url")
                      , o = p;
                    j.getFilePath(p);
                    var s = m.getActive()
                      , w = m.activeIndex === 0
                      , x = 0
                      , u = document.title
                      , y = g.role === "dialog" || b.jqmData("role") === "dialog";
                    if (l && l[0] === b[0] && !g.allowSamePageTransition)
                        z = false,
                        q.trigger("pagechange", k);
                    else {
                        i(b, g.role);
                        g.fromHashChange && m.directHashChange({
                            currentUrl: p,
                            isBack: function() {
                                x = -1
                            },
                            isForward: function() {
                                x = 1
                            }
                        });
                        try {
                            document.activeElement && document.activeElement.nodeName.toLowerCase() != "body" ? a(document.activeElement).blur() : a("input:focus, textarea:focus, select:focus").blur()
                        } catch (C) {}
                        y && s && (p = (s.url || "") + t);
                        if (g.changeHash !== false && p)
                            m.ignoreNextHashChange = true,
                            j.set(p);
                        var B = !s ? u : b.jqmData("title") || b.children(":jqmData(role='header')").find(".ui-title").getEncodedText();
                        B && u == document.title && (u = B);
                        b.jqmData("title") || b.jqmData("title", u);
                        g.transition = g.transition || (x && !w ? s.transition : e) || (y ? a.mobile.defaultDialogTransition : a.mobile.defaultPageTransition);
                        x || m.addNew(p, g.transition, u, o, g.role);
                        document.title = m.getActive().title;
                        a.mobile.activePage = b;
                        g.reverse = g.reverse || x < 0;
                        c(b, l, g.transition, g.reverse).done(function() {
                            d();
                            g.duplicateCachedPage && g.duplicateCachedPage.remove();
                            n.removeClass("ui-mobile-rendering");
                            f();
                            q.trigger("pagechange", k)
                        })
                    }
                }
        }
    };
    a.mobile.changePage.defaults = a.mobile.changePage.defaults || {
        transition: e,
        reverse: false,
        changeHash: true,
        fromHashChange: false,
        role: e,
        duplicateCachedPage: e,
        pageContainer: e,
        showLoadMsg: true,
        dataUrl: e,
        fromPage: e,
        allowSamePageTransition: false
    };
    a.mobile._handleHashChange = a.mobile._handleHashChange || function(b) {
        var c = j.stripHash(b)
          , f = {
            transition: a.mobile.urlHistory.stack.length === 0 ? "none" : e,
            changeHash: false,
            fromHashChange: true
        };
        if (!a.mobile.hashListeningEnabled || m.ignoreNextHashChange)
            m.ignoreNextHashChange = false;
        else {
            if (m.stack.length > 1 && c.indexOf(t) > -1)
                if (a.mobile.activePage.is(".ui-dialog"))
                    m.directHashChange({
                        currentUrl: c,
                        either: function(b) {
                            var d = a.mobile.urlHistory.getActive();
                            c = d.pageUrl;
                            a.extend(f, {
                                role: d.role,
                                transition: d.transition,
                                reverse: b
                            })
                        }
                    });
                else {
                    m.directHashChange({
                        currentUrl: c,
                        isBack: function() {
                            window.history.back()
                        },
                        isForward: function() {
                            window.history.forward()
                        }
                    });
                    return
                }
            c ? (c = typeof c === "string" && !j.isPath(c) ? j.makeUrlAbsolute("#" + c, s) : c,
            a.mobile.changePage(c, f)) : a.mobile.changePage(a.mobile.firstPage, f)
        }
    }
    ;
    a.mobile._registerInternalEvents = a.mobile._registerInternalEvents || function() {
        a(document).delegate("form", "submit", function(b) {
            var c = a(this);
            if (a.mobile.ajaxEnabled && !c.is(":jqmData(ajax='false')")) {
                var d = c.attr("method")
                  , f = c.attr("target")
                  , e = c.attr("action");
                if (!e && (e = k(c),
                e === s.hrefNoHash))
                    e = v.hrefNoSearch;
                e = j.makeUrlAbsolute(e, k(c));
                j.isExternal(e) && !j.isPermittedCrossDomainRequest(v, e) || f || (a.mobile.changePage(e, {
                    type: d && d.length && d.toLowerCase() || "get",
                    data: c.serialize(),
                    transition: c.jqmData("transition"),
                    direction: c.jqmData("direction"),
                    reloadPage: true
                }),
                b.preventDefault())
            }
        });
        a(document).bind("vclick", function(b) {
            if (!(b.which > 1) && a.mobile.linkBindingEnabled && (b = l(b.target)) && j.parseUrl(b.getAttribute("href") || "#").hash !== "#")
                d(true),
                p = a(b).closest(".ui-btn").not(".ui-disabled"),
                p.addClass(a.mobile.activeBtnClass),
                a("." + a.mobile.activePageClass + " .ui-btn").not(b).blur()
        });
        a(document).bind("click", function(b) {
            if (a.mobile.linkBindingEnabled) {
                var c = l(b.target);
                if (c && !(b.which > 1)) {
                    var f = a(c)
                      , h = function() {
                        window.setTimeout(function() {
                            d(true)
                        }, 200)
                    };
                    if (f.is(":jqmData(rel='back')"))
                        return window.history.back(),
                        false;
                    var g = k(f)
                      , c = j.makeUrlAbsolute(f.attr("href") || "#", g);
                    if (!a.mobile.ajaxEnabled && !j.isEmbeddedPage(c))
                        h();
                    else {
                        if (c.search("#") != -1)
                            if (c = c.replace(/[^#]*#/, ""))
                                c = j.isPath(c) ? j.makeUrlAbsolute(c, g) : j.makeUrlAbsolute("#" + c, v.hrefNoHash);
                            else {
                                b.preventDefault();
                                return
                            }
                        f.is("[rel='external']") || f.is(":jqmData(ajax='false')") || f.is("[target]") || j.isExternal(c) && !j.isPermittedCrossDomainRequest(v, c) ? h() : (h = f.jqmData("transition"),
                        g = (g = f.jqmData("direction")) && g === "reverse" || f.jqmData("back"),
                        f = f.attr("data-" + a.mobile.ns + "rel") || e,
                        a.mobile.changePage(c, {
                            transition: h,
                            reverse: g,
                            role: f
                        }),
                        b.preventDefault())
                    }
                }
            }
        });
        a(document).delegate(".ui-page", "pageshow.prefetch", function() {
            var b = [];
            a(this).find("a:jqmData(prefetch)").each(function() {
                var c = a(this)
                  , f = c.attr("href");
                f && a.inArray(f, b) === -1 && (b.push(f),
                a.mobile.loadPage(f, {
                    role: c.attr("data-" + a.mobile.ns + "rel")
                }))
            })
        });
        o.bind("hashchange", function() {
            a.mobile._handleHashChange(location.hash)
        });
        a(document).bind("pageshow", g);
        a(window).bind("throttledresize", g)
    }
}
)(jQuery);
(function(a, e) {
    var b = {}
      , d = a(e)
      , f = a.mobile.path.parseUrl(location.href);
    a.extend(b, {
        initialFilePath: f.pathname + f.search,
        initialHref: f.hrefNoHash,
        hashchangeFired: false,
        state: function() {
            return {
                hash: location.hash || "#" + b.initialFilePath,
                title: document.title,
                initialHref: b.initialHref
            }
        },
        resetUIKeys: function(b) {
            var f = "&" + a.mobile.subPageUrlKey
              , d = b.indexOf(a.mobile.dialogHashKey);
            d > -1 ? b = b.slice(0, d) + "#" + b.slice(d) : b.indexOf(f) > -1 && (b = b.split(f).join("#" + f));
            return b
        },
        nextHashChangePrevented: function(c) {
            a.mobile.urlHistory.ignoreNextHashChange = c;
            b.onHashChangeDisabled = c
        },
        onHashChange: function() {
            if (!b.onHashChangeDisabled) {
                var c, f;
                c = location.hash;
                var d = a.mobile.path.isPath(c)
                  , e = d ? location.href : a.mobile.getDocumentUrl();
                c = d ? c.replace("#", "") : c;
                f = b.state();
                c = a.mobile.path.makeUrlAbsolute(c, e);
                d && (c = b.resetUIKeys(c));
                history.replaceState(f, document.title, c)
            }
        },
        onPopState: function(c) {
            var f = c.originalEvent.state;
            f && (b.nextHashChangePrevented(true),
            setTimeout(function() {
                b.nextHashChangePrevented(false);
                a.mobile._handleHashChange(f.hash)
            }, 100))
        },
        init: function() {
            d.bind("hashchange", b.onHashChange);
            d.bind("popstate", b.onPopState);
            location.hash === "" && history.replaceState(b.state(), document.title, location.href)
        }
    });
    a(function() {
        a.mobile.pushStateEnabled && a.support.pushState && b.init()
    })
}
)(jQuery, this);