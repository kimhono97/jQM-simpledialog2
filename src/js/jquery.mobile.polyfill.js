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
    }
    ;
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
    }
    ;
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