let sentence = 'sunflower galaxy jump whisper crystal tornado velvet pancake oxygen ladder volcano bubble knight anchor mango eclipse pillow dragon zipper thunder cactus lantern marshmallow balloon'
sentence = sentence.split('')
const textArea = document.querySelector('.text-area')

for (i of sentence){
  const span = document.createElement('span')
  span.className = 'word'
  span.textContent = i
  textArea.append(span)
}


let index = 0
let correct = 0
let incorrect = 0
let startTime = ''
let endTime = ''

let finished = false

function showResult(){
  textArea.innerHTML = ''
  textArea.classList.remove('text-area')
  textArea.classList.add('result-page')

  const timeTaken = Math.round(endTime-startTime)/1000
  const accuracy = Math.round(correct*100/sentence.length)

  const wpm_acc = document.createElement('div')
  wpm_acc.className = 'wpm-acc'
  const wpmText = document.createElement('p')
  wpmText.textContent = `WPM: ${Math.round((correct/5)*(accuracy/100)/(timeTaken/60))}`
  const accText = document.createElement('p')
  accText.textContent = `Accuracy: ${accuracy}`
  wpm_acc.append(wpmText, accText)

  const otherData = document.createElement('div')
  otherData.className = 'other-data'
  const rawText = document.createElement('p')
  rawText.textContent = `Raw: ${Math.round((correct/5)/(timeTaken/60))}`
  const charText = document.createElement('p')
  charText.textContent = `Characters: ${sentence.length}`
  const timetakenText = document.createElement('p')
  timetakenText.textContent = `Time taken: ${timeTaken}s`
  otherData.append(rawText, charText, timetakenText)

  textArea.append(wpm_acc, otherData)
}

const spans = document.querySelectorAll('.word')
spans[index].classList.add('underline')

window.addEventListener('keydown', (event) => {

  if (index === 0){
    startTime = Date.now()
  }

  if ((event.key.length === 1 && index<sentence.length) && !(finished)){
    if (event.key === spans[index].textContent){
      spans[index].classList.add('correct')
      correct += 1
      spans[index].classList.remove('underline')
      index += 1
      if (spans[index]){spans[index].classList.add('underline')}
      
      // spans[index-1].classList.remove('underline')
    }
    else{
      spans[index].classList.add('incorrect')
      spans[index].classList.remove('underline')
      incorrect += 1
      index+=1
      if (spans[index]){spans[index].classList.add('underline')}
    }
    if (index === sentence.length){
      endTime = Date.now()
      finished = true
      showResult()
    }     
  }

  
})