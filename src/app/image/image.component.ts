import {Component, Input} from '@angular/core';
import {BaseMapData} from "../app.model";
import {MatCheckbox} from "@angular/material/checkbox";
import {FormsModule} from "@angular/forms";
import {PersistenceService} from "../persistence.service";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'app-image',
  standalone: true,
  imports: [
    MatCheckbox,
    FormsModule,
    MatIcon
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
