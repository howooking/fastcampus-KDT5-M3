// GET quote
export async function fetchQuote() {
  // 명언 데이터크기가 너무 작아서 네트워크 속도를 slow 3g로 하여도 loading ui를 볼 수가 없습니다.
  // react suspense 연습용 인위적인 2초 delay
  await new Promise((resolve) => setTimeout(resolve, 2000));
  try {
    const respons = await fetch(
      'https://api.qwer.pw/request/helpful_text?apikey=guest',
      {
        next: {
          revalidate: 10,
        },
      }
    );
    const json = await respons.json();
    if (json[0].result === 'success') {
      return json[1].respond;

      // 통신에서 에러가 발생하여도 default 명언을 return해줌
      // default값이 없이 인위적으로 throw new Error()로 에러 발생시킨다고 해도 root layout이라서 error boundry를 벗어남, global-error.tsx파일 필요
    } else {
      // apikey가 잘못된 경우
      return '발톱 줄게 츄르를 다오. - 호우';
    }
  } catch (error) {
    // 주소가 잘못된 경우
    return '발톱 줄게 츄르를 다오. - 호우';
  }
}

// GET todos
export async function getTodos() {
  try {
    const res = await fetch(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
      {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          apikey: process.env.NEXT_PUBLIC_TODO_API_KEY as string,
          username: process.env.NEXT_PUBLIC_TODO_USERNAME as string,
        },
      }
    );
    if (res.ok) {
      const json = await res.json();
      return json;
    } else {
      console.log(res);
    }
  } catch (error) {
    console.log('Error fetching todos:', error);
  }
}

// POST todo
export async function postTodo(newTodo: string) {
  try {
    const res = await fetch(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos',
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
          apikey: process.env.NEXT_PUBLIC_TODO_API_KEY as string,
          username: process.env.NEXT_PUBLIC_TODO_USERNAME as string,
        },
        body: JSON.stringify({
          title: newTodo,
        }),
      }
    );
    const json = await res.json();
    return json;
    // {
    //   "id": "7P8dOM4voAv8a8cfoeKZ",
    //   "order": 0,
    //   "title": "KDT 과정 설계 미팅",
    //   "done": false,
    //   "createdAt": "2021-10-29T07:20:02.749Z",
    //   "updatedAt": "2021-10-29T07:20:02.749Z"
    // }
  } catch (error) {
    console.log('Error creating a todo:', error);
  }
}

// DELETE todo
export async function deleteTodo(todoId: string) {
  try {
    const res = await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todoId}`,
      {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json',
          apikey: process.env.NEXT_PUBLIC_TODO_API_KEY as string,
          username: process.env.NEXT_PUBLIC_TODO_USERNAME as string,
        },
      }
    );
    const json = await res.json();
    return json;
    // type ResponseValue = true
  } catch (error) {
    console.log('Error deleting a todo:', error);
  }
}

// PUT todo
export async function putTodo(editTodo: Todo) {
  try {
    const res = await fetch(
      `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${editTodo.id}`,
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          apikey: process.env.NEXT_PUBLIC_TODO_API_KEY as string,
          username: process.env.NEXT_PUBLIC_TODO_USERNAME as string,
        },
        body: JSON.stringify({
          title: editTodo.title,
          done: editTodo.done,
        }),
      }
    );
    const json = await res.json();
    return json;
    // {
    //   "id": "7P8dOM4voAv8a8cfoeKZ",
    //   "title": "Bootstrap 스타일 추가",
    //   "done": false,
    //   "order": 2,
    //   "createdAt": "2021-10-29T07:20:02.749Z",
    //   "updatedAt": "2021-10-29T07:20:02.749Z"
    // }
  } catch (error) {
    console.log('Error updating todos:', error);
  }
}

// PUT todo reorder
export async function reorderTodo(todoIds: string[]) {
  try {
    const res = await fetch(
      'https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/reorder',
      {
        method: 'PUT',
        headers: {
          'content-type': 'application/json',
          apikey: process.env.NEXT_PUBLIC_TODO_API_KEY as string,
          username: process.env.NEXT_PUBLIC_TODO_USERNAME as string,
        },
        body: JSON.stringify({
          todoIds,
        }),
      }
    );
    const json = await res.json();
    return json;
    // type ResponseValue = true
  } catch (error) {
    console.log('Error reordering todos:', error);
  }
}

// DELETE done todos
// export async function deleteDone(doneTodoIds: string[]) {
//   try {
//     doneTodoIds.forEach((todoId) =>
//       fetch(
//         `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todoId}`,
//         {
//           method: 'DELETE',
//           headers: {
//             'content-type': 'application/json',
//             apikey: process.env.NEXT_PUBLIC_TODO_API_KEY as string,
//             username: process.env.NEXT_PUBLIC_TODO_USERNAME as string,
//           },
//         }
//       )
//     );
//   } catch (error) {
//     console.log('Error deleting done todos:' error);
//   }
// }

export async function deleteDone(doneTodoIds: string[]) {
  try {
    const deletePromises = doneTodoIds.map((todoId) =>
      fetch(
        `https://asia-northeast3-heropy-api.cloudfunctions.net/api/todos/${todoId}`,
        {
          method: 'DELETE',
          headers: {
            'content-type': 'application/json',
            apikey: 'KDT5_nREmPe9B',
            username: 'KDT5_LeeJungWoo',
          },
        }
      )
    );

    await Promise.all(deletePromises);
    console.log('Successfully deleted done todos.');
  } catch (error) {
    console.error('Error deleting done todos:', error);
  }
}
