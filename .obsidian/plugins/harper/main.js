'use strict';

var view = require('@codemirror/view');
var state = require('@codemirror/state');
var obsidian = require('obsidian');

var _documentCurrentScript = typeof document !== 'undefined' ? document.currentScript : null;
var logoSvg = "<?xml version=\"1.0\" encoding=\"UTF-8\" standalone=\"no\"?>\n<!DOCTYPE svg PUBLIC \"-//W3C//DTD SVG 1.1//EN\" \"http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd\">\n<svg width=\"100%\" height=\"100%\" viewBox=\"0 0 695 411\" version=\"1.1\" xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" xml:space=\"preserve\" xmlns:serif=\"http://www.serif.com/\" style=\"fill-rule:evenodd;clip-rule:evenodd;stroke-linecap:round;stroke-linejoin:round;stroke-miterlimit:1.5;\" fill=\"#ffffff\" stroke=\"currentColor\">\n    <g transform=\"matrix(1,0,0,1,-5,-1720)\">\n        <g id=\"Artboard1\" transform=\"matrix(0.824576,0,0,0.749254,0.365685,430.856)\">\n            <rect x=\"5.62\" y=\"1720.57\" width=\"842.425\" height=\"547.24\" style=\"fill:none;\"/>\n            <g transform=\"matrix(1.21274,0,0,1.33466,-2183.71,393.157)\">\n                <g transform=\"matrix(1,0,0,1,-22.3927,1.08043)\">\n                    <path d=\"M1930.93,1121.75C1930.93,1121.75 1974.66,1080.73 2041.34,1094.1C2086.61,1103.18 2122.83,1145.4 2122.83,1145.4\" style=\"fill:none;stroke-width:22.92px;\"/>\n                </g>\n                <g transform=\"matrix(1,0,0,1,-47.3485,12.3935)\">\n                    <path d=\"M2250.3,1107.1C2250.3,1107.1 2261.8,1065.58 2311.59,1047.05C2361.62,1028.44 2422.42,1051.13 2422.42,1051.13\" style=\"fill:none;stroke-width:22.92px;\"/>\n                </g>\n                <g transform=\"matrix(1.10085,0,0,1.10085,-212.096,-122.054)\">\n                    <g transform=\"matrix(1,0,0,1,14.3186,-0.853887)\">\n                        <ellipse cx=\"1981.62\" cy=\"1247.49\" rx=\"87.401\" ry=\"87.881\" style=\"fill:none;stroke-width:20.82px;\"/>\n                    </g>\n                    <rect x=\"2083.34\" y=\"1231.11\" width=\"66.702\" height=\"15.521\" style=\"fill:none;stroke-width:20.82px;\"/>\n                    <rect x=\"1892.23\" y=\"1208.69\" width=\"16.306\" height=\"30.182\" style=\"fill:none;stroke-width:20.82px;\"/>\n                    <g transform=\"matrix(-1,0,0,1,4281.79,-0.853887)\">\n                        <ellipse cx=\"1981.62\" cy=\"1247.49\" rx=\"87.401\" ry=\"87.881\" style=\"fill:none;stroke-width:20.82px;\"/>\n                    </g>\n                    <g transform=\"matrix(-1,0,0,1,4296.11,0)\">\n                        <rect x=\"2083.34\" y=\"1231.11\" width=\"66.702\" height=\"15.521\" style=\"fill:none;stroke-width:20.82px;\"/>\n                    </g>\n                    <g transform=\"matrix(-1,0,0,1,4296.11,0)\">\n                        <rect x=\"1892.23\" y=\"1208.69\" width=\"16.306\" height=\"30.182\" style=\"fill:none;stroke-width:20.82px;\"/>\n                    </g>\n                </g>\n            </g>\n        </g>\n    </g>\n</svg>\n";

/******************************************************************************
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
/* global Reflect, Promise, SuppressedError, Symbol */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    if (typeof b !== "function" && b !== null)
        throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

var __assign = function() {
    __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};

typeof SuppressedError === "function" ? SuppressedError : function (error, suppressed, message) {
    var e = new Error(message);
    return e.name = "SuppressedError", e.error = error, e.suppressed = suppressed, e;
};

function crelt() {
  var elt = arguments[0];
  if (typeof elt == "string") elt = document.createElement(elt);
  var i = 1, next = arguments[1];
  if (next && typeof next == "object" && next.nodeType == null && !Array.isArray(next)) {
    for (var name in next) if (Object.prototype.hasOwnProperty.call(next, name)) {
      var value = next[name];
      if (typeof value == "string") elt.setAttribute(name, value);
      else if (value != null) elt[name] = value;
    }
    i++;
  }
  for (; i < arguments.length; i++) add(elt, arguments[i]);
  return elt
}

function add(elt, child) {
  if (typeof child == "string") {
    elt.appendChild(document.createTextNode(child));
  } else if (child == null) ; else if (child.nodeType != null) {
    elt.appendChild(child);
  } else if (Array.isArray(child)) {
    for (var i = 0; i < child.length; i++) add(elt, child[i]);
  } else {
    throw new RangeError("Unsupported child node: " + child)
  }
}

