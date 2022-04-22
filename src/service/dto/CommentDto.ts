import DateUtil from "../../util/DateUtil";
import Comment from "../../entity/board/Comment";
import Posting from "../../entity/board/Posting";


class CommentDto {

    usid: string = '';
    writer: string = '';
    contents: string = '';
    writtenDate: string = '';

    constructor(writer: string, contents: string) {

        this.writer = writer;
        this.contents = contents;
        this.writtenDate = DateUtil.today();
    }

    static fromEntity(comment: Comment): CommentDto {

        const commentDto = new CommentDto(comment.writer, comment.contents);
        commentDto.usid = comment.usid;
        commentDto.writtenDate = comment.writtenDate;

        return commentDto;
    }

    get commentDtoInfo(): string {
        //
        return `Comment id: ${this.usid}, writer: ${this.writer}, contents: ${this.contents}, written date: ${this.writtenDate}`;
    }

    toCommentInPosting(posting: Posting): Comment {

        const comment = new Comment(posting.nextCommentId, posting.getId(), this.writer, this.contents);

        comment.writtenDate = this.writtenDate;

        return comment;

    }
}
export default CommentDto;