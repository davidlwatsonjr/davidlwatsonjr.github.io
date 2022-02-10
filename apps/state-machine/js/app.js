var StateMachine = function(stateMatrix) {
    this.stateMatrix = stateMatrix || [];
    this.state = 0;
    this.inputHistory = '';
};

StateMachine.prototype.addInput = function(input) {
    this.inputHistory += input;

    try {
        if (typeof this.stateMatrix[this.state][input] !== 'undefined') {
            this.state = this.stateMatrix[this.state][input];
        }
        console.log(this.state);
    } catch (exc) {
        console.log('No next state for state ' + this.state + ' and input ' + input);
    }
}

StateMachine.prototype.getInputHistory = function() {
    return this.inputHistory;
}

StateMachine.prototype.getState = function(input) {
    return this.state;
};

var stateMachine;
var stateViewDiv;

function handleKeyDown(e) {
    stateMachine.addInput(e.key);

    if (stateMachine.getInputHistory().substr(-2, 2) === '-1') {
        endStateMachine();
        return;
    }

    stateViewDiv.innerText = stateMachine.getState();
}

function beginStateMachine() {
    document.body.classList.add('state-machine-on');
    stateMachine = new StateMachine([
        [1, 3, 0],
        [2, 0, 0],
        [3, 1, 0],
        [0, 2, 0]
    ]);
    document.addEventListener('keydown', handleKeyDown);
}

function endStateMachine() {
    document.body.classList.remove('state-machine-on');
    stateMachine = null;
    document.removeEventListener('keydown', handleKeyDown);
}

document.addEventListener('DOMContentLoaded', function () {
    var beginButton = document.getElementById('beginButton');
    beginButton.addEventListener('click', beginStateMachine);
    stateViewDiv = document.getElementById('stateOutput');
});