var SelectedDiagnostic = /** @class */ (function () {
    function SelectedDiagnostic(from, to, diagnostic) {
        this.from = from;
        this.to = to;
        this.diagnostic = diagnostic;
    }
    return SelectedDiagnostic;
}());
var LintState = /** @class */ (function () {
    function LintState(diagnostics, selected) {
        this.diagnostics = diagnostics;
        this.selected = selected;
    }
    LintState.init = function (diagnostics, state) {
        // Filter the list of diagnostics for which to create markers
        var markedDiagnostics = diagnostics;
        var diagnosticFilter = state.facet(lintConfig).markerFilter;
        if (diagnosticFilter)
            markedDiagnostics = diagnosticFilter(markedDiagnostics, state);
        var ranges = view.Decoration.set(markedDiagnostics.map(function (d) {
            // For zero-length ranges or ranges covering only a line break, create a widget
            return d.from == d.to || (d.from == d.to - 1 && state.doc.lineAt(d.from).to == d.from)
                ? view.Decoration.widget({
                    widget: new DiagnosticWidget(d),
                    diagnostic: d
                }).range(d.from)
                : view.Decoration.mark({
                    attributes: {
                        class: 'cm-lintRange cm-lintRange-' + d.severity + (d.markClass ? ' ' + d.markClass : '')
                    },
                    diagnostic: d
                }).range(d.from, d.to);
        }), true);
        return new LintState(ranges, findDiagnostic(ranges));
    };
    return LintState;
}());
function findDiagnostic(diagnostics, diagnostic, after) {
    if (diagnostic === void 0) { diagnostic = null; }
    if (after === void 0) { after = 0; }
    var found = null;
    diagnostics.between(after, 1e9, function (from, to, _a) {
        var spec = _a.spec;
        if (diagnostic && spec.diagnostic != diagnostic)
            return;
        found = new SelectedDiagnostic(from, to, spec.diagnostic);
        return false;
    });
    return found;
}
function hideTooltip(tr, tooltip) {
    var from = tooltip.pos, to = tooltip.end || from;
    var result = tr.state.facet(lintConfig).hideOn(tr, from, to);
    if (result != null)
        return result;
    var line = tr.startState.doc.lineAt(tooltip.pos);
    return !!(tr.effects.some(function (e) { return e.is(setDiagnosticsEffect); }) ||
        tr.changes.touchesRange(line.from, Math.max(line.to, to)));
}
function maybeEnableLint(state$1, effects) {
    return state$1.field(lintState, false)
        ? effects
        : effects.concat(state.StateEffect.appendConfig.of(lintExtensions));
}
/// Returns a transaction spec which updates the current set of
/// diagnostics, and enables the lint extension if if wasn't already
/// active.
function setDiagnostics(state, diagnostics) {
    return {
        effects: maybeEnableLint(state, [setDiagnosticsEffect.of(diagnostics)])
    };
}
/// The state effect that updates the set of active diagnostics. Can
/// be useful when writing an extension that needs to track these.
var setDiagnosticsEffect = state.StateEffect.define();
var movePanelSelection = state.StateEffect.define();
var lintState = state.StateField.define({
    create: function () {
        return new LintState(view.Decoration.none, null);
    },
    update: function (value, tr) {
        if (tr.docChanged && value.diagnostics.size) {
            var mapped = value.diagnostics.map(tr.changes);
            var selected = null;
            if (value.selected) {
                var selPos = tr.changes.mapPos(value.selected.from, 1);
                selected =
                    findDiagnostic(mapped, value.selected.diagnostic, selPos) ||
                        findDiagnostic(mapped, null, selPos);
            }
            value = new LintState(mapped, selected);
        }
        for (var _i = 0, _a = tr.effects; _i < _a.length; _i++) {
            var effect = _a[_i];
            if (effect.is(setDiagnosticsEffect)) {
                value = LintState.init(effect.value, tr.state);
            }
            else if (effect.is(movePanelSelection)) {
                value = new LintState(value.diagnostics, effect.value);
            }
        }
        return value;
    },
    provide: function (f) { return [view.EditorView.decorations.from(f, function (s) { return s.diagnostics; })]; }
});
var activeMark = view.Decoration.mark({ class: 'cm-lintRange cm-lintRange-active' });
function lintTooltip(view, pos, side) {
    var diagnostics = view.state.field(lintState).diagnostics;
    var found = [], stackStart = 2e8, stackEnd = 0;
    diagnostics.between(pos - (side < 0 ? 1 : 0), pos + (side > 0 ? 1 : 0), function (from, to, _a) {
        var spec = _a.spec;
        if (pos >= from &&
            pos <= to &&
            (from == to || ((pos > from || side > 0) && (pos < to || side < 0)))) {
            found.push(spec.diagnostic);
            stackStart = Math.min(from, stackStart);
            stackEnd = Math.max(to, stackEnd);
        }
    });
    var diagnosticFilter = view.state.facet(lintConfig).tooltipFilter;
    if (diagnosticFilter)
        found = diagnosticFilter(found, view.state);
    if (!found.length)
        return null;
    return {
        pos: stackStart,
        end: stackEnd,
        above: view.state.doc.lineAt(stackStart).to < stackEnd,
        create: function () {
            return { dom: diagnosticsTooltip(view, found) };
        }
    };
}
function diagnosticsTooltip(view, diagnostics) {
    return crelt('ul', { class: 'cm-tooltip-lint' }, diagnostics.map(function (d) { return renderDiagnostic(view, d); }));
}
var lintPlugin = view.ViewPlugin.fromClass(/** @class */ (function () {
    function class_1(view) {
        this.view = view;
        this.timeout = -1;
        this.set = true;
        var delay = view.state.facet(lintConfig).delay;
        this.lintTime = Date.now() + delay;
        this.run = this.run.bind(this);
        this.timeout = setTimeout(this.run, delay);
    }
    class_1.prototype.run = function () {
        var _this = this;
        clearTimeout(this.timeout);
        var now = Date.now();
        if (now < this.lintTime - 10) {
            this.timeout = setTimeout(this.run, this.lintTime - now);
        }
        else {
            this.set = false;
            var state_1 = this.view.state, sources = state_1.facet(lintConfig).sources;
            if (sources.length)
                Promise.all(sources.map(function (source) { return Promise.resolve(source(_this.view)); })).then(function (annotations) {
                    var all = annotations.reduce(function (a, b) { return a.concat(b); });
                    if (_this.view.state.doc == state_1.doc)
                        _this.view.dispatch(setDiagnostics(_this.view.state, all));
                }, function (error) {
                    view.logException(_this.view.state, error);
                });
        }
    };
    class_1.prototype.update = function (update) {
        var config = update.state.facet(lintConfig);
        if (update.docChanged ||
            config != update.startState.facet(lintConfig) ||
            (config.needsRefresh && config.needsRefresh(update))) {
            this.lintTime = Date.now() + config.delay;
            if (!this.set) {
                this.set = true;
                this.timeout = setTimeout(this.run, config.delay);
            }
        }
    };
    class_1.prototype.force = function () {
        if (this.set) {
            this.lintTime = Date.now();
            this.run();
        }
    };
    class_1.prototype.destroy = function () {
        clearTimeout(this.timeout);
    };
    return class_1;
}()));
var lintConfig = state.Facet.define({
    combine: function (input) {
        return __assign({ sources: input.map(function (i) { return i.source; }).filter(function (x) { return x != null; }) }, state.combineConfig(input.map(function (i) { return i.config; }), {
            delay: 750,
            markerFilter: null,
            tooltipFilter: null,
            needsRefresh: null,
            hideOn: function () { return null; }
        }, {
            needsRefresh: function (a, b) { return (!a ? b : !b ? a : function (u) { return a(u) || b(u); }); }
        }));
    }
});
/// Given a diagnostic source, this function returns an extension that
/// enables linting with that source. It will be called whenever the
/// editor is idle (after its content changed). If `null` is given as
/// source, this only configures the lint extension.
function linter(source, config) {
    if (config === void 0) { config = {}; }
    return [lintConfig.of({ source: source, config: config }), lintPlugin, lintExtensions];
}
function renderDiagnostic(view, diagnostic, inPanel) {
    var _a;
    var keys = [];
    return crelt('li', { class: 'cm-diagnostic cm-diagnostic-' + diagnostic.severity }, crelt('span', { class: 'cm-diagnosticTitle' }, diagnostic.title), crelt('span', { class: 'cm-diagnosticText' }, diagnostic.renderMessage ? diagnostic.renderMessage(view) : diagnostic.message), (_a = diagnostic.actions) === null || _a === void 0 ? void 0 : _a.map(function (action, i) {
        var fired = false;
        var click = function (e) {
            e.preventDefault();
            if (fired)
                return;
            fired = true;
            var found = findDiagnostic(view.state.field(lintState).diagnostics, diagnostic);
            if (found)
                action.apply(view, found.from, found.to);
        };
        var name = action.name, keyIndex = keys[i] ? name.indexOf(keys[i]) : -1;
        var nameElt = keyIndex < 0
            ? name
            : [
                name.slice(0, keyIndex),
                crelt('u', name.slice(keyIndex, keyIndex + 1)),
                name.slice(keyIndex + 1)
            ];
        return crelt('button', {
            type: 'button',
            class: 'cm-diagnosticAction',
            onclick: click,
            onmousedown: click,
            'aria-label': " Action: ".concat(name).concat(keyIndex < 0 ? '' : " (access key \"".concat(keys[i], ")\""), ".")
        }, nameElt);
    }), diagnostic.source && crelt('div', { class: 'cm-diagnosticSource' }, diagnostic.source));
}
var DiagnosticWidget = /** @class */ (function (_super) {
    __extends(DiagnosticWidget, _super);
    function DiagnosticWidget(diagnostic) {
        var _this = _super.call(this) || this;
        _this.diagnostic = diagnostic;
        return _this;
    }
    DiagnosticWidget.prototype.eq = function (other) {
        return other.diagnostic == this.diagnostic;
    };
    DiagnosticWidget.prototype.toDOM = function () {
        return crelt('span', { class: 'cm-lintPoint cm-lintPoint-' + this.diagnostic.severity });
    };
    return DiagnosticWidget;
}(view.WidgetType));
function svg(content, attrs) {
    return "url('data:image/svg+xml,<svg xmlns=\"http://www.w3.org/2000/svg\" ".concat(attrs, ">").concat(encodeURIComponent(content), "</svg>')");
}
function underline(color) {
    return svg("<path d=\"m0 2.5 l2 -1.5 l1 0 l2 1.5 l1 0\" stroke=\"".concat(color, "\" fill=\"none\" stroke-width=\"1\"/>"), "width=\"6\" height=\"3\"");
}
var baseTheme = view.EditorView.baseTheme({
    '.cm-diagnostic': {
        padding: '4px',
        marginLeft: '0px',
        display: 'flex',
        flexDirection: 'column',
        whiteSpace: 'pre-wrap'
    },
    '.cm-diagnosticTitle': {
        boxShadow: 'inset 0 -2px #DB2B39',
        width: 'max-content',
        fontWeight: 'bold'
    },
    '.cm-diagnosticText': {
        marginTop: '8px'
    },
    '.cm-diagnosticAction': {
        font: 'inherit',
        border: 'none',
        marginTop: '8px',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--size-4-2)',
        padding: 'var(--size-4-1) var(--size-4-2)',
        cursor: 'var(--cursor)',
        fontSize: 'var(--font-ui-small)',
        borderRadius: 'var(--radius-s)',
        whiteSpace: 'nowrap',
        width: '100%'
    },
    '.cm-tooltip': {
        padding: 'var(--size-2-3) !important',
        border: '1px solid var(--background-modifier-border-hover) !important',
        backgroundColor: 'var(--background-secondary) !important',
        borderRadius: 'var(--radius-m) !important',
        boxShadow: 'var(--shadow-s) !important',
        zIndex: 'var(--layer-menu) !important',
        userSelect: 'none !important',
        maxHeight: 'calc(100% - var(--header-height)) !important',
        overflow: 'hidden !important'
    },
    '.cm-diagnosticSource': {
        fontSize: '70%',
        opacity: 0.7
    },
    '.cm-lintRange': {
        backgroundPosition: 'left bottom',
        backgroundRepeat: 'repeat-x',
        paddingBottom: '0.7px'
    },
    '.cm-lintRange-error': { backgroundImage: underline('#d11') },
    '.cm-lintRange-warning': { backgroundImage: underline('orange') },
    '.cm-lintRange-info': { backgroundImage: underline('#999') },
    '.cm-lintRange-hint': { backgroundImage: underline('#66d') },
    '.cm-lintRange-active': { backgroundColor: '#ffdd9980' },
    '.cm-tooltip-lint': {
        padding: 0,
        margin: 0
    },
    '.cm-lintPoint': {
        position: 'relative',
        '&:after': {
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: '-2px',
            borderLeft: '3px solid transparent',
            borderRight: '3px solid transparent',
            borderBottom: '4px solid #d11'
        }
    },
    '.cm-lintPoint-warning': {
        '&:after': { borderBottomColor: 'orange' }
    },
    '.cm-lintPoint-info': {
        '&:after': { borderBottomColor: '#999' }
    },
    '.cm-lintPoint-hint': {
        '&:after': { borderBottomColor: '#66d' }
    },
    '.cm-panel.cm-panel-lint': {
        position: 'relative',
        '& ul': {
            maxHeight: '100px',
            overflowY: 'auto',
            '& [aria-selected]': {
                backgroundColor: '#ddd',
                '& u': { textDecoration: 'underline' }
            },
            '&:focus [aria-selected]': {
                background_fallback: '#bdf',
                backgroundColor: 'Highlight',
                color_fallback: 'white',
                color: 'HighlightText'
            },
            '& u': { textDecoration: 'none' },
            padding: 0,
            margin: 0
        },
        '& [name=close]': {
            position: 'absolute',
            top: '0',
            right: '2px',
            background: 'inherit',
            border: 'none',
            font: 'inherit',
            padding: 0,
            margin: 0
        }
    }
});
var lintExtensions = [
    lintState,
    view.EditorView.decorations.compute([lintState], function (state) {
        var _a = state.field(lintState), selected = _a.selected, panel = _a.panel;
        return !selected || !panel || selected.from == selected.to
            ? view.Decoration.none
            : view.Decoration.set([activeMark.range(selected.from, selected.to)]);
    }),
    view.hoverTooltip(lintTooltip, { hideOn: hideTooltip }),
    baseTheme
];

