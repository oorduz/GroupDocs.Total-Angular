/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { NavigateService } from '../navigate.service';
import { ZoomService } from '../zoom.service';
import { FileUtil } from '../file.service';
var ThumbnailsComponent = /** @class */ (function () {
    function ThumbnailsComponent(_navigateService, _zoomService) {
        this._navigateService = _navigateService;
        this._zoomService = _zoomService;
        this.selectedPage = new EventEmitter();
    }
    /**
     * @return {?}
     */
    ThumbnailsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    ThumbnailsComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        // TODO: this is temporary needed to remove unneeded spaces and BOM symbol 
        // which leads to undesired spaces on the top of the docs pages
        if (this.pages) {
            this.pages.forEach((/**
             * @param {?} page
             * @return {?}
             */
            function (page) {
                if (page.data) {
                    page.data = page.data.replace(/>\s+</g, '><')
                        .replace(/\uFEFF/g, "")
                        .replace(/href="\/viewer/g, 'href="http://localhost:8080/viewer')
                        .replace(/src="\/viewer/g, 'src="http://localhost:8080/viewer')
                        .replace(/data="\/viewer/g, 'data="http://localhost:8080/viewer');
                }
            }));
        }
    };
    /**
     * @return {?}
     */
    ThumbnailsComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this._zoomService.changeZoom(this._zoomService.zoom);
    };
    /**
     * @return {?}
     */
    ThumbnailsComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this._zoomService.changeZoom(this._zoomService.zoom);
    };
    /**
     * @param {?} data
     * @return {?}
     */
    ThumbnailsComponent.prototype.imgData = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        /** @type {?} */
        var dataImagePngBase64 = 'data:image/png;base64,';
        if (!this.isHtmlMode) {
            return dataImagePngBase64 + data;
        }
        return dataImagePngBase64;
    };
    /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    ThumbnailsComponent.prototype.getScale = /**
     * @param {?} x
     * @param {?} y
     * @return {?}
     */
    function (x, y) {
        return Math.min(190 / x, 190 / y);
    };
    /**
     * @param {?} pageNumber
     * @return {?}
     */
    ThumbnailsComponent.prototype.openPage = /**
     * @param {?} pageNumber
     * @return {?}
     */
    function (pageNumber) {
        this.selectedPage.emit(pageNumber);
        this._navigateService.navigateTo(pageNumber);
    };
    // TODO: consider placing in one service
    // TODO: consider placing in one service
    /**
     * @param {?} value
     * @return {?}
     */
    ThumbnailsComponent.prototype.getDimensionWithUnit = 
    // TODO: consider placing in one service
    /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return value + FileUtil.find(this.guid, false).unit;
    };
    ThumbnailsComponent.decorators = [
        { type: Component, args: [{
                    selector: 'gd-thumbnails',
                    template: "<div class=\"gd-thumbnails\">\r\n  <div class=\"gd-thumbnails-panzoom\">\r\n    <div *ngFor=\"let page of pages\" id=\"gd-thumbnails-page-{{page.number}}\" class=\"gd-page\"\r\n         (click)=\"openPage(page.number)\" gdRotation [withMargin]=\"false\"\r\n         [angle]=\"page.angle\" [isHtmlMode]=\"mode\" [width]=\"page.width\" [height]=\"page.height\">\r\n      <div class=\"gd-wrapper\"\r\n           [style.height]=\"getDimensionWithUnit(page.height)\"\r\n           [style.width]=\"getDimensionWithUnit(page.width)\"\r\n           [ngStyle]=\"{'transform': 'translateX(-50%) translateY(-50%) scale('+getScale(page.width, page.height)+')'}\"\r\n           *ngIf=\"page.data && isHtmlMode\"\r\n           [innerHTML]=\"page.data | safeHtml\"></div>\r\n      <div class=\"gd-wrapper\" \r\n           [style.height]=\"getDimensionWithUnit(page.height)\"\r\n           [style.width]=\"getDimensionWithUnit(page.width)\"\r\n           [ngStyle]=\"{'transform': 'translateX(-50%) translateY(-50%) scale('+getScale(page.width, page.height)+')'}\"\r\n           *ngIf=\"page.data && !isHtmlMode\">\r\n           <img style=\"width: inherit !important\" class=\"gd-page-image\" [attr.src]=\"imgData(page.data) | safeResourceHtml\"\r\n             alt/>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</div>\r\n",
                    styles: [":host{flex:0 0 300px;background:#f5f5f5;color:#fff;overflow-y:auto;display:block;transition:margin-left .2s;height:100%}.gd-page{width:272px;height:272px;transition:.3s;background-color:#e7e7e7;cursor:pointer;margin:14px 14px 0}.gd-page:hover{background-color:silver}.gd-wrapper{transform:translate(-50%,-50%);left:50%;top:50%;position:relative;background-color:#fff;box-shadow:0 4px 12px -4px rgba(0,0,0,.38);pointer-events:none}.gd-wrapper ::ng-deep img{width:inherit}.gd-thumbnails::-webkit-scrollbar{width:0;background-color:#f5f5f5}.gd-thumbnails-panzoom>.gd-thumbnails-landscape{margin:-134px 0 -1px 12px}.gd-thumbnails .gd-page-image{height:inherit}.gd-thumbnails-landscape-image{margin:-90px 0 -23px!important}.gd-thumbnails-landscape-image-rotated{margin:126px 0 -3px -104px!important}"]
                }] }
    ];
    /** @nocollapse */
    ThumbnailsComponent.ctorParameters = function () { return [
        { type: NavigateService },
        { type: ZoomService }
    ]; };
    ThumbnailsComponent.propDecorators = {
        pages: [{ type: Input }],
        guid: [{ type: Input }],
        mode: [{ type: Input }],
        isHtmlMode: [{ type: Input }],
        selectedPage: [{ type: Output }]
    };
    return ThumbnailsComponent;
}());
export { ThumbnailsComponent };
if (false) {
    /** @type {?} */
    ThumbnailsComponent.prototype.pages;
    /** @type {?} */
    ThumbnailsComponent.prototype.guid;
    /** @type {?} */
    ThumbnailsComponent.prototype.mode;
    /** @type {?} */
    ThumbnailsComponent.prototype.isHtmlMode;
    /** @type {?} */
    ThumbnailsComponent.prototype.selectedPage;
    /**
     * @type {?}
     * @private
     */
    ThumbnailsComponent.prototype._navigateService;
    /**
     * @type {?}
     * @private
     */
    ThumbnailsComponent.prototype._zoomService;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGh1bWJuYWlscy5jb21wb25lbnQuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AZ3JvdXBkb2NzLmV4YW1wbGVzLmFuZ3VsYXIvY29tbW9uLWNvbXBvbmVudHMvIiwic291cmNlcyI6WyJsaWIvdGh1bWJuYWlscy90aHVtYm5haWxzLmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBQUEsT0FBTyxFQUFDLFNBQVMsRUFBRSxLQUFLLEVBQStDLE1BQU0sRUFBRSxZQUFZLEVBQUMsTUFBTSxlQUFlLENBQUM7QUFDbEgsT0FBTyxFQUFDLGVBQWUsRUFBQyxNQUFNLHFCQUFxQixDQUFBO0FBRW5ELE9BQU8sRUFBQyxXQUFXLEVBQUMsTUFBTSxpQkFBaUIsQ0FBQTtBQUMzQyxPQUFPLEVBQUMsUUFBUSxFQUFDLE1BQU0saUJBQWlCLENBQUM7QUFFekM7SUFhRSw2QkFBb0IsZ0JBQWlDLEVBQVUsWUFBeUI7UUFBcEUscUJBQWdCLEdBQWhCLGdCQUFnQixDQUFpQjtRQUFVLGlCQUFZLEdBQVosWUFBWSxDQUFhO1FBRjlFLGlCQUFZLEdBQUcsSUFBSSxZQUFZLEVBQVUsQ0FBQztJQUdwRCxDQUFDOzs7O0lBRUQsc0NBQVE7OztJQUFSO0lBQ0EsQ0FBQzs7OztJQUVELHlDQUFXOzs7SUFBWDtRQUNFLDJFQUEyRTtRQUMzRSwrREFBK0Q7UUFDL0QsSUFBSSxJQUFJLENBQUMsS0FBSyxFQUFFO1lBQ2QsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPOzs7O1lBQUMsVUFBQSxJQUFJO2dCQUNyQixJQUFJLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ2IsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxRQUFRLEVBQUMsSUFBSSxDQUFDO3lCQUN0QixPQUFPLENBQUMsU0FBUyxFQUFDLEVBQUUsQ0FBQzt5QkFDckIsT0FBTyxDQUFDLGlCQUFpQixFQUFFLG9DQUFvQyxDQUFDO3lCQUNoRSxPQUFPLENBQUMsZ0JBQWdCLEVBQUUsbUNBQW1DLENBQUM7eUJBQzlELE9BQU8sQ0FBQyxpQkFBaUIsRUFBRSxvQ0FBb0MsQ0FBQyxDQUFDO2lCQUN4RjtZQUNILENBQUMsRUFBQyxDQUFDO1NBQ0o7SUFDSCxDQUFDOzs7O0lBRUQsNkNBQWU7OztJQUFmO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7O0lBRUQseUNBQVc7OztJQUFYO1FBQ0UsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsQ0FBQztJQUN2RCxDQUFDOzs7OztJQUVELHFDQUFPOzs7O0lBQVAsVUFBUSxJQUFZOztZQUNaLGtCQUFrQixHQUFHLHdCQUF3QjtRQUNuRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNwQixPQUFPLGtCQUFrQixHQUFHLElBQUksQ0FBQztTQUNsQztRQUNELE9BQU8sa0JBQWtCLENBQUM7SUFDNUIsQ0FBQzs7Ozs7O0lBRUQsc0NBQVE7Ozs7O0lBQVIsVUFBUyxDQUFTLEVBQUUsQ0FBUztRQUMzQixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxHQUFHLEdBQUcsQ0FBQyxDQUFDLENBQUM7SUFDcEMsQ0FBQzs7Ozs7SUFFRCxzQ0FBUTs7OztJQUFSLFVBQVMsVUFBa0I7UUFDekIsSUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbkMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsQ0FBQztJQUMvQyxDQUFDO0lBRUQsd0NBQXdDOzs7Ozs7SUFDeEMsa0RBQW9COzs7Ozs7SUFBcEIsVUFBcUIsS0FBYTtRQUNoQyxPQUFPLEtBQUssR0FBRyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDO0lBQ3RELENBQUM7O2dCQS9ERixTQUFTLFNBQUM7b0JBQ1QsUUFBUSxFQUFFLGVBQWU7b0JBQ3pCLHd5Q0FBMEM7O2lCQUUzQzs7OztnQkFUTyxlQUFlO2dCQUVmLFdBQVc7Ozt3QkFVaEIsS0FBSzt1QkFDTCxLQUFLO3VCQUNMLEtBQUs7NkJBQ0wsS0FBSzsrQkFDTCxNQUFNOztJQXFEVCwwQkFBQztDQUFBLEFBaEVELElBZ0VDO1NBM0RZLG1CQUFtQjs7O0lBRTlCLG9DQUE0Qjs7SUFDNUIsbUNBQXNCOztJQUN0QixtQ0FBdUI7O0lBQ3ZCLHlDQUE2Qjs7SUFDN0IsMkNBQW9EOzs7OztJQUV4QywrQ0FBeUM7Ozs7O0lBQUUsMkNBQWlDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtDb21wb25lbnQsIElucHV0LCBPbkluaXQsIE9uRGVzdHJveSwgQWZ0ZXJWaWV3SW5pdCwgT25DaGFuZ2VzLCBPdXRwdXQsIEV2ZW50RW1pdHRlcn0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XHJcbmltcG9ydCB7TmF2aWdhdGVTZXJ2aWNlfSBmcm9tICcuLi9uYXZpZ2F0ZS5zZXJ2aWNlJ1xyXG5pbXBvcnQge1BhZ2VNb2RlbH0gZnJvbSAnLi4vZmlsZS5zZXJ2aWNlJ1xyXG5pbXBvcnQge1pvb21TZXJ2aWNlfSBmcm9tICcuLi96b29tLnNlcnZpY2UnXHJcbmltcG9ydCB7RmlsZVV0aWx9IGZyb20gJy4uL2ZpbGUuc2VydmljZSc7XHJcblxyXG5AQ29tcG9uZW50KHtcclxuICBzZWxlY3RvcjogJ2dkLXRodW1ibmFpbHMnLFxyXG4gIHRlbXBsYXRlVXJsOiAnLi90aHVtYm5haWxzLmNvbXBvbmVudC5odG1sJyxcclxuICBzdHlsZVVybHM6IFsnLi90aHVtYm5haWxzLmNvbXBvbmVudC5sZXNzJ11cclxufSlcclxuZXhwb3J0IGNsYXNzIFRodW1ibmFpbHNDb21wb25lbnQgaW1wbGVtZW50cyBPbkluaXQsIE9uQ2hhbmdlcywgQWZ0ZXJWaWV3SW5pdCwgT25EZXN0cm95IHtcclxuXHJcbiAgQElucHV0KCkgcGFnZXM6IFBhZ2VNb2RlbFtdO1xyXG4gIEBJbnB1dCgpIGd1aWQ6IHN0cmluZztcclxuICBASW5wdXQoKSBtb2RlOiBib29sZWFuO1xyXG4gIEBJbnB1dCgpIGlzSHRtbE1vZGU6IGJvb2xlYW47XHJcbiAgQE91dHB1dCgpIHNlbGVjdGVkUGFnZSA9IG5ldyBFdmVudEVtaXR0ZXI8bnVtYmVyPigpO1xyXG5cclxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9uYXZpZ2F0ZVNlcnZpY2U6IE5hdmlnYXRlU2VydmljZSwgcHJpdmF0ZSBfem9vbVNlcnZpY2U6IFpvb21TZXJ2aWNlKSB7XHJcbiAgfVxyXG5cclxuICBuZ09uSW5pdCgpIHtcclxuICB9XHJcblxyXG4gIG5nT25DaGFuZ2VzKCkge1xyXG4gICAgLy8gVE9ETzogdGhpcyBpcyB0ZW1wb3JhcnkgbmVlZGVkIHRvIHJlbW92ZSB1bm5lZWRlZCBzcGFjZXMgYW5kIEJPTSBzeW1ib2wgXHJcbiAgICAvLyB3aGljaCBsZWFkcyB0byB1bmRlc2lyZWQgc3BhY2VzIG9uIHRoZSB0b3Agb2YgdGhlIGRvY3MgcGFnZXNcclxuICAgIGlmICh0aGlzLnBhZ2VzKSB7XHJcbiAgICAgIHRoaXMucGFnZXMuZm9yRWFjaChwYWdlID0+IHtcclxuICAgICAgICBpZiAocGFnZS5kYXRhKSB7XHJcbiAgICAgICAgICBwYWdlLmRhdGEgPSBwYWdlLmRhdGEucmVwbGFjZSgvPlxccys8L2csJz48JylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9cXHVGRUZGL2csXCJcIilcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9ocmVmPVwiXFwvdmlld2VyL2csICdocmVmPVwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3ZpZXdlcicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAucmVwbGFjZSgvc3JjPVwiXFwvdmlld2VyL2csICdzcmM9XCJodHRwOi8vbG9jYWxob3N0OjgwODAvdmlld2VyJylcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC5yZXBsYWNlKC9kYXRhPVwiXFwvdmlld2VyL2csICdkYXRhPVwiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3ZpZXdlcicpO1xyXG4gICAgICAgIH1cclxuICAgICAgfSk7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICBuZ0FmdGVyVmlld0luaXQoKSB7XHJcbiAgICB0aGlzLl96b29tU2VydmljZS5jaGFuZ2Vab29tKHRoaXMuX3pvb21TZXJ2aWNlLnpvb20pO1xyXG4gIH1cclxuXHJcbiAgbmdPbkRlc3Ryb3koKSB7XHJcbiAgICB0aGlzLl96b29tU2VydmljZS5jaGFuZ2Vab29tKHRoaXMuX3pvb21TZXJ2aWNlLnpvb20pO1xyXG4gIH1cclxuXHJcbiAgaW1nRGF0YShkYXRhOiBzdHJpbmcpIHtcclxuICAgIGNvbnN0IGRhdGFJbWFnZVBuZ0Jhc2U2NCA9ICdkYXRhOmltYWdlL3BuZztiYXNlNjQsJztcclxuICAgIGlmICghdGhpcy5pc0h0bWxNb2RlKSB7XHJcbiAgICAgIHJldHVybiBkYXRhSW1hZ2VQbmdCYXNlNjQgKyBkYXRhO1xyXG4gICAgfVxyXG4gICAgcmV0dXJuIGRhdGFJbWFnZVBuZ0Jhc2U2NDtcclxuICB9XHJcblxyXG4gIGdldFNjYWxlKHg6IG51bWJlciwgeTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gTWF0aC5taW4oMTkwIC8geCwgMTkwIC8geSk7XHJcbiAgfVxyXG5cclxuICBvcGVuUGFnZShwYWdlTnVtYmVyOiBudW1iZXIpIHtcclxuICAgIHRoaXMuc2VsZWN0ZWRQYWdlLmVtaXQocGFnZU51bWJlcik7XHJcbiAgICB0aGlzLl9uYXZpZ2F0ZVNlcnZpY2UubmF2aWdhdGVUbyhwYWdlTnVtYmVyKTtcclxuICB9XHJcblxyXG4gIC8vIFRPRE86IGNvbnNpZGVyIHBsYWNpbmcgaW4gb25lIHNlcnZpY2VcclxuICBnZXREaW1lbnNpb25XaXRoVW5pdCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICByZXR1cm4gdmFsdWUgKyBGaWxlVXRpbC5maW5kKHRoaXMuZ3VpZCwgZmFsc2UpLnVuaXQ7XHJcbiAgfVxyXG59XHJcbiJdfQ==