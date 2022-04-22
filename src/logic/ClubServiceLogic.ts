import ClubService from "../service/ClubService";
import ClubStoreMapLycler from "../da.map/ClubStoreMapLycler";
import ClubStore from "../store/ClubStore";
import MemberStore from "../store/MemberStore";
import TravelClub from "../entity/club/TravelClub";
import ClubMembership from "../entity/club/ClubMembership";
import RoleInClub from "../entity/club/RoleInClub";
import TravelClubDto from "../service/dto/TravelClubDto";
import ClubMembershipDto from "../service/dto/ClubMembershipDto";



class ClubServiceLogic implements ClubService {

    clubStore: ClubStore;
    memberStore: MemberStore;

    constructor() {
        this.clubStore = ClubStoreMapLycler.getInstance().requestClubStore();
        this.memberStore = ClubStoreMapLycler.getInstance().requestMemberStore();
    }


    register(clubDto: TravelClubDto): void {

        const foundClub = this.clubStore.retrieveByName(clubDto.name);
        if(foundClub){
            throw new Error('Club name already exists: ' + clubDto.name);
        }

        const club = clubDto.toTravelClub();
        const clubId = this.clubStore.create(club);

       clubDto.usid=clubId;

    }

    find(clubId: string): TravelClubDto {

        const foundClub = this.clubStore.retrieve(clubId);
        if(!foundClub){
            throw new Error('No existing Club id: ' + clubId);
        }

        return TravelClubDto.fromEntity(foundClub);
    }

    findByName(name: string): TravelClubDto {

        const foundClub = this.clubStore.retrieveByName(name);
        if(!foundClub){
            throw new Error('No existing Club name: ' + name);
        }

        return TravelClubDto.fromEntity(foundClub);
    }

    modify(clubDto: TravelClubDto): void {

        const foundClub = this.clubStore.retrieveByName(clubDto.name);
        if(!foundClub){
            throw new Error('No existing club name: ' + clubDto.name);
        }

        const targetClub = this.clubStore.retrieve(clubDto.usid);
        if(!targetClub){
            throw new Error('No existing club id: ' + clubDto.usid);
        }

        if(!clubDto.name){
            clubDto.name = targetClub.name;
        }
        if(!clubDto.intro){
            clubDto.intro = targetClub.intro;
        }

        this.clubStore.update(clubDto.toTravelClub());
    }

    remove(clubId: string): void {

        if(!this.clubStore.exists(clubId)){
            throw new Error('No club with id: ' + clubId);
        }
        this.clubStore.delete(clubId);
    }


    //Membership

    private getMembershipIn(club: TravelClub, memberEmail: string): ClubMembership {

        for(const membership of club.membershipList){
            if(memberEmail === membership.memberEmail){
                return membership;
            }
        }

        throw new Error(`No such member [${memberEmail}] in club [${club.name}]`);
    }



    //★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
    //★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
    addMembership(membershipDto: ClubMembershipDto): void {

        //check existing member
        const memberId  = membershipDto.memberEmail;
        const foundMember = this.memberStore.retrieve(memberId);
        if(!foundMember){
            throw new Error('Member email not exists ' + memberId);
        }

        //check existing membership in the club (1)
        const foundClub = this.clubStore.retrieve(membershipDto.clubId);
        if(!foundClub){
            throw new Error('Club id not exist: ' + membershipDto.clubId);
        }

        //check existing membership in the club (2)
        const membership = foundClub.membershipList.find( (membership) => membership.memberEmail === memberId);
        if(membership){
            throw new Error('Member already exist in club --> ' + memberId);
        }

        //add membership
        const clubMembership = membershipDto.toMembership();

        foundClub.membershipList.push(clubMembership);
        this.clubStore.update(foundClub);

        foundMember.membershipList.push(clubMembership);
        this.memberStore.update(foundMember);
    }
    //★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
    //★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★


    findMembershipIn(clubId: string, membershipId: string): ClubMembershipDto | null {

        const foundClub = this.clubStore.retrieve(clubId);
        let membership = null;

        if(foundClub){
            membership = this.getMembershipIn(foundClub, membershipId);
        }

        return membership ? ClubMembershipDto.fromEntity(membership) : membership;

    }

    modifyMembership(clubId: string, membershipDto: ClubMembershipDto): void {

        const targetEmail = membershipDto.memberEmail;
        const newRole = membershipDto.role;

        const targetClub = this.clubStore.retrieve(clubId);
        if(targetClub){
            const membershipOfClub = this.getMembershipIn(targetClub, targetEmail);

            membershipOfClub.role = newRole as RoleInClub;
            this.clubStore.update(targetClub);
        }

        const targetMember = this.memberStore.retrieve(targetEmail);
        if(targetMember){
            targetMember.membershipList.filter(membershipOfMember => membershipOfMember.clubId === clubId)
                .map(membershipOfMember => membershipOfMember.role = newRole);

            this.memberStore.update(targetMember);
        }
    }

    removeMembership(clubId: string, membershipId: string): void {

        const foundClub = this.clubStore.retrieve(clubId);
        const foundMembership = this.memberStore.retrieve(membershipId);

        if(foundClub && foundMembership){
            const clubMembership = this.getMembershipIn(foundClub, membershipId);

            const clubIndex = foundClub.membershipList.indexOf(clubMembership);
            const memberIndex = foundMembership.membershipList.indexOf(clubMembership);

            foundClub.membershipList.splice(clubIndex, 1);
            foundMembership.membershipList.splice(memberIndex, 1);
        }
    }

}
export default ClubServiceLogic;