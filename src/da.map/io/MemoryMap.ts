import TravelClub from "../../entity/club/TravelClub";
import CommunityMember from "../../entity/club/CommunityMember";
import SocialBoard from "../../entity/board/SocialBoard";
import Posting from "../../entity/board/Posting";
import Comment from "../../entity/board/Comment";

class MemoryMap {

    private static uniqueInstance : MemoryMap;

    clubMap: Map<string, TravelClub>;
    memberMap: Map<string, CommunityMember>;
    boardMap: Map<string, SocialBoard>;
    postingMap: Map<string, Posting>;
    commentMap: Map<string, Comment>;
    autoIdMap: Map<string, number>;

    private constructor(){

        this.clubMap = new Map<string, TravelClub>();
        this.memberMap = new Map<string, CommunityMember>();
        this.boardMap = new Map<string, SocialBoard>();
        this.postingMap = new Map<string, Posting>();
        this.commentMap = new Map<string, Comment>();
        this.autoIdMap = new Map<string, number>();
    }

    static getInstance(): MemoryMap {

        if (this.uniqueInstance === undefined){
            this.uniqueInstance = new MemoryMap();
        }
        return this.uniqueInstance;
    }
}
export default MemoryMap;