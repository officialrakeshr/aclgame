import { Component, OnInit, ViewChild } from '@angular/core';
import { Player, playerList } from 'src/app/@core/models/Player.model';
import { FilterService, MessageService } from 'primeng/api';
import * as _ from 'lodash';
export interface COLUMN {
  field: string;
  header: string;
  filter: any[];
}
export interface FILTER {
  name: any;
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

  public AllRoundersCountLimit = 3;
  public captainCountLimit = 1;
  public viseCaptainCountLimit = 1;
  public IndianCountLimit = 4;
  public teamSizeLimit = 11;
  public wicketKeeperCountLimit = 1;
  public subCountLimit=180;

  public AllRoundersCount = 0;
  public captainCount = 0;
  public viseCaptainCount = 0;
  public IndianCount = 0;
  public teamSize = 0;
  public wicketKeeperCount = 0;
  public subCountUsed=0;

  private _history: Player[][] = [];

  roleList = [
    { value: 'batter', name: 'Batter', inactive: false },
    { value: 'wk', name: 'Wicket Keeper', inactive: false },
    { value: 'bowler', name: 'Bowler', inactive: false },
    { value: 'captain', name: 'Captain', inactive: false },
    { value: 'vcaptain', name: 'Vice-Captain', inactive: false },
    { value: 'allrounder', name: 'All-Rounder', inactive: false },
  ];
  constructor(
    private filterService: FilterService,
    private messageService: MessageService
  ) {}

  checkUndo(){
    return this._history.length<1;
  }
  updateSquadHistory(cur: Player[]) {
    this._history.push(_.cloneDeep(cur));
  }
  retrieveHistory(){
    let len=this._history.length;
    if(len==1 || len==0) return [];
    this._history.pop();
    let v=this._history.pop()||[];
    this._history=[];
    return _.cloneDeep(v);
  }
  undo() {
    if(confirm("Do you want to undo this last squad change")){
      this.selectedPlayers=this.retrieveHistory();
      this.reset();
      this.subCountUsed--;
    }
  }

  codeToName(value: string): string | undefined {
    return this.roleList.find((o) => o.value == value)?.name;
  }
  ngOnInit(): void {
    this.cols = [
      { field: 'Player', header: 'Player', filter: [] },
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
    this.IndianCount = this.selectedPlayers.filter((o) =>
      this.filterService.filters.equals(o.Nation, 'India')
    ).length;
    this.teamSize = this.selectedPlayers.length;

    if (this.validations(data)) {
      data.roleList = this.roleList;
      this.selectedPlayers.push(data);
      this.dt1.clear();
      this.reset();
      this.calculateCounts();
      this.subCountUsed++;
      this.updateSquadHistory(this.selectedPlayers);
    }
  }

  remove(index: number) {
    if (
      confirm(
        'Do you want to remove this player :' +
          this.selectedPlayers[index].Player
      )
    ) {
      this.selectedPlayers.splice(index, 1);
      this.dt1.clear();
      this.reset();
      this.calculateCounts();
      this.updateSquadHistory(this.selectedPlayers);
    }
  }

  reset() {
    this.players = playerList.filter((o) => {
      return !this.selectedPlayers.find(
        (b) => b.Player == o.Player && b.Nation == o.Nation && b.Role == o.Role
      );
    });
  }
  calculateCounts() {
    this.AllRoundersCount = this.selectedPlayers.filter((o) =>
      this.filterService.filters.equals(o.assignedRole, 'allrounder')
    ).length;

    this.captainCount = this.selectedPlayers.filter((o) =>
      this.filterService.filters.equals(o.assignedRole, 'captain')
    ).length;

    this.viseCaptainCount = this.selectedPlayers.filter((o) =>
      this.filterService.filters.equals(o.assignedRole, 'vcaptain')
    ).length;
    this.IndianCount = this.selectedPlayers.filter((o) =>
      this.filterService.filters.equals(o.Nation, 'India')
    ).length;
    this.teamSize = this.selectedPlayers.length;
    this.wicketKeeperCount = this.selectedPlayers.filter((o) =>
      this.filterService.filters.equals(o.assignedRole, 'wk')
    ).length;
  }
  processDropDown(roleList: any[]): void {
    this.calculateCounts();
    if (this.AllRoundersCount >= this.AllRoundersCountLimit) {
      roleList.find((o) => o.value == 'allrounder').inactive = true;
    }
    if (this.captainCount >= this.captainCountLimit) {
      roleList.find((o) => o.value == 'captain').inactive = true;
    }
    if (this.viseCaptainCount >= this.viseCaptainCountLimit) {
      roleList.find((o) => o.value == 'vcaptain').inactive = true;
    }
    if (this.wicketKeeperCount >= this.wicketKeeperCountLimit) {
      roleList.find((o) => o.value == 'wk').inactive = true;
    }
  }
  validations(data: Player): boolean {
    this.calculateCounts();
    if (this.IndianCount >= this.IndianCountLimit && data.Nation == 'India') {
      this.showMessage(
        'error',
        'Block',
        `A team cannot have more than ${this.IndianCountLimit} indian players`
      );
      return false;
    } else if (this.teamSize >= this.teamSizeLimit) {
      this.showMessage(
        'error',
        'Block',
        `A team cannot have more than ${this.teamSizeLimit} players`
      );
      return false;
    } else return true;
  }

  private showMessage(
    severity: string = 'success',
    summary: string,
    detail: string
  ) {
    this.messageService.clear();
    this.messageService.add({
      severity: severity,
      summary: summary,
      detail: detail,
      sticky: true,
    });
  }
}
