import PostingDto from "../service/dto/PostingDto";
import PostingService from "../service/PostingService";
import BoardStore from '../store/BoardStore';
import ClubStore from '../store/ClubStore';
import PostingStore from '../store/PostingStore';
import ClubStoreMapLycler from '../da.map/ClubStoreMapLycler';



class PostingServiceLogic{

    clubStore: ClubStore;
    boardStore: BoardStore;
    postingStore: PostingStore;

    constructor() {
        this.clubStore = ClubStoreMapLycler.getInstance().requestClubStore();
        this.boardStore = ClubStoreMapLycler.getInstance().requestBoardStore();
        this.postingStore = ClubStoreMapLycler.getInstance().requestPostingStore();
    }

    register(boardId: string, postingDto: PostingDto): string {

        const foundClub = this.clubStore.retrieve(boardId);
        if(!foundClub){
            throw new Error('No club id --> ' + boardId);
        }

        const membership = foundClub.getMembershipBy(postingDto.writerEmail);
        if(!membership){
            throw new Error('No member admin email in club --> ' + postingDto.writerEmail);
        }

        const foundBoard = this.boardStore.retrieve(boardId);
        if(!foundBoard){
            throw new Error('No board id --> ' + boardId);
        }

        return this.postingStore.create(postingDto.toPostingInBoard(foundBoard));

    }

    find(postingId: string): PostingDto {

        const foundPosting = this.postingStore.retrieve(postingId);
        if (!foundPosting) {
            throw new Error('No posting id --> ' + postingId);
        }

        return PostingDto.fromEntity(foundPosting);

    }

    findByBoardId(boardId: string): PostingDto[] {

        const foundBoard = this.boardStore.retrieveByName(boardId);
        if(!foundBoard){
            throw new Error('No board id --> ' + boardId);
        }

        return this.postingStore.retrieveByBoardId(boardId).map( posting => PostingDto.fromEntity(posting));
    }

    modify(postingDto: PostingDto): void {

        const postingId = postingDto.usid;
        const targetPosting = this.postingStore.retrieve(postingId);
        if (!targetPosting) {
            throw new Error('No posting id : ' + postingId);
        }

        if (!postingDto.title) {
            postingDto.title = targetPosting.title;
        }

        if (!postingDto.contents) {
            postingDto.contents = targetPosting.contents;
        }

        this.postingStore.update(postingDto.toPostingIn(postingId, targetPosting.boardId));

    }

    remove(postingId: string): void {

        if (!this.postingStore.retrieve(postingId)) {
            throw new Error('No posting id : ' + postingId);
        }
        this.postingStore.delete(postingId);
    }


}
export default PostingServiceLogic;