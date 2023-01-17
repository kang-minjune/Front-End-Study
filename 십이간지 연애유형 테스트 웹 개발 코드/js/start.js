const main = document.querySelector("#main");
const qna = document.querySelector("#qna");
const result = document.querySelector("#result");
const endPoint = 12;
const select = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

function calResult(){
        console.log(select);
        var result = select.indexOf(Math.max(...select));
        return result;
}

function setResult(){
    let point = calResult();
    const resultName = document.querySelector('.resultname');
    resultName.innerHTML = infoList[point].name;

    var resultImg = document.createElement('img');
    const imgDiv = document.querySelector('#resultImg');
    var imgURL = 'img/image-' + point + '.png';
    resultImg.src = imgURL;
    resultImg.alt = point;
    resultImg.classList.add('img-fluid');
    imgDiv.appendChild(resultImg);

    const resultDesc = document.querySelector('.resultDesc');
    resultDesc.innerHTML = infoList[point].desc;
}

function goResult(){
    qna.style.WebkitAnimation = "fadeOut 1s";
    qna.style.animation = "fadeOut 1s";

    setTimeout(() => {     //setTimeOut()은 타이머가 만료된 뒤 함수나 지정된 코드를 실행하는 타이머를 설정하는 Javascript 기호
        result.style.WebkitAnimation = "fadeIn 1s";
        result.style.animation = "fadeIn 1s";

        setTimeout(() => {
            qna.style.display = "none";
            result.style.display = "block"
            }, 450)})
            setResult();
            calResult(); //goResult 함수에 마지막 result값을 불러온다.
}

function addAnswer(answerText, qIdx, idx){
    var a = document.querySelector('.answerBox'); //document.querySelector() 메소드는 문서(document)에서 css 선택자 .answerBox가 a로 대응되는 것을 선택해주는 역할을 의미.
    var answer = document.createElement('button'); //document.createElement() 메소드는 지정한 tagName의 HTML 요소를 만들어 반환.
    answer.classList.add('answerList');
    answer.classList.add('my-3');
    answer.classList.add('py-3');
    answer.classList.add('mx-auto');
    answer.classList.add('fadeIn');

    a.appendChild(answer);

    answer.innerHTML = answerText;

    answer.addEventListener("click", function() //addEventListener() 메소드는 지정한 이벤트가 대상에 전달될 떄마다 호출할 함수 설정
    { 
        var children = document.querySelectorAll('.answerList');
        for(let i=0; i < children.length; i++){
            children[i].disabled = true;
            children[i].style.WebkitAnimation = "fadeOut 0.5s";
            children[i].style.animation = "fadeOut 0.5s";
            children[i].style.display = 'none';
        }
        setTimeout(() => {
            var target = qnaList[qIdx].a[idx].type;
            for(let i = 0; i < target.length; i++){

                select[target[i]] += 1;
            }

            for(let i = 0; i < children.lengt; i++){
                children[i].style.display = 'none';
            }
            goNext(++qIdx);
        }, 450)        
    }, false);
}

function goNext(qIdx){
    if(qIdx === endPoint){
        goResult();
        return;
    }

    var q = document.querySelector('.qBox');
    q.innerHTML = qnaList[qIdx].q;
    for(let i in qnaList[qIdx].a){
        addAnswer(qnaList[qIdx].a[i].answer, qIdx, i);
    }
    var status = document.querySelector('.statusBar');
    status.style.width =  (100/endPoint) * (qIdx+1) + '%';
}

function begin(){
    main.style.WebkitAnimation = "fadeOut 1s";
    main.style.animation = "fadeOut 1s";
    setTimeout(() => {     //setTimeOut()은 타이머가 만료된 뒤 함수나 지정된 코드를 실행하는 타이머를 설정하는 Javascript 기호
        qna.style.WebkitAnimation = "fadeIn 1s";
        qna.style.animation = "fadeIn 1s";
    setTimeout(() => {
         main.style.display = "none";
         qna.style.display = "block";
        }, 450)
        let qIdx = 0;
        goNext(qIdx);
    }, 450);
}
