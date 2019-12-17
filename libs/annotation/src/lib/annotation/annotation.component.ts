import {AfterViewInit, Component, OnInit} from '@angular/core';
import {AnnotationData, AnnotationType, Dimension, Position} from "../annotation-models";
import {ActiveAnnotationService} from "../active-annotation.service";
import {Utils} from "@groupdocs.examples.angular/common-components";
import * as jquery from 'jquery';

const $ = jquery;

@Component({
  selector: 'gd-annotation',
  templateUrl: './annotation.component.html',
  styleUrls: ['./annotation.component.less']
})
export class AnnotationComponent implements OnInit, AfterViewInit {
  id: number;
  position: Position;
  type: string;
  pageWidth: number;
  pageHeight: number;
  active = true;
  dimension = new Dimension(0, 0);
  pageNumber: number;
  data = new AnnotationData();

  private oldPosition: { x: number; y: number };

  constructor(private _activeAnnotationService: ActiveAnnotationService) {
    this._activeAnnotationService.activeChange.subscribe((id: number) => {
      this.active = this.id === id;
    });
  }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (this.type === AnnotationType.TEXT_REPLACEMENT.id) {
      setTimeout(() => {
        const element = $("#text");
        if (element) {
          element.focus();
        }
      }, 100);
    }
  }

  activation() {
    this._activeAnnotationService.changeActive(this.id);
  }

  width($event) {
    this.dimension.width += $event;
    this.correctPosition();
  }

  height($event) {
    this.dimension.height += $event;
    this.correctPosition();
  }

  left($event) {
    this.position.left += $event;
    this.correctPosition();
  }

  top($event) {
    this.position.top += $event;
    this.correctPosition();
  }

  private correctPosition() {
    if (this.position.left < 0) {
      this.position.left = 0;
    }
    if (this.position.top < 0) {
      this.position.top = 0;
    }
    if (this.position.top + this.dimension.height > this.pageHeight) {
      this.position.top = this.pageHeight - this.dimension.height;
    }
    if (this.position.left + this.dimension.width > this.pageWidth) {
      this.position.left = this.pageWidth - this.dimension.width;
    }
  }

  dragOver($event: DragEvent) {
    $event.preventDefault();
    $event.stopPropagation();
  }

  dragStart($event: DragEvent) {
    $event.preventDefault();
    this.oldPosition = Utils.getMousePosition($event);
    if ($event.dataTransfer) {
      $event.dataTransfer.setData('text', 'foo');
    }
  }

  dragging($event) {
    $event.preventDefault();
    const position = Utils.getMousePosition($event);
    if (position.x && position.y && this.isOnPage(position)) {
      const left = position.x - this.oldPosition.x;
      const top = position.y - this.oldPosition.y;
      this.position.left += left;
      this.position.top += top;
      this.correctPosition();
      this.oldPosition = position;
    }
  }

  isOnPage(position) {
    const currentPage = document.elementFromPoint(position.x, position.y);
    return currentPage && $(currentPage).parent().parent() &&
      ($(currentPage).parent().parent().parent().hasClass("page") ||
        $(currentPage).parent().parent().parent().parent().parent().hasClass("page"));
  }

  getAnnotationClass() {
    switch (this.type) {
      case AnnotationType.TEXT.id:
        return "gd-text-annotation";
      case AnnotationType.TEXT_STRIKEOUT.id:
        return "gd-text-annotation gd-text-strikeout-annotation";
      case AnnotationType.TEXT_UNDERLINE.id:
        return "gd-text-annotation gd-text-underline-annotation";
      case AnnotationType.TEXT_REDACTION.id:
        return "gd-text-redaction-annotation";
      case AnnotationType.TEXT_REPLACEMENT.id:
        return "gd-text-replacement-annotation";
      default:
        return "";
    }
  }

  isStrikeoutOrUnderline() {
    return this.type === AnnotationType.TEXT_STRIKEOUT.id || this.type === AnnotationType.TEXT_UNDERLINE.id;
  }

  isTextReplacement() {
    return this.type === AnnotationType.TEXT_REPLACEMENT.id;
  }

  saveText(value: string) {
    this.data.text = value;
  }
}
