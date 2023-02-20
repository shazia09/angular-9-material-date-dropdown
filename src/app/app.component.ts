import { Component } from "@angular/core";
import { FormBuilder, FormGroup } from "@angular/forms";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  chosenDate: Date = new Date("21 Feb 2021");
  form: FormGroup;

  constructor(private builder: FormBuilder) {
    this.form = this.builder.group({
      ChosenDate: [null]
    });

    this.form.get("ChosenDate").valueChanges.subscribe(value => {
      console.log("Coming from FormControl: " + value);
    });
  }

  printDate(value) {
    console.log("Coming from control only: " + value);
  }
}
