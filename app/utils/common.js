/**
 * 천단위 콤머를 찍는다.
 */
export function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
}

