// db 확인
db

// 게시판(board) 내용을 전체 가져와서 보여보자.
// select * from board
db.board.find()

// 시퀸스 확인해보기 
db.seq_no.find()

// 게시판(board), 시퀸스(seq_no) 제거
db.board.drop()
db.seq_no.drop()

// db.loadServerScripts()를
// 이용해서 로드해서 사용하세요.
db.loadServerScripts()

// 새로운 Intellishell을 하나 열면 다른 Intellishell과 다른걸로 판단.
// 그래서 db.loadServerScripts()를 실행해야만 한다.
seq_no("board_no")

// 게시판 데이터 넣기 - 게시판 글쓰기
// insert into board(no, title, content, writer)
// values(board_seq.nextval, 'java', 'java jjang', 'kim')
// mongoDB에서는 미리 선언하지 않았으므로 입력되지 않는 값은 생기지 않는다.
db.board.insert({
    _id:seq_no("board_seq"),
    title:"java",
    content:"java jjang",
    writer:"kim",
    writeDate: new Date(),
    hit:0
    })
    
// 페이지 처리 - 글번호 역순 정렬, 넘길 갯수(이젠페이지갯수), 가져올 갯수
// select ~ from (select ~ from (select~)) where rnum ? between ?
// 동작은 같으나 문장이 간단하다.
// 가져올 데이터 번호, 제목, 작성자, 작성일, 조회수
// - _id로 운영하는 번호는 자동으로 가져온다.

// content만 빠지고 가져옴.
db.board.find({},{title:1, writer:1, writeDate:1, hit:1})
// sort({항목:정렬방법}) _id를 역순(-1 -> desc)으로 정렬한다.
.sort({_id:-1}) 
// skip((현재페이지 - 1) * 보여줄 데이터의 개수)
.skip((1-1)*5)
// limit(가져올 데이터 갯수)
.limit(5)

db.board.count()

db.board.find({_id:{$gt:20}})

// 게시판 검색 -> or 연산
// 제목에 Oracle이라고 포함이 되어 있는 글을 찾자.
// /oracle/ -> 검색하려는 대상 데이터 중에서 oracle이 포함이 되어있는
// /5879$/ -> 전화번호 중 5879로 끝나는
// /^java/ -> java로 시작하는
db.board.find({title:/Oracle/},{title:1, writer:1, writeDate:1, hit:1})
db.board.find({title:/^Oracle/})
db.board.find({title:/Oracle$/})
.sort({_id:-1})
.skip((2-1)*2)
.limit(2)

// 게시판 글보기
// select * from board where no = ?
// find() -> 여러 개, findOne() -> 한 개
db.board.findOne({_id:21})
// 일부만 보여준다. : 번호, 제목, 내용, 작성자
// true/ fales를 따지기 때문에 0만 아니면 가져온다.
db.board.findOne({_id:21},{_id:0,title:"title",content:2,writer:1})

// 게시판 글 수정
// select * from board where no = ? 선 실행 보여준다.
// 수정 후 저장 : update set board title = "~~~",content = "~~~" where no = ?
// 1. 조건에 맞는 데이터 가져오기
board = db.board.findOne({_id:17})
board
// 2. 가져온 데이터 수정
board.title = "Oracle"
board
// 3. 수정된 내용을 db에 적용한다. _id가 같으면 update, 다르면 insert
db.board.save(board)

db.board.count({title:"Oracle"})

// 게시판 삭제
db.board.remove({_id:15})
db.board.find()