function _loadWasmModule (sync, filepath, src, imports) {
  function _instantiateOrCompile(source, imports, stream) {
    var instantiateFunc = stream ? WebAssembly.instantiateStreaming : WebAssembly.instantiate;
    var compileFunc = stream ? WebAssembly.compileStreaming : WebAssembly.compile;

    if (imports) {
      return instantiateFunc(source, imports)
    } else {
      return compileFunc(source)
    }
  }

  
var buf = null;
var isNode = typeof process !== 'undefined' && process.versions != null && process.versions.node != null;

if (isNode) {
  
buf = Buffer.from(src, 'base64');

} else {
  
var raw = globalThis.atob(src);
var rawLength = raw.length;
buf = new Uint8Array(new ArrayBuffer(rawLength));
for(var i = 0; i < rawLength; i++) {
   buf[i] = raw.charCodeAt(i);
}

}


  {
    return _instantiateOrCompile(buf, imports, false)
  }
}


let wasm;

const heap = new Array(128).fill(undefined);

heap.push(undefined, null, true, false);

function getObject(idx) { return heap[idx]; }

let heap_next = heap.length;

function dropObject(idx) {
    if (idx < 132) return;
    heap[idx] = heap_next;
    heap_next = idx;
}

function takeObject(idx) {
    const ret = getObject(idx);
    dropObject(idx);
    return ret;
}

