import PostingStore from "../store/PostingStore";
import MemoryMap from "./io/MemoryMap";
import Posting from "../entity/board/Posting";


class PostingMapStore implements PostingStore{

    postingMap: Map<string, Posting>;

    constructor() {

        this.postingMap = MemoryMap.getInstance().postingMap;
    }


    create(posting: Posting): string {

        const targetPosting = this.postingMap.get(posting.getId());
        if(targetPosting){
            throw new Error('\n Posting id already exists: ' + targetPosting);
        }

        this.postingMap.set(posting.getId(), posting);
        return posting.getId();
    }

    retrieve(postingId: string): Posting | null {

        return this.postingMap.get(postingId) || null;
    }

    retrieveByBoardId(boardId: string): Posting[] {

        const postings = Array.from(this.postingMap.values());
        return postings.filter( posting => posting.boardId === boardId);
    }

    update(posting: Posting): void {

        this.postingMap.set(posting.getId(), posting);
    }

    delete(postingId: string): void {

        this.postingMap.delete(postingId);
    }

    exists(postingId: string): boolean {

        return this.postingMap.get(postingId) !== undefined;
    }

}
export default PostingMapStore