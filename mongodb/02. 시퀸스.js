// save(json) - 저장한다. value값을 함수로 지정해서 저장해놓고 쓴다.
db.system.js.save(
// system.js 저장을 할 때 
//{_id: 호출할 이름, value: 처리할 함수} -> 처리할 함수는 익명
{_id:"seq_no",
 value:
     function (name) {
      // findAndModify - 데이터를 찾아서 수정을 한다.
      // find -> query에 선언해서 사용
      // Modify -> update에 선언해서 사용
         var ret = db.seq_no.findAndModify(
         // MongoDB의 연산자는 앞에 $를 붙인다.
        {query:{_id:name},update:{$inc:{next:1}},
            // new:true - 없으면 만든다.
            //upsert : 있으면 update가 되고 없으면 insert가 된다.
          new:true, upsert:true})
        return ret.next; 
 }  

})




// 등록되어져 있는 js 함수를 확인 하는 쿼리
db.system.js.find()



// db.loadServerScripts()를 
// 이용해서 로드해서 사용하세요.
db.loadServerScripts()
// 게시판에서 사용할 시퀸스 만들기
seq_no("board_seq")
// 공지사항에서 사용할 시퀸스 만들기
seq_no("notice_seq")

db.seq_no.find()