const cachedTextDecoder = (typeof TextDecoder !== 'undefined' ? new TextDecoder('utf-8', { ignoreBOM: true, fatal: true }) : { decode: () => { throw Error('TextDecoder not available') } } );

if (typeof TextDecoder !== 'undefined') { cachedTextDecoder.decode(); }
let cachedUint8Memory0 = null;

function getUint8Memory0() {
    if (cachedUint8Memory0 === null || cachedUint8Memory0.byteLength === 0) {
        cachedUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachedUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}

function addHeapObject(obj) {
    if (heap_next === heap.length) heap.push(heap.length + 1);
    const idx = heap_next;
    heap_next = heap[idx];

    heap[idx] = obj;
    return idx;
}

function isLikeNone(x) {
    return x === undefined || x === null;
}

let cachedFloat64Memory0 = null;

function getFloat64Memory0() {
    if (cachedFloat64Memory0 === null || cachedFloat64Memory0.byteLength === 0) {
        cachedFloat64Memory0 = new Float64Array(wasm.memory.buffer);
    }
    return cachedFloat64Memory0;
}

let cachedInt32Memory0 = null;

function getInt32Memory0() {
    if (cachedInt32Memory0 === null || cachedInt32Memory0.byteLength === 0) {
        cachedInt32Memory0 = new Int32Array(wasm.memory.buffer);
    }
    return cachedInt32Memory0;
}

let WASM_VECTOR_LEN = 0;

const cachedTextEncoder = (typeof TextEncoder !== 'undefined' ? new TextEncoder('utf-8') : { encode: () => { throw Error('TextEncoder not available') } } );

const encodeString = (typeof cachedTextEncoder.encodeInto === 'function'
    ? function (arg, view) {
    return cachedTextEncoder.encodeInto(arg, view);
}
    : function (arg, view) {
    const buf = cachedTextEncoder.encode(arg);
    view.set(buf);
    return {
        read: arg.length,
        written: buf.length
    };
});

function passStringToWasm0(arg, malloc, realloc) {

    if (realloc === undefined) {
        const buf = cachedTextEncoder.encode(arg);
        const ptr = malloc(buf.length, 1) >>> 0;
        getUint8Memory0().subarray(ptr, ptr + buf.length).set(buf);
        WASM_VECTOR_LEN = buf.length;
        return ptr;
    }

    let len = arg.length;
    let ptr = malloc(len, 1) >>> 0;

    const mem = getUint8Memory0();

    let offset = 0;

    for (; offset < len; offset++) {
        const code = arg.charCodeAt(offset);
        if (code > 0x7F) break;
        mem[ptr + offset] = code;
    }

    if (offset !== len) {
        if (offset !== 0) {
            arg = arg.slice(offset);
        }
        ptr = realloc(ptr, len, len = offset + arg.length * 3, 1) >>> 0;
        const view = getUint8Memory0().subarray(ptr + offset, ptr + len);
        const ret = encodeString(arg, view);

        offset += ret.written;
        ptr = realloc(ptr, len, offset, 1) >>> 0;
    }

    WASM_VECTOR_LEN = offset;
    return ptr;
}

function debugString(val) {
    // primitive types
    const type = typeof val;
    if (type == 'number' || type == 'boolean' || val == null) {
        return  `${val}`;
    }
    if (type == 'string') {
        return `"${val}"`;
    }
    if (type == 'symbol') {
        const description = val.description;
        if (description == null) {
            return 'Symbol';
        } else {
            return `Symbol(${description})`;
        }
    }
    if (type == 'function') {
        const name = val.name;
        if (typeof name == 'string' && name.length > 0) {
            return `Function(${name})`;
        } else {
            return 'Function';
        }
    }
    // objects
    if (Array.isArray(val)) {
        const length = val.length;
        let debug = '[';
        if (length > 0) {
            debug += debugString(val[0]);
        }
        for(let i = 1; i < length; i++) {
            debug += ', ' + debugString(val[i]);
        }
        debug += ']';
        return debug;
    }
    // Test for built-in
    const builtInMatches = /\[object ([^\]]+)\]/.exec(toString.call(val));
    let className;
    if (builtInMatches.length > 1) {
        className = builtInMatches[1];
    } else {
        // Failed to match the standard '[object ClassName]'
        return toString.call(val);
    }
    if (className == 'Object') {
        // we're a user defined class or Object
        // JSON.stringify avoids problems with cycles, and is generally much
        // easier than looping through ownProperties of `val`.
        try {
            return 'Object(' + JSON.stringify(val) + ')';
        } catch (_) {
            return 'Object';
        }
    }
    // errors
    if (val instanceof Error) {
        return `${val.name}: ${val.message}\n${val.stack}`;
    }
    // TODO we could test for more things here, like `Set`s and `Map`s.
    return className;
}

