// 주문 데이터 확인
db.order.find()

// 제품별 수량의 평균
// map - [제품명, 수량] - for문을 이용해서 한개씩 꺼오기
var map_function = function(){
    for(var idx=0; idx < this.items.length; idx++){
        var key = this.items[idx].item_name;
        // value = {1, 수량}
        var value = {
            count: 1,
            qty: this.items[idx].qty
        }
        // 데이터 추출
        emit(key, value)
    }
}

// reduce - key:상품별로 value = {1 , 수량} : 각각 더한다.
var reduce_function = function(key, values){
    // 상품별(key)로 판매된 {1, 상품의 수량} 데이터로 들어온다.
    // 그러나 데이터 없거나 1개면 배열이 아닌 걸로 처리된다.
    // for 문보다는 Array.sum()을 사용해서 더한다.
    reduceValue = {count: 0, qty_tot:0}
    for(var idx = 0; idx < values.length; idx++){
        reduceValue.count += values[idx].count;
        reduceValue.qty_tot += values[idx].qty;
    }
    // 평균을 구해서 넘길수 있으나 옵션에 finalize 함수를 해보기 위해서
    return reduceValue;
}

// 평균을 구하는 finalize함수
var finalize_function = function(key, value){
    // 평균을 구하는 value = {카운트, 판매횟수의합) 처리 value에 추가
    value.average = value.qty_tot / value.count;
    // value={카운트, 판매횟수의합, 평균}
    return value;
}

// map reduce를 처리해서 collection으로 저장한다.
db.order.mapReduce(
    map_function,
    reduce_function,
    {
        out:"order_qty_count_average",
        finalize:finalize_function,
        query:{order_date:{$gte:new Date('01/01/2020')}}
    }
)

// collection의 데이터를 확인한다.
db.order_qty_count_average.find()


