# ✔️ Fast Campus TODO Application 과제

## 결과물

- https://fastcampus-kdt-5-m3.vercel.app/
  <br><br>

## 작업환경

- 윈도우
- 구글크롬브라우저
- 17인치 화면 👉반응형이 아니므로 화면에 따라 올바르게 작동하지 않을 수 있습니다.
  <br><br>

## 사용한 기술

- <img src="https://img.shields.io/badge/React-61DAFB?style=flat&logo=React&logoColor=white"/>
- <img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=typescript&logoColor=white"/>
- <img src="https://img.shields.io/badge/Next.js-000000?style=flat&logo=nextdotjs&logoColor=white"/>
- <img src="https://img.shields.io/badge/Tailwind CSS-06B6D4?style=flat&logo=tailwindcss&logoColor=white"/>
- <img src="https://img.shields.io/badge/React Query-FF4154?style=flat&logo=reactquery&logoColor=white"/>
  <br><br>

## 과제 조건

### ❗ 필수

- [x] 할 일 목록(List)이 출력돼야 합니다.
- [x] 할 일 항목(Item)을 새롭게 추가할 수 있어야 합니다.
- [x] 할 일 항목을 수정할 수 있어야 합니다.
- [x] 할 일 항목을 삭제할 수 있어야 합니다.
- [x] 실제 서비스로 배포하고 접근 가능한 링크를 추가해야 합니다.

### ❔ 선택

- [x] 할 일 항목의 순서를 바꿀 수 있도록 만들어보세요. (추천 라이브러리 - [SortableJS](http://sortablejs.github.io/Sortable/))
- [x] 할 일을 완료하지 않은 항목과 완료한 항목을 분류해서 출력해보세요.
- [x] 할 일을 완료한 항목을 한 번에 삭제할 수 있도록 만들어보세요.
- [x] ~~할 일 항목의 최신 수정일을 표시해보세요.~~ 👉계획은 수정한 시간보다 최초 등록한 시간이 더 중요하다고 판단, 등록한 시간을 상대시간으로 표시
- [x] 할 일 목록이 출력되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 기타 동작이 완료되기 전에 로딩 애니메이션이 보이도록 만들어보세요.
- [x] 차별화가 가능하도록 프로젝트를 최대한 예쁘게 만들어보세요.
- [x] 할 일과 관련된 기타 기능도 고려해보세요.
      <br><br>

## 차별화

- 60-30-10 법칙을 준수한 심플한 디자인
- 명언 API를 활용, 계획을 실행함에 있어 동기부여 역할
  - Incremental Static Regeneration(ISR) 방법을 사용, 10초간 데이터를 캐싱해둠
- 다크모드
- 브라우저에서 제공하는 confirm창이 아닌 커스텀 confirm모달 구현
- 직관적인 UI/UX
  - TODO 항목 더블클릭시 수정모드 UI로 전환
  - 수정모드에서 'Enter' 키를 누르면 수정이 되며, 'Esc'를 누르면 수정이 취소됨
  - 수정모드에서 외부 요소를 클릭시 수정이 취소됨
- 다양한 상호작용
  - 모든 TODO, 완료되지 않은 TODO, 완료한 TODO의 갯수를 각각 알려줌
  - 새로운 TODO, 수정 TODO 입력값에 따라 글자수를 알려주며 에러메세지 및 client side validation을 제공
  - 투투 성공 여부에 따라 삭제 메시지가 다름
  - 완료된 투두가 없을 때는 모두삭제 버튼이 보이지 않음
- TODO apikey를 환경변수에 저장
  <br><br>

## 컴포넌트 구조

<img src="https://github.com/KDT1-FE/KDT5-M3/blob/KDT5_LeeJungWoo/public/component-structure.png?raw=true"/>

## 고찰 및 느낀점

- NextJS 13 공부가 필요
- TODO 순서 바꾸는 기능을 sortableJS library와 이미 만들어진 API를 이용하다보니 예상치 못한 결과가 발생, 순서가 변경된 TODO를 완료 하거나 미완료 할 경우 순서가 멋대로 바뀜
- sortableJS library를 사용하는 이상 server state를 가져와서 client state로 바꿔줘야함. 이 과정에서 react-query의 장점이 감소하고 server state와 client state간의 동기화 문제가 발생함. 상태관리 및 react-query 공부가 더 필요
- shadcn/ui라는 tailwind, radixui 기반의 component library를 처음으로 사용해봄
  - 장점
    - 필요한 컴포넌트만 npx로 설치하기 때문에 용량이 매우 적다.
    - 사용이 간편하다.
  - 단점
    - CSS가 안먹거나 ref가 안잡히는 요소들이 있음. 예) checkbox 배경색, 모달창의 DELETE버튼 ref가 안잡힘
- 삭제요청 성공할 확률이 1에 수렴하기 때문에 다음과 같이 client state를 즉각적으로 삭제해주는 것이 더 좋은 UX라고 생각함

```js
const handleDeleteDone = () => {
  // client state를 삭제하는 코드
  setClientTodos((prevTodos) => prevTodos.filter((todo) => !todo.done));
  // server state를 삭제하는 코드
  deleteDone(clientTodos.filter((todo) => todo.done).map((todo) => todo.id));
};
```

- todoIds가 handleReorder함수 내부스코프에서 최신의 순서를 반영하지 못하고 한단계씩 뒤쳐진다. 👉 onEnd의 event 객체를 활용하여 순서를 최신상태로 반영할 수 있음

```js
  const todoIds = clientTodos.map((todo) => todo.id);
  const handleReorder = (event: Sortable.SortableEvent) => {
    // 이동 전 index의 아이템을 splice 매서드를 이용하여 변수에 담음
    const item = todoIds.splice(event.oldIndex as number, 1)[0];
    // 이동 후 index에 해당 아이템을 넣음
    todoIds.splice(event.newIndex as number, 0, item);
    reorderTodo(todoIds);
  };

  <ReactSortable
    list={filteredTodos}
    setList={setClientTodos}
    className="flex flex-col gap-3 p-4 "
    animation={250}
    handle=".handle"
    onEnd={handleReorder}
  >
```

- server side data fetching, ISR, suspense기능 사용
  - https://github.com/howooking/fastcampus-KDT5-M3/blob/d3de0084ccc9d77201f89a5d06be7ff08fe99cd8/src/api/requests.ts#LL1C1-L29C2
  - https://github.com/howooking/fastcampus-KDT5-M3/blob/d3de0084ccc9d77201f89a5d06be7ff08fe99cd8/src/components/sidebar.tsx#LL34C1-L44C18
