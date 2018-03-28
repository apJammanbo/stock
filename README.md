
## How To Run
1. Clone this repo using `git clone --depth=1 https://github.com/apJammanbo/stock.git`
2. Move to the appropriate directory: `cd stock`.<br />
3. Run `npm install` in order to install dependencies<br />
   *At this point you can run `npm start` to see the example app at `http://localhost:3000`.*

## Another Commands
 * Test & Build & Run
  `npm run start:production`
 * Build
  `npm run build`
 * Start(Production)
  `npm run start:prod`
 * Test
  `npm run test`
 * Lint
  `npm run lint`

## 문제해결전략
<dl>
  <dt>데이터 구성</dt>
  <dd>startPrice(number) : 시초가(UI 표현다양성을 위해 추가</dd>
  <dd> -> 545로 설정</dd>
  <br/>
  <dd>dataIndex(number) : 다음번에 받아와야하는 데이터 인덱스</dd>
  <dd> -> 0부터 1씩 증가</dd>
  <br/>
  <dd>data(array) : 1초마다 들어오는 거래를 담는 배열</dd>
  <dd> -> type(S, B), price(가격), quantity(수량), dateTime(시간)</dd>
  <br/>
  <dd>buyData(array) : 매수 데이터를 담는 배열</dd>
  <dd> -> type(S, B), price(가격), quantity(수량), dateTime(시간), ratio(증감율)</dd>
  <br/>
  <dd>sellData(array) : 매도 데이터를 담는 배열</dd>
  <dd> -> type(S, B), price(가격), quantity(수량), dateTime(시간), ratio(증감율)</dd>
  <br/>
  <dd>tradedData(array) : 거래성사된 데이터를 담는 배열</dd>
  <dd> -> price(가격), quantity(수량)</dd>
  <br/>
  <dt>Action</dt>
  <dd>GET_NEW_DATA : 새로운 데이터를 받아오면 발생하는 액션</dd>
  <br/>
  <dt>로직전개</dt>
  <dd>1. 새로운 데이터를 받아오면 dateTime 을 추가하여 data에 담는다.</dd>
  <dd>2. 새로운 데이터가 매도주문이면, buyData(매수주문)에서 거래가 성사되는 데이터를 찾는다.</dd>
  <dd>2-1. 기존 매수주문 데이터에서 가격이 높은 데이터부터 거래성사 여부를 확인한다./dd>
  <dd>2-2. 새로운 데이터의 가격보다 기존 데이터의 가격이 같거나 크면 거래를 진행한다.<dd>
  <dd>2-3. 기존 매수주문가격이 매도주문 가격보다 같거나 높으면 거래가 성사된다.</dd>
  <dd>2-4. 거래된 데이터는 tradedData 에 담는다.</dd>
  <dd>2-5. 새로운 데이터가 거래되어 수량이 0이 되면 거래가능 확인을 중지한다.</dd>
  <dd>2-6. 거래성사 여부 확인중 기존의 데이터 가격이 신규 데이터 가격보다 낮으면 2-7으로 간다.</dd>
  <dd>2-6. 거래가 중지되지 않았으면 2-1로 가서 반복한다.</dd>
  <dd>2-7. 신규데이터가 모두 거래되지 않았으면 남은 수량만큼을 sellData에 추가한다.</dd>
  <dd>2. 새로운 데이터가 매수주문이면, 2의 매도 주문과 상반되게 진행한다.</dd>
  <br/>
</dl>

