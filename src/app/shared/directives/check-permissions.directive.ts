import {
  Directive,
  Input,
  OnInit,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { UserUtilService } from '@services/user-util.service';

@Directive({
  selector: '[check-permission]',
})
export class CheckPermissionsDirective implements OnInit {
  @Input('check-permission') permissions!: string[];
  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private userUtilService: UserUtilService
  ) {}

  ngOnInit() {
    let shouldRemoveElement = true;
    for (const permission of this.permissions) {
      if (this.userUtilService.checkUserPermission(permission)) {
        shouldRemoveElement = false;
        break;
      }
    }
    !shouldRemoveElement
      ? this.viewContainer.createEmbeddedView(this.templateRef)
      : this.viewContainer.clear();
  }
}
