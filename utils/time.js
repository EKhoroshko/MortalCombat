export default function timeToFight() {
    const date = new Date();
    function getZero(num) {
        if (num > 0 && num < 10) {
            return '0' + num;
        } else {
            return num;
        }
    }
    const time = getZero(date.getHours()) + ':' + getZero(date.getMinutes());
    return time;
}