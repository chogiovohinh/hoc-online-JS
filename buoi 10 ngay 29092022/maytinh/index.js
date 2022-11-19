      
function inputcall (inp) {
    document.getElementById("screen").value += inp;
}
function getresult (inp) {
    document.getElementById('screen').value = eval(document.getElementById('screen').value);
}
function resetscreen (inp) {
    document.getElementById('screen').value = '';
}