/**
* @returns {any}
*/
function get_lint_config_as_object() {
    const ret = wasm.get_lint_config_as_object();
    return takeObject(ret);
}

/**
* @param {any} object
*/
function set_lint_config_from_object(object) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        wasm.set_lint_config_from_object(retptr, addHeapObject(object));
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        if (r1) {
            throw takeObject(r0);
        }
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

let cachedUint32Memory0 = null;

function getUint32Memory0() {
    if (cachedUint32Memory0 === null || cachedUint32Memory0.byteLength === 0) {
        cachedUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachedUint32Memory0;
}

function getArrayJsValueFromWasm0(ptr, len) {
    ptr = ptr >>> 0;
    const mem = getUint32Memory0();
    const slice = mem.subarray(ptr / 4, ptr / 4 + len);
    const result = [];
    for (let i = 0; i < slice.length; i++) {
        result.push(takeObject(slice[i]));
    }
    return result;
}
/**
* Perform the configured linting on the provided text.
* @param {string} text
* @returns {(Lint)[]}
*/
function lint(text) {
    try {
        const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
        const ptr0 = passStringToWasm0(text, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        const len0 = WASM_VECTOR_LEN;
        wasm.lint(retptr, ptr0, len0);
        var r0 = getInt32Memory0()[retptr / 4 + 0];
        var r1 = getInt32Memory0()[retptr / 4 + 1];
        var v2 = getArrayJsValueFromWasm0(r0, r1).slice();
        wasm.__wbindgen_export_2(r0, r1 * 4, 4);
        return v2;
    } finally {
        wasm.__wbindgen_add_to_stack_pointer(16);
    }
}

function handleError(f, args) {
    try {
        return f.apply(this, args);
    } catch (e) {
        wasm.__wbindgen_export_3(addHeapObject(e));
    }
}

const LintFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_lint_free(ptr >>> 0));
/**
*/
class Lint {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Lint.prototype);
        obj.__wbg_ptr = ptr;
        LintFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        LintFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_lint_free(ptr);
    }
    /**
    * Get the content of the source material pointed to by [`Self::span`]
    * @returns {string}
    */
    get_problem_text() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.lint_get_problem_text(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export_2(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * Get a string representing the general category of the lint.
    * @returns {string}
    */
    lint_kind() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.lint_lint_kind(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export_2(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {number}
    */
    suggestion_count() {
        const ret = wasm.lint_suggestion_count(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @returns {(Suggestion)[]}
    */
    suggestions() {
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.lint_suggestions(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            var v1 = getArrayJsValueFromWasm0(r0, r1).slice();
            wasm.__wbindgen_export_2(r0, r1 * 4, 4);
            return v1;
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
        }
    }
    /**
    * @returns {Span}
    */
    span() {
        const ret = wasm.lint_span(this.__wbg_ptr);
        return Span.__wrap(ret);
    }
    /**
    * @returns {string}
    */
    message() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.lint_message(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export_2(deferred1_0, deferred1_1, 1);
        }
    }
}

const SpanFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_span_free(ptr >>> 0));
/**
*/
class Span {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Span.prototype);
        obj.__wbg_ptr = ptr;
        SpanFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SpanFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_span_free(ptr);
    }
    /**
    * @returns {number}
    */
    get start() {
        const ret = wasm.__wbg_get_span_start(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set start(arg0) {
        wasm.__wbg_set_span_start(this.__wbg_ptr, arg0);
    }
    /**
    * @returns {number}
    */
    get end() {
        const ret = wasm.__wbg_get_span_end(this.__wbg_ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set end(arg0) {
        wasm.__wbg_set_span_end(this.__wbg_ptr, arg0);
    }
    /**
    * @param {number} start
    * @param {number} end
    * @returns {Span}
    */
    static new(start, end) {
        const ret = wasm.span_new(start, end);
        return Span.__wrap(ret);
    }
}

const SuggestionFinalization = (typeof FinalizationRegistry === 'undefined')
    ? { register: () => {}, unregister: () => {} }
    : new FinalizationRegistry(ptr => wasm.__wbg_suggestion_free(ptr >>> 0));
/**
*/
class Suggestion {

    static __wrap(ptr) {
        ptr = ptr >>> 0;
        const obj = Object.create(Suggestion.prototype);
        obj.__wbg_ptr = ptr;
        SuggestionFinalization.register(obj, obj.__wbg_ptr, obj);
        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.__wbg_ptr;
        this.__wbg_ptr = 0;
        SuggestionFinalization.unregister(this);
        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_suggestion_free(ptr);
    }
    /**
    * Get the text that is going to replace error.
    * If [`Self::kind`] is `SuggestionKind::Remove`, this will return an empty
    * string.
    * @returns {string}
    */
    get_replacement_text() {
        let deferred1_0;
        let deferred1_1;
        try {
            const retptr = wasm.__wbindgen_add_to_stack_pointer(-16);
            wasm.suggestion_get_replacement_text(retptr, this.__wbg_ptr);
            var r0 = getInt32Memory0()[retptr / 4 + 0];
            var r1 = getInt32Memory0()[retptr / 4 + 1];
            deferred1_0 = r0;
            deferred1_1 = r1;
            return getStringFromWasm0(r0, r1);
        } finally {
            wasm.__wbindgen_add_to_stack_pointer(16);
            wasm.__wbindgen_export_2(deferred1_0, deferred1_1, 1);
        }
    }
    /**
    * @returns {SuggestionKind}
    */
    kind() {
        const ret = wasm.suggestion_kind(this.__wbg_ptr);
        return ret;
    }
}

async function __wbg_load(module, imports) {
    if (typeof Response === 'function' && module instanceof Response) {
        if (typeof WebAssembly.instantiateStreaming === 'function') {
            try {
                return await WebAssembly.instantiateStreaming(module, imports);

            } catch (e) {
                if (module.headers.get('Content-Type') != 'application/wasm') {
                    console.warn("`WebAssembly.instantiateStreaming` failed because your server does not serve wasm with `application/wasm` MIME type. Falling back to `WebAssembly.instantiate` which is slower. Original error:\n", e);

                } else {
                    throw e;
                }
            }
        }

        const bytes = await module.arrayBuffer();
        return await WebAssembly.instantiate(bytes, imports);

    } else {
        const instance = await WebAssembly.instantiate(module, imports);

        if (instance instanceof WebAssembly.Instance) {
            return { instance, module };

        } else {
            return instance;
        }
    }
}

function __wbg_get_imports() {
    const imports = {};
    imports.wbg = {};
    imports.wbg.__wbg_suggestion_new = function(arg0) {
        const ret = Suggestion.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_object_drop_ref = function(arg0) {
        takeObject(arg0);
    };
    imports.wbg.__wbindgen_string_new = function(arg0, arg1) {
        const ret = getStringFromWasm0(arg0, arg1);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_number_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'number' ? obj : undefined;
        getFloat64Memory0()[arg0 / 8 + 1] = isLikeNone(ret) ? 0 : ret;
        getInt32Memory0()[arg0 / 4 + 0] = !isLikeNone(ret);
    };
    imports.wbg.__wbg_lint_new = function(arg0) {
        const ret = Lint.__wrap(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_error_new = function(arg0, arg1) {
        const ret = new Error(getStringFromWasm0(arg0, arg1));
        return addHeapObject(ret);
    };
    imports.wbg.__wbindgen_boolean_get = function(arg0) {
        const v = getObject(arg0);
        const ret = typeof(v) === 'boolean' ? (v ? 1 : 0) : 2;
        return ret;
    };
    imports.wbg.__wbindgen_is_object = function(arg0) {
        const val = getObject(arg0);
        const ret = typeof(val) === 'object' && val !== null;
        return ret;
    };
    imports.wbg.__wbindgen_is_undefined = function(arg0) {
        const ret = getObject(arg0) === undefined;
        return ret;
    };
    imports.wbg.__wbindgen_in = function(arg0, arg1) {
        const ret = getObject(arg0) in getObject(arg1);
        return ret;
    };
    imports.wbg.__wbindgen_jsval_loose_eq = function(arg0, arg1) {
        const ret = getObject(arg0) == getObject(arg1);
        return ret;
    };
    imports.wbg.__wbindgen_string_get = function(arg0, arg1) {
        const obj = getObject(arg1);
        const ret = typeof(obj) === 'string' ? obj : undefined;
        var ptr1 = isLikeNone(ret) ? 0 : passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        var len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_String_b9412f8799faab3e = function(arg0, arg1) {
        const ret = String(getObject(arg1));
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbindgen_object_clone_ref = function(arg0) {
        const ret = getObject(arg0);
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_getwithrefkey_edc2c8960f0f1191 = function(arg0, arg1) {
        const ret = getObject(arg0)[getObject(arg1)];
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_f975102236d3c502 = function(arg0, arg1, arg2) {
        getObject(arg0)[takeObject(arg1)] = takeObject(arg2);
    };
    imports.wbg.__wbg_new_72fb9a18b5ae2624 = function() {
        const ret = new Object();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_instanceof_ArrayBuffer_836825be07d4c9d2 = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof ArrayBuffer;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_buffer_12d079cc21e14bdb = function(arg0) {
        const ret = getObject(arg0).buffer;
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_new_63b92bc8671ed464 = function(arg0) {
        const ret = new Uint8Array(getObject(arg0));
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_set_a47bac70306a19a7 = function(arg0, arg1, arg2) {
        getObject(arg0).set(getObject(arg1), arg2 >>> 0);
    };
    imports.wbg.__wbg_length_c20a40f15020d68a = function(arg0) {
        const ret = getObject(arg0).length;
        return ret;
    };
    imports.wbg.__wbg_instanceof_Uint8Array_2b3bbecd033d19f6 = function(arg0) {
        let result;
        try {
            result = getObject(arg0) instanceof Uint8Array;
        } catch (_) {
            result = false;
        }
        const ret = result;
        return ret;
    };
    imports.wbg.__wbg_log_c9486ca5d8e2cbe8 = function(arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.log(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_export_2(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_log_aba5996d9bde071f = function(arg0, arg1, arg2, arg3, arg4, arg5, arg6, arg7) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.log(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3), getStringFromWasm0(arg4, arg5), getStringFromWasm0(arg6, arg7));
        } finally {
            wasm.__wbindgen_export_2(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbg_mark_40e050a77cc39fea = function(arg0, arg1) {
        performance.mark(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbg_measure_aa7a73f17813f708 = function() { return handleError(function (arg0, arg1, arg2, arg3) {
        let deferred0_0;
        let deferred0_1;
        let deferred1_0;
        let deferred1_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            deferred1_0 = arg2;
            deferred1_1 = arg3;
            performance.measure(getStringFromWasm0(arg0, arg1), getStringFromWasm0(arg2, arg3));
        } finally {
            wasm.__wbindgen_export_2(deferred0_0, deferred0_1, 1);
            wasm.__wbindgen_export_2(deferred1_0, deferred1_1, 1);
        }
    }, arguments) };
    imports.wbg.__wbg_new_abda76e883ba8a5f = function() {
        const ret = new Error();
        return addHeapObject(ret);
    };
    imports.wbg.__wbg_stack_658279fe44541cf6 = function(arg0, arg1) {
        const ret = getObject(arg1).stack;
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbg_error_f851667af71bcfc6 = function(arg0, arg1) {
        let deferred0_0;
        let deferred0_1;
        try {
            deferred0_0 = arg0;
            deferred0_1 = arg1;
            console.error(getStringFromWasm0(arg0, arg1));
        } finally {
            wasm.__wbindgen_export_2(deferred0_0, deferred0_1, 1);
        }
    };
    imports.wbg.__wbindgen_debug_string = function(arg0, arg1) {
        const ret = debugString(getObject(arg1));
        const ptr1 = passStringToWasm0(ret, wasm.__wbindgen_export_0, wasm.__wbindgen_export_1);
        const len1 = WASM_VECTOR_LEN;
        getInt32Memory0()[arg0 / 4 + 1] = len1;
        getInt32Memory0()[arg0 / 4 + 0] = ptr1;
    };
    imports.wbg.__wbindgen_throw = function(arg0, arg1) {
        throw new Error(getStringFromWasm0(arg0, arg1));
    };
    imports.wbg.__wbindgen_memory = function() {
        const ret = wasm.memory;
        return addHeapObject(ret);
    };

    return imports;
}

function __wbg_finalize_init(instance, module) {
    wasm = instance.exports;
    __wbg_init.__wbindgen_wasm_module = module;
    cachedFloat64Memory0 = null;
    cachedInt32Memory0 = null;
    cachedUint32Memory0 = null;
    cachedUint8Memory0 = null;

    wasm.__wbindgen_start();
    return wasm;
}

async function __wbg_init(input) {
    if (wasm !== undefined) return wasm;

    if (typeof input === 'undefined') {
        input = new URL('harper_wasm_bg.wasm', (typeof document === 'undefined' ? require('u' + 'rl').pathToFileURL(__filename).href : (_documentCurrentScript && _documentCurrentScript.src || new URL('main.js', document.baseURI).href)));
    }
    const imports = __wbg_get_imports();

    if (typeof input === 'string' || (typeof Request === 'function' && input instanceof Request) || (typeof URL === 'function' && input instanceof URL)) {
        input = fetch(input);
    }

    const { instance, module } = await __wbg_load(await input, imports);

    return __wbg_finalize_init(instance, module);
}

class HarperSettingTab extends obsidian.PluginSettingTab {
	/** @type HarperPlugin
	 * @private */
	plugin;

	/** @type Record<string, any> */
	settings;

	/** @param {App} app
	 * @param {HarperPlugin} plugin  */
	constructor(app, plugin) {
		super(app, plugin);
		this.plugin = plugin;

		this.updateSettings();
	}

	updateSettings() {
		this.plugin.getSettings().then((v) => (this.settings = v));
	}

	display() {
		const { containerEl } = this;
		containerEl.empty();

		console.log(this.settings.lintSettings);

		for (let setting of Object.keys(this.settings.lintSettings)) {
			let value = this.settings.lintSettings[setting];

			new obsidian.Setting(containerEl)
				.setName(setting)
				.setDesc(`Whether to include the ${setting} grammar rule.`)
				.addDropdown((dropdown) =>
					dropdown
						.addOption('default', 'Default')
						.addOption('enable', 'On')
						.addOption('disable', 'Off')
						.setValue(valueToString(value))
						.onChange(async (value) => {
							this.settings.lintSettings[setting] = stringToValue(value);
							await this.plugin.setSettings(this.settings);
						})
				);
		}
	}
}

/** @param {boolean | undefined} value
 * @returns {string} */
function valueToString(value) {
	switch (value) {
		case true:
			return 'enable';
		case false:
			return 'disable';
		case undefined:
			return 'default';
	}

	throw 'Fell through case';
}

/** @param {str} value
 * @returns {boolean | undefined} */
function stringToValue(str) {
	switch (str) {
		case 'enable':
			return true;
		case 'disable':
			return false;
		case 'default':
			return undefined;
	}

	throw 'Fell through case';
}

function suggestionToLabel(sug) {
	if (sug.kind() == 'Remove') {
		return 'Remove';
	} else {
		return `Replace with "${sug.get_replacement_text()}"`;
	}
}

const harperLinter = (plugin) =>
	linter(
		async (view) => {
			if (!plugin.shouldLint()) {
				return [];
			}

			const text = view.state.doc.sliceString(-1);

			await __wbg_init(await wasm$1());

			const lints = lint(text);

			return lints.map((lint) => {
				let span = lint.span();

				return {
					from: span.start,
					to: span.end,
					severity: 'error',
					title: lint.lint_kind(),
					message: lint.message(),
					actions: lint.suggestions().map((sug) => {
						return {
							name: suggestionToLabel(sug),
							apply: (view) => {
								if (sug === 'Remove') {
									view.dispatch({
										changes: {
											from: span.start,
											to: span.end,
											insert: ''
										}
									});
								} else {
									view.dispatch({
										changes: {
											from: span.start,
											to: span.end,
											insert: sug.get_replacement_text()
										}
									});
								}
							}
						};
					})
				};
			});
		},
		{
			delay: -1,
			needsRefresh: () => {
				let temp = plugin.lintSettingModified;
				plugin.lintSettingModified = false;
				return temp;
			}
		}
	);

class HarperPlugin extends obsidian.Plugin {
	/** @private */
	shouldAutoLint = true;
	/** @public */
	lintSettingModified = false;

	/** @public
	 * @returns {Promise<Record<string, any>>} */
	async getSettings() {
		await __wbg_init(await wasm$1());
		this.lintSettingChanged();

		let lintSettings = await get_lint_config_as_object();

		return { lintSettings };
	}

	/** @public
	 * @param {Record<string, any>} settings
	 * @returns {Promise<void>} */
	async setSettings(settings) {
		await __wbg_init(await wasm$1());

		if (settings == null) {
			settings = {};
		}

		if (settings.lintSettings == undefined) {
			settings.lintSettings = {};
		}

		if (settings.lintSettings.spell_check == undefined) {
			settings.lintSettings.spell_check = false;
		}

		set_lint_config_from_object(settings.lintSettings);
		this.lintSettingChanged();
		this.saveData(settings);
	}

	async onload() {
		console.log(harperLinter(this));

		this.registerEditorExtension([harperLinter(this)]);
		this.app.workspace.updateOptions();

		obsidian.addIcon('harper-logo', logoSvg);

		this.setupCommands();
		this.setupStatusBar();

		this.addSettingTab(new HarperSettingTab(this.app, this));
		await this.setSettings(await this.loadData());
	}

	setupCommands() {
		this.addCommand({
			id: 'harper-toggle-auto-lint',
			name: 'Toggle automatic grammar checking',
			callback: () => this.toggleAutoLint()
		});
	}

	setupStatusBar() {
		/** @type HTMLElement */
		let statusBarItem = this.addStatusBarItem();
		statusBarItem.className += ' mod-clickable';

		let button = document.createElement('span');
		button.style = 'width:24px';
		button.innerHTML = logoSvg;

		button.addEventListener('click', (event) => {
			const menu = new obsidian.Menu();

			menu.addItem((item) =>
				item
					.setTitle(`${this.shouldAutoLint ? 'Disable' : 'Enable'} automatic checking`)
					.setIcon('documents')
					.onClick(() => {
						this.toggleAutoLint();
					})
			);

			menu.showAtMouseEvent(event);
		});

		statusBarItem.appendChild(button);
	}

	shouldLint() {
		return this.shouldAutoLint;
	}

	/** @param {boolean} shouldAutoLint  */
	setAutoLint(shouldAutoLint) {
		this.shouldAutoLint = shouldAutoLint;
		this.lintSettingChanged();
	}

	toggleAutoLint() {
		this.shouldAutoLint = !this.shouldAutoLint;
		this.lintSettingChanged();
	}

	lintSettingChanged() {
		this.lintSettingModified = true;
		this.app.workspace.updateOptions();
	}
}

module.exports = HarperPlugin;