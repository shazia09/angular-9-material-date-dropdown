import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";
import { DateSelectComponent } from "./date-select.component";

@NgModule({
  declarations: [DateSelectComponent],
  imports: [FormsModule, CommonModule, MatInputModule, MatSelectModule],
  entryComponents: [DateSelectComponent],
  exports: [DateSelectComponent]
})
export class DateSelectModule {}
