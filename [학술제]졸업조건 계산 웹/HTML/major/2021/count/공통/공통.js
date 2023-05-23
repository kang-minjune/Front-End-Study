//체크박스 Javascript [학부공통]
function getCheckboxValue()  {
    // 선택된 목록 가져오기
    const query = 'input[name="number"]:checked';
    const selectedEls = 
        document.querySelectorAll(query);
    
    // 선택된 목록에서 value 찾기
    let result = '';
    selectedEls.forEach((el) => {
      result += el.value + ' ';
      el.checked = false;
    });
    Element.checked=true;
    // 출력
    document.getElementById('result').innerText
      = result;
  }
  
    //숫자카운팅 버튼 JS
    function count(type)  {
    // 결과를 표시할 element
    const resultElement = document.getElementById('result');
  
    // 현재 화면에 표시된 값
    let number = resultElement.innerText;
  
    // 더하기/빼기
    if(type === 'plus') {
      number = parseInt(number) + 3;
    }
  
    // 결과 출력
    resultElement.innerText = number;
    }