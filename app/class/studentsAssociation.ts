import {Modality} from './modality';
import {Team} from './team';
import {Set} from 'typescript-collections'

export class StudentsAssociation {
    public name: string;
    private srcIcon: string;
    private srcImg: string;
    private static nextId: number = 0;
    private id: number;
    private activeTeams: Set<Team>;

    constructor(private fullName: string, private shortName: string, private scrIcon: string,private scrImg: string ) {
        this.name = fullName;
        this.srcIcon = scrIcon;
        this.srcImg = scrImg;
        this.id = StudentsAssociation.nextId;
        StudentsAssociation.nextId++;
        this.activeTeams = new Set<Team>(this.teamHashFunction);
    }

    public getSrcItem(){
      return this.srcImg;
    }

    public getSrcIcon() {
        return this.srcIcon;
    }

    public getFullName() {
        return this.fullName;
    }

    public getShortName() {
        return this.shortName;
    }

    public getId() {
        return this.id;
    }

    public addTeam(team: Team): void {
        this.activeTeams.add(team);
    }

    public getTeams(): Set<Team> {
        return this.activeTeams;
    }

    public getTeamsArray(): Team[] {
        let teams: Team[] = [];

        this.activeTeams.forEach(function(team) {
            teams.push(team);
        });

        return teams;
    }

    public getTeamByModality(modality: Modality): Team {
        for (let team of this.activeTeams.toArray()) {
            if (team.getModality().equals(modality))
                return team;
        }
    }

    public hasModality(modality: Modality): boolean {
        for (let team of this.activeTeams.toArray()) {
            if (team.getModality().equals(modality))
                return true;
        }

        return false;
    }

    private teamHashFunction(team: Team): string {
        return team.getModality().getId().toString();
    }
}
