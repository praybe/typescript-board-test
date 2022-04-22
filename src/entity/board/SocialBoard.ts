import DateUtil from '../../../util/DateUtil';
import Entity from '../Entity';
import TravelClub from '../club/TravelClub';
import CommunityMember from '../club/CommunityMember';


class SocialBoard implements Entity {

    clubId: string = '';
    name: string = '';
    adminEmail: string = '';
    sequence: number = 0;
    createDate: string = '';

    constructor(clubId: string, name: string, adminEmail: string){

        this.clubId = clubId;
        this.name = name;
        this.adminEmail = adminEmail;
        this.createDate = DateUtil.today();
    }

    getId(): string{
        return this.clubId;
    }

    get nextPostingId(): string {
        return `${this.clubId} : ${this.sequence++}` ;
    }

    static getSample(club: TravelClub): SocialBoard {

        const member = CommunityMember.getSample();

        const board = new SocialBoard(club.usid, club.name, member.email);

        board.createDate = '2022.04.20';

        return board;
    }

}
export default SocialBoard
