import {Component, Input} from '@angular/core';
import {BaseMapData} from "../app.model";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {PersistenceService} from "../persistence.service";

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [
    MatCheckbox,
    FormsModule
  ],
  templateUrl: 'image.component.html',
  styleUrl: 'image.component.scss'
})
export class ImageComponent {

  @Input() public data: BaseMapData = {} as BaseMapData;

  constructor(private readonly persistenceService: PersistenceService) {
  }

  public saveData(): void {
    this.persistenceService.save();
  }
}
