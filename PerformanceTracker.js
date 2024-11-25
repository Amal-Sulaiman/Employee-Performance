const nameEmp = document.getElementById('name');
const score = document.getElementById('scores');
const submit = document.getElementById('submit');
const Av = document.querySelector('.AverageScore');
const top3Performers = document.querySelector('.top3performers');
const below70Score = document.querySelector('.Improve');


const employee = JSON.parse(localStorage.getItem('employee')) || {}

let top3Per = JSON.parse(localStorage.getItem('top3Performers')) || {};

let below70Scor = JSON.parse(localStorage.getItem('below70Score')) || {};


submit.addEventListener('click', function () {
    let nameEmployeer = nameEmp.value;


    if (nameEmployeer in employee) {
        employee[nameEmployeer].scor.push(score.value);
    }

    else {
        employee[nameEmployeer] = {
            name: nameEmployeer,
            scor: [score.value],
        }
    }


    nameEmp.value = '';
    score.value = '';
    localStorage.setItem('employee', JSON.stringify(employee));


    Avg();
    below70();
    top3();
})




function Avg() {
    let Average = 0;
    Av.textContent = '';


    for (let key in employee) {
        Average = 0;

        for (let i in employee[key].scor) {
            Average += Number(employee[key].scor[i]);
        }
        employee[key].Avg = Average;


        const li = document.createElement('li');
        li.innerHTML = `<span class="left"> Employee Name: ${key}  </span> <span class="right"> Avg:  ${employee[key].Avg}</span> `;
        Av.appendChild(li);

    }

    localStorage.setItem('employee', JSON.stringify(employee));
}




function top3() {
    top3Performers.textContent = '';
    top3Per = Object.values(employee).sort((a, b) => b.Avg - a.Avg).slice(0, 3);


    localStorage.setItem('top3Performers', JSON.stringify(top3Per));

    for (let i = 0; i < top3Per.length; i++) {
        const li = document.createElement('li');
        li.innerHTML = `<span class="left"> Employee Name: ${top3Per[i].name}  </span> <span class="right">  Avg: ${top3Per[i].Avg}</span> `;
        top3Performers.appendChild(li);
    }

}





function below70() {
    below70Score.textContent = '';
   
    for (let i in employee) {
        if (employee[i].Avg < 70) {
            below70Scor[i] = employee[i];   
        }

    }
    localStorage.setItem('below70Score', JSON.stringify(below70Scor));


    for (let i in below70Scor) {
        const li = document.createElement('li');
        li.innerHTML = `<span class="left"> Employee Name: ${below70Scor[i].name} </span> <span class="right"> Avg: ${below70Scor[i].Avg} </span> `;
        below70Score.appendChild(li);
    }
}



Avg();
below70();
top3();