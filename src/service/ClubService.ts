import TravelClubDto from "./dto/TravelClubDto";
import ClubMembershipDto from "./dto/ClubMembershipDto";


interface ClubService {

    register(clubDto: TravelClubDto): void;
    find(clubId: string): TravelClubDto;
    findByName(name: string): TravelClubDto;
    modify(clubDto: TravelClubDto): void;
    remove(clubId: string): void;


    //Membership
    addMembership(membershipDto: ClubMembershipDto): void;
    findMembershipIn(clubId: string, membershipId: string): ClubMembershipDto | null;
    modifyMembership(clubId: string, membershipDto: ClubMembershipDto): void;
    removeMembership(clubId: string, membershipId: string): void;

}
export default ClubService;