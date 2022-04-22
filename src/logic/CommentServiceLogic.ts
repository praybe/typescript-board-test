import CommentService from '../service/CommentService';
import CommentDto from '../service/dto/CommentDto';
import CommentStore from '../store/CommentStore';
import ClubStoreMapLycler from '../da.map/ClubStoreMapLycler';
import PostingStore from '../store/PostingStore';

class CommentServiceLogic implements CommentService {
    //
    postingStore: PostingStore;
    commentStore: CommentStore;

    constructor() {
        //
        this.postingStore = ClubStoreMapLycler.getInstance().requestPostingStore();
        this.commentStore = ClubStoreMapLycler.getInstance().requestCommentStore();
    }

    register(postingId: string, commentDto: CommentDto): string {
        //
        const foundPosting = this.postingStore.retrieve(postingId);

        if (!foundPosting) {
            throw new Error('No such posting with id --> ' + postingId);
        }

        return this.commentStore.create(commentDto.toCommentInPosting(foundPosting));
    }

    find(commentId: string): CommentDto {
        //
        const foundComment = this.commentStore.retrieve(commentId);

        if (!foundComment) {
            throw new Error('No such comment with id: ' + commentId);
        }
        return CommentDto.fromEntity(foundComment);
    }

    findByPostingId(postingId: string): CommentDto[] {
        //
        const foundPosting = this.postingStore.retrieve(postingId);

        if (!foundPosting) {
            throw new Error('No such posting with id --> ' + postingId);
        }
        return this.commentStore.retrieveByPostingId(postingId).map(comment => CommentDto.fromEntity(comment));
    }

    modify(commentDto: CommentDto): void {
        //
        const commentId = commentDto.usid;
        const targetComment = this.commentStore.retrieve(commentId);
        if (!targetComment) {
            throw new Error('No such comment with id : ' + commentId);
        }

        if (commentDto.contents) {
            targetComment.contents = commentDto.contents;
        }

        this.commentStore.update(targetComment);
    }

    remove(commentId: string): void {
        //
        if (!this.commentStore.retrieve(commentId)) {
            throw new Error('No such comment with id: ' + commentId);
        }
        this.commentStore.delete(commentId);
    }

}
export default CommentServiceLogic;
