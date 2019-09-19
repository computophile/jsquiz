displayQuestion = document.querySelector('.quiz__question');


let questionCounter = 0;
let question_display = document.querySelector('.quiz__question')
document.querySelector('.button__left').style.visibility = 'hidden';


let q1 = new Map();
let q2 = new Map();
let q3 = new Map();
let q4 = new Map();
let q6 = new Map();
let q5 = new Map();
var arr = [
    q1.set('question', 'Who is known as "The greatest soccer player ever?').set('o1', 'Pele').set('o2', 'Christiano Ronaldo').set('o3', 'Lionel Messi').set('o4', 'Diego Maradona').set('answer', 'Pele'),
    q3.set('question', 'Who is Argentina\'s star player??').set('o1', 'Gonzalo Higuain').set('o2', 'Javier Mascherano ').set('o3', 'Sergio Aguero ').set('o4', 'Lionel Messi').set('answer', 'Lionel Messi'),
    q2.set('question', 'What club does Zlatan Ibrahimovic currently play for?').set('o1', 'Manchester City').set('o2', 'Paris-Saint-Germain (PSG)').set('o3', 'Manchester United').set('o4', 'Real Madrid').set('answer', 'Manchester United'),
    q4.set('question', 'Who played goalie for the USA in the 2014 World Cup?').set('o1', 'Brad Guzan').set('o2', 'Bill Hamid').set('o3', 'Luis Robles').set('o4', 'Tim Howard').set('answer', 'Bill Hamid'),
    q5.set('question', 'Who scored the winning goal of the 2014 World Cup??').set('o1', 'Thomas Muller').set('o2', 'Mario Gotze').set('o3', 'Lionel Messi').set('o4', 'Phillip Lahm').set('answer', 'Mario Gotze'),
    // q6.set('question', 'What ?').set('o1', 'Lambo').set('o2', 'Bugatti?').set('o3', 'Posche').set('o4', 'Ford Mustang').set('answer', 'Bugatti?'),
];




console.log(q1.get('answer'));
clickedOption = document.querySelector(".quiz__options").addEventListener('click', check);



function check(e) {

    console.log('does it have the selected tag ' + arr[questionCounter].has('selected'));
    if (arr[questionCounter].has('selected')) {
        // it is already selected and you need to highlight what the user selected and what is the right and wrong answer


        

        [...document.querySelectorAll('.quiz__options__list')].forEach(function (options) {

            console.log('is the option true ' + (options.id == arr[questionCounter].get('selected')));

            if (options.id == arr[questionCounter].get('selected')) {
                // check if it right or wrong
                // highlight if it is right
                if (options.innerHTML === arr[questionCounter].get('answer')) {
                    options.classList.add('right');
                    console.log('you are correct');
                } 
                
                else {

                    options.classList.toggle('wrong');
                }
            }

        });
    }
    
    
    
    else {
        console.log(e.target.classList.value);
        if (e.target.classList.value === "quiz__options__list") {

            console.log('Seleceted option value' + e.target.id);
            arr[questionCounter].set('selected', e.target.id);
            console.log(arr[questionCounter].get('selected'));

            if (e.target.innerHTML === arr[questionCounter].get('answer')) {
                e.target.classList.add('right');
                console.log('you are correct');
            } else {

                console.log('you are wrong');

                e.target.classList.add('wrong');

                [...document.querySelectorAll('.quiz__options__list')].forEach(function (options) {


                    if (options.innerHTML == arr[questionCounter].get('answer')) {
                        options.classList.add('right');
                    };
                });
            }




            setTimeout(() => {

                if (questionCounter >= 0) {
                    document.querySelector('.button__left').style.visibility = 'visible';
                }

                if (questionCounter == arr.length - 2) {
                    document.querySelector('.button__right').style.visibility = 'hidden';
                }
                loadQuestion(++questionCounter);
                animateForward();


            }, 1500);
        }




    }


}

// here is what needs to happen when the answers are clicked


function loadQuestion(e) {
    // console.log(e);
    if (questionCounter >= 0 || questionCounter < arr.length) {
        console.log('counter called');
        let counter = 0;
        let questionCounter__ = 'q' + (questionCounter + 1) + '.';
        displayQuestion.innerHTML = questionCounter__.toUpperCase() + arr[questionCounter].get('question');

        [...document.querySelectorAll('.quiz__options__list')].forEach(function (options) {
            // Now do something with my button
            ++counter;
            options.classList.remove('right');
            options.classList.remove('wrong');
            options.innerHTML = arr[questionCounter].get('o' + counter);
        });



    }

}
loadQuestion();

// the righth button functionality


document.querySelector('.button__right').addEventListener('click', () => {
    ++questionCounter;
    animateForward();
    document.querySelector(".quiz__options").animate([{
            transform: 'translateX(1rem)',
            opacity: 0
        },
        {
            transform: 'translateX(0)',
            opacity: 1
        }
    ], {
        delay: 100,
        duration: 500,
        easing: 'ease',
        fill: 'backwards'
    });

    if (questionCounter == arr.length - 1) {
        document.querySelector('.button__right').style.visibility = 'hidden';
    }

    if (questionCounter < arr.length) {

        console.log('button clicked')
        loadQuestion(questionCounter);
        document.querySelector('.button__left').style.visibility = 'visible';

    } else {
        document.querySelector('.button__left').style.visibility = 'visible';
        --questionCounter;
    }

});
// the left button functionality

document.querySelector('.button__left').addEventListener('click',
    () => {
        --questionCounter;
        animateBackward();
        verifyAnswers();
        document.querySelector(".quiz__options").animate([{
                transform: 'translateX(-1rem)',
                opacity: 0
            },
            {
                transform: 'translateX(0)',
                opacity: 1
            }
        ], {
            delay: 100,
            duration: 500,
            easing: 'ease',
            fill: 'backwards'
        });

        if (questionCounter == 0) {
            document.querySelector('.button__left').style.visibility = 'hidden';

        }

        if (questionCounter >= 0) {

            console.log('button clicked')
            loadQuestion(questionCounter);
            document.querySelector('.button__right').style.visibility = 'visible';

        } else {
            questionCounter++;
        }
    }
);

function animateBackward() {
    document.querySelector(".quiz__options").animate([{
            transform: 'translateX(-1rem)',
            opacity: 0
        },
        {
            transform: 'translateX(0)',
            opacity: 1
        }
    ], {
        delay: 100,
        duration: 500,
        easing: 'ease',
        fill: 'backwards'
    });

    document.querySelector(".quiz__question").animate([{
            transform: 'translateX(-1rem)',
            opacity: 0
        },
        {
            transform: 'translateX(0)',
            opacity: 1
        }
    ], {
        delay: 100,
        duration: 500,
        easing: 'ease',
        fill: 'backwards'
    });
}

function animateForward() {
    document.querySelector(".quiz__options").animate([{
            transform: 'translateX(1rem)',
            opacity: 0
        },
        {
            transform: 'translateX(0)',
            opacity: 1
        }
    ], {
        delay: 100,
        duration: 500,
        easing: 'ease',
        fill: 'backwards'
    });

    document.querySelector(".quiz__question").animate([{
            transform: 'translateX(1rem)',
            opacity: 0
        },
        {
            transform: 'translateX(0)',
            opacity: 1
        }
    ], {
        delay: 100,
        duration: 500,
        easing: 'ease',
        fill: 'backwards'
    });
}

function verifyAnswers() {



}