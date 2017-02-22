/**
 * Created by 0easy-23 on 2017/2/5.
 */
var formateDate = (date) => {
    return date.getFullYear() + '-' + formateStr(date.getMonth() + 1) + '-' + formateStr(date.getDate())
}
var formateStr = (str) => {
    return str.toString().replace(/^(\d)$/, "0$1")
}
export {formateDate}