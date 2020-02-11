// log 데이터 확인하기
db.log.find()

// 사이트 메뉴 - 클릭 분석 - 카운트
db.log.mapReduce(
    // map함수 선언 - 데이터 추출
    function(){
        emit(this.path, 1);
    },
    // reduce함수 선언 - 추출한 데이터의 처리
    function(key, values){
        return Array.sum(values);
    },
    // 옵션
    {
        out: "log_count",
        sort:{path:1}
    }
)

db.log_count.find().sort({value:-1})
