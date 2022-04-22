import BoardService from './BoardService';
import ClubService from './ClubService';
import MemberService from './MemberService';
import PostingService from './PostingService';
import CommentService from './CommentService';


interface ServiceLycler {
    //
    createClubService(): ClubService;
    createMemberService(): MemberService;
    createBoardService(): BoardService;
    createPostingService(): PostingService;
    createCommentService(): CommentService;
}

export default ServiceLycler;
