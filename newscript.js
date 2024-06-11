document.addEventListener('DOMContentLoaded', function() {
    var mainIn = document.getElementById('mainIn');
    var newFieldsContainer = document.getElementById('newLines');  
    var nextBtn = document.getElementById('nextBtn');        
    var submitBtn = document.getElementById('submitBtn'); 
    var startBtn = document.getElementById('startBtn');       
    var processContainer = document.getElementById('processing');        
    var resultsContainer = document.getElementById('result');        
    var v = new Array(101).fill(0);        

    const progressBar = document.getElementById('progressBar');

    function updateProgressBar(progress) {
        progressBar.querySelector('.progress').style.width = progress + '%';
    }
    updateProgressBar(0);
    
    startBtn.addEventListener('click', function() {
        startBtn.parentElement.classList.add('hidden');
        mainIn.parentElement.classList.remove('hidden');
        updateProgressBar(1);
    })

    nextBtn.addEventListener('click', function() {        
        var n = parseInt(mainIn.value) || 0;
        if (n > 0 && n <= 100) {
            mainIn.parentElement.classList.add('hidden');
            createFields(n);
            newFieldsContainer.classList.remove('hidden');
            submitBtn.classList.remove('hidden');
            updateProgressBar(25);
        } else {
            newFieldsContainer.innerHTML = '<p>Vă rugăm să introduceți numărul de numere de telefon.</p>';
            newFieldsContainer.classList.remove('hidden');
        }
    });                        

    submitBtn.addEventListener('click', function() {
        var values = getInputValues();
        newFieldsContainer.classList.add('hidden');
        submitBtn.classList.add('hidden');
        processContainer.classList.remove('hidden');
        updateProgressBar(75);
        setTimeout(function() {
            processValues(values);
            processContainer.classList.add('hidden');
            resultsContainer.classList.remove('hidden');
            updateProgressBar(100);
        }, 2000);
    });

    function createFields(n) {
        newFieldsContainer.innerHTML = '';

        for (var i = 0; i < n; i++) {
            var label = document.createElement('label');
            label.textContent = `Numărul ${i + 1}:`;

            var input = document.createElement('input');
            input.type = 'number';
            input.name = `input${i}`;
            input.id = `input${i}`;
            input.min = `0`;

            newFieldsContainer.appendChild(label);
            newFieldsContainer.appendChild(input);
            newFieldsContainer.appendChild(document.createElement('br'));
        }
    }

    function getInputValues() {
        var inputs = newFieldsContainer.querySelectorAll('input');
        var values = [];
        inputs.forEach(function(input) {
            values.push(parseInt(input.value) || 0);
        });
        return values;
    }

    function processValues(values) {
        var c = 0;
        var n = values.length;
        v.fill(0);

        for (let i = 0; i < n; i++) {
            v[i + 1] = values[i];
        }

        resultsContainer.innerHTML = '';

        for (let j = 1; j <= n; j++) {
            if (v[j] >= 100000 && v[j] <= 999999) {
                let x = v[j];
                let isValid = true;
                while (x > 0) {
                    if ((x % 10) % 2 !== 0) {
                        isValid = false;
                        break;
                    }
                    x = Math.floor(x / 10);
                }
                if (!isValid) {
                    v[j] = 0;
                }
            } else {
                v[j] = 0;
            }
        }

        for (let h = 1; h <= n; h++) {
            if (v[h] > c) {
                c = v[h];
            }
        }

        if (c !== 0) {
            resultsContainer.innerHTML = `<p>${c} Este castigatorul</p>`;
        } else {
            resultsContainer.innerHTML = '<p>Din păcate nu există câștigător</p>';
        }
    }
});
