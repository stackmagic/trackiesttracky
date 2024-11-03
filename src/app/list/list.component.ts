import {Component, Input} from '@angular/core';
import {BaseMapData, BaseMapDataFilter, BaseMapSort} from "../app.model";
import {ImageComponent} from "../image/image.component";

@Component({
    selector: 'app-list',
    standalone: true,
    imports: [ImageComponent],
    templateUrl: 'list.component.html',
    styleUrl: 'list.component.scss'
})
export class ListComponent {

    @Input() public base: BaseMapData[] = [];
    @Input() public filter!: BaseMapDataFilter;
    @Input() public sort!: BaseMapSort;

    private defaultSort: BaseMapSort = (a, b) => a.id - b.id;

    public get filteredBaseList(): BaseMapData[] {
        const filter = this.filter ?? (() => true);
        const sort = this.sort ?? this.defaultSort;
        return this.base.filter(filter).sort(sort);
    }
}
