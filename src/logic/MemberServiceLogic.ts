import MemberService from "../service/MemberService";
import MemberDto from "../service/dto/MemberDto";
import ClubStoreMapLycler from "../da.map/ClubStoreMapLycler";
import MemberStore from "../store/MemberStore";


class MemberServiceLogic implements MemberService{

    memberStore: MemberStore;

    constructor() {
        this.memberStore = ClubStoreMapLycler.getInstance().requestMemberStore();
    }


    register(memberDto: MemberDto): void {

        const email = memberDto.email;
        const foundMember = this.memberStore.retrieve(email);

        if(foundMember){
            throw new Error('Member email already exists: ' + foundMember.email);
        }
        this.memberStore.create(memberDto.toMember());
    }

    find(memberEmail: string): MemberDto {

        const foundMember = this.memberStore.retrieve(memberEmail);
        if(!foundMember){
            throw new Error('Member email NOT exist: ' + memberEmail);
        }
        return MemberDto.fromEntity(foundMember);
    }

    findByName(memberName: string): MemberDto[] {

        const members = this.memberStore.retrieveByName(memberName);
        if(!members){
            throw new Error('Member name NOT exist: ' + memberName);
        }
        return members.map( (targetMember) => MemberDto.fromEntity(targetMember));
    }

    modify(memberDto: MemberDto): void {

        const targetMember = this.memberStore.retrieve(memberDto.email);
        if(!targetMember){
            throw new Error('Member email NOT exist: ' + memberDto.email);
        }

        if(!memberDto.name){
            memberDto.name = targetMember.name;
        }
        if(!memberDto.nickName){
            memberDto.nickName = targetMember.nickName;
        }
        if(!memberDto.phoneNumber){
            memberDto.phoneNumber = targetMember.phoneNumber;
        }
        if(!memberDto.birthDay){
            memberDto.birthDay = targetMember.birthDay;
        }

        this.memberStore.update(memberDto.toMember());
    }

    remove(memberEmail: string): void {

        if(!this.memberStore.exists(memberEmail)){
            throw new Error('Member id NOT exist: ' + memberEmail);
        }

        this.memberStore.delete(memberEmail);
    }

}
export default MemberServiceLogic;