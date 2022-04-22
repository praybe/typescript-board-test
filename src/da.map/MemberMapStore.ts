import MemberStore from "../store/MemberStore";
import MemoryMap from "./io/MemoryMap";
import CommunityMember from "../entity/club/CommunityMember";


class MemberMapStore implements MemberStore {

    memberMap: Map<string, CommunityMember>;

    constructor() {
        this.memberMap = MemoryMap.getInstance().memberMap;
    }


    create(member: CommunityMember): string {

        const targetMember = this.memberMap.get(member.getId());
        if(targetMember){
            throw new Error('Member email already exists: ' + member.getId());
        }

        this.memberMap.set(member.getId(), member);

        return member.getId();
    }

    retrieve(email: string): CommunityMember | null {

        return this.memberMap.get(email) || null;
    }

    retrieveByName(name: string): CommunityMember[] {

        const members = Array.from(this.memberMap.values());
        return members.filter(member => member.name === name);
    }

    update(member: CommunityMember): void {

        this.memberMap.set(member.getId(), member);
    }

    delete(email: string): void {

        this.memberMap.delete(email);
    }

    exists(email: string): boolean {

        return this.memberMap.get(email) !== undefined;
    }



}
export default MemberMapStore;