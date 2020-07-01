import { AfterViewInit, ElementRef, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NavigateService } from "./navigate.service";
import { PagePreloadService } from "./page-preload.service";
import { ZoomService } from "./zoom.service";
import { WindowService } from "./window.service";
import { ViewportService } from "./viewport.service";
export declare class ScrollableDirective implements AfterViewInit, OnChanges, OnInit {
    private _elementRef;
    private _navigateService;
    private _pagePreloadService;
    private _zoomService;
    private _windowService;
    private _viewportService;
    private currentPage;
    private zoom;
    private loadedPagesSet;
    constructor(_elementRef: ElementRef<HTMLElement>, _navigateService: NavigateService, _pagePreloadService: PagePreloadService, _zoomService: ZoomService, _windowService: WindowService, _viewportService: ViewportService);
    ngAfterViewInit(): void;
    scrolling(): void;
    resizing(): void;
    scrollToPage(pageNumber: number): void;
    private getChildren;
    private getPage;
    private calculateOffset;
    private countPagesOnWidth;
    refresh(): void;
    ngOnChanges(changes: SimpleChanges): void;
    ngOnInit(): void;
    private getWidth;
    private getZoom;
}
