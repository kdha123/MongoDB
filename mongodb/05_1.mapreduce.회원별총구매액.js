// 주문 데이터 확인
db.order.find()

// 고객별 구매 총액 구하기
// map - 고객아이디, 주문 가격 가져오기
var map_function = function(){
    // 데이터 추출함수 : emit()
    emit(this.cust_id, this.price)
}

// reduce - 고객아이디별로 주문 가격을 더한다.
var reduce_function = function(key, values){
    // 고객별(key)로 구매값이 배열로 들어온다.
    // 그러나 데이터 없거나 1개면 배열이 아닌 걸로 처리된다.
    // for 문보다는 Array.sum()을 사용해서 더한다.
    return Array.sum(values)
}

// map reduce를 처리해서 collection으로 저장한다.
db.order.mapReduce(
    map_function,
    reduce_function,
    {out:"order_cust_total"}
)

// collection의 데이터를 확인한다.
db.order_cust_total.find()


