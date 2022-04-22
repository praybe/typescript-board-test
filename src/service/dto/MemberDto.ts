import CommunityMember from "../../entity/club/CommunityMember";
import Address from "../../entity/club/Address";
import ClubMembershipDto from "./ClubMembershipDto";

class MemberDto{

    email: string = '';
    name: string = '';
    nickName: string = '';
    phoneNumber: string = '';
    birthDay: string = '';
    addresses: Address[] = [];
    membershipList: ClubMembershipDto[] = [];

    constructor(email: string, name: string, phoneNumber:string) {

        this.setEmail(email);
        this.name = name;
        this.phoneNumber = phoneNumber;
    }

    static fromEntity(member: CommunityMember): MemberDto {

        const memberDto = new MemberDto(member.email, member.name, member.phoneNumber);

        memberDto.nickName = member.nickName;
        memberDto.birthDay = member.birthDay;
        memberDto.addresses = member.addresses;

        return memberDto;
    }

    setEmail(email: string): void {

        if (!this.isValidEmailAddress(email)){
            throw new Error('Invalid email style ---> ' + email);
        }
        this.email = email;
    }

    isValidEmailAddress(email: string): boolean {

        const ePattern = "^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$";

        return !!email.match(ePattern);
    }

    toMember(): CommunityMember {

        const member = new CommunityMember(this.email, this.name, this.phoneNumber);

        member.nickName = this.nickName;
        member.birthDay = this.birthDay;


        for(const membershipDto of this.membershipList){
            member.membershipList.push(membershipDto.toMembership());
        }

        return member;
    }

}
export default MemberDto;