db.employees.find()

// index 만들기
db.employees.createIndex({empno:1})

// index 제거
db.employees.dropIndex({empno:1})

// unique한 인덱스 만들기
db.employees.createIndex({empno:1}, {unique:true})

// index확인
db.employees.getIndexes()

// 복합인덱스 만들기 - 이름, 직무
db.employees.createIndex({ename:1, job:1})

// 거리 인덱스 (x, y)
// 10*10 데이터 만들기
for(var i = 0; i < 100; i++)
    db.spatial.insert({pos:[i%10, Math.floor(i/10)]})

db.spatial.find()

// 2D 인덱스 만들기 - 거리 계산을 위해
db.spatial.ensureIndex({pos:"2d"})
db.spatial.dropIndex({pos:"2d"})
