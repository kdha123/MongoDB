db
use webjjang

// 저장할 문서를 정의해서 변수 지정
board = {
    "_id":1,
    "title":"mongoDB",
    "content":"NoSQL",
    "writer":"관리자",
    "writedate":ISODate("2020-02-06T12:2500.000Z"),
    "hit":0
}

// 데이터 저장 - insert()
db.board.insert(board)

// 저장된 데이터 확인 -> 여러개의 데이터 -> 리스트
db.board.find()
// 저장된 데이터 한 개 확인
db.board.findOne()
// 모든 데이터 삭제 - remove()
db.board.remove({})
