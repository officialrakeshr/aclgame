import { Component, OnInit, ViewChild } from '@angular/core';
import { Player, playerList } from 'src/app/@core/models/Player.model';
import { FilterService } from 'primeng/api';
import * as _ from 'lodash';
export interface COLUMN {
  field: string;
  header: string;
  filter: any[];
}
export interface FILTER {
  name: any;
}

export enum Validations{
  allRounder="You already added maximum number of all-rounders."
}
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  @ViewChild('dt1') dt1: any;
  @ViewChild('dt2') dt2: any;
  players: Player[] = [];
  selectedPlayers: Player[] = [];
  cols: COLUMN[] = [];
  constructor(private filterService: FilterService) {}

  ngOnInit(): void {
    this.cols = [
      { field: 'Player', header: 'Player', filter: [] },
      { field: 'Role', header: 'Role', filter: [] },
      { field: 'Price', header: 'Price', filter: [] },
      { field: 'Nation', header: 'Nation', filter: [] },
      { field: 'Team', header: 'Team', filter: [] },
    ];
    for (let col of this.cols) {
      let set = new Set<string>();
      for (let p of playerList) {
        set.add((p as any)[col.field]);
      }
      col.filter = Array.from(set).map((value) => {
        let obj = {} as any;
        obj[col.field] = value;
        return value;
      });
    }
    this.reset();
  }

  selectPlayer(data: Player, index: number) {
    if (this.selectedPlayers.includes(data)) return;
    if (this.validations(data)) {
      this.selectedPlayers.push(data);
      this.dt1.clear();
      this.reset();
    }
  }

  remove(index: number) {
    this.selectedPlayers.splice(index, 1);
    this.dt1.clear();
    this.reset();
  }

  reset() {
    this.players = playerList.filter((o) => {
      return !this.selectedPlayers.find(
        (b) => b.Player == o.Player && b.Nation == o.Nation && b.Role == o.Role
      );
    });
  }

  validations(data: Player) {
    const IndianCount=this.selectedPlayers.filter(o=>this.filterService.filters.equals(o.Nation, 'India')).length;
    const AllRoundersCount=this.selectedPlayers.filter(o=>this.filterService.filters.equals(o.Role, 'All-rounder')).length;
    return this.showMessage(Validations.allRounder,AllRoundersCount<=5);
  }

  showMessage(validations:Validations,valid:boolean){
    if(!valid){
      alert(Validations.allRounder)
    }
    return valid;
  }
}
