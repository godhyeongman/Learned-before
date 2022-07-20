# 투두앱 간단설명

| Hearder | Description |
| ------- | ----------- |
| 1번     | 동작 방법   |
| 2번     | 주의사항    |
| 3번     | 함수설명    |

## 1번 동작 방법

---

- 입력은 $를 기준으로 동작되어집니다.

- 첫번째 명령어는 _add, show , update_ 가 사용되어 집니다.

> 1.  _add_ 는 해야할 일을 추가합니다. _add_$_해야할 일_ 을 입력하세요. id를 생성한후 _todo_ 목록에 할일을 추가해줍니다.
> 2.  _show_ 는 원하는 테스크의 목록을 보여줍니다. _show_$_todo, doing, done_ 중 한단어를 입력하세요.
> 3.  _update_ 는 $를 두개 사용합니다.. *update$id값$원하는 상태\*로 입력하세요. 3초의 시간이 지연됩니다.

## 2번 주의사항

---

- 입력 오류가 있을시 다시 경고문과 함께 다시입력 해야합니다.

- 띄어쓰기는 가능합니다. 하지만 대문자는 필터링 지원하지 않습니다.

- 연이은 동작은 사용불가능합니다.
  > ex )
  > _add$공부하기$show$doing$update_ ----> X

## 3번 함수설명

1. start() : 정상적인 작동중임을 알려주고 기록을 시작합니다.
2. inputUserNum(): 유저에게 입력을 받습니다. 입력값은 3번 함수의 매개변수로 전달되어집니다.
3. separateInput(input): 입력받은 값을 $를 기준으로 나눠줍니다. 4,5번에 나눠진 입력값을 매겨번수로 전달해줍니다.
4. returnErrorMessage(input): 전달받은 나눠진 값에 문제가 있는지 점검합니다 에러시 1번으로 돌아갑니다.
5. checkInput(splitedInput): 전달받은값의 첫번째 명령어를 검증합니다. add는 6번 show는 7번 update는 12번으로 전달되어집니다.
6. addTodo(splitedInput): idCount를 올려줍니다. listStorage.todo에 key = id 와 value = '입력한 해야할일' 로 처리되어 보관되어집니다. 1번으로 돌아갑니다.
7. showCurrentTask(): 현재 기록한 일들을 보여줍니다.
8. showTask(splitedInput): show명령어를 삭제후 다음 명령어를 확인합니다. todo, doing, done 등에따라 입력이 처리되어집니다.
9. showTodoList(): todo 목록을 보여줍니다. 1번으로 돌아갑니다.
10. showDoingList(): doing 목록을 보여줍니다. 시간 기록은 이시점부터 시작됩니다. 1번으로 돌아갑니다.
11. showDoneList(): done 목록을 보여줍니다.끝나는 시간 비례하여 함께 보여줍니다. id 값을 제공하지 않습니다. 1번으로 돌아갑니다.
12. upDateThigs(splitedInput): 전달받은 매개변수를 명령어 삭제후 id 와 task로 나눠줍니다. setTimeOut을 통해 3초후 listStorage의 모든 리스트를 확인하고 id값을 발견하면 14번으로 id, task, 해당 storage.list를 넘겨줍니다.
13. changeTask(id, task, list) 전달받은 storage.list의 key와 밸류는 삭제되고 새로운 list로 전달됩니다. task의 값에 따라 두가지 동작을합니다. 만약받은 값이 doing이면 시간기록 done이면 시간체크로 14,15번이 이를 수행합니다.
14. recordTime(id): 전달받은 id값을 토대로 listStorage.timelist에 id와 시작시간을 기록합니다.
15. checkTime(id): 최종측정 시간에서 시작시간을 뺀후 이를 listStorage.ttimelist 에 기록 하여줍니다.
