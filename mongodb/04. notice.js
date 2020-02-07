db
db.notice.drop()
db.loadServerScripts()

// 공지사항 쓰기
db.notice.insert({
    _id:seq_no("notice_seq"),
    title:"보름",
    content:"보름이니깐 찰밥먹어야지~~~",
    writeDate: new Date(),
    startDate: "2020-02-07",
    endDate: "2020-02-14"
    })

// 공지사항 리스트
db.notice.find({},{title:1, content:1})

// 페이징 처리
.sort({_id:-1})
.skip((6-1)*5)
.limit(5)

// 검색하기
db.notice.count()
db.notice.find({title:/수정/},{title:1, content:1})
db.notice.find({title:/^수정/})
db.notice.find({title:/~$/})

// 공지사항 보기 
 db.notice.find({_id:30})
 
 // 공지사항 수정하기
 notice = db.notice.findOne({_id:20})
 notice
 notice.title = "수정 테스트하기~"
 db.notice.save(notice)
 
 // 공지사항 삭제하기
 db.notice.remove({_id:2})
 db.notice.find()