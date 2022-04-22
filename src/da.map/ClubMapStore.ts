import MemoryMap from "./io/MemoryMap";
import ClubStore from "../store/ClubStore";
import TravelClub from "../entity/club/TravelClub";


class ClubMapStore implements ClubStore {

    clubMap: Map<string, TravelClub>;
    autoIdMap: Map<string, number>;

    constructor() {
        this.clubMap = MemoryMap.getInstance().clubMap;
        this.autoIdMap = MemoryMap.getInstance().autoIdMap;
    }


    //★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
    //★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
    create(club: TravelClub): string {

        //현존하는 클럽인지 환인
        const targetClub = this.clubMap.get(club.getId());
        if(targetClub){
            throw new Error('club id already exists: ' + targetClub.getId());
        }

        const className = TravelClub.name;

        //이 객체가 AutoIdEntity 유형인지 확인
        //순번 자동 채번이면 AutoId
        if('getId' in club || 'setAutoId' in club){
            if(this.autoIdMap.get(className) === undefined){
                this.autoIdMap.set(className, Number(club.getId()) );
            }

            //autoId맞으면 시퀀스 발동
            let keySequence = this.autoIdMap.get(className);

            if(keySequence !== undefined){
                const autoId = keySequence.toString();

                club.setAutoId(autoId);

                //자동 패번된 ID가 모여있는 저장소에서 최종순번에 1을 증가시켜 여행클럽 저장
                this.autoIdMap.set(className, ++keySequence);
            }
        }
        this.clubMap.set(club.getId(), club);
        return club.getId();
    }
    //★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★
    //★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★★


    retrieve(clubId: string): TravelClub | null {

        return this.clubMap.get(clubId) || null;
    }

    retrieveByName(name: string): TravelClub | null {

        const clubs = Array.from(this.clubMap.values());
        if(!clubs.length){
            return null;
        }
        return clubs.find(club => club.name === name) || null;
    }

    update(club: TravelClub): void {

        this.clubMap.set(club.getId(), club);
    }

    delete(clubId: string): void {

        this.clubMap.delete(clubId);
    }

    exists(clubId: string): boolean {

        return this.clubMap.get(clubId) !== undefined;
    }

}
export default ClubMapStore