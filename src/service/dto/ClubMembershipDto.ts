import RoleInClub from "../../entity/club/RoleInClub";
import DateUtil from "../../util/DateUtil";
import ClubMembership from "../../entity/club/ClubMembership";

class ClubMembershipDto{

    clubId: string = '';
    memberEmail: string = '';
    role: RoleInClub = RoleInClub.Member;
    joinDate: string = '';

    constructor(clubId: string, memberEmail: string) {

        this.clubId = clubId;
        this.memberEmail = memberEmail;
        this.joinDate = DateUtil.today();
    }


    static fromEntity(membership: ClubMembership): ClubMembershipDto {

        const membershipDto = new ClubMembershipDto(membership.clubId, membership.memberEmail);

        membershipDto.role = membership.role;
        membershipDto.joinDate = membership.joinDate;

        return membershipDto;
    }

    toMembership(): ClubMembership {

        const clubMembership = new ClubMembership(this.clubId, this.memberEmail);

        clubMembership.role = this.role;
        clubMembership.joinDate =this.role;

        return clubMembership;
    }

}
export default ClubMembershipDto;