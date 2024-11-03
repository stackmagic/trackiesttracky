import {Component, OnInit} from '@angular/core';
import {BaseMapData, BaseMapSort} from "./app.model";
import {MatTab, MatTabGroup} from "@angular/material/tabs";
import {NgOptimizedImage} from "@angular/common";
import {ListComponent} from "./list/list.component";
import {PersistenceService} from "./persistence.service";
import {MatButton} from "@angular/material/button";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: 'app.component.html',
  imports: [
    MatTabGroup,
    MatTab,
    NgOptimizedImage,
    ListComponent,
    MatButton,
  ],
  styleUrl: 'app.component.scss'
})
export class AppComponent implements OnInit {

  public base: BaseMapData[] = [];

  public readonly filterFavourite = (it: BaseMapData) => it.userData.favourite;
  public readonly filterFinished = (it: BaseMapData) => it.userData.finished;
  public readonly filterUnfinished = (it: BaseMapData) => !it.userData.finished;

  public countTodo: number = 0;
  public countFav: number = 0;
  public countUnfin: number = 0;
  public countFin: number = 0;

  public readonly sortTodo: BaseMapSort = (a, b) => {
    if (a.userData.favourite == b.userData.favourite) {
      return a.id - b.id;
    }
    if (a.userData.favourite) {
      return -1;
    }
    if (b.userData.favourite) {
      return 1;
    }
    return 0;
  }

  constructor(
    private readonly persistenceService: PersistenceService,
    private readonly matSnackBar: MatSnackBar,
  ) {
    this.persistenceService.dataChanged.subscribe(() => this.dataChanged());
  }

  public ngOnInit(): void {
    this.matSnackBar.open('Favs/Fins/Notes are stored in your browser\'s local storage - see help tab', 'ok');
    this.persistenceService.load()
      .subscribe({
        next: (base: BaseMapData[]) => {
          this.base = base;
          this.dataChanged();
        }
      });
  }

  public deleteClicked(): void {
    const yn: boolean = confirm('Are you sure? You will loose all entered data');
    if (yn) {
      this.base = [];
      this.persistenceService.clear();
      alert('Done. you can close this website now. Reload/F5 to load maps back it.');
    }
  }

  public dataChanged(): void {
    this.countTodo = this.base.filter(it => this.filterUnfinished(it)).length;
    this.countFav = this.base.filter(it => this.filterFavourite(it)).length;
    this.countUnfin = this.base.filter(it => this.filterUnfinished(it)).length;
    this.countFin = this.base.filter(it => this.filterFinished(it)).length;
  }
}
