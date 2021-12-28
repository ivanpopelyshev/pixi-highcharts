import * as PIXI from 'pixi.js-legacy';

import {
    AnimationOptionsObject,

} from 'highcharts';
const {
    isFirefox,
    win
} = H;
import { Palette } from '../../Color/Palettes.js';
import RendererRegistry from '../RendererRegistry.js';
import U from '../../Utilities.js';
import AnimationOptions from "../../Animation/AnimationOptions";
import SVGElement from "../SVG/SVGElement";
import AST from "../HTML/AST";
import BBoxObject from "../BBoxObject";
import SVGElement3D from "../SVG/SVGElement3D";
import Symbols from '../SVG/Symbols.js';
import SVGPath from "../SVG/SVGPath";
import SVGAttributes from "../SVG/SVGAttributes";
import Chart from "../../Chart/Chart";
import PositionObject from "../PositionObject";
const {
    addEvent,
    attr,
    css,
} = U;

import type HTMLElement from 'highcharts';
// import SVGElement3DLike from "../SVG/SVGElement3DLike";
import PatternFill from 'highcharts';

export class HSPixiRenderer {
    public constructor(
        container: any,
        width: number,
        height: number,
        style?: any,
        forExport?: boolean,
        allowHTML?: boolean,
        styledMode?: boolean
    ) {
        this.pixiRender = PIXI.autoDetectRenderer({
            width, height
        });
        this.pixiTicker = new PIXI.Ticker();

        this.init(
            container,
            width,
            height,
            style,
            forExport,
            allowHTML,
            styledMode
        );

        this.defIds = [];
        // this.elements3d = SVGElement3D;
        this.idCounter = 0;
        this.patternElements = {};
        this.scrollablePlotBox = new PIXI.Rectangle();
    }

    public imgCount: number = void 0 as any;
    public isSVG: boolean = void 0 as any;
    public isVML: boolean = false;
    public style: CSSObject = void 0 as any;
    public styledMode?: boolean;
    public unSubPixelFix?: Function;
    public pixiRender: AbstractRenderer;
    public pixiTicker: Ticker;

    public width: number = void 0 as any;
    public height: number = void 0 as any;

    get view() {
        return this.pixiRender.view;
    }

    public init(
        container: any,
        width: number,
        height: number,
        style?: any,
        forExport?: boolean,
        allowHTML?: boolean,
        styledMode?: boolean
    ): void {
        const renderer = this,
            element = this.pixiRender.view;

        // if (!styledMode) {
        //     boxWrapper.css(this.getStyle(style as any));
        // }

        container.appendChild(element);

        // Always use ltr on the container, otherwise text-anchor will be
        // flipped and text appear outside labels, buttons, tooltip etc (#3482)
        attr(container, 'dir', 'ltr');
        // this.box = element as any;
        // this.boxWrapper = boxWrapper;

        // this.url = this.getReferenceURL();


        // Add description
        // const desc = this.createElement('desc').add();
        // desc.element.appendChild(
        //     doc.createTextNode('Created with @product.name@ @product.version@')
        // );

        renderer.styledMode = styledMode;
        // renderer.gradients = {}; // Object where gradient SvgElements are stored
        // renderer.cache = {}; // Cache for numerical bounding boxes
        // renderer.cacheKeys = [];
        renderer.imgCount = 0;

        renderer.setSize(width, height, false);


        // Issue 110 workaround:
        // In Firefox, if a div is positioned by percentage, its pixel position
        // may land between pixels. The container itself doesn't display this,
        // but an SVG element inside this container will be drawn at subpixel
        // precision. In order to draw sharp lines, this must be compensated
        // for. This doesn't seem to work inside iframes though (like in
        // jsFiddle).
        let subPixelFix, rect;

        if (isFirefox && container.getBoundingClientRect) {
            subPixelFix = function (): void {
                css(container, { left: 0, top: 0 });
                rect = container.getBoundingClientRect();
                css(container, {
                    left: (Math.ceil(rect.left) - rect.left) + 'px',
                    top: (Math.ceil(rect.top) - rect.top) + 'px'
                });
            };

            // run the fix now
            subPixelFix();

            // run it on resize
            renderer.unSubPixelFix = addEvent(win, 'resize', subPixelFix);
        }
    }

    public setSize(
        width: number,
        height: number,
        animate?: (boolean|Partial<AnimationOptionsObject>)
    ): void {
        if (this.width === width &&
            this.height === height) {
            return;
        }
        this.width = width;
        this.height = height;
        this.pixiRender.resize(width, height);
    }

    public destroy(): null {
        const renderer = this;

        this.pixiRender.destroy();

        if (renderer.unSubPixelFix) {
            renderer.unSubPixelFix();
        }

        return null;
    }

    defIds: Array<string>;
    elements3d: any;
    idCounter: number;
    patternElements: Record<string, SVGElement>;
    scrollablePlotBox: BBoxObject;

    addMarker(id: string, markerOptions: AST.Node): SVGElement {
        return undefined as any;
    }

    addPattern(options: PatternFill.PatternOptionsObject, animation?: boolean | AnimationOptions): SVGElement | undefined {
        return undefined;
    }

    arc3d(attribs: SVGAttributes): SVGElement {
        return undefined as any;
    }

    arc3dPath(shapeArgs: SVGAttributes): any {
        return undefined as any;
    }

    clipCircle(x: number, y: number, r: number, innerR: number): SVGElement {
        return undefined as any;
    }

    crispPolyLine(points: SVGPath, width: number): SVGPath {
        return undefined as any;
    }

    cuboid(shapeArgs: SVGAttributes): SVGElement {
        return undefined as any;
    }

    cuboidPath(shapeArgs: SVGAttributes): any {
        return undefined as any;
    }

    cylinder(shapeArgs: SVGAttributes): SVGElement {
        return undefined as any;
    }

    cylinderPath(shapeArgs: SVGAttributes): any {
        return undefined as any;
    }

    element3d(type: string, shapeArgs: SVGAttributes): SVGElement {
        return undefined as any;
    }

    face3d(args?: SVGAttributes): SVGElement {
        return undefined as any;
    }

    funnel3d(shapeArgs: SVGAttributes): SVGElement {
        return undefined as any;
    }

    funnel3dPath(shapeArgs: SVGAttributes): any {
        return undefined as any;
    }

    getCurvedPath(points: Array<PositionObject>): SVGPath {
        return undefined as any;
    }

    getCylinderBack(topPath: SVGPath, bottomPath: SVGPath): SVGPath {
        return undefined as any;
    }

    getCylinderEnd(chart: Chart, shapeArgs: SVGAttributes, isBottom?: boolean): SVGPath {
        return undefined as any;
    }

    getCylinderFront(topPath: SVGPath, bottomPath: SVGPath): SVGPath {
        return undefined as any;
    }

    getSpanWidth(wrapper: SVGElement, tspan: any): number {
        return 0;
    }

    html(str: string, x: number, y: number): HTMLElement {
        return undefined as any;
    }

    invertChild(element: any, parentNode: any): void {
    }

    measureSpanWidth(text: string, style: any): number {
        return 0;
    }

    polyhedron(args?: SVGAttributes): any {
        return undefined as any;
    }

    toLinePath(points: Array<PositionObject>, closed?: boolean): SVGPath {
        return undefined as any;
    }

    toLineSegments(points: Array<PositionObject>): SVGPath {
        return undefined as any;
    }
}

(HSPixiRenderer as any).prototype.symbols = Symbols;
