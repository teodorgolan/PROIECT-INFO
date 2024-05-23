document.addEventListener('DOMContentLoaded', function() {
    var qtyInput = document.getElementById('qty');
    var newFieldsContainer = document.getElementById('newFields');
    var submitBtn = document.getElementById('submitBtn');
    var resultsContainer = document.getElementById('results');
    var v = new Array(101).fill(0);

    qtyInput.addEventListener('input', function() {
        var n = parseInt(this.value) || 0;
        if (n > 0 && n <= 100) {
            createFields(n);
        } else {
            newFieldsContainer.innerHTML = '';
        }
    });

    submitBtn.addEventListener('click', function() {
        var values = getInputValues();
        processValues(values);
    });

    function createFields(n) {
        newFieldsContainer.innerHTML = '';

        for (var i = 0; i < n; i++) {
            var label = document.createElement('label');
            label.textContent = `v[${i + 1}]: `;

            var input = document.createElement('input');
            input.type = 'number';
            input.name = `input${i}`;
            input.id = `input${i}`;

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

        resultsContainer.innerHTML = '';  // Sterge rezultatele vechi

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
            resultsContainer.innerHTML = '<p>Nu exista castigator</p>';
        }
    }
});
