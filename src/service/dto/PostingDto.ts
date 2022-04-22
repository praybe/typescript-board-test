import Posting from "../../entity/board/Posting";
import DateUtil from "../../util/DateUtil";
import SocialBoard from "../../entity/board/SocialBoard";

class PostingDto {

    usid: string =''; //글번호
    title: string =''; //글제목
    writerEmail: string =''; //작성자
    contents: string =''; //내용
    writtenDate: string =''; //작성일
    readCount: number = 0 ; //조회수

    constructor(title: string, writerEmail: string, contents: string) {

        this.title = title;
        this.writerEmail = writerEmail;
        this.contents = contents;
        this.writtenDate = DateUtil.today();
    }


    static fromEntity(posting: Posting): PostingDto {

        const postingDto = new PostingDto(posting.title, posting.writerEmail, posting.contents);

        postingDto.usid = posting.usid;
        postingDto.writtenDate = posting.writtenDate;
        postingDto.readCount = posting.readCount;

        return postingDto;
    }

    get postingDtoInfo(): string{
        return `Posting id: ${this.usid}, title: ${this.title}, writer email: ${this.writerEmail},
       read count: ${this.readCount}, written date: ${this.writtenDate}, contents: ${this.contents}`;
    }

    toPostingInBoard(boardId: SocialBoard): Posting {

        const posting = new Posting(boardId.nextPostingId, boardId.getId(),this.title, this.writerEmail, this.contents);

        posting.writtenDate = this.writtenDate;
        posting.readCount = this.readCount;

        return posting;
    }

    toPostingIn(postingId: string, boardId: string): Posting{

        const posting = new Posting(postingId, boardId, this.title, this.writerEmail, this.contents);

        posting.writtenDate = this.writtenDate;
        posting.readCount = this.readCount;

        return posting;

    }
}
export default PostingDto;