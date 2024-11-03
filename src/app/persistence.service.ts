import {Injectable} from '@angular/core';
import {BaseMapData, UserMapData, UserMapDataById} from "./app.model";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";

const USER_DATA = "USER_DATA";

@Injectable({
    providedIn: 'root'
})
export class PersistenceService {

    private base: BaseMapData[] = [];
    private user: UserMapDataById = {};

    private readonly dataChangedSubject: BehaviorSubject<any> = new BehaviorSubject(undefined);
    public readonly dataChanged: Observable<void> = this.dataChangedSubject.asObservable();

    constructor(private readonly http: HttpClient) {
    }

    public clear(): void {
        localStorage.clear();
        this.dataChangedSubject.next(undefined);
    }

    public save(): void {
        this.persistUserData();
        this.dataChangedSubject.next(undefined);
    }

    public load(): Observable<BaseMapData[]> {
        return this.http.get<BaseMapData[]>('data.json')
            .pipe(map(b => this.baseDataLoaded(b)))
    }

    private baseDataLoaded(base: BaseMapData[]): BaseMapData[] {
        this.base = base;
        this.user = this.loadUserData();

        // assemble server and user data into one object so its easier to work with in the gui
        this.base.forEach(it => {
            it.img = `map/${it.id}.jpg`;
            this.user[it.id] = this.user[it.id] ?? this.initEmptyUserMapData();
            it.userData = this.user[it.id];
        })

        // save just in case we loaded for the first time; so there's at least empty data in localStorage
        this.persistUserData();

        return base;
    }

    private loadUserData(): UserMapDataById {
        const json = localStorage.getItem(USER_DATA) ?? "{}";
        return JSON.parse(json);

    }

    private initEmptyUserMapData(): UserMapData {
        return {
            finished: false,
            favourite: false,
            notes: "",
        };
    }

    private persistUserData(): void {
        localStorage.setItem(USER_DATA, JSON.stringify(this.user));
    }
}
