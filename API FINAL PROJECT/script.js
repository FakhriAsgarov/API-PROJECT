let leftInput = document.querySelector('.left-input');
let rightInput = document.querySelector('.right-input');
let leftTds = document.querySelectorAll('.left-table td');
let rightTds = document.querySelectorAll('.right-table td');
let leftSpan = document.querySelector('.left-span');
let rightSpan = document.querySelector('.right-span');

leftTds.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        document.querySelector('.left-table .active').classList.remove('active');
        e.target.classList.add('active')
    })
})                                                                          //ADDING .ACTIVE CLASS TO LEFT INPUT TD'S CLASSLIST

rightTds.forEach((elem) => {
    elem.addEventListener('click', (e) => {
        document.querySelector('.right-table .active').classList.remove('active');
        e.target.classList.add('active')
    })
})                                                                         //ADDING .ACTIVE CLASS TO RIGHT INPUT TD'S CLASSLIST


const exchanger=async (e) => {
    let leftCur = document.querySelector('.left-table .active').innerHTML;
    let rightCur = document.querySelector('.right-table .active').innerHTML;

    if(leftCur==rightCur){
        rightInput.value=leftInput.value;
        leftSpan.innerHTML=`1 ${leftCur} =1 ${rightCur}`
        rightSpan.innerHTML=`1 ${leftCur} =1 ${rightCur}`
    }                                                                      // IF SELECTIONS OF CURRENCIES ARE EQUAL 

    
    else{
        //FOR LEFT INPUT
        let response = await fetch(`https://api.exchangerate.host/latest?base=${leftCur}&symbols=${rightCur}`)
        
        let data = await response.json();
        let a;
        let b;
     
        switch (rightCur) {
            case 'USD':
                a=data.rates.USD;
                leftSpan.innerHTML=`1 ${leftCur} = ${a} USD`
                break;
            case 'RUB':
                a=data.rates.RUB;
                leftSpan.innerHTML=`1 ${leftCur} = ${a} RUB`
                break;
            case 'EUR':
                a=data.rates.EUR;
                leftSpan.innerHTML=`1 ${leftCur} = ${a} EUR`
                break;
            case 'GBP':
                a=data.rates.GBP;
                leftSpan.innerHTML=`1 ${leftCur} = ${a} GBP`
                break;
            default:
                a=data.rates.USD;
                leftSpan.innerHTML=`1 ${leftCur} = ${a} USD`
                break;
    
        }

   
        //  FOR RIGHT INPUT
        let reverseResponse = await fetch(`https://api.exchangerate.host/latest?base=${rightCur}&symbols=${leftCur}`)
        let reverseData = await reverseResponse.json();
    
        switch (leftCur) {
            case 'USD':
                b=reverseData.rates.USD;
                rightSpan.innerHTML=`1 ${rightCur} = ${reverseData.rates.USD} USD`
                break;
            case 'RUB':
                b=reverseData.rates.RUB;
            rightSpan.innerHTML=`1 ${rightCur} = ${reverseData.rates.RUB} RUB`
                break;
            case 'EUR':
                b=reverseData.rates.EUR;
            rightSpan.innerHTML=`1 ${rightCur} = ${reverseData.rates.EUR} EUR`
                break;
            case 'GBP':
                b=reverseData.rates.GBP;
            rightSpan.innerHTML=`1 ${rightCur} = ${reverseData.rates.GBP} GBP`
                break;
            default:
                b=reverseData.rates.USD;
                rightSpan.innerHTML=`1 ${rightCur} = ${reverseData.rates.RUB} USD`
                break;
    
        }

        if(e.target==rightInput){
  
            leftInput.value=rightInput.value * b;
           
        }
        else{
            rightInput.value=leftInput.value*a;
        }
       
        
    }
   


    
}



leftInput.addEventListener('keyup', exchanger)
rightInput.addEventListener('keyup', exchanger)

leftTds.forEach((elem) => {
    elem.addEventListener('click', exchanger )
})

rightTds.forEach((elem) => {
    elem.addEventListener('click', exchanger )
})
